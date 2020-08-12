/// <reference path="../Core/Controls.ts" />
/// <reference path="Table_Options.ts" />


namespace my {

    export namespace table {

        export interface iCell {
            element: HTMLTableCellElement;
            value: any;
            text: string;
            ctl: my.controls.iControl;
            // type: "text" | "textarea" | "number" | "checkbox" | "datetime" | "autocomplete" | "dropdown" | "label";
            // dataTable: string;
            // dataTableKeyColumn: string;
            // dataTableLabelColumn: string;

            tColumn: my.table.iColumn;

        }; // end table.iCell

        export interface iColumn extends my.config.iColumn {

            isDefault: boolean;

            orderBy: boolean;
            orderType: "ASC" | "DESC";

            templateHeader: my.controls.iTemplateFunction;
            templateBody: my.controls.iTemplateFunction;
            templateFuter: my.controls.iTemplateFunction;

        };

        export interface iRow {
            element: HTMLTableRowElement;
            value: object;
            uid: string;

            table: my.table.iTable;
            cells: my.table.iCell[];

            index: number;
            itemData: any;

            addCell(cell: my.table.iCell);
        }

        export interface iTable {
            element: HTMLDivElement;
            elementTable: HTMLTableElement;
            events: my.core.table.Events;
            columns: my.table.iColumn[];
            tTitle: my.core.table.TTitle;
            tHead: my.core.table.THead;
            tBody: my.core.table.TBody;
            tFoot: my.core.table.TFoot;
            plhPagination: HTMLElement;
            currentSelectedRow: my.core.table.Row;
            options: my.core.table.Options;

        }


    }

    export namespace core {

        export namespace table {


            export abstract class Core extends my.core.controls.core {
                ctlType: string = "table.Core";
                element: HTMLDivElement;
                elementTable: HTMLTableElement;
                readOnly: boolean = false; //not used here
                reset: Function; // not in use here 
                // not used here
                value: any; //not used here
                disabled: boolean = false;
                events: my.core.table.Events;


                //table vars
                columns: my.table.iColumn[];
                tTitle: my.core.table.TTitle;
                tHead: my.core.table.THead;
                tBody: my.core.table.TBody;
                tFoot: my.core.table.TFoot;

                options: my.core.table.Options;

                private _currentSelectedRow: my.core.table.Row;
                get currentSelectedRow(): my.core.table.Row {
                    return this._currentSelectedRow;
                }
                set currentSelectedRow(val: my.core.table.Row) {
                    if (this._currentSelectedRow) {
                        //we have selected something need to remove the selection before adding new
                        this._currentSelectedRow.element.classList.remove("selected");
                    }
                    this._currentSelectedRow = val;
                    this._currentSelectedRow.element.classList.add("selected");
                    this.events.rowSelected.dispatch(this, val);
                }


                private _plhPagination: HTMLElement
                get plhPagination(): HTMLElement {
                    if (this._plhPagination == undefined) {
                        this._plhPagination = document.createElement("div");
                        this.element.appendChild(this._plhPagination);
                    }

                    return this._plhPagination;
                }


                constructor() {
                    super("div");
                    this.elementTable = document.createElement('table');
                    this.element.appendChild(this.elementTable);
                    this.initEvents();
                    this.tHead = new my.core.table.THead(this);
                    this.tBody = new my.core.table.TBody(this);
                    this.tFoot = new my.core.table.TFoot(this);
                    this.css = new my.css.Table(this.element);
                    this.options = new my.core.table.Options(this);

                }

                // separate function so the children can extend the event classes and init their new event clasess not the core events
                initEvents() {
                    this.events = new my.core.table.Events(this);
                }

                abstract rebind();


            }; // end table.Core

            export class Column extends my.core.config.cColumn implements my.table.iColumn {
                visible: boolean = true;


                orderBy: boolean = false;
                orderType: "ASC" | "DESC" = "ASC";

                templateHeader: my.controls.iTemplateFunction;
                templateBody: my.controls.iTemplateFunction;
                templateFuter: my.controls.iTemplateFunction;

                // used in get row.value to retun the value from the default column
                // mainly used in row.delete functionality for the confirm dialog
                isDefault: boolean = false;



