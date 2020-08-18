/// <reference path="../Core/Controls.ts" />

namespace my {
    export namespace core {


        export namespace form {

            export abstract class core extends my.core.controls.core {
                ctlType: string = "forms.Core";
                element: HTMLDivElement;
                readOnly: boolean = false; //not used here
                // not used here
                reset: Function = this._resetForm;
                disabled: boolean = false;
                Groups: Array<frmGroup> = [];


                private _mode: "insert" | "edit" = "edit";
                get mode(): "insert" | "edit" {
                    return this._mode;
                }
                set mode(val: "insert" | "edit") {
                    this._mode = val;
                    if (val == "insert") {
                        this.dataRowUID = "NEW";
                    }
                }

                private _dataSet: my.data.iDataSet;
                get dataSet(): my.data.iDataSet {
                    return this._dataSet;
                }
                set dataSet(val: my.data.iDataSet) {
                    this._dataSet = val;
                    if (val) {
                        this._dataSet.events.Loaded.subscribe(this, this._rebind.bind(this));
                    }
                    //this._updateDataRow();
                }

                private _currentDataRowUID: string;
                private _currentDataRow: my.data.iDataRow;
                get dataRow(): my.data.iDataRow {

                    if (this._currentDataRowUID != this.dataRowUID) {
                        this._currentDataRow = this._getDataRow();
                        console.log("Form.dataRow().called");
                    }
                    if (this._currentDataRow == undefined) {
                        this._currentDataRow = this._getDataRow();
                    }

                    return this._currentDataRow;
                }

                dataRowUID: string;
                // get dataRowUID(): string {
                //     return this._dataRowUID;
                // }
                // set dataRowUID(val: string) {
                //     this._dataRowUID = val;

                // }

                private _DataTableName: string;
                get DataTableName(): string {
                    if (this._DataTableName == undefined) {
                        //need this so we have table name when we push data to server
                        this._DataTableName = this.dataSet.primaryTable;
                    }
                    return this._DataTableName;
                }
                set DataTableName(val: string) {
                    this._DataTableName = val;
                    //this.dataSet.primaryTable = val;
                }

                events: my.core.form.EventsForm;

                options: frmOptions;

                constructor() {
                    super("div");
                    this.options = new frmOptions();
                    this.css = new my.css.form(this.element);
                }




                validate(): boolean {
                    // do form validation here
                    var bRet: boolean = true;
                    this.Groups.forEach((itm: frmGroup, idx) => {
                        if (!itm.isValid()) {
                            // if one group is invalid all is invalid
                            bRet = false;
                        }
                    });

                    //apply general rules if any
                    if ((bRet) && (this.validation.rules.length > 0)) {
                        this.validation.rules.forEach((itm, idx) => {
                            if (itm.validate(this.Groups) == false) {
                                bRet = false;
                            }
                        });
                    }

                    return bRet;
                }

                private _resetForm(): void {
                    var self = this;

                    self.Groups.forEach(function (block: frmGroup, idx) {
                        block.items.forEach(function (blockItem: frmItem, idx) {
                            //blockItem.value = undefined;
                            blockItem.itemControl.reset();
                        });
                    });

                }

                private _getGroupByName(val: string): frmGroup {
                    var ret: frmGroup;
                    this.Groups.forEach((item: frmGroup, idx) => {
                        if ((item.name = val)) {
                            ret = item;
                        }
                    });
                    return ret;
                }

                getFitemByColumn(val: string): frmItem {
                    var ret: frmItem;
                    this.Groups.forEach((fgrup: frmGroup, idx) => {
                        var fi = fgrup.getFitemByColumn(val);
                        if (fi != undefined) {
                            ret = fi;
                        }
                    });

                    return ret;
                }

                private _rebind() {
                    this._updateDataRow();
                    this.rebind();
                }
                abstract rebind();

                //function called on event and when datarowUID is changed
                private _updateDataRow() {
                    this._currentDataRow = undefined;

                }


