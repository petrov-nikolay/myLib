/// <reference path="Data.ts" />
/// <reference path="../myDts.ts" />




namespace my {
    "use strict";


    export namespace data {


        export namespace binding {



            export class Observable extends my.core.data.binding.Observable {

                constructor(val: string | number | boolean | object) {
                    super(val);
                }


            }; // END observable


            // export class ObservableArray extends my.core.data.binding.ObservableArray {

            //     constructor(arr: Array<Object> | Object) {
            //         super(arr);
            //     }


            //     // createSumItem(columns: string) {
            //     //     var s = columns.split(",");
            //     //     s.forEach((itm: string, idx) => {

            //     //     });
            //     // }


            // }; // end class obseravbleArray

            // export class ObservableArrayRow extends my.core.data.binding.ObservableArrayRow {

            // }

            export class ReadOnlyBind extends my.core.data.binding.ReadOnlyBind {

                constructor(element: any, property: string, changeEvent: my.events.iEvent = undefined) {
                    super(element, property, changeEvent);
                }
            } // end class ReadOnlyBind

            export class ComputedObservable extends my.core.data.binding.ComputedObservable {
                constructor(computeFunction: (data: any) => any) {
                    super(computeFunction);
                }

            }

        };// end namespace binding





        export class Filter {
            column: string;
            value: string;

            constructor(col: string = undefined, val: string = undefined) {
                this.column = col;
                this.value = val;
            }
        }



        // do not use code below not ready

        export class DataSet extends my.core.data.DataSet implements iDataSet {

            eventNotificationCode: string = "DataSet"

            sortby: string;
            filtersForRequest: Array<my.data.Filter> = [];
            filtersForResponce: Array<my.data.Filter> = [];
            page: number;
            pageSize: number;
            paramsGetData: Array<{ name: string, value: string }>;

            onSuccess: (sender: any, code: "get" | "send" | "del", responce: any) => void;
            onError: (sender: any, code: "get" | "send" | "del", responce: any) => void;

            //use this when you want to edit more that one table with single dataset
            deleteRequiresTableName: boolean = false; //true will send second param with table name with the delete request

            private workMode: "offline" | "online" = "online";

            server: ServerDataSet;
            local: LocalDataSet;


            get url(): string {
                return this.server.url;
            }
            set url(val: string) {
                this.server.url = val;
            }

            private _isLiveUpdate: boolean = false; // when child oa a row gets updatet the data is imidiatly pushed to the server
            get isLiveUpdate(): boolean {
                return this._isLiveUpdate;
            }
            set isLiveUpdate(val: boolean) {
                this.monitorForitemChanges = val; // only if true we get any notification
                this._isLiveUpdate = val;
            }

            constructor(tables: string) {
                super(tables);
                this._generateTables(this.tableNames);
                this.server = new ServerDataSet(this);


                // must be moved to a property not in constructor

                // if (this.workMode == "offline") {
                //     this.local = new LocalDataSet(this, true);
                // }
                // else {
                //     this.local = new LocalDataSet(this, false);
                // }

                this.events.Modified.subscribe(this, this.onChildElementDataChange.bind(this));

            };

            private _generateTables(tablNames: Array<string>) {
                this.tables = [];
                tablNames.forEach((tName: string, idx) => {
                    this.tables[tName] = new my.data.DataTable([], tName);
                });
            }


            getData(params: Array<object> = undefined) {
                if (this.workMode == "offline") {
                    this.local.getData(params);
                }
                else {
                    this.server.getData(params);
                }
            }

            sendData(data: my.data.DataRow, onSuccesshandler: Function) {
                if (this.workMode == "offline") {
                    this.local.sendData(data, onSuccesshandler);
                }
                else {
                    this.server.sendData(data, onSuccesshandler);
                }
            }