                constructor(label: string, dataColumn: string, size: string) {
                    super();
                    this.label = label;
                    this.size = size;
                    //this.css = new my.css.tCell(this.ele)
                    this.dataColumn = dataColumn;
                }

            } // END class Column



            export class Row extends my.core.controls.core implements my.table.iRow {
                ctlType: string = "table.row";
                element: HTMLTableRowElement;
                readOnly: boolean = false; // irrelevant in this element
                reset: Function; // irrelevant in this element
                // not used here
                disabled: boolean = false; // irrelevant in this element

                itemData: my.data.DataRow;


                get value(): object {
                    var ret = {};
                    // columns will give all elements including hidden
                    this.table.columns.forEach((itm: my.table.iColumn, idx) => {
                        ret[itm.dataColumn] = itm.defaultValue;
                    });
                    // cells will get values 
                    this.cells.forEach((itm: my.table.iCell, idx) => {
                        ret[itm.tColumn.dataColumn] = itm.ctl.value;
                    });

                    return ret;
                }

                get uid(): string {
                    var r: string;
                    if (this.itemData.items["UID"]) {
                        r = this.itemData.items["UID"].value;
                    } else {
                        console.log("error in Row.get UID");
                    }
                    return r;
                }

                table: my.table.iTable;
                cells: my.table.iCell[] = [];

                index: number = -1;

                constructor(table: my.table.iTable) {
                    super("tr");
                    this.table = table;
                    this.events.click.subscribe(this, this._onRowClick.bind(this));
                    this.events.dblclick.subscribe(this, this._onRowDblClick.bind(this));
                    this.events.mouseenter.subscribe(this, this._onRowMouseEnter.bind(this));
                };

                clear() {
                    this.cells = [];
                    this.element.innerHTML = "";
                }

                addCell(cell: my.table.iCell) {
                    this.cells.push(cell);
                    this.element.appendChild(cell.element);
                };

                private _onRowClick(row, e, d) {
                    if (row.index > -1) {  // -1 is the header
                        this.table.events.rowClick.dispatch(this, this.itemData);
                        this.table.currentSelectedRow = this;
                    }
                }

                private _onRowDblClick(row, e, d) {
                    if (row.index > -1) {  // -1 is the header
                        this.table.events.rowDblClick.dispatch(this, this.itemData);
                        this.table.currentSelectedRow = this;
                    }
                }

                private _onRowMouseEnter(row, e, d) {
                    if (row.index > -1) {  // -1 is the header
                        this.table.events.rowMouseEnter.dispatch(this, this.itemData);
                    }
                }



            }; // end table.Row

            export class thCell extends my.core.controls.core implements my.table.iCell {
                ctlType: string = "table.thCell";
                element: HTMLTableCellElement;
                readOnly: boolean = false; // irrelevant in this element
                reset: Function; // irrelevant in this element
                private _ctl: my.controls.iControl;
                get ctl(): my.controls.iControl {
                    return this._ctl;
                }
                set ctl(val: my.controls.iControl) {
                    this._ctl = val;
                    if (val) {
                        this.element.appendChild(val.element);
                    }
                }
                // not used here
                disabled: boolean = false; // irrelevant in this element
                row: my.core.table.Row;
                value: any;
                // dataColumn: string;
                text: string = "";

                // type: "text" | "textarea" | "number" | "checkbox" | "datetime" | "autocomplete" | "dropdown" | "label";
                // dataTable: string;
                // dataTableKeyColumn: string;
                // dataTableLabelColumn: string;
                tColumn: my.table.iColumn;

                constructor(row: my.core.table.Row) {
                    super("th");
                    this.row = row;
                    this.css = new my.css.tCell(this.element);

                };



            }; // end table.Cell

            export class tdCell extends my.core.controls.core implements my.table.iCell {
                ctlType: string = "table.tdCell";

                private _ctl: my.controls.iControl;
                get ctl(): my.controls.iControl {
                    return this._ctl;
                }
                set ctl(val: my.controls.iControl) {
                    this._ctl = val;
                    if (val) {
                        this.element.appendChild(val.element);
                    }
                }
                element: HTMLTableCellElement;
                readOnly: boolean = false; // irrelevant in this element
                reset: Function; // irrelevant in this element
                // not used here
                disabled: boolean = false; // irrelevant in this element
                text: string = "";
                // type: "text" | "textarea" | "number" | "checkbox" | "datetime" | "autocomplete" | "dropdown" | "label";
                // dataTable: string;
                // dataTableKeyColumn: string;
                // dataTableLabelColumn: string;

