/// <reference path="Data.ts" />
/// <reference path="../myDts.ts" />

namespace my {
    "use strict";


    export namespace data {


        export class ServerDataSet {

            ds: my.data.iDataSet;
            dts: my.dts.conn;
            eventNotificationCode: string = "DataSet"

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(val: string) {
                if (!this.dts) {
                    this._url = val;
                    this.dts = new my.dts.conn(val);
                } else {
                    this.dts.url = val;
                }
            }



            constructor(val: my.data.iDataSet) {
                this.ds = val;
            }




            //#region GET Server



            /**
             * calls GET request from server
             *
             * @param {Array<object>} [params=undefined]
             * @param {(sender: any, responce: my.dts.connResponce) => any} [onCustomSuccess=undefined] this is only used for the specific call and not going to replace the default success handlers
             * @memberof svrDataSet
             */
            getData(params: Array<object> = undefined, onCustomSuccess: (sender: any, responce: my.dts.connResponce) => any = undefined) {
                // if (params == undefined) {
                //     params = this._getDefaultParams();
                // }

                if (onCustomSuccess) {
                    this.dts.get(onCustomSuccess, this._onErrorGet.bind(this), params);
                } else {
                    this.dts.get(this._onSuccessGet.bind(this), this._onErrorGet.bind(this), params);
                }


            }

            private _onSuccessGet(sender: any, responce: my.dts.connResponce) {
                if (responce.result) {
                    this._parseServerDataResponce(responce.data);
                } else {
                    this._onErrorGet(this, responce.details, responce);
                }
            };

            //onError: my.dts.iCommErrorHandler;
            private _onErrorGet(sender: any, code: string, responce: my.dts.connResponce) {
                my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
            }

            private _parseServerDataResponce(data: any) {
                //convert data to iDataset
                var dsObject: Object = {};

                this.ds.tableNames.forEach((itm, idx) => {
                    if (data[itm]) {  // we have the table in the server responce 
                        dsObject[itm] = data[itm];
                    } else {
                        console.log(" can't find table: " + itm + " in the server responce");
                    }
                });


                this.ds.data = dsObject;


            }

            private _getDefaultParams(): Array<object> {
                var ret = [];
                var strDataParams: string = "";
                var obj = {};

                if (this.ds.paramsGetData) {
                    this.ds.paramsGetData.forEach((itm: any, idx) => {
                        obj[itm.name] = itm.value;
                        ret.push({ [itm.name]: itm.value }); // as array
                    });
                }
                // mandatory sequence= data/page/{page?}/sortby/{sortCols?}/filterby/{filters?}
                if (this.ds.page) {
                    //ret.push({ 'page': this.ds.page });
                    strDataParams = "page=" + this.ds.page;
                }
                if (this.ds.pageSize) {
                    if (strDataParams.length > 0) {
                        strDataParams = strDataParams + "/";
                    }
                    strDataParams = strDataParams + "pageSize=" + this.ds.pageSize;
                }

                if (this.ds.sortby) {
                    //ret.push({ 'sortby': this.ds.sortby });
                    if (strDataParams.length > 0) {
                        strDataParams = strDataParams + "/";
                    }
                    strDataParams = strDataParams + "sortby=" + this.ds.sortby;
                }

                if (this.ds.filtersForRequest) {

                    var f: string = "";

                    this.ds.filtersForRequest.forEach((itm: my.data.Filter, idx) => {
                        if (idx != 0) {
                            f = f + ";";
                        }
                        //f = f + itm.column + ":" + itm.value;
                        if ((itm.column) && (itm.value)) {
                            f = f + itm.column + ":" + itm.value;
                        }

                    });

                    //ret.push({ 'filterby': f });
                    if (strDataParams.length > 0) {
                        strDataParams = strDataParams + "/";
                    }
                    strDataParams = strDataParams + "filterby=" + f;

                }
                strDataParams = my.tools.B64Encode(strDataParams);
                ret.push({ 'dp': strDataParams });
                return ret;
            }



            //#endregion




            //#region SEND Server

