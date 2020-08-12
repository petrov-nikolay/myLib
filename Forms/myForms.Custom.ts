/// <reference path="../myControls.ts" />
/// <reference path="../Data/myData.ts" />
/// <reference path="Form.ts" />
/// <reference path="myForms.Config.ts" />




namespace my {

    export namespace forms {





        export class Custom extends my.core.form.core implements iForm {
            ctlType: string = "forms.Custom";

            Groups: Array<my.forms.fGroup> = []; // not used here just for inteface compatibiliity
            options: my.forms.fOptions;


            items: Array<fItem>;


            constructor(dataSet: my.data.iDataSet) {
                super();

                this.dataSet = dataSet;
                this.items = [];
                var g = new my.forms.fGroup("", this);
                g.items = this.items;
                this.Groups.push(g);
            }


            rebind() {

                var self = this;
                this.items.forEach((itm: fItem, idx) => {
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



            createControl(label: string, column: string, dataType: my.config.dataType, type: my.config.type): fItem {
                var ctl: my.controls.iControl;


                var lblSpan: my.controls.ctlSpan = new my.controls.ctlSpan("");
                lblSpan.element.classList.add("ronly");

                switch (dataType) {
                    case "number":
                        if ((type == "label") || (this.readOnly)) {
                            ctl = lblSpan;
                        }
                        else { // textbox                            
                            var txtnumb = new my.controls.ctlNumber("");
                            //txtnumb.css = new my.css.formControl(txtnumb.element);

                            ctl = txtnumb;
                        }
                        break;
                    case "string":

                        if ((type == "label") || (this.readOnly)) {
                            ctl = lblSpan;
                        }
                        else if (type == "textarea") {
                            var txt = new my.controls.ctlTextArea("");
                            ctl = txt;
                        }
                        else { // textbox                            
                            var txta = new my.controls.ctlText("");
                            if (type == "number") {
                                txta.allowedChars = "0123456789.";
                            }

                            ctl = txta;
                        }
                        break;

                    case "list":

                        if ((type == "label") || (this.readOnly)) {
                            ctl = lblSpan;
                        }
                        else if (type == "autocomplete") {
                            var ac: my.controls.ctlAutocomplete = new my.controls.ctlAutocomplete("");
                            //add here ac.keyColumn ac.labelColumn if diferent than UID and Name wil be used 

                            // no binding here - most cases we do not have the data when form is generated anyway
                            //ac.data = this.parentForm.dataSet.getTable(dataTable);
                            ac.ctlTrigger.css = new my.css.formControl(ac.ctlTrigger.element);

                            ctl = ac;

                        }
                        else { // dropdown
                            var dd: my.controls.ctlDropDown = new my.controls.ctlDropDown("");

                            ctl = dd;
                        }


                        break;


                    case "boolean":
                        ctl = new my.controls.ctlCheckBox("", false)
                        if ((type == "label") || (this.readOnly)) {
                            ctl.readOnly = true;
                        }
                        //ctl.css = new my.css.formControl(ctl.element); no special css behavior for this
                        break;

                    case "datetime":
                    case "date":
                        if ((type == "label") || (this.readOnly)) {
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
                    //type = "label"; // reset the type

                } // end switch


                var fi = new fItem(ctl, this);
                fi.dataType = dataType;
                fi.label = label;
                fi.dataColumn = column;
                this.items.push(fi);
                return fi;
            }




            validate(): boolean {
                return true;
            }

            save(onSucess: Function) {
                // run validation from parent
                if (this.validate()) {
                    //validation success
                    // var d = this.dataRow.getAsObject();
                    // //reformat the objectto contain table name
                    // var jsonTable = {};
                    // var _arr: Array<Object> = [];
                    // _arr.push(d);
                    // jsonTable[this.DataTableName] = _arr;

                    //fix me
                    this.dataSet.sendData(this.dataRow, () => {
                        // run code on success
                        onSucess();
                    });
                } else {
                    //validation failed

                }
            } // end save




        }; // end  class Custom







    }; // end form
}; //end my