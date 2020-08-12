
/// <reference path="myData.ts" />




namespace my {
    "use strict";

    export namespace data {

        class LocalDataPackage {
            UID: string;
            JSON: string;
            TableName_DataToSend: string;
            TableName_SendData: string;
            ServerTableName: string;
            SyncType: "Commit" | "Delete" | "Add";
            DateCreated: Date;
            SyncDate: Date;
            LastErrorSync: Date;
        }

        class MasterSyncPakage {
            URL: string;
            UidToSync: string[] = [];
            UidFailed: string[] = [];
            LastSyncDate: Date;
            TableName_DataToSend: string;
        }

        class CacheDataRecord {
            URL: string;
            DateSync: Date;
        }

        class LocalSyncManager {
            static MasterTableName: string = "SyncQuery";
            private _dcSync: MasterSyncPakage[] = [];
            private _localDb: LocalDb;

            get HasNoSyncData() {
                return this._dcSync.length > 0;
            }

            constructor(localDb: LocalDb) {
                this._localDb = localDb;

                var schema: TableSchemaInfo = new TableSchemaInfo();
                schema.tableName = LocalSyncManager.MasterTableName;
                schema.tableKey = "URL";
                schema.AutoIncrementKey = false;
                this._localDb.createTableIfNotExist([schema], this.readSaveData.bind(this));
            }

            addSyncRow(url: string, dataPakage: LocalDataPackage, lastSyncDate: Date = undefined) {
                var foundElement = this._dcSync.findIndex(x => x.URL == url);
                if (foundElement != -1) {
                    var foundSynIndex = this._dcSync[foundElement].UidToSync.findIndex(x => x == dataPakage.UID);
                    if (foundSynIndex == -1) {
                        this._dcSync[foundElement].UidToSync.push(dataPakage.UID);
                    }
                }
                else {
                    let pakageData: MasterSyncPakage = new MasterSyncPakage();
                    pakageData.URL = url;
                    pakageData.TableName_DataToSend = dataPakage.TableName_DataToSend;
                    pakageData.UidToSync.push(dataPakage.UID);
                    if (lastSyncDate) {
                        pakageData.LastSyncDate = lastSyncDate;
                    }
                    foundElement = this._dcSync.push(pakageData) - 1;
                }

                this._localDb.saveData(LocalSyncManager.MasterTableName, this._dcSync[foundElement]);
            }

            addFailedRow(url: string, dataPakage: LocalDataPackage, lastSyncDate: Date = undefined) {
                var foundElement = this._dcSync.findIndex(x => x.URL == url);
                if (foundElement != -1) {
                    this._dcSync[foundElement].UidFailed.push(dataPakage.UID);
                }
                else {
                    let pakageData: MasterSyncPakage = new MasterSyncPakage();
                    pakageData.URL = url;
                    pakageData.TableName_DataToSend = dataPakage.TableName_DataToSend;
                    pakageData.UidFailed.push(dataPakage.UID);
                    if (lastSyncDate) {
                        pakageData.LastSyncDate = lastSyncDate;
                    }
                    foundElement = this._dcSync.push(pakageData) - 1;
                }

                this._localDb.saveData(LocalSyncManager.MasterTableName, this._dcSync[foundElement]);

            }

            removeSyncRow(url: string) {
                var foundElement = this._dcSync.findIndex(x => x.URL == url);
                if (foundElement != -1) {
                    this._dcSync.splice(foundElement, 1);
                    this._localDb.removeData(LocalSyncManager.MasterTableName, url);
                }
            }

            CountWaitingDataToSync(syncData: Date = undefined) {
                var count: number = 0;
                this._dcSync.forEach((itm, ind) => {
                    if (syncData) {
                        if (itm.LastSyncDate == undefined
                            || itm.LastSyncDate < syncData) {
                            count = count + itm.UidToSync.length;
                        }
                    } else {
                        count = count + itm.UidToSync.length;
                    }
                });

                return count;
            }

            private readSaveData() {
                this._localDb.getData(LocalSyncManager.MasterTableName, this.reloadData.bind(this));
            }

            private reloadData(data: any[]) {
                data.forEach((itm, idx) => {
                    var tableRecord: MasterSyncPakage = itm;
                    this._dcSync.push(tableRecord);
                });
            }
        }

