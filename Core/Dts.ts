/// <reference path="Tools.ts" />


namespace my {
    "use strict";

    export namespace dts {


        export interface iCommHandler {
            //(sender: any, responce: my.dts.connResponce): any;
            (sender: any, responce: iDtsResponce): any;
        }



        export interface iDtsResponce {
            result: boolean;
            text: string;
            details: string;
            data: any;
            xhr: XMLHttpRequest;
        }

        export class connResponce {
            result: boolean = false;
            text: string = "invaid format from server responce";
            details: string = "";
            data: any;
            xhr: XMLHttpRequest;

            constructor(strJSON: string) {

                var sJSON = this._parseJSON(strJSON);

                if (sJSON) {
                    if (sJSON.result) {
                        this.result = sJSON.result;
                    }
                    if (sJSON.text) {
                        this.text = sJSON.text;
                    }
                    if (sJSON.details) {
                        this.details = sJSON.details;
                    }
                    if (sJSON.result) {
                        this.data = sJSON.data;
                    }
                } else {
                    this.result = true;
                    this.data = strJSON;
                }
            }


            private _parseJSON(str): any {
                var resp;
                try {
                    resp = JSON.parse(str);
                } catch (e) {
                    return undefined;
                }
                return resp;
            }

        }; //end class svrResponce 




    }; // end namespace dts





    export namespace core {
        export namespace dts {

            export class core {

                id: string;
                url: string;
                type: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE' = 'POST';
                data: Array<Object> | string;
                token: string;

                onError: my.dts.iCommHandler;
                onSuccess: my.dts.iCommHandler;

                headers: Array<{ Key: string, Value: string }> = [];

                Call() {

                    var self = this;
                    var xhr = new XMLHttpRequest();

                    xhr.open(this.type, this.url, true);
                    if ((this.type == 'POST') || (this.type == 'PUT')) {
                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        //xhr.setRequestHeader("Content-type", "application/javascript");
                        //xhr.setRequestHeader("Content-type", "application/json");
                    }

                    if (this.headers.length > 0) {
                        this.headers.forEach((itm: { Key: string, Value: string }, idx) => {
                            xhr.setRequestHeader(itm.Key, itm.Value);
                        });
                    }
                    // var sCookie = my.tools.getCookie("x-access-token")
                    // if (sCookie) {
                    //     xhr.setRequestHeader("x-access-token", sCookie);
                    // }


                    if (this.token) {
                        xhr.setRequestHeader("x-access-token", this.token);
                    }


                    xhr.onreadystatechange = function () {

                        if (xhr.readyState === XMLHttpRequest.DONE) //wait for all states of communication to finish 
                        {
                            if (xhr.status === 200) {

                                self._onSuccess(xhr);
                                console.log("recponce received from: " + self.url);

                            } else {  //error hadler
                                //self._onError(xhr);
                                if (xhr.status === 401) {
                                    self._onError401(xhr);
                                }

                                console.log("onreadystatechange.status: " + xhr.status)
                            }
                        } else {
                            //console.log("xhr.readyState: " + xhr.readyState);
                        }
                    } // end onreadystatechange

                    xhr.onerror = function (a) {
                        tools.log("DTS error: " + xhr.statusText);
                        self._onError(xhr);
                    }

                    //xhr.withCredentials = true;


                    if (typeof (this.data) == "string") {
                        xhr.send(this.data);
                    } else {
                        // VERY IMPORTANT TO USE THIS SERIALIZE - WILL BREAK POS of forms and normal comms with controlers if not used
                        xhr.send(this.serialize(this.data));
                    }


                };

                onError401: my.dts.iCommHandler;
                private _onError401(xhr: XMLHttpRequest): void {
                    var cRes = new my.dts.connResponce("{}");
                    cRes.text = "server not autorized";
                    cRes.details = "status:" + xhr.status + ", " + xhr.statusText;

                    my.events.global.standard.dispatch(this, "error:401", cRes);
                    if (this.onError401) {
                        this.onError401(this, cRes);
                    }
                    console.log(xhr.status);
                };


                private _onError(xhr: XMLHttpRequest): void {
                    var cRes = new my.dts.connResponce("{}");
                    cRes.text = "server error";
                    cRes.details = "status:" + xhr.status + ", " + xhr.statusText;
                    if (this.onError) {
                        this.onError(this, cRes);
                    }
                    console.log(xhr.status);
                };



                private _onSuccess(xhr: XMLHttpRequest): void {
                    var cRes = new my.dts.connResponce(xhr.responseText);
                    cRes.xhr = xhr;
                    if (cRes.result) {
                        if (this.onSuccess) {
                            this.onSuccess(this, cRes);
                        }
                    } else {  // we have responce from server but it is false and we passing it as error
                        if (this.onError) {
                            this.onError(this, cRes);
                        }
                    }
                };


                public serialize(obj: object) {
                    var str = [];
                    for (var p in obj)
                        if (obj.hasOwnProperty(p)) {
                            //str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            str.push(p + "=" + obj[p]);
                        }
                    return str.join("&");
                }





            }; // end class core



        }; // end namespace dts
    }; // end namespace core


};//  end namespace my