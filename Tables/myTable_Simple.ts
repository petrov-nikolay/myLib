/// <reference path="../myControls.ts" />
/// <reference path="Table.ts" />
/// <reference path="myTable_config.ts" />




namespace my {

    export namespace table {

        export class Simple extends my.core.table.Core {

            private _columns: my.table.iColumn[] = [];
            set columns(val: my.table.iColumn[]) {
                if (val) {
                    this._columns = val;
                    this._addHeadRow();
                }
            };
            get columns(): my.table.iColumn[] {
                return this._columns;
            }

            dataSet: my.data.iDataSet;

            private _DataTableName: string;
            get DataTableName(): string {
                if (this._DataTableName == undefined) {
                    //need this so we have table name when we push data to server
                    this.DataTableName = this.dataSet.primaryTable;
                }
                return this._DataTableName;
            }
            set DataTableName(val: string) {
                this._DataTableName = val;
                this.dataTable = this.dataSet.getTable(this.DataTableName);
            }



            private _cfg: my.table.Config

            private _dataTable: my.data.DataTable;
            get dataTable(): my.data.DataTable {
                return this._dataTable;
            }
            set dataTable(val: my.data.DataTable) {
                this._dataTable = val;
                this._dataTable.subscribe(this, this._onDataTableChange.bind(this));
            }

            private _tableSize: string = "none";
            get TableSize(): string {
                return this._tableSize;
            }
            set TableSize(val: string) {
                if (this._tableSize != val) {
                    this._tableSize = val;
                    this._updateColumnVisibility();
                    //this.rebind();
                }
            }

            customControlHandler: (data: any) => my.controls.iControl;

            currentPage: number = 1;


            constructor(dataset: my.data.iDataSet, cfg: my.table.Config = undefined) {
                super();

                this._cfg = cfg;
                if (this._cfg) {
                    this._createColumns(cfg.columnsCfg);
                }
                this.css = new my.css.Table(this.element);

                this.dataSet = dataset;
                this.dataSet.events.Loaded.subscribe(this, this._onDataLoad.bind(this));
            }

            private _onDataLoad(): void {
                this.recreateRows();
                tools.log("TableSimple._onDataLoad")
            }

            calculateTableSize(height: number, width: number) {
                if (this._cfg) {
                    this.TableSize = tools.getWindowSize(height, width);
                }
            }

            rebind(): void {
                this.recreateRows();
                tools.log("TableSimple.rebind")
            }

            private _onDataTableChange(sender: object, data: any) {
                //use it to sort, filter locali
                this.recreateRows();
            }

            recreateRows() {
                if (this.DataTableName == undefined) {
                    this.dataTable = this.dataSet.getTable();
                }

                this.tBody.clear();
                if ((this.dataTable) && (this.dataTable.length > 0)) {
                    this.dataTable.value.forEach(this._addBodyRow.bind(this));
                }
            }

            //#region CREATE  BY CONFIG



            private _createColumns(cfgCol: my.table.ColumnCfg[]) {
                var c: my.table.iColumn[] = [];
                cfgCol.forEach((cfgItem: my.table.ColumnCfg, idx) => {
                    var col = new my.core.table.Column(cfgItem.label, cfgItem.dataColumn, cfgItem.size);

                    col.ctlOptions = cfgItem.ctlOptions; //new

                    col.dataTable = cfgItem.dataTable;
                    col.dataTableKeyColumn = cfgItem.dataTableKeyColumn;
                    col.dataTableLabelColumn = cfgItem.dataTableLabelColumn;

                    col.dataType = cfgItem.dataType;
                    col.defaultValue = cfgItem.defaultValue;
                    col.align = cfgItem.align;

                    col.isDefault = cfgItem.isDefault;
                    col.isEditable = cfgItem.isEditable;
                    col.isMandatory = cfgItem.isMandatory;

                    col.size = cfgItem.size;
                    col.type = cfgItem.type;

                    col.visibleInEditMode = cfgItem.visibleInEditMode;
                    col.visibleInInsertMode = cfgItem.visibleInInsertMode;
                    col.VisibleOnSize = cfgItem.VisibleOnSize;

                    col.isHidden = cfgItem.isHidden;

                    //if (cfgItem.isHidden != true) {
                    c.push(col);
                    //}


                });

                this.columns = c;
            }


