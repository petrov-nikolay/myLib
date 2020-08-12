/// <reference path="../Core/Controls.ts" />

namespace my {

    export namespace core {

        export namespace controls {

            export class EventsDataView extends my.core.controls.Events {
                itemClick: my.core.events.core;
                constructor(eventTarget: my.controls.iControl) {
                    super(eventTarget);
                    this.itemClick = new my.core.events.core("itemClick");
                }
            }




            export abstract class DataView extends my.core.controls.coreData {
                ctlType: string = "coreDataView";
                element: HTMLDivElement;

                readOnly: boolean = false; // irrelevant in this element
                reset: Function; // irrelevant in this element
                // not used here
                disabled: boolean = false; // irrelevant in this element

                //  value in this context is the selected item
                //get _value(): string { return this.selectedItem.itemData[this.keyColumn]; }



                set dataRow(val: my.data.DataRow) {
                    this.element.innerHTML = "";
                    this.renderTemplate(val);
                }

                dsDataTable: string;
                private _dsRowUID: string;
                get dsRowUID(): string {
                    return this._dsRowUID;
                }
                set dsRowUID(val: string) {
                    this._dsRowUID = val;
                    this.rebind();
                }
                set dsData(val: my.data.DataSet) {
                    if (val == undefined) {
                        console.log("ERROR!: dataset is undefined");
                        return;
                    }
                    // if we will be calling the data after property set
                    val.events.Loaded.subscribe(this, (s, e, d) => {
                        if (this.dsDataTable) {
                            this.data = val.getTable(this.dsDataTable);
                        } else {
                            this.data = val.getTable();
                        }
                    });

                    // if data already exists 
                    if (val.data != {}) {
                        if (this.dsDataTable) {
                            this.data = val.getTable(this.dsDataTable);
                        } else {
                            this.data = val.getTable();
                        }
                    }


                }


                events: EventsDataView;
                Template: string;


                constructor(sTemplate: string = "") {
                    super('div');
                    this.Template = sTemplate;



                    this.events = new EventsDataView(this);
                };


                rebind() {
                    this.element.innerHTML = "";
                    if (this.data == undefined) {
                        console.log("data is empty");
                        return;
                    }


                    // will support sigle row for now, will use multyrow later
                    if (this.dsRowUID) {
                        var d = this.data.findFirst("UID", this.dsRowUID);
                        this.renderTemplate(d);
                    }

                    // NEED TO IMPLEMENT SOME CONTROL HERE TO HANDLE DATASETS WITHOUT UID
                    // PROBLEM IS IF WE USE THIS AND WE DO NOT HAVE THE UID YET 
                    // else {
                    //     this.data.oArray.forEach((itm: my.data.DataRow, idx) => {
                    //         this.renderTemplate(itm);
                    //     });
                    // }

                }


                renderTemplate(dataRow: my.data.DataRow) {
                    var str: string = this.Template.toString();
                    dataRow.itemsArray.forEach((itm: my.data.DataColumn, idx) => {
                        var f = "[[" + itm.Name + "]]";
                        var r = "";
                        if (itm.Data.value) {
                            r = itm.Data.value.toString();
                        }
                        str = str.replace(f, r);
                    });
                    this.element.innerHTML = this.element.innerHTML + str;
                }



            } // end class DataView


        } // namespace controls
    } // end namespace core



    export namespace controls {

        export class ctlDataView extends my.core.controls.DataView {
            ctlType: string = "ctlDataView";

            constructor(sTemplate: string = "") {
                super(sTemplate);
                //this.css = new css.List(this.element);
            };

        }; // end ctlDataView


    } // END NAMESPACE CONTROLS
}// END NAMESPACE MY