                private _getDataRow(): my.data.DataRow {
                    var ret: my.data.DataRow;
                    var ds: my.data.DataTable = this.dataSet.tables[this.DataTableName];

                    if (ds && this.dataRowUID) {
                        if (this.dataRowUID != "NEW") {
                            ret = ds.findFirst("UID", this.dataRowUID); // update the datarow here so we don't filter constantly
                        } else {
                            ret = this.getEmptyFormData();
                        }
                    } else if (ds && this.dataRowUID == undefined) {
                        ret = ds.value[0];
                    }
                    this._currentDataRowUID = this.dataRowUID;
                    return ret;
                }


                getEmptyFormData(): my.data.DataRow {
                    var self = this;
                    var fObj: Object = this._getBlankForm();
                    var dObj: Object = {};

                    var dt: my.data.DataTable = this.dataSet.getTable();
                    if (dt) {

                        dt.columns.forEach((col: my.data.DataColumn, idx) => {
                            if (fObj.hasOwnProperty(col.Name) == false) {
                                fObj[col.Name] = undefined;
                            }
                        });

                    }

                    var row = new my.data.DataRow(fObj, this.DataTableName);
                    row.setAdded(); // mark row so when sending it can recognize what to do
                    return row;
                }


                private _getBlankForm(): Object {
                    var aObj: Object = {};
                    this.Groups.forEach((gr: frmGroup, idx) => {
                        gr.items.forEach((itm: frmItem, idx) => {
                            if (itm.defaultValue) {
                                aObj[itm.dataColumn] = itm.defaultValue;
                            } else if (itm.type == "checkbox") {
                                aObj[itm.dataColumn] = 0;
                            }
                            else {
                                //if (itm.isMandatory) {
                                aObj[itm.dataColumn] = null;
                                //}
                            }

                        });
                    });
                    return aObj;
                }



            } // end class forms core



            export abstract class frmGroup extends my.core.controls.core {
                ctlType: string = "frmGroup";
                element: HTMLLabelElement;
                readOnly: boolean = false; // irrelevant in this element
                reset: Function; // irrelevant in this element
                update() { } // update html component in this function if needed  // not used here
                disabled: boolean = false; // irrelevant in this element

                name: string;
                value: string = "";

                items: Array<frmItem> = [];
                //parentForm: my.forms.iForm;

                constructor(name: string) {  //, parentForm: my.forms.iForm) {
                    super("div");
                    this.name = name;
                    //this.parentForm = parentForm;
                    this.css = new my.css.formGroup(this.element);
                }

                addItem(item: frmItem) {
                    this.items.push(item);
                    if (item.isHidden == false) {
                        this.element.appendChild(item.element);
                    }
                }

                isValid(): boolean {
                    var bRet: boolean = true;

                    this.items.forEach((itm: frmItem, idx) => {
                        if (itm.type != "label") {
                            if (!itm.isValid) {
                                //if one item is invalid all are invalid
                                bRet = false;
                            }
                        }
                    });

                    return bRet;
                }


                getFitemByColumn(val: string): frmItem {
                    var ret: frmItem;
                    this.items.forEach((item: frmItem, idx) => {
                        if (item.dataColumn == val) {
                            ret = item;
                        }
                    });

                    return ret;
                }
            } // end frmGroup

            export abstract class frmItem extends my.core.controls.core {
                ctlType: string = "frmItem";
                element: HTMLDivElement;
                ctlPlaceHolder: HTMLDivElement;
                ctlValidationErrorPlaceHolder: HTMLDivElement;

                private _r: boolean = false;
                get readOnly(): boolean {
                    return this._r;
                }
                set readOnly(val: boolean) {
                    this._r = val;
                    if (val) {
                        if ((this.itemControl) && (this.itemControl.ctlType != "ctlDivListItem")) {   // TO DO: add something else to prevent Read Only mode for form items
                            var lblSpan: my.controls.ctlSpan = new my.controls.ctlSpan("");
                            lblSpan.css = new my.css.formControl(lblSpan.element);
                            this.itemControl = lblSpan;
                        }
                    }
                }
                reset: Function; // irrelevant in this element
                // not used here
                disabled: boolean = false; // irrelevant in this element

