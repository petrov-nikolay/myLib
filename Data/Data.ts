/// <reference path="../Core/Event.ts" />
/// <reference path="Data_Binding.ts" />


namespace my {
    "use strict";


    export namespace data {

        export interface iDataSet {
            primaryTable: string;
            events: my.core.data.Events;
            tables: object;
            data: object;
            server: ServerDataSet;
            local: LocalDataSet;
            getTable(tblName?: string): my.data.DataTable; // ? is for the default no parameter call

            delData(uid: string, table: string, onSuccesshandler: Function);
            getData(params?: Array<object>);
            sendData(data: any, onSuccesshandler: Function)


            sortby: string;
            filtersForRequest: Array<my.data.Filter>;
            filtersForResponce: Array<my.data.Filter>;
            page: number;
            pageSize: number;

            tableNames: Array<string>;
            paramsGetData: Array<{ name: string, value: string }>;
        }

        export interface iDataTable {

            value: any;
            tableName: string;
            rows: Array<iDataRow>;
            columns: Array<DataColumn>;

            filters: my.core.data.filterManager;


            newRow(): DataRow
            findFirst(Name: string, Value: string): my.data.DataRow

            subscribe(subscriber: object, handler: my.core.data.binding.iBindingHandler, defaultData?: any)
            dispatch(sender: object, data: any);
        }

        export interface iDataRow {
            items: object;
            itemsArray: Array<DataColumn>;
            RowState: "Unchanged" | "Added" | "Deleted" | "Modified";
            tableName: string;

            AcceptChanges();
            delete();
            setAdded();
            setModified();

            subscribe(subscriber: object, handler: my.core.data.binding.iBindingHandler, defaultData?: any);

            getAsObject(): object;
            getAsJSONReadyObject(): object;

            addColumn(name: string, value: string | number | boolean);
        }

        export class iFilter {
            column: string;
            value: string;
        }
    } // end namespace data



    export namespace core {

        export namespace data {



            export abstract class DataSet {

                tableNames: Array<string> = [];
                primaryTable: string;
                tables: object = {};

                monitorForitemChanges: boolean = false;

                events: my.core.data.Events;


                get data(): object {
                    return this.tables;
                };
                set data(val: object) {
                    var tablesInObject: Array<string> = [];

                    //passed value is an Object
                    if (typeof (val) == 'object') {
                        tablesInObject = Object.getOwnPropertyNames(val);
                    }

                    //check if object at lest have the tables we expect
                    var tablesFound = 0;
                    this.tableNames.forEach((item, idx) => {
                        if (val.hasOwnProperty(item)) {
                            tablesFound = tablesFound + 1;
                        }
                    });
                    console.log("Dataset value update, Found:" + tablesFound + " From:" + this.tableNames.length)

                    // Create Observable Array for each table
                    tablesInObject.forEach((tblName: any, idx: number) => {
                        this._parseTable(val, tblName);
                    });

                    this.events.Loaded.dispatch(this, this.tables);
                    console.log("Data.Events.Loaded.dispatched");
                };


                constructor(tableNames: string) {

                    tableNames = tableNames.replace(" ", ""); // cleanup in case we forget to remove the spaces from tablenames
                    this.tableNames = tableNames.split(",");

                    // get first table by default
                    this.primaryTable = this.tableNames[0];


                    //remove this from here if events or filters will be upgraded 
                    //the NEW functions must be called in children 
                    this.events = new my.core.data.Events();

                };


                private _parseTable(val: object, tableName: string) {
                    if (val[tableName] instanceof my.core.data.binding.ObservableArray) {
                        // we have already observable array createted 
                        //this._data[tableName] = new my.core.data.binding.ObservableArray(val[tableName].getAsArray());
                        this.tables[tableName].value = val[tableName].getAsArray();
                    }
                    else if (val[tableName] instanceof my.core.data.binding.ObservableArrayRow) {
                        // we have already observable array row createted 
                        //this._data[tableName] = new my.core.data.binding.ObservableArray(val[tableName].getAsObject());
                        console.error("Psssing Observable Row to dataset");
                        this.tables[tableName].value = val[tableName].getAsObject();
                        //this.tables[tableName].name = tableName;
                    } else {
                        //create the observable array 
                        if (this.tables[tableName]) {
                            // we have the table generated and we expecting it based on the constructor table list
                            // it is observable array already

                            this.tables[tableName].value = val[tableName];
                            //  this.tables[tableName].name = tableName;
                        } else {
                            // data that came have unexpected tables so we generat the observable array for them 
                            this.tables[tableName] = new my.core.data.binding.ObservableArray(val[tableName], tableName);
                        }


                        //attach lisener to submit data on child change
                        if (this.monitorForitemChanges) {
                            this.tables[tableName].subscribe(this, this._onTableModified.bind(this));

                        }
                    }
                } // end _parseTable


                private _onTableModified(s, d) {
                    this.events.Modified.dispatch(this, d);
                }



            }; // end class data



            export abstract class DataTable extends my.core.data.binding.Observable {



                tableName: string;
                rows: Array<my.data.iDataRow>;

                filters: filterManager;