        export class LocalDataSet {
            private localDb: LocalDb
            private localSyncManager: LocalSyncManager;
            private ds: my.data.DataSet;
            private data: object;
            private stack: string[] = [];
            private _cacheStorage: "NotInit" | "NotExist" | "Exist" | "Expired" = "NotInit";
            private _cacheTableName = "CacheData";
            private _expiredInMinutes: number = 10;
            private _backgroundSyncDateStart: Date;
            private _responseBackgroundSync: Function;
            private eventNotificationCode: string = "DataSet"

            get CacheStorage() {
                return this._cacheStorage;
            }

            constructor(val: my.data.DataSet) {
                this.localDb = LocalDb.getInstance("SyncDB", this.initSyncManager.bind(this));
                this.ds = val;
            }

            private initSyncManager() {
                this.localSyncManager = new LocalSyncManager(this.localDb);
                this.loadData();
                this.startBackgroundSyncThread();
            }

            saveData(lstTableNames: string[], data: object, loadAllData: boolean) {
                this.saveDataInCache(lstTableNames, data, loadAllData);
            }

            syncData(OnResponse: Function): number {
                if (this._backgroundSyncDateStart == undefined) {
                    this._responseBackgroundSync = OnResponse;
                    this.syncWaitingData();
                }
                else {
                    OnResponse("syn in progress");
                }

                return this.localSyncManager.CountWaitingDataToSync();
            }

            /// start dataSer implement
            // onErrorHandler is non mandatory and must be handled internaly by rasing global event by default
            sendData(data: my.data.DataRow, onSuccessHandler: Function) {
                var tableName = data.tableName;
                var dataRow = data.getAsObject();
                if (tableName == "undefined") {
                    tableName = this.ds.primaryTable;
                }
                var tableNameDataToSend: string = tableName + "_DataToSend";
                var tableNameSendData: string = tableName + "_SendData";
                var url = this.ds.server.url;

                var addNewRow: boolean = false;
                if (!dataRow["UID"]) {
                    addNewRow = true;
                    dataRow["UID"] = my.tools.newGuid();

                    var operationDate: string = JSON.stringify(new Date())
                        .replace("\"", "").replace("\"", "").replace("Z", "");
                    data.itemsArray.forEach((itm, ind) => {
                        if (!dataRow[itm.Name]) {
                            if (itm.Name == "CreatedOn"
                                || itm.Name == "LastEditOn") {
                                dataRow[itm.Name] = operationDate;
                            } else if (itm.Name == "CreatedBy"
                                || itm.Name == "LastEditBy") {
                                dataRow[itm.Name] = "offline";
                            }
                            else {
                                dataRow[itm.Name] = "undefined";
                            }
                        }
                    })
                }
                //save data in local db store
                if (this._cacheStorage == "Exist") {
                    this.localDb.saveData(this.generateCacheTableName(tableName), dataRow);
                }

                //save data in local cache data
                if (this.data != undefined) {
                    var localObservableArray: object[] = this.data[tableName];
                    var localDataIndex = localObservableArray.findIndex(x => x["UID"] == dataRow["UID"]);
                    if (localDataIndex != -1) {
                        localObservableArray[localDataIndex] = dataRow;
                        this.data[tableName] = localObservableArray;
                    }
                    else {
                        localObservableArray.push(dataRow);
                        this.data[tableName] = localObservableArray;
                    }
                }

                //add on sync querys
                var lstTable: TableSchemaInfo[] = new Array();
                var schema: TableSchemaInfo = new TableSchemaInfo();
                schema.tableName = tableNameDataToSend;
                schema.tableKey = "UID";
                schema.AutoIncrementKey = false;
                lstTable.push(schema);

                schema = new TableSchemaInfo();
                schema.tableName = tableNameSendData;
                schema.tableKey = "UID";
                schema.AutoIncrementKey = false;
                lstTable.push(schema);
                this.localDb.createTableIfNotExist(lstTable, function () {
                    var dataPakage = new LocalDataPackage();
                    dataPakage.JSON = JSON.stringify(dataRow);
                    dataPakage.UID = my.tools.newGuid();
                    dataPakage.DateCreated = new Date();
                    dataPakage.TableName_DataToSend = tableNameDataToSend;
                    dataPakage.TableName_SendData = tableNameSendData;
                    if (addNewRow) {
                        dataPakage.SyncType = "Add";
                    } else {
                        dataPakage.SyncType = "Commit";
                    }
                    dataPakage.ServerTableName = tableName;
                    this.localSyncManager.addSyncRow(url, dataPakage);
                    this.localDb.saveData(tableNameDataToSend, dataPakage, onSuccessHandler, this.onErrorHandler.bind(this));
                }.bind(this));
            }

