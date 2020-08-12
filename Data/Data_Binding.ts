/// <reference path="../Core/Event.ts" />


namespace my {
    "use strict";

    export namespace data {

        export namespace binding {

            export interface iObservable {
                subscribers: Array<my.core.data.binding.bindingSubscriber>;
                value: string | number | boolean | object;
                subscribe(subscriber: object, handler: my.core.data.binding.iBindingHandler, defaultData?: any);
                dispatch(sender: object, data: any);
            }

        }
    }


    export namespace core {

        export namespace data {


            export namespace binding {

                export interface iBindingHandler {
                    (sender: object, data: any): void;
                }

                export class bindingSubscriber {
                    subscriber: object;
                    data: any;
                    handler: iBindingHandler;
                }


                export class Observable implements my.data.binding.iObservable {
                    subscribers: Array<bindingSubscriber>;
                    id: string;

                    onValueChange: (val: string | number | boolean | object) => void; //alternative methid for subscribing for changes

                    protected _value: string | number | boolean | object;
                    get value(): string | number | boolean | object {
                        return this._value;
                    }
                    set value(val: string | number | boolean | object) {
                        //console.log('Observable updates with value:' + val);
                        this._value = val;
                        this.dispatch(this, val);
                    }


                    constructor(val: string | number | boolean | object = undefined) {
                        this.subscribers = [];
                        this.id = my.tools.newGuid();
                        this._value = val;
                    }



                    subscribe(subscriber: object, handler: iBindingHandler, defaultData: any = undefined) {
                        if (handler == undefined) {
                            console.error("handler cannot be empty");
                        }
                        if (this._subscriberExists(subscriber)) {
                            return;
                        }  // protection for same subscriber 2 times

                        var subscr: bindingSubscriber = new bindingSubscriber();
                        subscr.subscriber = subscriber;
                        subscr.data = defaultData;
                        subscr.handler = handler;
                        this.subscribers.push(subscr);
                    }

                    private _subscriberExists(subscriber: object): boolean {
                        var bRet: boolean = false;
                        this.subscribers.forEach((itm, idx) => {
                            if (itm.subscriber == subscriber) {
                                bRet = true;
                            }
                        });

                        return bRet;
                    }

                    dispatch(sender: object, data: any) {
                        if (data != this._value) {  //need to update value if change is comming from subscriber
                            this._value = data;
                        }
                        // push to calback subscribers
                        if (this.onValueChange != undefined) {
                            this.onValueChange(data);
                        }
                        //dispach to subscribers
                        this.subscribers.forEach((s: bindingSubscriber, idx: number) => {
                            if (s.subscriber != sender) {
                                if (data === undefined) {
                                    data = s.data;  // uses default data passed on subscription (IF ANY IS PASSED)
                                }
                                s.handler(sender, data);
                                //console.log(sender.constructor.name + "; with id:" + this.id + " notified " + this.subscribers.length + " subscribers");
                            }
                        });
                    }


                    //#region unsubscribe

                    unsubscribe(handler: iBindingHandler)
                    unsubscribe(subscriber: object)
                    unsubscribe(param: object | iBindingHandler) {
                        if (typeof (param) == "object") {
                            this._unsubscribeBySubscriber(param);
                        } else {
                            this._unsubscribeByHandler(param);
                        }

                    }

                    private _unsubscribeBySubscriber(subscriber: object) {
                        for (var idx = 0; idx < this.subscribers.length; idx++) {
                            if (this.subscribers[idx].subscriber == subscriber) {
                                break;
                            }
                        };
                        this.subscribers.splice(idx, 1);
                    }

                    private _unsubscribeByHandler(handler: iBindingHandler) {
                        for (var idx = 0; idx < this.subscribers.length; idx++) {
                            if (this.subscribers[idx].handler == handler) {
                                break;
                            }
                        };
                        this.subscribers.splice(idx, 1);
                    }
                    //#endregion



                }; // END observable

                export class ObservableArrayRow { //extends Object {

                    //variables must not be returned wen serializing as array
                    __subscribers: Array<bindingSubscriber>;
                    __isChanged: boolean = false;
                    __bindVisible: boolean = true;
                    __tableName: string;


                    constructor() {
                        //super();
                        this.__subscribers = [];
                    }

                    getAsObject(): Object {
                        var arr: any = this;
                        var _robj = {};
                        var obj: Observable;
                        for (var prop in arr) {
                            if (!prop.startsWith("__")) {
                                obj = arr[prop];
                                _robj[prop] = obj.value;
                            }
                        };

                        return _robj;
                    }