                get value(): any {
                    return this.rows;
                }
                set value(val: any) {
                    if (val == undefined) {
                        console.log("passing undefined to DataTable");
                        return;
                    }

                    //if you get Converting circular structure to JSON that probably is because the VAL object have observables in it 
                    //this._value = JSON.parse(JSON.stringify(val)); // copy array by val not reference

                    this.rows = [];

                    if (Array.isArray(val)) {

                        if (val.length > 0) {
                            this.parse(val);
                        }

                    } else {
                        // Passing single Row to DataTable
                        this.parse([val]);
                    }
                    //this.dispatch(this, this.rows);
                    //console.log("Data.ts - DataTable Value Set Dispatch");
                }


                get length() {
                    return this.rows.length;
                }

                pageCurrent: number;
                pageSize: number;


                constructor(val: Array<Object> | Object, name: string = undefined) {
                    super();
                    this.subscribers = [];
                    this.id = my.tools.newGuid();
                    this.value = val;

                    if (name == undefined) {
                        name = "default_table_name";
                    }

                    this.tableName = name;
                    this.pageCurrent = 1; //default paging
                    this.pageSize = 10; //default paging
                    this.filters = new my.core.data.filterManager(this);
                }


                abstract parse(arr: Array<Object>);




                currentOrderBy: string;
                orderBy(orderBy: string, type: "ASC" | "DESC" = "ASC", notify: boolean = true) {
                    if (!orderBy) {
                        return;
                    }
                    this.currentOrderBy = orderBy;
                    var sortColumn = orderBy;

                    this.rows = this.rows.sort((n1, n2) => {
                        var el1: string = n1.items[sortColumn].value + "";
                        var el2: string = n2.items[sortColumn].value + "";
                        if (el1 == null) { el1 = ""; }
                        if (el2 == null) { el2 = ""; }

                        if (type == "ASC") {
                            return el1.localeCompare(el2);
                        } else {
                            return el1.localeCompare(el2) * -1;
                        }
                    });

                    this.filterRows(); // rerun the filter and paging so sorting can display corectly

                    if (notify) {
                        this.dispatch(this, undefined);
                    }
                }


                filterBy(filterValue: string): number {
                    var f: my.data.Filter;
                    if ((filterValue != undefined) || (filterValue != "")) {
                        f = new my.data.Filter("ALL_COLUMNS", filterValue);
                        this.filters.add(f);
                    } else {
                        this.filters.remove("ALL_COLUMNS")
                    }
                    return this.filterRows();
                }

                //filter and page reset
                filterRows(): number {

                    var currentPage = 1;
                    var itemsInPage = 0;
                    var visibleItems = 0;
                    this.rows.forEach((row: my.data.DataRow, idx) => {
                        if (this.filters.items.length > 0) {
                            //row.__bindVisible = row.hasValue(filterValue);
                            row.__bindVisible = row.hasValues(this.filters.items);
                        } else {
                            row.__bindVisible = true;
                        }
                        //paging reset 
                        if (row.__bindVisible) {
                            visibleItems++;
                            row.__page = currentPage;
                            itemsInPage++;
                            if (itemsInPage == this.pageSize) {
                                currentPage++;
                                itemsInPage = 0;
                            }
                        }

                    });


                    this.dispatch(this, undefined);
                    return visibleItems;
                }


            } // end class DataTable



            export class DataColumn {
                Name: string;
                Data: my.data.binding.iObservable;
                Type: "observable" | "computed" = "observable";
                ComputeFunc: (row: my.data.iDataRow) => any;
            }

            export class DataRow { //extends Object {

                subscribers: Array<my.core.data.binding.bindingSubscriber>;
                items: object = {};
                itemsArray: Array<DataColumn>;
                RowState: "Unchanged" | "Added" | "Deleted" | "Modified";
                __bindVisible: boolean = true;
                __page: number = 0;
                tableName: string;


                constructor(data: object, table: string) {
                    //super();
                    this.tableName = table;
                    this.subscribers = [];
                    this.itemsArray = [];
                    if (data) {
                        this._parse(data);
                    }
                }

                protected _parse(data: object) {
                    this.items = [];
                    for (var prop in data) {
                        var val = new my.data.binding.Observable(data[prop]);
                        var i: DataColumn = this._addColumn(prop, val);
                        this.itemsArray.push(i);
                        this.items[i.Name] = i.Data;
                    }
                }


                protected _addColumn(name: string, value: my.data.binding.iObservable, subscribeForChanges: boolean = true): DataColumn {
                    var i = new DataColumn();
                    i.Name = name;
                    i.Data = value;
                    //lisen for changes in the columns
                    if (subscribeForChanges) { // computed are not supose to make Row change events 
                        i.Data.subscribe(this, (s, d) => {
                            if (this.RowState == "Unchanged") {
                                this.setModified(); // change state only we have not done anyting to the row - will mess up the data send if not    
                            }
                            if (this.RowState == undefined) {
                                // brand new rows have no status and not supose to send change events when firs data is inserted
                                this.RowState = "Unchanged";
                            } else {
                                this.dispatch(this, d);
                            }
                            this._onRowChange();
                        });
                    }



                    return i;
                }