            getData(params: Array<object> = undefined, onCustomSuccess: (sender: any, responce: my.dts.connResponce) => any = undefined) {
                if (this.CacheStorage != "Exist") {
                    setTimeout(function waytingToInitLocalCache() {
                        if (this.CacheStorage != "NotInit") {
                            setTimeout(waytingToInitLocalCache.bind(this), 30);
                        }
                        else {
                            if (this.CacheStorage == "Exist") {
                                this.PrepeareData();
                            }
                        }
                    }.bind(this), 30);
                }
                else {
                    this.PrepeareData();
                }
            }

            delData(uid: string, table: string, onSuccesshandler: Function) {
                var tableName: string;
                if (table) {
                    tableName = table;
                }
                else {
                    tableName = this.ds.primaryTable;
                }
                //remove data from localDb
                if (this._cacheStorage == "Exist") {
                    this.localDb.removeData(this.generateCacheTableName(tableName), uid);
                }

                //remove data from data
                var localObservableArray: object[] = this.data[tableName];
                var localDataIndex = localObservableArray.findIndex(x => x["UID"] == uid);
                if (localDataIndex != -1) {
                    localObservableArray.splice(localDataIndex, 1);
                    this.data[tableName] = localObservableArray;
                }

                var tableNameDataToSend: string = tableName + "_DataToSend";
                var tableNameSendData: string = tableName + "_SendData";

                var lstTable: TableSchemaInfo[] = new Array();
                var schema: TableSchemaInfo = new TableSchemaInfo();
                schema.tableName = tableNameDataToSend;
                schema.tableKey = "UID";
                schema.AutoIncrementKey = false;
                lstTable.push(schema);

                schema = new TableSchemaInfo();
                schema.tableName = tableNameSendData;
                schema.tableKey = "UID";
                schema.AutoIncrementKey = false;
                lstTable.push(schema);

                var url = this.ds.server.url;

                this.localDb.createTableIfNotExist(lstTable, function () {
                    var dataPakage = new LocalDataPackage();
                    dataPakage.JSON = uid;
                    dataPakage.UID = my.tools.newGuid();
                    dataPakage.DateCreated = new Date();
                    dataPakage.TableName_DataToSend = tableNameDataToSend;
                    dataPakage.TableName_SendData = tableNameSendData;
                    dataPakage.SyncType = "Delete";
                    dataPakage.ServerTableName = tableName;
                    this.localSyncManager.addSyncRow(url, dataPakage);
                    this.localDb.saveData(tableNameDataToSend, dataPakage, onSuccesshandler);
                }.bind(this));
            }
            ///end dataSet implement

            private saveDataInCache(lstTableNames: string[], data: object, loadAllData: boolean) {
                var lstTable: TableSchemaInfo[] = new Array();

                lstTableNames.forEach((tableName, ind) => {
                    if (this.stack.findIndex(x => (x == this.generateCacheTableName(tableName))) == -1) {
                        this.stack.push(this.generateCacheTableName(tableName));
                        var schema: TableSchemaInfo = new TableSchemaInfo();
                        schema.tableName = this.generateCacheTableName(tableName);
                        schema.tableKey = "UID";
                        schema.AutoIncrementKey = false;
                        lstTable.push(schema);
                    }
                });


                if (lstTable.length > 0) {
                    if (loadAllData) {
                        var schema: TableSchemaInfo = new TableSchemaInfo();
                        schema.tableName = this._cacheTableName;
                        schema.tableKey = "URL";
                        schema.AutoIncrementKey = false;
                        lstTable.push(schema);

                        var saveSyncDate: CacheDataRecord = new CacheDataRecord();
                        saveSyncDate.DateSync = new Date();
                        saveSyncDate.URL = this.ds.url;
                        data[schema.tableName] = new Array().push(saveSyncDate);
                    };

                    this.localDb.createTableIfNotExist(lstTable, () => {
                        lstTableNames.forEach((tableName, i) => {
                            if (loadAllData) {
                                this.localDb.clearData(this.generateCacheTableName(tableName));
                            }
                            var array: object[] = data[tableName];
                            if (array) {
                                array.forEach((itm, i) => {
                                    this.localDb.saveData(this.generateCacheTableName(tableName), itm);
                                })
                            }
                            this.stack.splice(this.stack.findIndex(x => x == this.generateCacheTableName(tableName)), 1);
                        })

                        //update last sync date
                        if (loadAllData) {
                            var saveSyncDate: CacheDataRecord = new CacheDataRecord();
                            saveSyncDate.DateSync = new Date();
                            saveSyncDate.URL = this.ds.url;
                            this.localDb.saveData(this._cacheTableName, saveSyncDate);
                        }
                    });
                }
            }