            private _updateColumnVisibility() {

                this._updateCellVisibility(this.tHead.rows[0].cells);

                this.tBody.rows.forEach((row: core.table.Row, idx) => {
                    this._updateCellVisibility(row.cells);

                });

            } //end _updateColumnVisibility

            private _updateCellVisibility(cells: iCell[]) {
                cells.forEach((cell: iCell, idx) => {
                    var col = cell.tColumn;
                    var bHidden = false;

                    switch (this.TableSize) {
                        case "lg": {
                            break;
                        }
                        case "md": {
                            if (col.VisibleOnSize == "lg") {
                                bHidden = true;
                            }
                            break;
                        }
                        case "sm": {
                            if (col.VisibleOnSize == "lg"
                                || col.VisibleOnSize == "md") {
                                bHidden = true;
                            }
                            break;
                        }
                        case "xs": {
                            if (col.VisibleOnSize
                                && col.VisibleOnSize != "xs") {
                                bHidden = true;
                            }
                            break;
                        }
                    }

                    col.isHidden = bHidden; // this is to remove the body TD's when rebind
                    cell.element.hidden = bHidden; // this removes the TH

                }); // end foreach
            }



            //#endregion


            private _addHeadRow() {
                var r: my.core.table.Row = new my.core.table.Row(this);
                var th: my.core.table.thCell;

                this.columns.forEach((col: my.core.table.Column, i) => {
                    if (col.isHidden == false) {
                        th = new my.core.table.thCell(r);
                        th.tColumn = col;
                        th.css.size = col.size;
                        var sp = document.createElement("span");
                        sp.innerText = col.label;
                        th.element.innerHTML = "";
                        th.element.appendChild(sp);
                        //th.dataColumn = col.dataColumn;
                        r.addCell(th);
                    }
                });

                this.tHead.clear();
                this.tHead.addRow(r);
            }

            beforeAddBodyRow(row: my.table.iRow) { };
            afterAddBodyRow(row: my.table.iRow) { };

            private _addBodyRow(data: my.data.DataRow, idx: number) {
                if (data.__page != this.currentPage) {
                    return;
                }

                if (data.__bindVisible == false) {
                    return;
                }

                var r: my.core.table.Row = new my.core.table.Row(this);
                var td: my.core.table.tdCell;
                var data = data;
                r.itemData = data;
                r.index = idx;

                if (this.beforeAddBodyRow) {
                    this.beforeAddBodyRow(r);
                }

                this.columns.forEach((col: my.core.table.Column, i) => {
                    if (col.isHidden == false) {
                        td = new my.core.table.tdCell(col);

                        if (data.items[col.dataColumn]) {
                            // update the TD with the necesery value
                            this.addToCell(td, col, data);
                        } else if (col.dataColumn.includes(",")) {
                            this.addToCell(td, col, data);
                        } else if (col.dataColumn == "") {
                            // empti data column - dont error log 
                        } else {
                            console.log("Column is missing from data:" + col.dataColumn)
                        }

                        if (col.templateBody) {
                            var dd = col.templateBody(col, data);
                            //td.appendControl();
                        }

                        r.addCell(td);
                    }
                });

                if (this.afterAddBodyRow) {
                    this.afterAddBodyRow(r);
                }
                this.tBody.addRow(r);
            }


