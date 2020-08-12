/// <reference path="../myControls.ts" />
/// <reference path="../Data/myData.ts" />
/// <reference path="Form.ts" />
/// <reference path="myForms.Config.ts" />



namespace my {

    export namespace forms {

        export interface iForm {
            Groups: Array<my.forms.fGroup>;
            dataSet: my.data.iDataSet;
            dataRow: my.data.iDataRow;
            events: my.core.form.EventsForm;
            options: my.forms.fOptions;
        }



        export class Standard extends my.core.form.core implements iForm {
            ctlType: string = "forms.Standard";
            Groups: Array<fGroup> = [];
            options: fOptions;


            constructor(dataSet: my.data.iDataSet, config: my.forms.Config = undefined) {
                super();

                this.options = new fOptions();

                this.dataSet = dataSet;
                this.dataSet.events.Loaded.subscribe(this, this.rebind.bind(this));
                this.config = config;

            }


            rebind() {
                var self = this;
                this.Groups.forEach((gr: fGroup, idx) => {
                    self._rebindItems(gr.items);
                });
            }

            private _rebindItems(arrItems) {
                var self = this;
                arrItems.forEach((itm: fItem, idx) => {
                    itm.visible = true; // need this to reset the "visible state" when you jump between insert and edit mode
                    if (self.mode == 'insert') {
                        if (itm.visibleInInsertMode) {
                            // itm.bind(self.dataSet);
                            itm.visible = true;
                        } else {
                            itm.visible = false;
                        }
                    } else {
                        if (itm.visibleInEditMode) {
                            // itm.bind(self.dataSet);
                            itm.visible = true;
                        } else {
                            itm.visible = false;
                        }
                    }

                    if (this.readOnly) {
                        itm.readOnly = true;
                    }

                    itm.bind(self.dataSet);
                });

            }

            addGroup(group: fGroup) {
                group.parentForm = this;
                this.Groups.push(group);
                this.element.appendChild(group.element);
            }

            //#region CREATE BY CONFIG

            private _config: my.forms.Config
            get config(): my.forms.Config {
                return this._config;
            }
            set config(val: my.forms.Config) {
                if (val) {
                    this._config = val;
                    //this._hideColsByModuleProp();
                    this._createFormByConfig();
                    // create elements based on a config input object
                }
            }

            private _createFormByConfig() {
                var self = this;
                this.config.frmGroups.forEach((item: FrmGroupCfg, idx) => {
                    self._createGroupsByConfig(item);
                });
            }

            // private _hideColsByModuleProp() {
            //     this._getHideCols();
            //     this.config.frmGroups.forEach((group: FrmGroupCfg) => {
            //         group.items.forEach((item) => {
            //             if (this.hideCols.some(x => x.startsWith(item.dataColumn.toLowerCase()))) {
            //                 item.isHidden = true;
            //             }
            //         })
            //     })
            // }

            private _createGroupsByConfig(cfgGroup: my.forms.FrmGroupCfg) {
                var fGroup: my.forms.fGroup = new my.forms.fGroup(cfgGroup.title, this);
                var self = this;
                cfgGroup.items.forEach((itmCfg: FrmItemCfg) => {
                    if (this.mode == 'insert') {  // this works only when creating the form 
                        if (itmCfg.visibleInInsertMode) {
                            fGroup.createItemByConfig(itmCfg);
                        }
                    } else {
                        fGroup.createItemByConfig(itmCfg);
                    }

                });
                this.addGroup(fGroup);

            }

            //#endregion CREATE BY CONFIG



            save(onSucess: Function) {
                // run validation from parent
                if (this.validate()) {
                    //validation success

                    //fix me
                    this.dataSet.sendData(this.dataRow, () => {
                        // run code on success
                        onSucess();
                    });
                } else {
                    //validation failed

                }
            } // end save




        }; // end class forms core






        export class fGroup extends my.core.form.frmGroup {
            parentForm: my.forms.iForm;

            constructor(title: string, parentForm: iForm) {
                super(title);
                this.parentForm = parentForm;
            }



            private _applyCtlOptions(ctl: object, options: Array<object>) {
                if (options == undefined) {
                    return;
                }
                //options.forEach((itm: { name: string, value: string }, idx) => {
                for (var propertyName in options) {
                    if (propertyName in ctl) {
                        ctl[propertyName] = options[propertyName];
                    }
                }
            }


