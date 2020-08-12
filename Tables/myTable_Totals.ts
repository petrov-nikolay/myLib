

namespace my {

    export namespace table {


        export class Totals {

            private _table: Standard;
            private _columns: Array<my.table.TotalColumnConfig> = [];

            private _JSON: object;
            get JSON(): object {
                return this._JSON;
            }
            set JSON(val: object) {
                this._parseData(val);
            }

            constructor(table: Standard) {
                this._table = table;

                //subscribe for data row changes
                var self = this;
                this._table.dataSet.events.Modified.subscribe(this, this._calculateTotals.bind(this));
                this._table.dataSet.events.Loaded.subscribe(this, this._calculateTotals.bind(this));

            }




            private _createTotalRow() {

                var r: HTMLTableRowElement = document.createElement("tr");
                this._columns.forEach((itm: TotalColumnConfig, idx) => {
                    this._table.tFoot.element.appendChild(this._createTotalItem(itm));
                });


            }


            private _createTotalItem(itm: TotalColumnConfig): HTMLElement {
                var ret: HTMLElement = document.createElement("td");
                var spanp: my.controls.ctlSpan = new my.controls.ctlSpan(itm.prefix);
                var spanv: my.controls.ctlSpan = new my.controls.ctlSpan("");
                spanv.value = itm.total;

                ret.appendChild(spanp.element);
                ret.appendChild(spanv.element);
                return ret;
            }


            private _calculateTotals() {

                if (this._table.options.showTotals == false) {
                    return;
                }

                var tblData: Array<my.core.data.binding.ObservableArrayRow> = this._table.dataSet.getTable().value;

                //claer old values 
                this._columns.forEach((itm: TotalColumnConfig, idx) => {
                    itm._total = 0;
                });
                // calculate new values
                tblData.forEach((row: my.core.data.binding.ObservableArrayRow, idx: number) => {
                    this._table.columns.forEach((col: my.core.table.Column, idx) => {
                        this._calculateItemTotal(col, row);
                    });
                });

                this._columns.forEach((itm: TotalColumnConfig, idx) => {
                    // update observable after the calculations are done
                    itm.total.value = itm._total;
                });
            }

            private _calculateItemTotal(col: my.core.table.Column, row: my.core.data.binding.ObservableArrayRow) {
                var rowValues = row.getAsObject();
                this._columns.forEach((itm: TotalColumnConfig, idx) => {
                    if (itm.dataColumn == col.dataColumn) {

                        if ((col.dataType == "number") || (col.dataType == "decimal")) {
                            itm._total = itm._total + (+rowValues[col.dataColumn]);  // with the +rowValues[col.dataColumn] we convert the NULL to integer
                        } else {
                            itm._total = itm._total + 1;
                        }
                    }

                });



            }



            private _parseData(val: any) {
                if (!val.hasOwnProperty("columns")) {
                    return;
                }

                var arr: [] = val["columns"];

                arr.forEach((item: any, idx) => {
                    var tColumn: my.table.TotalColumnConfig = new my.table.TotalColumnConfig();

                    if (item.hasOwnProperty("colspan")) {
                        tColumn.colspan = item["colspan"];
                    }
                    if (item.hasOwnProperty("dataColumn")) {
                        tColumn.dataColumn = item["dataColumn"];
                    }
                    if (item.hasOwnProperty("prefix")) {
                        tColumn.prefix = item["prefix"];
                    }


                    this._columns.push(tColumn);

                });

                this._table.options.showTotals = true;

                this._createTotalRow();
            }

        }// end class Options


        export class TotalColumnConfig {
            dataColumn: string;
            colspan: number = 1;
            prefix: string;
            _total: number = 0;
            total: my.data.binding.Observable = new my.data.binding.Observable("");
        }


    }; //end namespace table

}; //end namespace my