            addToCell(cell: my.table.iCell, col: my.table.iColumn, data: my.data.DataRow) {
                //cell.dataColumn = col.dataColumn;
                var oCleanValue;
                if (data.items) {
                    oCleanValue = data.items[col.dataColumn];
                }

                if (col.type == "label") {
                    var lbl = new my.controls.ctlSpan(oCleanValue);
                    cell.ctl = lbl;
                    return;
                }

                //custom procesing based on data type

                switch (col.dataType) {

                    case "list":
                        {
                            var dd = new my.controls.ctlAutocomplete(oCleanValue);
                            dd.data = this.dataSet.getTable(col.dataTable);
                            if (col.isEditable) {
                                cell.ctl = dd;
                            } else {
                                cell.value = dd.valueText;
                            }
                            break;
                        }
                    case "datetime":
                        {
                            //need to replace this with normal datetime control
                            if (col.dataColumn.toLowerCase() == "createdon") {
                                cell.element.appendChild(this._defaultCreatedOnRender(col, data.items));
                            } else {
                                cell.value = oCleanValue;
                            }
                            break;
                        }
                    case "date":
                        {
                            if (col.dataColumn.toLowerCase() == "createdon") {
                                cell.element.appendChild(this._defaultCreatedOnRender(col, data.items));
                            } else {
                                cell.element.appendChild(this._dateRender(col, data));
                            }
                            break;
                        }
                    case "boolean":
                        {
                            if (col.isEditable) {
                                var ch = new my.controls.ctlCheckBox("", oCleanValue)
                                cell.ctl = ch;
                            } else {
                                cell.value = oCleanValue; //.value; // default render - change to icons
                            }

                            break;
                        }
                    case "string":
                        {
                            if (col.isEditable) {
                                var txt = new my.controls.ctlText(oCleanValue);
                                txt.align = cell.tColumn.align;
                                cell.ctl = txt;
                            } else {
                                cell.value = oCleanValue; //.value;
                            }
                            break;
                        }
                    case "number":
                        {
                            if (col.isEditable) {
                                var tNum = new my.controls.ctlNumber(oCleanValue);
                                tNum.allowedChars = "1234567890,";
                                tNum.align = cell.tColumn.align;
                                cell.ctl = tNum;
                            } else {
                                cell.value = oCleanValue; //.value;
                            }
                            break;
                        }
                    case "custom": {
                        if (this.customControlHandler != undefined) {
                            cell.element.appendChild(this.customControlHandler(data).element);
                        }
                        break;
                    }
                    case "sum": {


                        // // var covar = new my.data.binding.ComputedObservable();
                        // if (data) {
                        //     var arr = col.dataColumn.split(",");
                        //     arr.forEach((itm: string, idx) => {
                        //         var o: my.data.binding.Observable = data[itm];
                        //         o.subscribe(this, (s, d) => {

                        //         });
                        //     });
                        //     // }
                        //     // var sp = new my.controls.ctlSpan(covar);
                        //     // cell.ctl = sp;
                        break;
                    }
                    default:
                        {
                            cell.value = oCleanValue;//.value;
                        }
                }// end switch




                if (col.isEditable) {
                    cell.element.classList.add("editable");
                }

            } // end _addBodyCell


            private _defaultCreatedOnRender(col: my.table.iColumn, data): HTMLElement {
                var val: string = data[col.dataColumn].value;
                val = val.split("T")[0];

                var span = new my.controls.ctlSpan(val);

                return span.element;
            }

            private _dateRender(col: my.table.iColumn, data): HTMLElement {
                var val: string = data[col.dataColumn].value;
                if (val) {
                    val = val.split("T")[0];
                    val = val.split(" ")[0];
                }

                var span = new my.controls.ctlSpan(val);

                return span.element;
            }

            deleteRow(s, e, row: my.table.iRow) {
                var msg = "You are about to delete: ";// + row.value;
                var m: my.controls.modal.popAlert = new my.controls.modal.popConfirm(msg, (result: boolean) => {
                    if (result) {
                        //do the delete
                        this.dataSet.delData(row.uid, row.table["DataTableName"], () => {
                            //on success
                            this.dataSet.getData();
                        });
                    } else {
                        // do nothing
                    }
                });
                m.show(); // value will return default column value
            }

        }; // end class Simple



    }; //end namespace table

}; //end namespace my