/// <reference path="myList.ts" />


namespace my {

    export namespace core {

        export namespace controls {


            export abstract class DropDown extends my.core.controls.coreData {
                ctlType: string = "ctlDropDownCore";
                element: HTMLInputElement;
                readOnly: boolean = false; //not used here
                reset: Function = this._reset;
                defaultText: string = "Please Select";

                dsDataTable: string;
                private _dsData: my.data.DataSet;
                get dsData(): my.data.DataSet {
                    return this._dsData;
                }
                set dsData(val: my.data.DataSet) {
                    this._dsData = val;
                    val.events.Loaded.subscribe(this, (s, e, d) => {
                        if (this.dsDataTable) {
                            this.data = val.getTable(this.dsDataTable);
                        } else {
                            this.data = val.getTable();
                        }

                    });
                }

                addNone: boolean = false;

                elementErrorPH: HTMLElement;

                get disabled(): boolean { return this.element.disabled; }
                set disabled(val: boolean) {
                    this.element.disabled = val;
                    this.ctlTrigger.disabled = val;
                }

                private _keyColumn: string = "UID";
                get keyColumn(): string {
                    return this._keyColumn;
                }
                set keyColumn(val: string) {
                    this._keyColumn = val;
                    this.ctlList.keyColumn = val;
                }
                private _labelColumn: string = "Name";
                get labelColumn(): string {
                    return this._labelColumn;
                }
                set labelColumn(val: string) {
                    this._labelColumn = val;
                    this.ctlList.labelColumn = val;
                }
                parentFilterColumn: string; // must set if we have a parent

                private _parentDropdown: DropDown;
                get parentDropdown(): DropDown { return this._parentDropdown; }
                set parentDropdown(val: DropDown) {
                    if (val) {
                        //test
                        this._parentDropdown = val;
                        // need to replace with event
                        var self = this;

                        //this._parentDropdown.events.on.ValueHasChanged((val) => {
                        this._parentDropdown.events.change.subscribe(this, (s, e, d) => {
                            self.rebind();
                        });

                    }
                }



                ctlTrigger: my.controls.iControl; // the elment trigering the selection show
                ctlList: my.controls.ctlList; // the element that shows the selection
                items: my.controls.ctlListItem[] = [];

                selectedItem: my.controls.ctlListItem;

                get valueText(): string {
                    var ret = "";

                    if (this.data) {
                        var row = this.data.findFirst(this.keyColumn, this.value.toString());
                        if (row) {
                            ret = row.items[this.labelColumn].value;
                        }
                    }

                    return ret;
                }


                //autocomplete specifics
                autocompleteThreshold: number = 3;

                constructor(value: string) {
                    super('div');
                    this.elementErrorPH = document.createElement('div');
                    this.element.appendChild(this.elementErrorPH);

                    this.css = new my.css.DropDown(this.element);
                    //var self: ctlDropDown = this;
                    this.value = value;



                    //init the list
                    this.ctlList = new my.controls.ctlList(this.keyColumn, this.labelColumn);
                    // set custom CSS for the dropdon list
                    this.ctlList.css = new my.css.DropDownList(this.ctlList.element);
                    // set custom CSS for the dropdon list Items
                    this.ctlList.itemPostProcesing = (li: my.controls.ctlListItem) => { li.css = new my.css.DropDownListItem(li.element); }
                    this.ctlList.events.itemClick.subscribe(this, this.onlistItemClick.bind(this));


                    // add triger and list in the dropdown container
                    // this.element.appendChild(this.ctlTrigger.element);
                    this.element.appendChild(this.ctlList.element);

                    this.events.valueValidated.subscribe(this, this._onValueValidated.bind(this));
                }