            private onErrorHandler() {
                my.events.global.standard.dispatch(this, this.eventNotificationCode);
            }

            private loadData() {
                if (this.localDb.existTable(this._cacheTableName)) {
                    this.localDb.getData(this._cacheTableName, (data: any[]) => {
                        var index: number = data.findIndex(x => x["URL"] == this.ds.url);
                        var cacheDataRecord: CacheDataRecord;
                        if (index != -1) {
                            cacheDataRecord = data[index];
                        }
                        var loadDataFromCache: boolean;
                        if (cacheDataRecord) {
                            var milisecondByLastSync = new Date().getTime() - cacheDataRecord.DateSync.getTime();
                            if (milisecondByLastSync / 60000 > this._expiredInMinutes) {
                                loadDataFromCache = false;
                            }
                            else {
                                loadDataFromCache = true;
                            }
                        }
                        else {
                            loadDataFromCache = false;
                        }

                        //if has not expired local cache or has offline date which not sync
                        if (loadDataFromCache
                            || this.localSyncManager.HasNoSyncData) {
                            this.loadDbCacheData((loadData: boolean) => {
                                if (loadData) {
                                    this._cacheStorage = "Exist";
                                } else {
                                    console.log("Unexpected situation!!");
                                }
                            });
                        }
                        else {
                            this._cacheStorage = "Expired";
                        }
                    });
                }
                else {
                    this._cacheStorage = "NotExist";
                }
            }

            private loadDbCacheData(OnResponse: Function) {
                var allData: object = new Object();
                var index = -1;
                this.ds.tableNames.forEach((tableName, ind) => {
                    if (this.localDb.existTable(this.generateCacheTableName(tableName))) {
                        this.localDb.getData(this.generateCacheTableName(tableName),
                            (data: any[]) => {
                                allData[tableName] = data;
                                index = index + 1;
                                if (index == this.ds.tableNames.length - 1) {
                                    this.data = allData;
                                    OnResponse(true);
                                }
                            });
                    } else {
                        OnResponse(false);
                    }
                });
            }

            /// start Prepeare data to show
            private PrepeareData() {
                var showArray: object[] = this.data[this.ds.primaryTable];

                //start apply filter if exist
                showArray = this.FilteringData(showArray);

                ///start apply sorting
                showArray = this.SortingData(showArray);

                ///start paging
                showArray = this.PagingData(showArray);

                var allData: Object = new Object();
                this.ds.tableNames.forEach((tableName, ind) => {
                    if (tableName != this.ds.primaryTable) {
                        allData[tableName] = this.data[tableName];
                    }
                });
                allData[this.ds.primaryTable] = showArray;
                this.ds.data = allData;
            }

            private FilteringData(showArray: object[]): object[] {
                var filter: Array<my.data.Filter> = this.ds.filtersForRequest;
                if (filter.length > 0) {
                    var filterArray: object[] = [];
                    var hasFilter: Boolean = false;
                    filter.forEach((itm, ind) => {
                        if (itm.column &&
                            itm.value != "") {
                            hasFilter = true;
                            var splitFilter: string[] = itm.column.split(",");
                            splitFilter.forEach((filter, ind) => {
                                var tempFilter = showArray.filter(
                                    x => {
                                        if (<string>x[filter] != null) {
                                            //this (x[filter]+"") convert to string <string>(x[filter]) not work 
                                            return (x[filter] + "").toLocaleLowerCase().indexOf(itm.value.toLocaleLowerCase()) != -1;
                                        }
                                        else {
                                            return false;
                                        }
                                    });
                                if (tempFilter.length > 0) {
                                    if (filterArray.length == 0) {
                                        filterArray = tempFilter;
                                    }
                                    else {
                                        filterArray.concat(tempFilter);
                                    }
                                }
                            });
                        }
                    });
                    if (hasFilter) {
                        showArray = filterArray;
                    }
                }

                return showArray;
            }