                get _value(): string {
                    return this.element.innerText;
                }
                set _value(val: string) {
                    this.element.innerText = val;
                }

                //dataColumn: string;

                tColumn: my.table.iColumn;
                constructor(col: my.table.iColumn) {
                    super("td");
                    // this.css = new my.css.grCell(this.element);
                    this.tColumn = col;
                    this._parseColProperties();
                };


                private _parseColProperties() {
                    if (this.tColumn.align != "left") {
                        this.element.align = this.tColumn.align;
                    }

                }


            }; // end table.Cell



            export class THead {
                ctlType: string = "table.THead";
                element: HTMLTableSectionElement;
                rows: my.table.iRow[] = [];
                table: my.table.iTable;

                constructor(table: my.table.iTable) {
                    this.table = table;
                    this.element = table.elementTable.createTHead();
                };

                clear() {
                    this.rows = [];
                    this.element.innerHTML = "";
                }


                addRow(row: my.table.iRow) {
                    this.element.appendChild(row.element);
                    this.rows.push(row);
                }


            }; // end table.THead

            export class TBody {
                ctlType: string = "table.TBody";
                element: HTMLTableSectionElement;
                rows: my.core.table.Row[] = [];
                table: my.table.iTable;

                constructor(table: my.table.iTable) {
                    this.element = table.elementTable.createTBody();
                    this.table = table;

                };

                clear() {
                    this.rows = [];
                    this.element.innerHTML = "";
                }


                addRow(row: my.core.table.Row) {
                    this.element.appendChild(row.element);
                    this.rows.push(row);
                }



            }; // end table.Body

            export class TFoot {
                ctlType: string = "table.TFoot";
                element: HTMLTableSectionElement;
                rows: my.table.iRow[] = [];
                table: my.table.iTable;

                constructor(table: my.table.iTable) {
                    this.element = table.elementTable.createTFoot();
                    this.table = table;
                };

                clear() {
                    this.rows = [];
                    this.element.innerHTML = "";
                }


                addRow(row: my.table.iRow) {
                    this.element.appendChild(row.element);
                    this.rows.push(row);
                }

            }; // end table.Footer

            export class TTitle {

                ctlType: string = "table.TTitle";
                element: HTMLElement;
                table: my.table.iTable;

                plhAddNew: HTMLDivElement;
                plhNotify: HTMLDivElement;
                plhEdit: HTMLDivElement;
                plhDelete: HTMLDivElement;
                plhText: HTMLSpanElement;
                plhFilter: HTMLDivElement;
                plhSearch: HTMLDivElement;
                plhCustomCtrl: HTMLDivElement;

                set text(val: string) {
                    this.plhText.innerText = val;
                }


                constructor(table: my.table.iTable) {
                    this.element = document.createElement('div');
                    this.table = table;
                    this._init();
                    this._initPlaceHolders();
                };

                private _createAddNew() {
                    var ico = new my.controls.ctlIcon(my.theme.current.icons.add);
                    ico.element.classList.add("ico-btn");
                    ico.element.classList.add("btn_add");
                    this.plhAddNew.appendChild(ico.element);
                    ico.events.click.subscribe(this, (s, e, d) => {
                        this.table.events.newClick.dispatch(this);
                    });
                }

                showAddNew() {
                    if (this.plhAddNew.hasChildNodes() == false) {
                        this._createAddNew();
                    }
                    this.plhAddNew.style.visibility = "visible";
                }

                hideAddNew() {
                    this.plhAddNew.style.visibility = "hidden";
                }


                showTitleSearch() {
                    this.plhSearch.style.visibility = "visible";
                }

                hideTitleSearch() {
                    this.plhSearch.style.visibility = "hidden";
                }

                showTitleFilter() {
                    this.plhFilter.style.visibility = "visible";
                }

                hideTitleFilter() {
                    this.plhFilter.style.visibility = "hidden";
                }



