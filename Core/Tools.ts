namespace my {
    "use strict";

    export class tools {

        static newGuid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        static newShortCode(length: number = 6, caseSensitive: boolean = false): string {
            //var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            //var ALPHABET = '23456789abdegjkmnpqrvwxyzABDEGJKMNPQRVWXYZ';  //clear letters so no language words can be generated
            var ALPHABET = '23456789abdegjkmnpqrvwxyz';  //case insesitive
            if (caseSensitive) {
                ALPHABET = '23456789abdegjkmnpqrvwxyzABDEGJKMNPQRVWXYZ';
            }
            var ID_LENGTH = length;


            var rtn = '';
            for (var i = 0; i < ID_LENGTH; i++) {
                rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
            }
            return rtn;

        }


        static round(nmb: number, fractions: number): string {
            var ret = Math.round(nmb * Math.pow(10, fractions));
            return (ret / Math.pow(10, fractions)).toLocaleString('en', { minimumFractionDigits: fractions, useGrouping: false });

        }

        static getElementByValue(arr: Array<object>, elementName: string, elementValue: string): any {
            var ret = undefined;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].hasOwnProperty(elementName)) {
                    if (arr[i][elementName] == elementValue) {
                        ret = arr[i];
                        break;
                    }
                }
            }

            return ret;
        }


        static getIndexByValue(arr: Array<object>, elementName: string, elementValue: string) {
            var ret = -1;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].hasOwnProperty(elementName)) {
                    if (arr[i][elementName] == elementValue) {
                        ret = i;
                        break;
                    }
                }
            }
            return ret
        }



        static B64Encode(str: string): string {
            if (window
                && "btoa" in window
                && "encodeURIComponent" in window) {
                var s: string = btoa(unescape(encodeURIComponent(str)));
                if (s.indexOf("+") == -1) {
                    return s;
                } else {
                    return encodeURIComponent(s);
                }

                //.replace(/%([0-9A-F]{2})/g, (match, p1) => {
                //  return String.fromCharCode(("0x" + p1) as any);
                //}));
            } else {
                console.warn("b64EncodeUnicode requirements: window.btoa and window.encodeURIComponent functions");
                return null;
            }

        }


        static B64Decode(str: string): string {
            if ((str == undefined) || (str == "")) {
                return str;
            }

            if (window
                && "atob" in window
                && "decodeURIComponent" in window) {
                return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(""));
            } else {
                console.warn("b64DecodeUnicode requirements: window.atob and window.decodeURIComponent functions");
                return null;
            }
        }


        static isIE(userAgent?): boolean {
            userAgent = userAgent || navigator.userAgent;
            return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge/") > -1;
        }

        static setCookie(cname: string, cvalue: string, exdays: number, domain: string = undefined) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = ";expires=" + d.toUTCString();
            var sDomain: string = "";
            if (domain) {
                sDomain = ";domain=" + domain;
            }
            document.cookie = cname + "=" + cvalue + expires + sDomain + ";path=/";
        }

        static getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        static parseURLParams(data: string): Object {
            var retObj;
            if ((data == undefined) || (data.length < 3) || (data.indexOf("=") == -1)) {
                return retObj;
            }
            retObj = {};

            var arr: Array<Object> = data.split("&");
            arr.forEach((itm: string, idx) => {
                if (itm.indexOf("=") > -1) {
                    retObj[itm.split("=")[0]] = itm.split("=")[1];  // Name:Value generates obj.Name = value
                } else {
                    retObj[itm] = itm; //  generates obj.Name = Name
                }
            });

            return retObj;
        }

        static log(from: string, data: any = undefined) {
            var isDebug = window.location.href.indexOf("localhost");
            if (isDebug > -1) {
                if (data == undefined) {
                    console.log(from);
                } else {
                    console.log(from, data);
                }

            }
        }


        static padStart(str: string, padTo: number, padWith: string): string {
            var s = str;
            while (s.length < padTo) {
                s = padWith + s;
            }
            return s;
        }

        static objHavePropertyCaseInsensitive(o: Object, property: string): boolean {
            var bRet: boolean = false;
            Object.getOwnPropertyNames(o).forEach((itm: string, idx) => {
                if (itm.toLowerCase() == property.toLocaleLowerCase()) {
                    bRet = true;
                }
            });
            return bRet;
        }

        static exportToCsv(filename: string, rows: object[]) {
            if (!rows || !rows.length) {
                return;
            }
            const separator = ',';
            const keys = Object.keys(rows[0]);
            const csvContent =
                keys.join(separator) +
                '\n' +
                rows.map(row => {
                    return keys.map(k => {
                        var cell = row[k] === null || row[k] === undefined ? '' : row[k];
                        cell = cell instanceof Date
                            ? cell.toLocaleString()
                            : cell.toString().replace(/"/g, '""');
                        if (cell.search(/("|,|\n)/g) >= 0) {
                            cell = `"${cell}"`;
                        }
                        return cell;
                    }).join(separator);
                }).join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename);
            } else {
                const link = document.createElement('a');
                if (link.download !== undefined) {
                    // Browsers that support HTML5 download attribute
                    const url = URL.createObjectURL(blob);
                    link.setAttribute('href', url);
                    link.setAttribute('download', filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        } // exportToCsv


        //use when element is not added to DOM and we need the size of it
        static getElementSize(val: HTMLElement): { "height": number, "width": number } {
            var ret = { "height": 0, "width": 0 }

            document.body.appendChild(val);
            var s = val.getClientRects();
            ret.height = s[0].height;
            ret.width = s[0].width;
            document.body.removeChild(val);
            return ret;
        }


        static formatDateTimeString(val: string): string {
            var sRet: string = "";
            if (val == null) {
                return "";
            }

            sRet = val.replace("T", " ");
            sRet = sRet.substring(0)

            return sRet;
        }

        static formtDateString(val: string): string {
            var sRet: string = "";
            if (val == null) {
                return "";
            }

            sRet = val.split("T")[0];
            sRet = sRet.split(" ")[0];
            return sRet;
        }

        static getElementPositionOnForm(element: HTMLElement): { "top": number, "left": number } {
            var rect = element.getBoundingClientRect();
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }

        static getWindowSize(height: number, width: number): "lg" | "md" | "sm" | "xs" {
            var windowSize: "lg" | "md" | "sm" | "xs";
            if (width >= 992) {
                windowSize = "lg";
            }
            else if (width >= 768) {
                windowSize = "md";
            }
            else if (width >= 576) {
                windowSize = "sm";
            }
            else {
                windowSize = "xs";
            }
            return windowSize;
        }
    } // end module tools



}// end namespace my