            private SortingData(showArray: object[]): object[] {
                var allfilter = this.ds.sortby;
                if (!allfilter) {
                    return showArray;
                }
                var splitFilter: string[] = allfilter.split(" ");
                var filterColumn;
                var filterSort = "asc";
                if (splitFilter.length > 0) {
                    filterColumn = splitFilter[0];
                }
                if (splitFilter.length > 1) {
                    filterSort = splitFilter[1];
                }

                showArray = showArray.sort((n1, n2) => {
                    var el1: string = n1[filterColumn] + "";
                    var el2: string = n2[filterColumn] + "";
                    if (el1 == null) { el1 = ""; }
                    if (el2 == null) { el2 = ""; }

                    if (filterSort == "asc") {
                        return el1.localeCompare(el2);
                    } else {
                        return el1.localeCompare(el2) * -1;
                    }
                });

                return showArray;
            }

            private PagingData(showArray: object[]): object[] {
                if (!this.ds.pageSize) {
                    return showArray;
                }
                var elementOnPage = showArray.length - ((this.ds.page) * this.ds.pageSize);
                if (elementOnPage > 0) {
                    elementOnPage = this.ds.pageSize;
                } else {
                    elementOnPage = this.ds.pageSize + elementOnPage;
                }


                var pagingArray = showArray.slice(
                    ((this.ds.page - 1) * this.ds.pageSize),
                    ((this.ds.page - 1) * this.ds.pageSize) + elementOnPage);

                var scalable: number = showArray.length / this.ds.pageSize;
                var pCount: number = Math.trunc(scalable);
                if (showArray.length - (pCount * this.ds.pageSize) > 0) {
                    pCount = pCount + 1;
                }

                pagingArray.forEach((itm, ind) => {
                    itm["pCount"] = pCount;
                    itm["pCurrent"] = this.ds.page;
                    itm["TotalCnt"] = showArray.length;
                });

                //showArray[this.ds.primaryTable] = pagingArray;

                return pagingArray;
            }
            /// end Prepeare data to show

            private generateServerPakage(data: any, tableName: string): any {
                //reformat the objectto contain table name
                var jsonTable = {};
                var _arr: Array<Object> = [];
                _arr.push(data);
                jsonTable[tableName] = _arr;
                return jsonTable;
            }

            private finalizeSync(url: string, retryRecords: LocalDataPackage[], failedRecords: LocalDataPackage[]) {
                retryRecords.forEach((itm, ind) => {
                    this.localSyncManager.addSyncRow(url.replace("*/Sync/*", ""), itm, this._backgroundSyncDateStart);
                });

                failedRecords.forEach((itm, ind) => {
                    this.localSyncManager.addFailedRow(url.replace("*/Sync/*", ""), itm, this._backgroundSyncDateStart);
                });

                this.localDb.removeData(LocalSyncManager.MasterTableName, url);

                var count = this.localSyncManager.CountWaitingDataToSync(this._backgroundSyncDateStart);
                if (count == 0) {
                    this._backgroundSyncDateStart = undefined;
                    if (this._responseBackgroundSync != undefined) {
                        this._responseBackgroundSync("Waiting to sync: " +
                            this.localSyncManager.CountWaitingDataToSync() + "record");
                    }
                }
            }

            private startBackgroundSyncThread() {
                let syncProcess = setTimeout(function syncFunction() {
                    console.log("start local sync data");
                    this.syncWaitingData();
                    syncProcess = setTimeout(syncFunction.bind(this), 60000); // (*)
                }.bind(this), 60000);
            }

            private syncWaitingData() {
                if (this._backgroundSyncDateStart == undefined) {
                    this._backgroundSyncDateStart = new Date();
                    this.localDb.getData(LocalSyncManager.MasterTableName, this.readSyncData.bind(this));
                }
            }