                private _onValueValidated(s, e, d) {
                    if (this.validation.isValid) {
                        this.elementErrorPH.innerHTML = "";
                        this.element.classList.remove("error");
                    } else {
                        var ico: my.controls.ctlIcon = new my.controls.ctlIcon("error");
                        this.elementErrorPH.innerHTML = "";
                        this.elementErrorPH.appendChild(ico.element);
                        //var top = this.element.offsetTop + (this.element.offsetHeight - ico.element.offsetHeight) / 2;
                        //ico.element.style.top = top + "px";
                        ico.tooltip = this.validation.errorText;
                        this.element.classList.add("error");
                    }
                }

                abstract onAfterRebind();

                rebind() {

                    if (this.data == undefined) {
                        return; // do not rebind if we do not have any data
                    }

                    //this.ctlList.data = this.data;

                    if (this._parentDropdown) {
                        if (this._parentDropdown.value) {
                            this.disabled = false; // return the control back if disabled from previous calls in logic below
                            // we have a parent and need to filter by it's value
                            //this._filterBy(this.parentFilterColumn, this._parentDropdown.value.toString());
                            var fi = new my.data.Filter(this.parentFilterColumn, this._parentDropdown.value.toString());
                            this.data.filter = fi;
                            this.ctlList.data = this.data;
                        } else {
                            this.disabled = true; // if parent exist we do not change ths until parent have value
                        }
                    } else {
                        this.ctlList.data = this.data;
                    }

                    //update value in the text box
                    var itm: my.data.DataRow;
                    if ((this.value != undefined) && (this.value != "")) {
                        itm = this.data.findFirst(this.keyColumn, String(this.value));
                        if (itm) {
                            this.ctlTrigger.value = itm.items[this.labelColumn].value;
                        } else {
                            console.log("core.DropDown error rebainding: can't find " + this.value + " in the control data!");
                        }

                    }


                    if (this.addNone) {
                        var li: my.controls.ctlListItem = new my.controls.ctlListItem("NULL", "None");
                        this.ctlList.element.prepend(li.element);
                        li.events.click.subscribe(this, (s, e, d) => {
                            this.value = "NULL";
                            this.hideList(e);
                            this.ctlTrigger.value = "None";
                        });
                    }



                    if (this.onAfterRebind) {
                        this.onAfterRebind();
                    }

                }




                protected onlistItemClick(sender, e, row: my.data.iDataRow) {

                    // valu has updated - pased validation and other cheks inside 
                    if (this.value != row.items[this.keyColumn].value) {
                        this.value = row.items[this.keyColumn].value;
                        this.events.change.dispatch(this, this.value);
                    }
                    this.hideList(e);
                    this.ctlTrigger.value = row.items[this.labelColumn].value;
                };



                private closeEventHandle: any; // created only for the removeEventListener to keep the eventtt handler to be closed

                showList() {
                    if (this.closeEventHandle) { // prevent another lisener if second click on the button
                        return;
                    }

                    this.ctlList.css.add(this.css.currentTeheme.active); // add class active 

                    this.alignDropdownListPosition(this.ctlTrigger.element);
                    this.closeEventHandle = this.hideList.bind(this);
                    document.addEventListener('click', this.closeEventHandle, false);
                };


                hideList(e: any) {
                    if (!this.ctlTrigger.element.contains(e.target)) {

                        this.ctlList.css.remove(this.css.currentTeheme.active); //remove css class active

                        document.removeEventListener('click', this.closeEventHandle);
                        this.closeEventHandle = undefined;
                    }
                };


                private alignDropdownListPosition(htmlEl: HTMLElement): void {
                    // ADD HERE the rest of the positional calculations 
                    var topPos: number = htmlEl.offsetTop + htmlEl.offsetHeight;

                    if (this.ctlTrigger.ctlType == "ctlText") {
                        topPos = htmlEl.offsetTop + htmlEl.offsetHeight;
                    }


                    //check dropDown fit on page height when show bottom of triger control.
                    //if not fit draw on top triger control
                    var clientFormHeight = htmlEl.ownerDocument.body.clientHeight;
                    var trigerElTopPosition = tools.getElementPositionOnForm(htmlEl).top;
                    if (trigerElTopPosition + topPos + this.ctlList.element.clientHeight > clientFormHeight) {
                        topPos = -(5 + this.ctlList.element.offsetHeight);
                    }

                    this.ctlList.style.top = (topPos).toString() + 'px';
                    this.ctlList.style.left = htmlEl.offsetLeft.toString() + 'px';
                    this.ctlList.style.minWidth = htmlEl.offsetWidth.toString() + 'px';
                };