            createItemByConfig(fItemCfg: my.forms.FrmItemCfg) {
                var ctl: my.controls.iControl;



                switch (fItemCfg.dataType) {
                    case "number":
                        if ((fItemCfg.type == "label") || (this.readOnly)) {
                            var lblSpan: my.controls.ctlSpan = new my.controls.ctlSpan("");
                            lblSpan.element.classList.add("ronly");
                            ctl = lblSpan;
                        }
                        else { // textbox                            
                            var txtnumb = new my.controls.ctlNumber("");
                            //txtnumb.css = new my.css.formControl(txtnumb.element);

                            ctl = txtnumb;
                        }
                        break;
                    case "string":

                        if ((fItemCfg.type == "label") || (this.readOnly)) {
                            var lblSpan: my.controls.ctlSpan = new my.controls.ctlSpan("");
                            lblSpan.element.classList.add("ronly");
                            ctl = lblSpan;
                        }
                        else if (fItemCfg.type == "textarea") {
                            var txt = new my.controls.ctlTextArea("");
                            //txt.css = new my.css.formControl(txt.element);

                            ctl = txt;
                        }
                        else { // textbox                            
                            var txta = new my.controls.ctlText("");
                            //txta.css = new my.css.formControl(txta.element);

                            if (fItemCfg.type == "number") {
                                txta.allowedChars = "0123456789.";
                            }

                            ctl = txta;
                        }
                        break;

                    case "list":

                        if ((fItemCfg.type == "label") || (this.readOnly)) {
                            var lblSpan: my.controls.ctlSpan = new my.controls.ctlSpan("");
                            lblSpan.element.classList.add("ronly");
                            ctl = lblSpan;
                        }
                        else if (fItemCfg.type == "autocomplete") {
                            var ac: my.controls.ctlAutocomplete = new my.controls.ctlAutocomplete("");
                            //add here ac.keyColumn ac.labelColumn if diferent than UID and Name wil be used 

                            // no binding here - most cases we do not have the data when form is generated anyway
                            //ac.data = this.parentForm.dataSet.getTable(fItemCfg.dataTable);
                            ac.ctlTrigger.css = new my.css.formControl(ac.ctlTrigger.element);

                            ctl = ac;

                        }
                        else { // dropdown
                            var dd: my.controls.ctlDropDown = new my.controls.ctlDropDown("");
                            if (fItemCfg.isMandatory == false) {
                                dd.addNone = true;
                            }

                            //the is the join of two dropdowns if it works
                            if (fItemCfg.linkedDataColumn) {
                                var el = this.getFormItem(fItemCfg.linkedDataColumn);
                                if (el) {
                                    dd.parentDropdown = <my.controls.ctlDropDown>el.itemControl;
                                    dd.parentFilterColumn = fItemCfg.linkedFilterColumn;
                                }

                            }
                            ctl = dd;
                        }




                        break;


                    case "boolean":
                        ctl = new my.controls.ctlCheckBox("", false)
                        if ((fItemCfg.type == "label") || (this.readOnly)) {
                            ctl.readOnly = true;
                        }
                        //ctl.css = new my.css.formControl(ctl.element); no special css behavior for this
                        break;

                    case "datetime":
                    case "date":
                        if ((fItemCfg.type == "label") || (this.readOnly)) {
                            var lblSpan: my.controls.ctlSpan = new my.controls.ctlSpan("");
                            lblSpan.element.classList.add("ronly");
                            ctl = lblSpan;
                        }
                        else {
                            var ddate: my.calendar.calendarDropDown = new my.calendar.calendarDropDown("");
                            ctl = ddate;
                        }

                        break;
                    default:
                        var lblSpan: my.controls.ctlSpan = new my.controls.ctlSpan("");
                        lblSpan.element.classList.add("ronly");
                        ctl = lblSpan;
                        fItemCfg.type = my.config.type.label; // reset the type
                }


                this.addFormItem(ctl, fItemCfg);
            };

            addFormItem(el: my.controls.iControl, cfg: my.forms.FrmItemCfg) {
                if (cfg.isHidden) {
                    el = undefined;
                }
                this._applyCtlOptions(el, cfg.ctlOptions);
                var fi: fItem = new fItem(el, this.parentForm);

                if (cfg.isHidden == false) {
                    //Properties valid only when control is not hidden
                    fi.label = cfg.label;
                } else {
                    fi.validation = undefined;
                }

                fi.type = cfg.type;
                fi.dataColumn = cfg.dataColumn;
                fi.dataType = cfg.dataType;
                fi.dataTable = cfg.dataTable;
                //fi.options = cfg.options;
                fi.defaultValue = cfg.defaultValue;

                if (this.parentForm.options.itemsize) {  // set form config if exist
                    fi.css.size = this.parentForm.options.itemsize;
                }
                if (cfg.size) { // set item config if exist
                    fi.css.size = cfg.size;
                }

                fi.visibleInInsertMode = cfg.visibleInInsertMode;
                fi.visibleInEditMode = cfg.visibleInEditMode;
                fi.isHidden = cfg.isHidden;
                fi.isMandatory = cfg.isMandatory;

                this.addItem(fi);
            }

            getFormItem(dataColumn: string): fItem {
                var f: fItem;

                this.parentForm.Groups.forEach((itmG: fGroup, idx) => {
                    itmG.items.forEach((itm: fItem, i) => {
                        if (itm.dataColumn == dataColumn) {
                            f = itm;
                        }
                    });
                });

                return f;
            }





        } // end class fGroup



        export class fItem extends my.core.form.frmItem {




            constructor(ctrl: my.controls.iControl, parent: my.forms.iForm) {
                super(ctrl, parent);
            }

        } // end class fItem



        export class fOptions extends my.core.form.frmOptions {


            itemsize: string;
        }; // end  class fOptions



    }; // end form
}; //end my