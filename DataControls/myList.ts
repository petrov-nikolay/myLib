/// <reference path="../Core/Controls.ts" />

namespace my {

    export namespace core {

        export namespace controls {

            export class EventsList extends my.core.controls.Events {
                itemClick: my.core.events.core;
                constructor(eventTarget: my.controls.iControl) {
                    super(eventTarget);
                    this.itemClick = new my.core.events.core("itemClick");
                }
            }




            export abstract class List extends my.core.controls.coreData {
                ctlType: string = "coreList";
                element: HTMLUListElement;

                readOnly: boolean = false; // irrelevant in this element
                reset: Function; // irrelevant in this element
                // not used here
                disabled: boolean = false; // irrelevant in this element

                //  value in this context is the selected item
                get _value(): string { return this.selectedItem.itemData[this.keyColumn]; }

                keyColumn: string;
                labelColumn: string;

                private _selectedItem: ListItem;
                get selectedItem(): ListItem {
                    return this._selectedItem;
                }
                set selectedItem(val: ListItem) {
                    if (val == undefined) {
                        this._selectedItem = undefined;
                        return;
                    }
                    if (this._selectedItem) {
                        //we have selected something need to remove the selection before adding new
                        this._selectedItem.element.classList.remove("selected");
                    }
                    this._selectedItem = val;
                    this._selectedItem.element.classList.add("selected");

                }

                items: ListItem[] = [];

                events: EventsList;

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

                constructor(keyColumn: string, labelColumn: string, data: my.data.DataTable = undefined) {
                    super('ul');

                    this.keyColumn = keyColumn;
                    this.labelColumn = labelColumn;


                    if (data) {
                        this.data = data;
                    }

                    this.events = new EventsList(this);
                };




            } // end class List


            export abstract class ListItem extends my.core.controls.core {
                ctlType: string = "coreListItem";
                element: HTMLUListElement;
                readOnly: boolean = false; // irrelevant in this element
                reset: Function; // irrelevant in this element
                // not used here
                disabled: boolean = false; // irrelevant in this element

                uid: string;
                get _value(): string {
                    return this.uid;
                }
                set _value(val: string) {
                    this.uid = val;
                }
                onValueChange(sender: any, event: any, data: any) {
                    this.value = sender.value;
                }



                //private _text: my.data.binding.ReadOnlyBind;
                set text(val: string) {
                    this.element.innerText = val;
                }
                get text(): string {
                    return this.element.innerText;
                }


                // not shure is working need to implement templating at some point
                set itemTemplate(itmTempleate: my.controls.iControl) {
                    if (itmTempleate) {
                        this.element.innerHTML = '';
                        this.element.appendChild(itmTempleate.element);
                    }
                }; //  represent the item containing the vale of the <LI>


                constructor(uid: string, text: string) { //, itemTemplate: HTMLElement = undefined) {
                    super('li');

                    this.uid = uid;
                    this.text = text;
                }; //  end constructor


            }; //  end class ListItem


        } // namespace controls

    } // end namespace core

    export namespace controls {





        export class ctlList extends my.core.controls.List {
            ctlType: string = "ctlList";

            itemPostProcesing: (li: my.controls.ctlListItem) => any;

            itemTemplate: iTemplateFunction;

            title: string;

            constructor(keyColumn: string, labelColumn: string, data: my.data.DataTable = undefined) {
                super(keyColumn, labelColumn, data);
                this.css = new css.List(this.element);
            };

            private _createItems(): void {
                this.items = [];
                this.element.innerHTML = ''; // clear the items before start adding new
                var self = this;
                var li: ctlListItem;


                if (this.title != undefined) {
                    li = new ctlListItem("", this.title);
                    li.element.classList.add("title");
                    self.element.appendChild(li.element);
                }

                if (this.data) {
                    // [].forEach because the TS is compiled to ES5 and not ES6 - changed
                    this.data.rows.forEach((item: my.data.DataRow, idx) => {
                        if (item.__bindVisible) {
                            this._addItem(item);
                        }
                    });
                } else {

                    console.log('ctlList.createItems: no data');

                }

            };


            private _addItem(dRow: my.data.iDataRow) {
                var li: ctlListItem;
                var key: string;
                //check if we have valid data
                if (dRow.items[this.labelColumn] == undefined) {
                    console.log("missing data for labelColumn");
                }

                if (dRow.items[this.keyColumn]) { // add key if we have it - not important if we don't
                    key = dRow.items[this.keyColumn].value;
                }

                li = new ctlListItem(key, dRow.items[this.labelColumn].value);

                if (this.itemTemplate) {
                    li.itemTemplate = this.itemTemplate(self, dRow);
                }
                if (this.itemPostProcesing) {
                    this.itemPostProcesing(li);
                }

                li.events.click.subscribe(this, this.onItemClick.bind(this));
                li.itemData = dRow;
                this.items.push(li);
                this.element.appendChild(li.element);
            }



            // definetly need fixing
            filterBy(column: string, value: string) {

                this.items.forEach((item: ctlListItem, idx: number) => {
                    if (value == "") {
                        item.visible = true;
                        return;
                    }
                    var row: my.data.iDataRow = <my.data.iDataRow>item.itemData;
                    if (row.itemsArray.findIndex(x => x.Name == column) != -1) {
                        var strFindIn: string = (<my.data.binding.Observable>row.items[column]).value + ""; // first value is Observable  so second to get the string value
                            if (strFindIn.toLowerCase().includes(value.toLowerCase())) {
                                item.visible = true;
                                console.log("ListItem true");
                            } else {
                                item.visible = false;
                                console.log("ListItem false");
                            }
                        }
                });
            };

            resetListItemDisplay() {
                this.items.forEach((item: ctlListItem, idx: number) => {
                    item.visible = true;
                });
            }

            //// real function to handle item click and if someone lisens to push it to them
            private onItemClick(sender: ctlListItem, e, data) {

                this.selectedItem = sender;
                this.events.itemClick.dispatch(this, sender.itemData);
                //    this.UpdateBinding(data.uid);
                //    if (this.onItemClickHandler) {
                //        this.onItemClickHandler(sender, e, data);
                //    }
            };

            rebind(): void { this._createItems(); };



        }; // end ctlList



        export class ctlListItem extends my.core.controls.ListItem {
            ctlType: string = "ctlListItem";


            // not shure is working need to implement templating at some point
            set itemTemplate(itmTempleate: my.controls.iControl) {
                if (itmTempleate) {
                    this.element.innerHTML = '';
                    this.element.appendChild(itmTempleate.element);
                }
            }; //  represent the item containing the vale of the <LI>


            constructor(uid: string, text: string) { //, itemTemplate: HTMLElement = undefined) {
                super(uid, text);


                this.css = new css.ListItem(this.element);

                //this.text = new my.data.binding.ReadOnlyBind(this.element, "innerText", undefined);
                this.text = text;
            }; //  end constructor


        }; //  end class ctlListItem









    } // END NAMESPACE CONTROLS


}// END NAMESPACE MY