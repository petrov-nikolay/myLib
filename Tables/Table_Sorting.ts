

namespace my {
    export namespace core {
        export namespace table {


            export class Sorting extends my.core.controls.core {

                private table: my.table.iTable;
                ctlType: string = "table.sorting";
                element: HTMLDivElement;


                readOnly: boolean = false; //not used here
                reset: Function; // not in use here 
                // not used here
                value: any; //not used here
                disabled: boolean = false;
                events: my.core.table.EventsSorting;

                currentOrderByDirection: "ASC" | "DESC" = "ASC";
                private _currentOrderBy: string;
                get currentOrderBy() {
                    if (this._currentOrderBy == undefined) {
                        this._currentOrderBy = this.table.columns[0].dataColumn;
                    }
                    return this._currentOrderBy;
                }
                set currentOrderBy(val: string) {
                    this.table.tHead.rows[0].cells.forEach((cell: my.core.table.thCell, idx) => {
                        if (val == cell.tColumn.dataColumn) {
                            var direction: "ASC" | "DESC" | "" = "";
                            if (this.currentOrderBy.includes(cell.tColumn.dataColumn)) {
                                if (this.currentOrderBy.includes("ASC")) {
                                    direction = "DESC";
                                    this.currentOrderByDirection = "DESC";
                                }
                                if (this.currentOrderBy.includes("DESC")) {
                                    direction = "ASC";
                                    this.currentOrderByDirection = "ASC";
                                }
                                if (this.currentOrderBy == cell.tColumn.dataColumn) {
                                    direction = "ASC";
                                    this.currentOrderByDirection = "ASC";
                                }

                            } else {
                                direction = "ASC";
                                this.currentOrderByDirection = "ASC";
                            }

                            if (direction == "") {
                                val = "";
                            } else {
                                val = val + " ";
                            }


                            this._currentOrderBy = val + direction;
                            this._addSortIcon(cell.element, direction);
                            this.events.OrderByChange.dispatch(this, this._currentOrderBy);

                        }
                    });
                }

                //use this only when you want to update the value without this.table.dataRebind()
                // ususaly first time loading when params are read
                set currentOrderByUpdate(val: string) {
                    this._currentOrderBy = val;
                }

                constructor(table: my.table.iTable) {
                    super('div');
                    this.table = table;
                    this.events = new my.core.table.EventsSorting(this);
                    //subscribe for cell click on top row
                    var self = this;
                    this.table.tHead.rows[0].cells.forEach((cell: my.core.table.thCell, idx) => {
                        cell.events.click.subscribe(self, self._onTHCellClick.bind(self), cell);
                    });

                }


                private _onTHCellClick(cell: my.core.table.thCell, e, d) {
                    if (this.table.options.allow_sorting) {
                        this.currentOrderBy = cell.tColumn.dataColumn;
                        this.table.events.sortClick.dispatch(this, cell.tColumn.dataColumn);
                    }

                }

                private _addSortIcon(targetCell: HTMLElement, direction: "ASC" | "DESC" | "") {
                    var strIco: string = "";
                    switch (direction) {
                        case "ASC":
                            strIco = my.theme.current.icons.arrow_sort_up;
                            break;
                        case "DESC":
                            strIco = my.theme.current.icons.arrow_sort_down;
                            break;
                    }

                    if (document.getElementById('sortPlaceholder')) {
                        document.getElementById('sortPlaceholder').remove();
                    }

                    if (strIco != "") {
                        var ico: my.controls.ctlIcon = new my.controls.ctlIcon(strIco);
                        targetCell.appendChild(ico.element);
                        ico.element.id = 'sortPlaceholder';
                    }
                } // end _addSortIcon



            }// end class Sorting


            export class EventsSorting extends my.core.controls.Events {
                OrderByChange: my.core.events.core;

                constructor(eventTarget: my.controls.iControl) {
                    super(eventTarget);
                    this.OrderByChange = new my.core.events.core("Sorting_OrderByChange");

                }


            }; //end class EventsSorting



        }; //end namespace table
    }; //end namespace Core
}; //end namespace my