            delData(uid: string, table: string, onSuccesshandler: Function) {

                if (this.deleteRequiresTableName == false) {
                    // undefined will tell the DTS to ignore the table param and send only the UID for the delete request
                    // most controler handle only UID as del param, in case single dataset must GET/PUT/DELETE multiple tables we need to know what to delete 
                    table = undefined;
                }


                if (this.workMode == "offline") {
                    this.local.delData(uid, table, onSuccesshandler)
                }
                else {
                    this.server.delData(uid, table, onSuccesshandler);
                }
            }

            onChildElementDataChange(sender, event, data: { "table": DataTable, "row": DataRow, "value": any }) {
                if (this.isLiveUpdate) {
                    this.sendData(data.row, this.onSuccess);
                }
            }



            getTable(tblName: string = "default"): my.data.DataTable {

                var ret: my.data.DataTable;

                if (tblName == "default") {
                    //this._responceFilter(this.tables[this.primaryTable]);
                    ret = this.tables[this.primaryTable];
                    //ret.tableName = this.primaryTable;
                } else {
                    if (this.data[tblName]) {
                        ret = this.tables[tblName];
                        //ret.tableName = tblName;
                    } else {
                        console.log("Unable to find table: " + tblName);
                        //return undefined;
                    }
                }

                return ret;
            }





            // private _responceFilter(table: my.data.DataTable) {
            //     if (table) {
            //         table.oArray.forEach((itm: my.data.DataRow, idx) => {
            //             this._responceFilterItemCheck(itm);
            //         });
            //     }
            // }


            // private _responceFilterItemCheck(arrRow: my.data.DataRow) {

            //     this.filtersForResponce.forEach((fItm: my.data.Filter, idx) => {
            //         if (arrRow.hasOwnProperty(fItm.column)) {
            //             if ((arrRow[fItm.column].value === fItm.value) || (fItm.value.toLowerCase() == "all")) {
            //                 arrRow.__bindVisible = true;  // __bindVisible is custom added in observable arrays to be able to ignore rows in data controls when bainding
            //             } else {
            //                 arrRow.__bindVisible = false;
            //             }
            //         }
            //     });

            // }


        }


        export class DataTable extends my.core.data.DataTable implements iDataTable {

            columns: Array<DataColumn>;
            rows: Array<my.data.DataRow>;

            private _filter: my.data.Filter;
            get filter(): my.data.Filter {
                return this._filter;
            }
            set filter(val: my.data.Filter) {
                this._filter = val;
                //clear old filter if val == undefined
                if (val == undefined) {
                    this.rows.forEach((itm: DataRow, idx) => {
                        itm.__bindVisible = true;
                    });
                }
            }


            get length() {
                return this.rows.length;
            }


            constructor(val: Array<Object> | Object, name: string = undefined) {
                super(val, name);
                this.columns = [];
            }

            //abstract function called by the parent
            parse(arr: Array<Object>) {

                this._parseCoumns(arr[0]);

                this.rows = [];
                var currentPage = 1;
                var itemsInPage = 0;
                arr.forEach((item: any, idx: number) => {
                    var row = this._parseRow(item);
                    row.__page = currentPage;
                    itemsInPage++;
                    if (itemsInPage == this.pageSize) {
                        currentPage++;
                        itemsInPage = 0;
                    }
                    this.rows.push(row);
                });
            }

            private _parseRow(obj: Object): my.data.DataRow {
                var retRow: my.data.DataRow = new my.data.DataRow(obj, this.tableName);

                retRow.subscribe(this, this._onRowChange.bind(this));

                this.columns.forEach((col: DataColumn, idx) => {
                    if (col.Type == "computed") {
                        retRow.addComputedColumn(col.Name, col.ComputeFunc);
                    }
                });


                return retRow;
            }


            private _parseCoumns(obj: Object) {
                //create columns from first row
                if ((this.columns == undefined) || (this.columns.length == 0)) {
                    this.columns = [];
                }

                for (var prop in obj) {
                    var col = new DataColumn();
                    col.Name = prop;
                    this._addColumn(col);

                    if (Array.isArray(obj[prop])) {
                        // object have property that contains array of data
                        //retRow[prop] = new DataTable(obj[prop], prop);
                        console.error("sub Array structures are not supported in DataTable");
                    }

                }

            }