                parentForm: my.forms.iForm;

                private _itemControl: my.controls.iControl;
                get itemControl(): my.controls.iControl {
                    return this._itemControl;
                }
                set itemControl(val: my.controls.iControl) {
                    this._itemControl = val;
                    // val is undefined when form is generated with ISHIDDEN FLAG
                    if (this._itemControl) {
                        //subscribe for validation events here
                        this.ctlPlaceHolder.innerHTML = "";
                        this.ctlPlaceHolder.appendChild(this.itemControl.element);
                        // if (this._itemControl.validation) {
                        //     this._itemControl.events.valueValidated.subscribe(this, this.onValidationCheck.bind(this));
                        // }
                    }
                }


                dataType: my.config.dataType; //"string" | "number" | "decimal" | "boolean" | "datetime" | "date" | "list" | "custom" | "sum";
                type: my.config.type;// "text" | "textarea" | "number" | "checkbox" | "datetime" | "autocomplete" | "dropdown" | "label";
                dataTable: string;
                dataColumn: string;
                defaultValue: string;

                visibleInInsertMode: boolean = true;
                visibleInEditMode: boolean = true;
                private _isHidden: boolean = false;
                get isHidden(): boolean {
                    return this._isHidden;
                }
                set isHidden(val: boolean) {
                    this._isHidden = val;
                    if (val) {
                        this.element.style.visibility = "hidden";
                    } else {
                        this.element.style.visibility = "visible";
                    }
                }
                private _isMandatory: boolean = true;
                get isMandatory(): boolean {
                    return this._isMandatory;
                }
                set isMandatory(val: boolean) {
                    this._isMandatory = val;
                    if ((this.itemControl) && (this.itemControl.validation)) {
                        // not all controls have validation

                        if (val) {
                            this.itemControl.validation.add("required");
                        } else {
                            var i = this.itemControl.validation.getByType("required");
                            this.itemControl.validation.remove(i);
                        }
                    }
                }

                private _label: my.controls.ctlLabel;
                get label(): string {
                    return this._label._value;
                }
                set label(val: string) {
                    //if we don't have a label we create it here
                    if (val == undefined) { return; }
                    if (this._label) {
                        this._label.value = val;
                    } else {
                        this._label = new my.controls.ctlLabel(val, this.itemControl.id);
                        this.element.insertBefore(this._label.element, this.ctlPlaceHolder);
                    }
                }

                private _labelLocation: "left" | "top" = "top";
                get labelLocation(): "left" | "top" {
                    return this._labelLocation;
                }
                set labelLocation(val: "left" | "top") {
                    this._labelLocation = val;
                    if (val == "left") {
                        this.element.classList.add("lblLeft");
                    } else {
                        this.element.classList.remove("lblLeft");
                    }

                }


                constructor(itemControl: my.controls.iControl, parentForm: my.forms.iForm) {
                    super("div");
                    this.parentForm = parentForm;
                    this.css = new my.css.formItem(this.element);
                    this.ctlPlaceHolder = document.createElement("div");
                    this.ctlPlaceHolder.classList.add("fCtl");
                    this.element.appendChild(this.ctlPlaceHolder);
                    this.ctlValidationErrorPlaceHolder = document.createElement("div");

                    this.element.appendChild(this.ctlValidationErrorPlaceHolder);
                    this.itemControl = itemControl;

                    this._applyOptions();
                }


                private _applyOptions() {
                    if (this.parentForm.options.labelLocation == "left") {
                        this.labelLocation = "left";
                    } else {
                        this.labelLocation = "top";
                    }
                }