                //this will only be called internaly
                createNotify() {
                    if (this.plhNotify.hasChildNodes()) {
                        this.plhNotify.style.visibility = "visible";
                    } else {
                        var i = new my.controls.ctlIcon(my.theme.current.icons.sync);
                        this.plhNotify.appendChild(i.element);
                        //add click events and dropdown details as per frm logic
                        //i.events.click.subscribe(subscriber, handler.bind(subscriber));
                    }
                }
                hideNotify() {
                    this.plhNotify.style.visibility = "hidden";
                }

                createEdit(subscriber: any, handler: my.events.iEventHandler) {
                    var i = new my.controls.ctlIcon(my.theme.current.icons.edit);
                    this.plhEdit.appendChild(i.element);
                    i.events.click.subscribe(subscriber, handler.bind(subscriber));
                }

                createDelete(subscriber: any, handler: my.events.iEventHandler) {
                    var i = new my.controls.ctlIcon(my.theme.current.icons.delete);
                    this.plhDelete.appendChild(i.element);
                    i.events.click.subscribe(subscriber, handler.bind(subscriber));
                }

                addCustomControl(ctl: my.controls.iControl) {
                    this.plhCustomCtrl.appendChild(ctl.element);
                }

                removeCustomControl() {
                    this.plhCustomCtrl.innerHTML = "";
                }

                private _init() {
                    this.table.element.insertBefore(this.element, this.table.elementTable);
                    this.plhText = document.createElement('span');
                    this.element.classList.add('title');
                    this.element.appendChild(this.plhText);
                }

                private _initPlaceHolders() {
                    this.plhAddNew = document.createElement("div");
                    this.plhNotify = document.createElement("div");
                    this.plhEdit = document.createElement("div");
                    this.plhDelete = document.createElement("div");
                    this.plhFilter = document.createElement("div");
                    this.plhSearch = document.createElement("div");
                    this.plhCustomCtrl = document.createElement("div");

                    this.plhAddNew.classList.add("placeholder");
                    this.plhNotify.classList.add("placeholder");
                    this.plhEdit.classList.add("placeholder");
                    this.plhDelete.classList.add("placeholder");
                    this.plhFilter.classList.add("placeholder");
                    this.plhSearch.classList.add("placeholder");
                    this.plhCustomCtrl.classList.add("placeholder");

                    this.element.appendChild(this.plhCustomCtrl);
                    this.element.appendChild(this.plhAddNew);
                    this.element.appendChild(this.plhEdit);
                    this.element.appendChild(this.plhDelete);
                    this.element.appendChild(this.plhNotify);
                    this.element.appendChild(this.plhFilter);
                    this.element.appendChild(this.plhSearch);

                }

            }; // end table.TTitle

            export class Events extends my.core.controls.Events {
                rowClick: my.core.events.core;
                rowDblClick: my.core.events.core;
                rowMouseEnter: my.core.events.core;
                rowSelected: my.core.events.core;
                cellClick: my.core.events.core;

                newClick: my.core.events.core;
                delClick: my.core.events.core;
                editClick: my.core.events.core;
                sortClick: my.core.events.core;
                filter: my.core.events.core;

                dataSorted: my.core.events.core;
                dataFiltered: my.core.events.core;
                constructor(eventTarget: my.controls.iControl) {
                    super(eventTarget);
                    this.rowClick = new my.core.events.core("rowClick");
                    this.rowDblClick = new my.core.events.core("rowDblClick");
                    this.rowMouseEnter = new my.core.events.core("rowMouseEnter");
                    this.rowSelected = new my.core.events.core("rowSelected");
                    this.cellClick = new my.core.events.core("cellClick");

                    this.newClick = new my.core.events.core("Table_newClick");
                    this.delClick = new my.core.events.core("Table_delClick");
                    this.editClick = new my.core.events.core("Table_editClick");
                    this.sortClick = new my.core.events.core("sortClick");
                    this.filter = new my.core.events.core("filter");

                    this.dataSorted = new my.core.events.core("dataSorted");
                    this.dataFiltered = new my.core.events.core("dataFiltered");
                }

            }; //end class tblEvents





        };// end namespace table



    }; //end namespace core

}; //end namespace my