            private _parseSendData(row: my.data.DataRow | Array<my.data.DataRow>): any {
                var ret;
                if (Array.isArray(row)) {
                    console.error("not supporting Arrays at the moment!");
                } else {
                    ret = row.getAsJSONReadyObject();
                }

                return ret;
            }


            sendData(dRow: my.data.DataRow, onSuccesshandler: Function, onHTTPError: Function = undefined) {
                //make shure data is 1 or more datarows - single value will not work 
                var isInsert: boolean = true;
                var sendData = this._parseSendData(dRow);
                // if (Array.isArray(dRow)) {
                //     if (dRow[0].RowState == "Modified") {
                //         isInsert = false;
                //     }
                // } else {
                if (dRow.RowState == "Modified") {
                    isInsert = false;
                }
                //}


                if (isInsert) {
                    this._sendDataNew(sendData, onSuccesshandler, (requestData, responce: my.dts.connResponce) => {
                        // on http error push to offline logic
                        this._sendOffline(dRow, onSuccesshandler, responce);
                    });
                } else {
                    this._sendDataUpdate(sendData, onSuccesshandler, (requestData, responce: my.dts.connResponce) => {
                        // on http error push to offline logic
                        this._sendOffline(dRow, onSuccesshandler, responce);
                    });
                }


            }


            private _sendDataNew(sendData, onSuccesshandler: Function, onHTTPError: Function = undefined) {
                this.dts.postDataTable(sendData, (sender: any, responce: my.dts.connResponce) => {
                    if (responce.result) {
                        if (onSuccesshandler) {
                            onSuccesshandler(responce);
                        }
                        this._onSuccessSend(sender, responce);
                    } else {
                        // server responce is OK but returned object = false = server logic was unable to do something
                        // we do nothing in this case but send the global event
                        // only coomunication errors will be caling calbaks
                        my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
                    }

                },
                    (sender: any, responce: my.dts.connResponce) => {
                        if (onHTTPError) {
                            onHTTPError(sendData, responce);
                        }
                        this._onErrorSend.bind(this);
                    });
            }

            private _sendDataUpdate(sendData, onSuccesshandler: Function, onHTTPError: Function = undefined) {
                this.dts.putDataTable(sendData, (sender: any, responce: my.dts.connResponce) => {
                    if (responce.result) {
                        if (onSuccesshandler) {
                            onSuccesshandler(responce);
                        }
                        this._onSuccessSend(sender, responce);
                    } else {
                        // server responce is OK but returned object = false = server logic was unable to do something
                        // we do nothing in this case but send the global event
                        // only coomunication errors will be caling calbaks
                        my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
                    }

                },
                    (sender: any, responce: my.dts.connResponce) => {
                        if (onHTTPError) {
                            onHTTPError(sendData, responce);
                        }
                        this._onErrorSend.bind(this);
                    });
            }


            private _onSuccessSend(sender: any, responce: my.dts.connResponce) {
                my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
            }

            private _onErrorSend(sender: any, responce: my.dts.connResponce) {
                my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
            }


            private _sendOffline(row: my.data.DataRow, onSuccesshandler: Function, responce: my.dts.connResponce) {
                if (this.ds.local) {
                    this.ds.local.sendData(row, onSuccesshandler);
                } else {
                    this._onErrorSend(this, responce); // normal error
                }
            }

            //#endregion



            //#region DEL Server

            delData(uid: string, table: string, onSuccesshandler: Function) {
                this.dts.delete(uid, table, (sender: any, responce: my.dts.connResponce) => {
                    if (responce.result) {
                        if (onSuccesshandler) {
                            onSuccesshandler();
                        }
                        this._onSuccessDelete.bind(this)
                    } else {
                        //server responce is OK but something in the logic is failing
                        my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
                    }

                }, this._onErrorDelete.bind(this));
            }

            private _onSuccessDelete(sender: any, responce: my.dts.connResponce) {
                my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
            }

            private _onErrorDelete(sender: any, responce: my.dts.connResponce) {
                my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
            }

            //#endregion



        }; //  end class svrDataSet




    }; // namespace data 

};//  end namespace my 