                bind(ds: my.data.iDataSet) {
                    //this._applyOptions(); this will ovverride manual setup or just unnecesery ess with elements constantly
                    var row = this.parentForm.dataRow;

                    if ((row) && (row.items)) {
                        // all good now update the values
                        if (row.items.hasOwnProperty(this.dataColumn)) {
                            var observableValue = row.items[this.dataColumn];
                            if (observableValue)
                                this._bindFormControls(observableValue, ds);
                        } else {
                            console.log("Form.Item.Bind: Can't find " + this.dataColumn + " in the datatable.row(0)!");
                        }
                    } else {
                        console.log("this.parentForm.dataRow is undefined");
                    }
                }

                private _bindFormControls(ctrlData: my.data.binding.Observable | my.data.binding.ComputedObservable, ds: my.data.iDataSet) {
                    if (this.isHidden) { return; }  //don't bind hidden elements to avoid validation issues


                    if ((this.dataType == "list") && (this.readOnly)) {
                        var itm: my.data.DataRow;
                        if (ctrlData.value) {
                            //get the table for the dropdon then get the item matching the current UID  (like GroupUID, ReasonUID etc.)
                            itm = ds.tables[this.dataTable].findFirst("UID", ctrlData.value.toString());
                        }

                        if (itm) {
                            this.itemControl.value = itm["Name"].value;
                        } else {
                            //sRet = "NEED DATA FOR LINKING HERE";
                        }
                    } else {

                        this.itemControl.value = ctrlData;
                    }


                    if (
                        this.itemControl instanceof my.controls.ctlAutocomplete ||
                        this.itemControl instanceof my.controls.ctlDropDown
                    ) {
                        this.itemControl.data = ds.tables[this.dataTable];
                    }


                }

                get isValid(): boolean {
                    var bRet: boolean = true;

                    if ((this.itemControl) && (this.itemControl.validation)) {
                        bRet = this.itemControl.validation.validate(this.itemControl.value);

                        //this.updateValidationStatus(this.itemControl.validation.isValid, this.itemControl.validation.errorText);
                    }
                    return bRet;
                }


                updateValidationStatus(val: Boolean, errText: string) {
                    if (val) {
                        this.element.classList.remove("error");
                        this.ctlValidationErrorPlaceHolder.innerHTML = "";
                    } else {
                        this.element.classList.add("error");
                        this._addErrorIcon(errText);
                    }
                }

                private _addErrorIcon(errText: string) {
                    var ico: my.controls.ctlIcon = new my.controls.ctlIcon("error");
                    this.ctlValidationErrorPlaceHolder.innerHTML = "";
                    this.ctlValidationErrorPlaceHolder.appendChild(ico.element);
                    var top = this.itemControl.element.offsetTop + (this.itemControl.element.offsetHeight - ico.element.offsetHeight) / 2;
                    ico.element.style.top = top + "px";
                    ico.tooltip = errText;

                }
            } // end frmElement

            export class EventsForm extends my.core.controls.Events {
                itemClick: my.core.events.core;
                submitClick: my.core.events.core;
                clearClick: my.core.events.core;

                constructor(eventTarget: my.controls.iControl) {
                    super(eventTarget);
                    this.itemClick = new my.core.events.core("itemClick");
                    this.submitClick = new my.core.events.core("submitClick");
                    this.clearClick = new my.core.events.core("clearClick");
                }
            } //end class EventsForm

            export class frmOptions {

                Attributes: { name: string, value: string }[] = []; // all values from here set to form container true the 'setAttribute'
                labelLocation: "left" | "top"; // left/top of the edit element
                minColWidth: number = 50; //min col width in pixels
                OptionalMark: string;  //text to show when element in form is optional
                OptionalMarkVisible: boolean = false;
                RequiredMark: string = '*';  //text to show when element in form is required
                RequiredMarkVisible: boolean = true;

            }; // end  class fOptions

        } // end namespace form



    } //end namespace core
} //end namespace my
