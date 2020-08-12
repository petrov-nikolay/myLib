/// <reference path="myData.ts" />
namespace my {
    "use strict";
    export namespace data {

        export class TableSchemaInfo {
            tableName: string;
            tableKey: string;
            AutoIncrementKey: boolean;
        }

        export class LocalDb {
            private indexedDB: IDBFactory;
            private db: IDBDatabase;
            private request: IDBOpenDBRequest;

            private _onSuccess = undefined;
            private _databaseName: string;
            private _processingChangeDBVersion: boolean = false;

            private static instance: LocalDb;

            public static getInstance(DatabaseName: string, onSuccess = undefined): LocalDb {
                if (!LocalDb.instance) {
                    LocalDb.instance = new LocalDb(DatabaseName, onSuccess);
                } else {
                    setTimeout(function tick() {
                        if (!LocalDb.instance.db) {
                            setTimeout(tick, 30);
                        } else {
                            onSuccess();
                        }
                    }, 30);
                }

                return LocalDb.instance;
            }

            private constructor(DatabaseName: string, onSuccess = undefined) {
                this._onSuccess = onSuccess;
                this._databaseName = DatabaseName;

                this.indexedDB = window.indexedDB;

                this.request = indexedDB.open(DatabaseName);

                this.request.onerror = this.OnErrorInitDb.bind(this);
                this.request.onupgradeneeded = function (event) {
                    //var db = this.result;
                    //db.createObjectStore("SyncQuery", { keyPath: "URL", autoIncrement: true });
                };
                this.request.onsuccess = this.OnSuccessInitDb.bind(this);
            }

            createTableIfNotExist(createTables: TableSchemaInfo[], onSuccess = undefined) {
                if (this.db) {
                    setTimeout(function waytingToInitLocalCache() {
                        if (this._processingChangeDBVersion) {
                            setTimeout(waytingToInitLocalCache.bind(this), 30);
                        }
                        else {
                            this._processingChangeDBVersion = true;

                            var lstTableToCreate: TableSchemaInfo[] = new Array();
                            createTables.forEach((element, ind) => {
                                if (!this.db.objectStoreNames.contains(element.tableName)) {
                                    lstTableToCreate.push(element);

                                }
                            });

                            if (lstTableToCreate.length > 0) {
                                var dbVesion = this.db.version;
                                this.db.close();
                                this._onSuccess = onSuccess;
                                dbVesion = dbVesion + 1;
                                this.request = indexedDB.open(this._databaseName, dbVesion);
                                this.request.onerror = this.OnErrorInitDb.bind(this);
                                this.request.onsuccess = this.OnSuccessInitDb.bind(this);
                                this.request.onupgradeneeded = function (event) {
                                    var db = this.result;
                                    lstTableToCreate.forEach((element, ind) => {
                                        if (element.AutoIncrementKey) {
                                            db.createObjectStore(element.tableName, { keyPath: element.tableKey, autoIncrement: true });
                                        }
                                        else {
                                            db.createObjectStore(element.tableName, { keyPath: element.tableKey });
                                        }
                                    });
                                };
                            }
                            else {
                                this._processingChangeDBVersion = false;
                                onSuccess();
                            }
                        }
                    }.bind(this), 30);


                }
            }

            existTable(tableName: string): boolean {
                if (this.db.objectStoreNames.contains(tableName)) {
                    return true;
                }
                else {
                    return false;
                }
            }

            saveData(tableName: string, data: any, onSuccess = undefined, onError = undefined) {
                setTimeout(function waytingToInitLocalCache() {
                    if (this._processingChangeDBVersion) {
                        setTimeout(waytingToInitLocalCache.bind(this), 30);
                    }
                    else {
                        var transaction = this.db.transaction([tableName], "readwrite");
                        var objectStore = transaction.objectStore(tableName);

                        var saveRequest = objectStore.put(data);
                        saveRequest.onsuccess = onSuccess;
                        saveRequest.onerror = onError;
                    }
                }.bind(this), 30)
            }

            getData(tableName: string, onSuccess = undefined) {
                var transaction = this.db.transaction([tableName], "readonly");
                var objectStore = transaction.objectStore(tableName);

                objectStore.getAll().onsuccess = function (event) {
                    onSuccess(this.result, tableName);
                };
            }

            getDataByKey(tableName: string, key: any, onSuccess = undefined) {
                if (this.existTable(tableName)) {
                    var transaction = this.db.transaction([tableName], "readonly");
                    var objectStore = transaction.objectStore(tableName);

                    objectStore.get(key).onsuccess = function (event) {
                        onSuccess(this.result)
                    };
                }
                else {
                    onSuccess(undefined);
                }
            }

            removeData(tableName: string, key: any) {
                var transaction = this.db.transaction([tableName], "readwrite");
                var objectStore = transaction.objectStore(tableName);
                objectStore.delete(key);
            }

            clearData(tableName: string) {
                var transaction = this.db.transaction([tableName], "readwrite");
                var objectStore = transaction.objectStore(tableName);
                objectStore.clear();
            }

            private OnSuccessInitDb() {
                this._processingChangeDBVersion = false;
                this.db = this.request.result;
                this._onSuccess();
            }

            private OnErrorInitDb() {
                console.log("Error init local DB");
            }
        }
    }
}