                private _reset() {
                    this._value = undefined;
                    this.ctlTrigger.value = this.defaultText;
                }


            }; //end ctlDropDownCore



        } // namespace controls

    } // end namespace core

    export namespace controls {




        // DropDown as Button
        export class ctlDropDown extends my.core.controls.DropDown {
            ctlType: string = "ctlDropDown";
            ctlTrigger: ctlButton;

            isOptional: boolean = false;

            constructor(value: string, defaultText = undefined) {
                super(value);
                var self = this;

                if (defaultText) {
                    this.defaultText = defaultText;
                }
                this.ctlTrigger = new ctlButton(this.defaultText, (sender, event, data) => {
                    self.showList();
                });

                this.element.appendChild(this.ctlTrigger.element);
                this.ctlList.events.dataChanged.subscribe(this, (s, e, d) => {
                    var el: my.controls.ctlListItem = new my.controls.ctlListItem("", "None");
                    this.ctlList.items.push(el);
                });
            };

            onAfterRebind() {
                if ((this.value == undefined) && (this.value == "")) {
                    // no data to rebind just set default text for the triger control
                    this.ctlTrigger.value = this.defaultText;
                }

            }

        }; // END ctlDropDown



        // DropDown as text box
        export class ctlAutocomplete extends my.core.controls.DropDown {
            ctlType: string = "ctlAutocomplete";
            ctlTrigger: ctlText;

            get maxlength(): number {
                return this.ctlTrigger.maxlength;
            }
            set maxlength(val: number) {
                this.ctlTrigger.maxlength = val;
            }

            btnClear: ctlIcon;

            constructor(value: string) {
                super(value);

                var self = this;
                this.ctlTrigger = new ctlText('');
                this.ctlTrigger.events.keyup.subscribe(this, this.onTriggerKeyUp.bind(this));
                this.ctlTrigger.events.focus.subscribe(this, this.onTriggerFocus.bind(this));
                this.ctlTrigger.isTwoWayBinding = false;

                this.ctlTrigger.placeholderText = "type here";

                this.btnClear = new ctlIcon(this.css.currentTeheme.icons.clear);
                this.btnClear.visible = false;
                this.btnClear.element.classList.add("ico-btn");
                this.btnClear.events.click.subscribe(this, this.onClear.bind(this));


                this.element.appendChild(this.ctlTrigger.element);
                this.element.appendChild(this.btnClear.element);
            };

            onAfterRebind() {


            }


            protected onTriggerKeyUp(sender: my.controls.iControl, e: my.events.iEvent, data: any): void {
                // this.ctlTrigger.elementText.placeholder = "";
                this.ctlList.filterBy("Name", this.ctlTrigger.value as string);
                if (this.ctlList.visible === false) {

                    this.showList();
                }

                if (this.ctlTrigger.text.length > 0) {
                    this.btnClear.visible = true;
                } else {
                    this.btnClear.visible = false;
                }
            }

            protected onTriggerFocus(sender: my.controls.iControl, e: my.events.iEvent, data: any): void {

                //console.log("ctlTrigger.onFocus");
                if (this.ctlList.visible === false) {

                    this.showList();
                }
            }

            protected onClear(sender: my.controls.iControl, e: my.events.iEvent, data: any): void {
                this.value = undefined;
                this.ctlTrigger.value = "";
                this.ctlTrigger.elementText.focus();
                this.btnClear.visible = false;
                this.ctlList.resetListItemDisplay();
            }


        }; // END ctlAutocomplete









    } // END NAMESPACE CONTROLS


}// END NAMESPACE MY