            private readSyncData(data: any[]) {
                //foreach all table request sync
                data.forEach((itm, idx) => {
                    var tableRecord: MasterSyncPakage = itm;

                    if (tableRecord.URL.indexOf("*/Sync/*") == -1) {
                        this.localDb.removeData(LocalSyncManager.MasterTableName, tableRecord.URL);
                        this.localSyncManager.removeSyncRow(tableRecord.URL);

                        tableRecord.URL = tableRecord.URL + "*/Sync/*";
                        this.localDb.saveData(LocalSyncManager.MasterTableName, tableRecord);
                    }

                    var failedRecords: LocalDataPackage[] = new Array();
                    var retryRecords: LocalDataPackage[] = new Array();
                    var index = -1;
                    this.localDb.getData(tableRecord.TableName_DataToSend, (response: any) => {
                        var lstRecordNeedSync: LocalDataPackage[] = response;
                        //order records by date
                        if (lstRecordNeedSync.length == 0) {
                            this.finalizeSync(tableRecord.URL, retryRecords, failedRecords);
                            return;
                        }

                        lstRecordNeedSync = lstRecordNeedSync.sort((n1, n2) => {
                            let d1 = new Date(n1.DateCreated); let d2 = new Date(n2.DateCreated);

                            // Check if the dates are equal
                            let same = d1.getTime() === d2.getTime();
                            if (same) {
                                return 0;
                            } else if (d1 > d2) {
                                return 1;
                            } else {
                                return -1
                            };
                        });
                        lstRecordNeedSync.forEach((itm, ind) => {
                            //because all data store in one table need filter. 
                            //When logic save data in differnt table must remove this
                            if (tableRecord.UidToSync.findIndex(x => x == itm.UID) == -1) {
                                return;
                            }

                            console.log("Send data create on: " + itm.DateCreated + ". Data:" + itm.JSON);
                            if (itm.SyncType == "Commit"
                                || itm.SyncType == "Add") {
                                var dts: my.dts.conn = new my.dts.conn(tableRecord.URL.replace("*/Sync/*", ''));
                                var sendDataObject;
                                sendDataObject = JSON.parse(itm.JSON);

                                Object.keys(sendDataObject).forEach((itm, ind) => {
                                    if (sendDataObject[itm] == "undefined") {
                                        sendDataObject[itm] = undefined;
                                    }
                                });
                                dts.putDataTable(
                                    this.generateServerPakage(sendDataObject, itm.ServerTableName),
                                    //success
                                    (sender: any, responce: my.dts.connResponce) => {
                                        index = index + 1;
                                        if (responce.result) {
                                            this.localDb.removeData(itm.TableName_DataToSend, itm.UID);
                                            itm.SyncDate = new Date();
                                            this.localDb.saveData(itm.TableName_SendData, itm);
                                        } else {
                                            //server responce is OK but returned object = false = server logic was unable to do something
                                            itm.LastErrorSync = new Date();
                                            failedRecords.push(itm);
                                        }

                                        if (index == lstRecordNeedSync.length - 1) {
                                            this.finalizeSync(tableRecord.URL, retryRecords, failedRecords);
                                        }

                                    },
                                    //error
                                    (sender: any, responce: my.dts.connResponce) => {
                                        index = index + 1;
                                        itm.LastErrorSync = new Date();
                                        retryRecords.push(itm);
                                        if (index == lstRecordNeedSync.length - 1) {
                                            this.finalizeSync(tableRecord.URL, retryRecords, failedRecords);
                                        }
                                    }
                                );
                            } else if (itm.SyncType == "Delete") {
                                var dts: my.dts.conn = new my.dts.conn(tableRecord.URL.replace("*/Sync/*", ''));
                                dts.delete(
                                    itm.JSON,
                                    undefined,
                                    //success
                                    (sender: any, responce: my.dts.connResponce) => {
                                        index = index + 1;
                                        if (responce.result) {
                                            this.localDb.removeData(itm.TableName_DataToSend, itm.UID);
                                            itm.SyncDate = new Date();
                                            this.localDb.saveData(itm.TableName_SendData, itm);
                                        } else {
                                            //server responce is OK but returned object = false = server logic was unable to do something
                                            itm.LastErrorSync = new Date();
                                            failedRecords.push(itm);
                                        }

                                        if (index == lstRecordNeedSync.length - 1) {
                                            this.finalizeSync(tableRecord.URL, retryRecords, failedRecords);
                                        }

                                    },
                                    //error
                                    (sender: any, responce: my.dts.connResponce) => {
                                        index = index + 1;
                                        itm.LastErrorSync = new Date();
                                        retryRecords.push(itm);
                                        if (index == lstRecordNeedSync.length - 1) {
                                            this.finalizeSync(tableRecord.URL, retryRecords, failedRecords);
                                        }
                                    }
                                );
                            }
                        });
                    });
                });

            }

            private generateCacheTableName(tableName: string): string {
                return tableName + "_" + this.ds.url;
            }
        }; //  end class LocalDataSet

    }; // namespace data 

};//  end namespace my 