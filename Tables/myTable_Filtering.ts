/// <reference path="myTable_Standard.ts" />
/// <reference path="../myThemes.ts" />

namespace my {
    export namespace core {
        export namespace table {


            export class Filtering {

                public isClientFiltering: boolean = false;

                private table: my.table.iTable;
                _txtSearchBy: my.controls.ctlText;
                currentSearchBy: string;

                events: my.core.table.EventsFiltering;

                constructor(table: my.table.iTable) {
                    this.table = table;
                    this._addTitleSearch();
                    this.events = new my.core.table.EventsFiltering();

                }


                private _addTitleSearch() {
                    var ico: my.controls.ctlIcon = new my.controls.ctlIcon(my.theme.current.icons.search);
                    ico.events.click.subscribe(this, this._onSearch.bind(this));
                    ico.element.classList.add("ico-btn");

                    this._txtSearchBy = new my.controls.ctlText("");
                    //this._txtFilter.enableClear = true;
                    this._txtSearchBy.element.classList.add("search");
                    this._txtSearchBy.events.change.subscribe(this, this._onSearch.bind(this));

                    this._txtSearchBy.setIcon(ico);

                    // NOT GOING TO USE search by key press
                    // this._txtSearchBy.element.onkeyup = (e: KeyboardEvent) => {
                    //     if (this._txtSearchBy.text.length > 2) { // minimum 3 symbols to start searching
                    //         this._onSearch(0, 0, 0);
                    //     }
                    // }
                    this.table.tTitle.plhSearch.appendChild(this._txtSearchBy.element);
                    //this.table.tTitle.plhSearch.appendChild(ico.element);
                }


                private _onSearch(s, e, d) {
                    var searchColumns: string = "";
                    this.table.columns.forEach((itm, idx) => {
                        if (itm.dataType == "string") {
                            searchColumns = searchColumns + "," + itm.dataColumn;
                        }
                    });

                    if (searchColumns.length > 0) {

                        //clear stupid search entries
                        var sVal: string = this._txtSearchBy.value.toString();
                        sVal = sVal.replace(",", ""); // will mess with the parsing of filters serverside
                        sVal = sVal.replace(";", ""); // will mess with the parsing of filters serverside
                        sVal = sVal.replace("=", ""); // will mess with the parsing of filters serverside
                        this.currentSearchBy = sVal;

                        this.events.FilterByChange.dispatch(this, sVal);

                    } else {
                        console.log("Filtering:Search: missing columns of type string to search in");
                    }
                }


            }// end class Filtering






            export class EventsFiltering extends my.core.events.core {
                FilterByChange: my.core.events.core;

                constructor() {
                    super("TableFilteringEvents");
                    this.FilterByChange = new my.core.events.core("Filtering_FilterByChange");
                }


            }; //end class EventsSorting



        }; //end namespace table
    }; //end namespace Core
}; //end namespace my