                    getAsArray(): Array<{ "Name": String, "data": Observable }> {
                        var obj: any = this;
                        var _retAr: Array<{ "Name": String, "data": Observable }> = [];

                        for (var prop in obj) {
                            if (!prop.startsWith("__")) {
                                _retAr.push({ "Name": prop, "data": obj[prop] });
                            }
                            //_robj[prop] = obj.value;
                        };

                        return _retAr;
                    }






                    subscribe(subscriber: object, handler: iBindingHandler, defaultData: any = undefined) {
                        if (this._handlerExists(subscriber, handler)) {
                            return;
                        }  // protection for same subscriber 2 times

                        var subscr: bindingSubscriber = new bindingSubscriber();
                        subscr.subscriber = subscriber;
                        subscr.data = defaultData;
                        subscr.handler = handler;
                        this.__subscribers.push(subscr);
                    }

                    private _handlerExists(subscriber: object, handler: iBindingHandler): boolean {
                        var bRet: boolean = false;
                        this.__subscribers.forEach((itm, idx) => {
                            if ((itm.subscriber == subscriber) && (itm.handler == handler)) {
                                bRet = true;
                            }
                        });

                        return bRet;
                    }

                    dispatch(sender: object, data: any) {
                        //dispach to subscribers
                        this.__subscribers.forEach((s: bindingSubscriber, idx: number) => {
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

                export class ObservableArray extends Observable {
                    private _filter: my.data.Filter;
                    get filter(): my.data.Filter {
                        return this._filter;
                    }
                    set filter(val: my.data.Filter) {
                        this._filter = val;
                        //clear old filter if val == undefined
                        if (val == undefined) {
                            this._value.forEach((itm: ObservableArrayRow, idx) => {
                                itm.__bindVisible = true;
                            });
                        }
                    }

                    get oArray(): Array<ObservableArrayRow> {
                        return this._value;
                    }
                    protected _value: Array<ObservableArrayRow>;
                    get value(): any {
                        var f = this.filter;

                        if (f) {
                            this._value.forEach((itm: ObservableArrayRow, idx) => {
                                if (itm.hasOwnProperty(f.column)) {  // column exist in the observable row we mar it as inactive
                                    if ((itm[f.column].value === f.value) || (f.value.toLowerCase() == "all")) {
                                        itm.__bindVisible = true;  // __bindVisible is custom added in observable arrays to be able to ignore rows in data controls when bainding
                                    } else {
                                        itm.__bindVisible = false;
                                    }
                                }
                            });
                        }

                        return this._value;
                    }
                    set value(val: any) {
                        if (val == undefined) {
                            console.log("passing undefined to ObservableArray");
                            return;
                        }

                        //if you get Converting circular structure to JSON that probably is because the VAL object have observables in it 
                        //this._value = JSON.parse(JSON.stringify(val)); // copy array by val not reference

                        this._value = [];

                        if (Array.isArray(val)) {
                            if (val.length > 0) {
                                if (val[0] instanceof my.core.data.binding.ObservableArrayRow) {
                                    this._value = val;
                                } else {
                                    this._encode(val);
                                }
                            }

                        } else {
                            // Passing non Array to ObservableArray!
                            var valCheck: any = val;
                            // if (valCheck instanceof my.core.data.binding.ObservableArrayRow) {
                            if (valCheck.hasOwnProperty("__subscribers")) {
                                this._value = [val];
                            }
                            else {
                                this._encode([val]);
                            }
                        }
                        this.dispatch(this, this._value);
                    }


                    get length() {
                        return this._value.length;
                    }

                    name: string;

                    constructor(val: Array<Object> | Object, name: string = undefined) {
                        super();
                        this.subscribers = [];
                        this.id = my.tools.newGuid();
                        this.value = val;

                        this.name = name;

                    }

                    //computedItems: Array<{ name: string, columns: string }>;
                    computedObservables: Array<{ name: string, co: ComputedObservable }> = [];

                    private _encode(arr: Array<Object>) {
                        arr.forEach((item: any, idx: number) => {
                            this._value.push(this._encodeItem(item));
                        });

                    } // _encode

                    private _encodeItem(obj: Object): ObservableArrayRow {
                        var retRow: ObservableArrayRow = new ObservableArrayRow();
                        retRow.__tableName = this.name;
                        for (var prop in obj) {
                            //obj[prop] = new Observable(obj[prop]);
                            if (Array.isArray(obj[prop])) {
                                retRow[prop] = new ObservableArray(obj[prop], prop);
                            } else {
                                var ob: Observable = new Observable(obj[prop]);
                                //dispatch the item chage to the row
                                ob.subscribe(this, (s, d) => {
                                    retRow.dispatch(retRow, d); // dispatiching as source the row not the tradiotional THIS because in this case THIS is also the lisener
                                });
                                retRow[prop] = ob;
                            }
                            //console.log(prop);
                        }
                        // if (this.computedItems) {
                        //     this.computedItems.forEach((itm: { name: string, columns: string }, idx) => {
                        //         this._encodeComputed(itm.name, itm.columns, ret);
                        //     });
                        // }


                        this.computedObservables.forEach((itm: { name: string, co: ComputedObservable }, idx) => {
                            var rowComputed = new ComputedObservable(itm.co.computeFunction); // clone the function otherwise all rows will use sam observable and have same value
                            rowComputed.data = retRow;
                            // rowComputed.compute();
                            retRow[itm.name] = rowComputed;

                            // retRow.subscribe(this, (s, d) => {
                            //     rowComputed.compute();
                            // });
                        });



                        return retRow;
                    }
                    // private _encodeComputed(name: string, columns: string, row: ObservableArrayRow) {
                    //     var co = new ComputedObservable();
                    //     var arr = columns.split(",");
                    //     arr.forEach((colName: string, idx) => {
                    //         co.addSum(row[colName]);
                    //     });
                    //     row[name] = co;
                    // }

                    addComputed(name: string, co: ComputedObservable) {
                        this.computedObservables.push({ "name": name, "co": co });
                    }

                    getTotalSum(column: string): number {
                        var ret: number;
                        this._value.forEach((itm: ObservableArrayRow, idx) => {
                            if (idx == 0) { ret = 0; }
                            if (itm[column]) {
                                ret = ret + Number(itm[column].value);
                            }
                        });
                        return ret;
                    }


                    getAsArray(filterCol: string = undefined, filterVal: string = undefined): Array<Object> {
                        var ret: Array<Object>;
                        ret = this._decode(this._value, filterCol, filterVal);
                        return ret;
                    }

                    getStructureOnly(): Object {
                        var aObj: Object = {};

                        for (var item in this._value[0]) {
                            if (!item.startsWith("__")) { // stop item from jenerating observable properties in the empty object
                                aObj[item] = undefined;
                            }

                        }
                        return aObj;
                    }


                    private _decode(arr: Array<Object>, filterCol: string = undefined, filterVal: string = undefined): Array<Object> {
                        var useFilter: boolean = false;
                        if ((filterCol) && (filterVal)) {
                            useFilter = true;
                        }

                        var _arr = [];
                        var obj;
                        arr.forEach((item: any, idx: number) => {
                            obj = {};
                            this._decodeItem(item, obj);
                            if (useFilter) {
                                if (obj[filterCol].toLowerCase() == filterVal.toLowerCase()) {
                                    _arr.push(obj);
                                }
                            }
                            else {
                                _arr.push(obj);
                            }

                        });

                        return _arr;
                    }

                    private _decodeItem(obj: Object, newobj: Object) {
                        for (var prop in obj) {
                            if (!prop.startsWith("__")) {
                                newobj[prop] = obj[prop].value;
                                //console.log(prop);                                
                            }
                        }

                    }

                    findFirst(Name: string, Value: string): ObservableArrayRow {
                        var ret;
                        if (Value == undefined) {
                            return ret;
                        }
                        Value = Value.toUpperCase();
                        var searchIn: Array<ObservableArrayRow> = this.value;

                        for (var i = 0; i < searchIn.length; i++) {
                            if (searchIn[i][Name] !== undefined) {
                                var val: string = searchIn[i][Name].value.toString();
                                if (val.toUpperCase() == Value) {
                                    ret = searchIn[i];
                                    break;
                                }
                            }
                        };

                        return ret;
                    }

                    //attaches liseners to all children so on change we receive change event
                    //the observable array exposes this as place to pass handler for chil changes
                    subscribeForChildChange(func: (row, value) => void) {
                        var obsrv: Observable;
                        this._value.forEach((row: ObservableArrayRow, idx) => {
                            row.subscribe(this, func);
                            // for (var prop in row) {
                            //     //__isChanged is private property for monitoring changes in the rows
                            //     // it is not observable and we can't subscribe to it!
                            //     if ((prop !== "__isChanged") && (prop !== "__bindVisible")) {
                            //         obsrv = <Observable>row[prop];
                            //         obsrv.onValueChange = (val: string | number | boolean | object) => {
                            //             func(row, val);
                            //         }
                            //     }

                            // }
                        });

                    }

                } // end class ObservableArray




                export class ComputedObservable implements my.data.binding.iObservable {
                    subscribers: Array<bindingSubscriber>;
                    id: string;

                    computeFunction: (data: any) => string | number | boolean | object;

                    onValueChange: (val: string | number | boolean | object) => void; //alternative methid for subscribing for changes

                    protected _value: string | number | boolean | object;
                    get value(): string | number | boolean | object {
                        this.compute();
                        return this._value;
                    }

                    items: Array<Observable>;

                    data: any;

                    constructor(computeFunction: (data: any) => string | number | boolean | object) {
                        this.computeFunction = computeFunction;
                        this.subscribers = [];
                        this.id = my.tools.newGuid();
                        this.items = [];
                    }



                    compute() {
                        if (this.computeFunction) {
                            this._value = this.computeFunction(this.data);
                            this.dispatch(this, this._value);
                        }

                    }



                    subscribe(subscriber: object, handler: iBindingHandler, defaultData: any = undefined) {
                        if (this._subscriberExists(subscriber)) {
                            return;
                        }  // protection for same subscriber 2 times

                        var subscr: bindingSubscriber = new bindingSubscriber();
                        subscr.subscriber = subscriber;
                        subscr.data = defaultData;
                        subscr.handler = handler;
                        this.subscribers.push(subscr);
                    }

                    private _subscriberExists(subscriber: object): boolean {
                        var bRet: boolean = false;
                        this.subscribers.forEach((itm, idx) => {
                            if (itm.subscriber == subscriber) {
                                bRet = true;
                            }
                        });

                        return bRet;
                    }

                    dispatch(sender: object, data: any) {
                        if (data != this._value) {  //need to update value if change is comming from subscriber
                            this._value = data;
                        }
                        // push to calback subscribers
                        if (this.onValueChange != undefined) {
                            this.onValueChange(data);
                        }
                        //dispach to subscribers
                        this.subscribers.forEach((s: bindingSubscriber, idx: number) => {
                            if (s.subscriber != sender) {
                                if (data === undefined) {
                                    data = s.data;  // uses default data passed on subscription (IF ANY IS PASSED)
                                }
                                s.handler(sender, data);
                                console.log(sender.constructor.name + "; with id:" + this.id + " notified " + this.subscribers.length + " subscribers");
                            }
                        });
                    }


                    //#region unsubscribe

                    unsubscribe(handler: iBindingHandler)
                    unsubscribe(subscriber: object)
                    unsubscribe(param: object | iBindingHandler) {
                        if (typeof (param) == "object") {
                            this._unsubscribeBySubscriber(param);
                        } else {
                            this._unsubscribeByHandler(param);
                        }

                    }

                    private _unsubscribeBySubscriber(subscriber: object) {
                        for (var idx = 0; idx < this.subscribers.length; idx++) {
                            if (this.subscribers[idx].subscriber == subscriber) {
                                break;
                            }
                        };
                        this.subscribers.splice(idx, 1);
                    }

                    private _unsubscribeByHandler(handler: iBindingHandler) {
                        for (var idx = 0; idx < this.subscribers.length; idx++) {
                            if (this.subscribers[idx].handler == handler) {
                                break;
                            }
                        };
                        this.subscribers.splice(idx, 1);
                    }
                    //#endregion



                }; // END ComputedObservable




                // ONE diretional - observable to property
                export class ReadOnlyBind {

                    private _property: string;
                    private _element: any;
                    get _value(): string | number | boolean {
                        return this._element[this._property];
                    }
                    set _value(val: string | number | boolean) {
                        this._element[this._property] = val;
                    }

                    private _valueBind: my.core.data.binding.Observable;
                    set value(val: any) {
                        if ((typeof (val) == "string") || (typeof (val) == "number") || (typeof (val) == "boolean")) {
                            this._value = val;
                            if (this._valueBind) {
                                this.raiseBaidingChange(val);
                            }
                        } else if (val instanceof my.core.data.binding.Observable) {
                            this._valueBind = val;
                            this._value = val.value as string | number | boolean;
                            val.subscribe(this, this.onBaidingChange.bind(this))
                        }
                    };
                    get value(): any {
                        return this._value;
                    }


                    changeEvent: my.events.iEvent;
                    constructor(element: any, property: string, changeEvent: my.events.iEvent) {
                        this.changeEvent = changeEvent;
                        this._property = property;
                        this._element = element;
                    }


                    onBaidingChange(sender: object, data: any) {
                        this._value = data;
                    }
                    raiseBaidingChange(data: any) {
                        this._valueBind.dispatch(this, data);
                        if (this.changeEvent) {
                            this.changeEvent.dispatch(this, data);
                        }

                    }


                } // end class ReadOnlyBind




            };// end namespace binding
        }; // namespace data 


    }; // end namespace core
};//  end namespace my 