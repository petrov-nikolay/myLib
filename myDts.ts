/// <reference path="Core/Dts.ts" />


namespace my {
    "use strict";

    export namespace dts {

        export class conn { // handle input outut of communication


            urlGet: string;
            urlPost: string;
            urlCommit: string;
            urlDelete: string;

            set url(val: string) {
                this.urlGet = val;
                this.urlPost = val;
                this.urlCommit = val;
                this.urlDelete = val;
            }

            token: string;



            private _getDTS: my.core.dts.core;
            private _postDTS: my.core.dts.core;

            constructor(url: string) {
                this.url = url;

                this.token = my.tools.getCookie("x-access-token"); // use token if available
            }

            get(onSuccess = undefined, onError = undefined, params: Array<object> = undefined): void {
                this._getDTS = new my.core.dts.core();
                this._getDTS.url = this.urlGet;
                this._getDTS.token = this.token;
                this._getDTS.type = 'GET';
                if (params) {
                    this._getDTS.url = this._getDTS.url + "/" + this._URLFriendly(params);
                }
                this._getDTS.onSuccess = onSuccess;
                this._getDTS.onError = onError;
                this._getDTS.Call();
            };


            post(data: any, onSuccess = undefined, onError = undefined): void {
                this._postDTS = new my.core.dts.core();
                this._postDTS.url = this.urlPost;
                this._postDTS.token = this.token;
                this._postDTS.type = 'POST';
                this._postDTS.data = data;
                this._postDTS.onSuccess = onSuccess;
                this._postDTS.onError = onError;
                this._postDTS.Call();
            };
            postDataTable(data: any, onSuccess = undefined, onError = undefined): void {
                this._postDTS = new my.core.dts.core();
                this._postDTS.url = this.urlPost;
                this._postDTS.token = this.token;
                this._postDTS.type = 'POST';
                this._postDTS.data = this._formatData(data, 'COMMIT');
                this._postDTS.onSuccess = onSuccess;
                this._postDTS.onError = onError;
                this._postDTS.Call();
            };

            put(data: any, onSuccess = undefined, onError = undefined): void {
                this._postDTS = new my.core.dts.core();
                this._postDTS.url = this.urlCommit;
                this._postDTS.token = this.token;
                this._postDTS.type = 'PUT';
                this._postDTS.data = data;
                this._postDTS.onSuccess = onSuccess;
                this._postDTS.onError = onError;
                this._postDTS.Call();
            };
            putDataTable(data: any, onSuccess = undefined, onError = undefined): void {
                this._postDTS = new my.core.dts.core();
                this._postDTS.url = this.urlCommit;
                this._postDTS.token = this.token;
                this._postDTS.type = 'PUT';
                this._postDTS.data = this._formatData(data, 'COMMIT');
                this._postDTS.onSuccess = onSuccess;
                this._postDTS.onError = onError;
                this._postDTS.Call();
            };

            delete(uid: any, table: string, onSuccess = undefined, onError = undefined): void {
                this._postDTS = new my.core.dts.core();
                if (table !== undefined) {
                    this._postDTS.url = this.urlDelete + "/" + this._URLFriendly([{ "del": uid, "table": table }]);
                } else {
                    this._postDTS.url = this.urlDelete + "/" + this._URLFriendly([{ "del": uid }]);
                }
                this._postDTS.token = this.token;
                this._postDTS.type = 'DELETE';
                //this._postDTS.data = this._formatData(data, 'DELETE' );
                this._postDTS.data = this._formatData({ "tableDel": table }, 'DELETE');
                this._postDTS.onSuccess = onSuccess;
                this._postDTS.onError = onError;
                this._postDTS.Call();
            };


            private _formatData(data: any, type: 'COMMIT' | 'DELETE' = 'COMMIT'): any {
                var obj = {};
                obj['requestType'] = type;
                var rData = {};
                var _arr: Array<Object> = [];

                switch (type) {
                    case 'COMMIT':
                        {
                            // if we start pushing multiple tables this must check and reformat tha data
                            // for now just 1 row is supported
                            //_arr.push(data);

                            //rData['tbl'] = _arr;
                            rData = data; // data comes formated corectly
                            break;
                        }
                    default:
                        {
                            rData = data;
                        }
                }

                obj['requestData'] = my.tools.B64Encode(JSON.stringify(rData));
                return obj;
            }


            private _URLFriendly(arr: Array<object>): string {
                var str = [];
                arr.forEach((itm, idx) => {
                    for (var prop in itm) {
                        var v = itm[prop];

                        if (v !== null) { // we have a value 
                            if (prop == "") {
                                str.push(encodeURIComponent(v));

                            } else {
                                str.push(encodeURIComponent(prop) + "/" + encodeURIComponent(v));
                            }
                        }

                    }
                });

                return str.join("/");
            }


        }; // end class conn




    }; // end namespace data
};//  end namespace my