                private _onRowChange() {
                    this.itemsArray.forEach((itm: DataColumn, idx) => {
                        if (itm.Data instanceof my.data.binding.ComputedObservable) {
                            itm.Data.computeFunction(this);
                        }
                    });
                }




                AcceptChanges() {
                    this.RowState = "Unchanged";
                }

                delete() {
                    this.RowState = "Deleted";
                }

                setAdded() {
                    this.RowState = "Added";
                }

                setModified() {
                    this.RowState = "Modified";
                }


                hasValue(value: string): boolean {
                    var bRet = false;

                    this.itemsArray.forEach((col: DataColumn, idx) => {
                        if (col.Data.value.toString().toLocaleUpperCase().includes(value.toLocaleUpperCase())) {
                            bRet = true;
                        }
                        //console.log(col.Data.value.toString().toLocaleUpperCase() + " == " + value.toLocaleUpperCase());
                    });

                    return bRet;
                }

                hasValues(arrFilters: my.data.iFilter[]): boolean {
                    var bRet = false;

                    arrFilters.forEach((f: my.data.Filter, fIdx) => {
                        // use this logic when search in table is changed to work with creating multiple filter records 
                        // that need to run with diferent type of filters so you can have serch frase filtering on already filtered items
                        // if (this.items[f.column]) { }

                        this.itemsArray.forEach((col: DataColumn, cIdx) => {
                            if ((f.column == "ALL_COLUMNS") || (col.Name.toUpperCase() == f.column.toUpperCase())) {
                                if (col.Data.value.toString().toLocaleUpperCase().includes(f.value.toLocaleUpperCase())) {
                                    bRet = true;
                                }
                            }
                        });

                        //console.log(col.Data.value.toString().toLocaleUpperCase() + " == " + value.toLocaleUpperCase());
                    });

                    return bRet;
                }


                subscribe(subscriber: object, handler: my.core.data.binding.iBindingHandler, defaultData: any = undefined) {
                    if (this._handlerExists(subscriber, handler)) {
                        return;
                    }  // protection for same subscriber 2 times

                    var subscr: my.core.data.binding.bindingSubscriber = new my.core.data.binding.bindingSubscriber();
                    subscr.subscriber = subscriber;
                    subscr.data = defaultData;
                    subscr.handler = handler;
                    this.subscribers.push(subscr);
                }

                private _handlerExists(subscriber: object, handler: my.core.data.binding.iBindingHandler): boolean {
                    var bRet: boolean = false;
                    this.subscribers.forEach((itm, idx) => {
                        if ((itm.subscriber == subscriber) && (itm.handler == handler)) {
                            bRet = true;
                        }
                    });

                    return bRet;
                }

                dispatch(sender: object, data: any) {
                    //dispach to subscribers
                    this.subscribers.forEach((s: my.core.data.binding.bindingSubscriber, idx: number) => {
                        if (s.subscriber != sender) {
                            if (data === undefined) {
                                data = s.data;  // uses default data passed on subscription (IF ANY IS PASSED)
                            }
                            s.handler(sender, data);
                            //console.log(sender.constructor.name + ";  notified " + this.__subscribers.length + " subscribers");
                        }
                    });
                }

            } // end class ObservableArrayRow




            export class Events {

                Modified: my.core.events.core;
                Loaded: my.core.events.core;

                constructor() {
                    this.Modified = new my.core.events.core("data_Modified");
                    this.Loaded = new my.core.events.core("data_Loaded");
                }

            } // end class Events


            export class filterManager {
                parentTable: my.core.data.DataTable;
                items: my.data.iFilter[];

                operator: '=' | '!=' | '<' | '>' | '<=' | '>=';

                get SQL(): string {
                    var sSQL: string = ' AND ';
                    this.items.forEach(function (item, idx) {
                        + item.dataColumn + " = ";
                        if (Number(this.value) === NaN) {
                            sSQL = sSQL + "'" + this.value + "'"; //  SQL will be: col='val'
                        } else {
                            sSQL = sSQL + this.value; //  SQL will be: col=val
                        }
                    }.bind(this))

                    return sSQL;
                };



                constructor(parent: my.core.data.DataTable) {
                    this.parentTable = parent;
                    this.items = [];
                };

                by(column: string, value: string) {
                    var idx = this.indexOf(column);
                    if (idx > -1) {
                        if (value.length > 0) {
                            this.items[idx].value = value;
                        } else {
                            this.remove(column);
                        }
                    } else {
                        var f = new my.data.Filter(column, value);
                        this.add(f);
                    }
                    this.parentTable.dispatch(this, undefined);
                }


                add(filter: my.data.iFilter) {
                    this.items.push(filter);
                }

                remove(column: string) {
                    var idx = this.indexOf(column);
                    this.items.splice(idx, 1);
                }

                indexOf(dataColumn: string): number {
                    var ret: number = undefined;
                    this.items.forEach(function (item, idx) {
                        if (item.column === dataColumn) {
                            ret = idx;
                        }
                    });

                    return ret;
                }

            }; // end class filter








        }; // namespace data 


    }; // end namespace core

};//  end namespace my 