            private _addColumn(col: DataColumn) {
                var isNewColumn: boolean = true;
                this.columns.forEach((itm: DataColumn, idx) => {
                    if (itm.Name == col.Name) {
                        isNewColumn = false;
                    }
                });
                if (isNewColumn) {
                    this.columns.push(col);
                }
            }

            private _onRowChange(row, value) {
                var tableChangeData = { "table": this, "row": row, "value": value };
                this.dispatch(this, tableChangeData);
            }

            newRow(): DataRow {
                var obj = {};
                this.columns.forEach((col: DataColumn, idx) => {
                    obj[col.Name] = undefined;
                });

                var retRow: DataRow = new DataRow(undefined, this.tableName);
                this.columns.forEach((col: DataColumn, idx) => {
                    if (col.Type == "observable") {
                        retRow.addColumn(col.Name, undefined);
                    } else {
                        retRow.addComputedColumn(col.Name, col.ComputeFunc);
                    }
                });

                return retRow;
            }

            addComputedColumn(name: string, fCompute: (row: my.data.iDataRow) => any) {
                var col = new DataColumn();
                col.Name = name;
                col.ComputeFunc = fCompute;
                col.Type = "computed";
                this.columns.push(col);
                //add the new column on all rows
                if (this.rows.length > 0) {
                    this.rows.forEach((row: DataRow, idx) => {
                        row.addComputedColumn(col.Name, col.ComputeFunc);
                    });
                }
            }

            findFirst(Name: string, Value: string): my.data.DataRow {
                var ret;
                if (Value == undefined) {
                    return ret;
                }
                Value = Value.toUpperCase();
                var searchIn: Array<DataRow> = this.value;

                for (var i = 0; i < searchIn.length; i++) {
                    var a = searchIn[i].items[Name];
                    if (a !== undefined) {
                        var val: string = a.value.toString();
                        if (val.toUpperCase() == Value) {
                            ret = searchIn[i];
                            break;
                        }
                    }
                };

                return ret;
            }

            getFilteredArray(filterCol: string, filterVal: string): Array<Object> {
                var arrRet = [];

                this.rows.forEach((row: DataRow, idx) => {
                    var d = row.items[filterCol];
                    if (d) {
                        if (d.value.toString().toUpperCase() == filterVal.toUpperCase()) {
                            arrRet.push(row.getAsObject());
                        }
                    }
                });

                return arrRet;
            }


        } // end class DataTable


        export class DataColumn extends my.core.data.DataColumn {

        }

        export class DataRow extends my.core.data.DataRow implements my.data.iDataRow {


            constructor(data: object, table: string) {
                super(data, table);
            }


            getAsObject(): object {
                var oRet = {};
                this.itemsArray.forEach((itm: DataColumn, idx) => {
                    oRet[itm.Name] = itm.Data.value;
                });

                return oRet;
            }

            getAsJSONReadyObject(): object {
                var oRet = {};
                var obj = this.getAsObject();
                if (obj["UID"] == null) {
                    obj["UID"] = undefined;
                }
                oRet[this.tableName] = [obj];
                return oRet;
            }

            addColumn(name: string, value: string | number | boolean) {
                var val = new my.data.binding.Observable(value);
                var i: DataColumn = this._addColumn(name, val);
                this.itemsArray.push(i);
                this.items[i.Name] = i.Data;
            }



            addComputedColumn(name: string, fCompute: (row: my.data.iDataRow) => any) {
                var val = new my.data.binding.ComputedObservable(fCompute);
                var i: DataColumn = this._addColumn(name, val, false);
                this.itemsArray.push(i);
                this.items[i.Name] = i.Data;

            }

        } // end class DataRow



    } // namespace data 

}//  end namespace my 