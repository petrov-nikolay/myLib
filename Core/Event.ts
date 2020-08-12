/// <reference path="Tools.ts" />


namespace my {
    "use strict";

    export namespace events {

        export interface iEventHandler {
            (sender: object, event: iEvent | CustomEvent | KeyboardEvent | MouseEvent, data: any): void;
        }
        export interface iEventGlobalHandler {
            (sender: object, event: iEventGlobal, data: any, code: string): void;
        }

        export interface iEvent {
            id: string;
            name: string;

            subscribers: Array<my.core.events.eventSubscriber>;
            subscribe(subscriber: object, handler: Function, defaultData: any);
            dispatch(sender: object, data: any);
            unsubscribe(subscriber: object);
            unsubscribe(handler: Function);
        }

        export interface iEventGlobal {
            subscribers: Array<my.core.events.eventGlobalSubscriber>;
            subscribe(subscriber: object, code: string, handler: Function, defaultData: any);
            dispatch(sender: object, code: string, data: any);
        }

        export class global {
            static standard: my.core.events.coreGlobal;
            static navigation: my.core.events.coreGlobal;

            static init() {
                if (this.standard == undefined) {
                    this.standard = new my.core.events.coreGlobal();
                }
                if (this.navigation == undefined) {
                    this.navigation = new my.core.events.coreGlobal();
                }
            }


        } // end global events




    } // end namespace events

    export namespace core {

        export namespace events {


            export class eventSubscriber {
                subscriber: object;
                data: any;
                handler: my.events.iEventHandler;
            }

            export class eventGlobalSubscriber {
                subscriber: object;
                data: any;
                handler: my.events.iEventGlobalHandler;
                code: string;
            }

            export class core implements my.events.iEvent {
                subscribers: Array<eventSubscriber>;
                id: string;
                name: string;



                constructor(name: string) {
                    this.subscribers = [];
                    this.id = my.tools.newGuid();
                    this.name = name;
                }

                subscribe(subscriber: object, handler: my.events.iEventHandler, defaultData: any = undefined) {
                    //ADD protection for same handler 2 times (same subscriber 2 times not a problem)

                    var ev: eventSubscriber = new eventSubscriber();
                    ev.subscriber = subscriber;
                    ev.data = defaultData;
                    ev.handler = handler;
                    this.subscribers.push(ev);
                }

                dispatch(sender: object, data: any = undefined) {
                    this.subscribers.forEach((ev: eventSubscriber, idx: number) => {
                        if (data === undefined) {
                            data = ev.data;  // uses default data passed on subscription (IF ANY IS PASSED)
                        }
                        ev.handler(sender, this, data);
                    });
                    //console.log('Event dispateched');
                }


                //#region unsubscribe

                unsubscribe(handler: my.events.iEventHandler)
                unsubscribe(subscriber: object)
                unsubscribe(param: object | my.events.iEventHandler) {
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

                private _unsubscribeByHandler(handler: my.events.iEventHandler) {
                    for (var idx = 0; idx < this.subscribers.length; idx++) {
                        if (this.subscribers[idx].handler == handler) {
                            break;
                        }
                    };
                    this.subscribers.splice(idx, 1);
                }
                //#endregion

            } // end class events.core




            interface Window { globalEventSubscribers: []; }


            export class coreGlobal implements my.events.iEventGlobal {

                static subscribers: Array<eventGlobalSubscriber> = [];

                get subscribers(): Array<eventGlobalSubscriber> {
                    return coreGlobal.subscribers;
                }
                id: string;

                constructor() {
                    this.id = "G_" + my.tools.newGuid();
                }

                subscribe(subscriber: object, code: string, handler: my.events.iEventGlobalHandler, defaultData: any = undefined) {
                    //ADD protection for same handler 2 times (same subscriber 2 times not a problem)

                    var ev: eventGlobalSubscriber = new eventGlobalSubscriber();
                    ev.subscriber = subscriber;
                    ev.data = defaultData;
                    ev.handler = handler;
                    ev.code = code;
                    this.subscribers.push(ev);
                }

                dispatch(sender: object, code: string, data: any = undefined) {
                    var self = this;
                    this.subscribers.forEach((ev: eventGlobalSubscriber, idx: number) => {
                        if (ev.code == code) {
                            if (data === undefined) {
                                data = ev.data;  // uses default data passed on subscription (IF ANY IS PASSED)
                            }
                            ev.handler(sender, self, data, code);
                        }
                        if (ev.code.toLowerCase() == "all") {
                            ev.handler(sender, self, data, code);
                        }
                    });
                    //console.log("global event dispatched with code: " + code);
                }

            }





            export class htmlCore implements my.events.iEvent {
                subscribers: Array<eventSubscriber>;
                id: string;
                target: my.controls.iControl;
                name: string;
                eventIdentificator: string;

                constructor(target: my.controls.iControl, name: string) {
                    this.subscribers = [];
                    this.id = my.tools.newGuid();
                    this.target = target;
                    this.name = name;
                    this.eventIdentificator = this.target.element.nodeName + "/" + this.id;

                }

                //overrides the original subscribe
                subscribe(subscriber: object, handler: my.events.iEventHandler, defaultData: any = undefined) {
                    //ADD protection for same handler 2 times (same subscriber 2 times not a problem)

                    var ev: eventSubscriber = new eventSubscriber();
                    ev.subscriber = subscriber;

                    ev.data = defaultData;

                    ev.handler = handler;
                    this.subscribers.push(ev);
                    // we use 2 elements because of the complicated HTML structure we need for some of the controls we have
                    if (this.target.eventElement == undefined) {
                        this.target.eventElement = this.target.element;
                    }

                    this.target.eventElement.addEventListener(this.name, (e: CustomEvent) => {
                        var d: any;
                        if (ev.data) {
                            d = ev.data;
                        } else if (e.detail) {
                            d = e.detail;
                        }
                        handler(this.target, e, d);
                        //console.log("event received:" + this.eventName + " from:" + this.eventIdentificator);
                    });

                    //console.log("htmlCore.subscribe, subscriber:" + subscriber["ctlType"] + " ctluid:" + subscriber["ctluid"] + " Event Name:" + this.name);
                }

                //overrides the original dispatch
                dispatch(sender: object, data: any = undefined) {
                    var event: any;
                    if (data == undefined) {
                        data = this.target.itemData;
                    }
                    // there is no support for CustomEvent on IE
                    if (my.tools.isIE()) {
                        event = document.createEvent("CustomEvent");
                        event.initCustomEvent(this.name, false, false, {
                            detail: data
                        });
                    } else {
                        event = new CustomEvent(this.name, { detail: data });
                    }

                    if (this.target.eventElement == undefined) {
                        this.target.eventElement = this.target.element;
                    }

                    this.target.eventElement.dispatchEvent(event);
                }


                //#region unsubscribe

                unsubscribe(handler: my.events.iEventHandler)
                unsubscribe(subscriber: object)
                unsubscribe(param: object | my.events.iEventHandler) {
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

                    //FIX THIS AT SOME POINT
                    //this.target.removeEventListener(this.eventName, this.subscribers[idx].handler);
                    this.subscribers.splice(idx, 1);
                }

                private _unsubscribeByHandler(handler: my.events.iEventHandler) {
                    for (var idx = 0; idx < this.subscribers.length; idx++) {
                        if (this.subscribers[idx].handler == handler) {
                            break;
                        }
                    };

                    //FIX THIS AT SOME POINT
                    //this.target.removeEventListener(this.eventName, this.subscribers[idx].handler);
                    this.subscribers.splice(idx, 1);
                }
                //#endregion


            } // end class  events.htmlCore


            //export abstract class cEvent {
            //    isDebug: boolean = false; // add some loging in the console

            //    eventIdentificator: string;
            //    eventTarget: HTMLElement;

            //    abstract raise: any;
            //    abstract on: any;
            //    abstract off: any;
            //    abstract subscribers: Array<Object>;


            //    constructor(eventTarget: HTMLElement) {
            //        this.eventTarget = eventTarget;
            //        this.eventIdentificator = tools.newGuid();
            //        if (this.eventTarget) {
            //            this.eventIdentificator = eventTarget.nodeName + "/" + this.eventIdentificator;
            //        }
            //    };

            //    protected dispatch(eventName: string, data: any) {
            //        if (this.subscribers[eventName] < 1) {
            //            return;
            //        }

            //        var _eventTargets = [];

            //        if (this.eventTarget) {
            //            //we have HTML element to target 
            //            this._dispatcHTML(eventName, data);
            //        } else {
            //            _eventTargets = this._getSubscribersByName(eventName);
            //            if (_eventTargets.length > 0) {
            //                _eventTargets.forEach(function (obj: any, idx) {
            //                    obj.handler(eventName, data); // call handler directly if we have one
            //                });
            //            }
            //        }



            //        if (this.isDebug) {
            //            console.log("sendEvent: " + eventName + " to:" + this.eventIdentificator);
            //        }
            //    };

            //    private _dispatcHTML(eventName: string, data: any) {
            //        // there is no support for CustomEvent on IE
            //        if (tools.isIE()) {
            //            var event = document.createEvent("CustomEvent");

            //            event.initCustomEvent(eventName, false, false, {
            //                detail: data
            //            });

            //            this.eventTarget.dispatchEvent(event);

            //            return;
            //        }

            //        // create and dispatch the event
            //        var event = new CustomEvent(eventName, { detail: data });
            //        this.eventTarget.dispatchEvent(event);
            //    }

            //    protected subscribe(eventName: string, handler: Function) {

            //        this.subscribers.push({ 'eventName': eventName, 'handler': handler });
            //        var _eventTarget;

            //        if (this.eventTarget) {
            //            //we have HTML element to target 
            //            this._subscribeHTML(eventName, handler);
            //        }
            //        if (this.isDebug) {
            //            console.log("subscribeFor: " + eventName + " from:" + this.eventIdentificator);
            //        }
            //    }

            //    private _subscribeHTML(eventName: string, handler: Function) {

            //        this.eventTarget.addEventListener(eventName, (e: CustomEvent) => {
            //            handler(e, e.detail);
            //            if (this.isDebug) {
            //                console.log("event received:" + eventName + " from:" + this.eventIdentificator);
            //            }
            //        });
            //    }



            //    protected unsubscribe(eventName: string, handler: Function) {
            //        // this.eventTarget.removeEventListener(eventName);
            //        if (this.isDebug) {
            //            console.log("unsubscribe: " + eventName + " from:" + this.eventIdentificator);
            //        }
            //    }


            //    protected dispatchBrodcast(eventName: string, data: any) {
            //        // create and dispatch the event
            //        var event = new CustomEvent(this.eventIdentificator + "." + eventName, { detail: data });
            //        dispatchEvent(event);
            //        if (this.isDebug) {
            //            console.log("sendBroadcastEvent: " + this.eventIdentificator + "." + eventName);
            //        }
            //    };

            //    protected subscribeBrodcast(eventName: string, handler: Function) {
            //        addEventListener(this.eventIdentificator + "." + eventName, (e: CustomEvent) => {
            //            handler(e, e.detail);
            //            if (this.isDebug) {
            //                console.log("receiveBroadcastFor: " + this.eventIdentificator + "." + eventName);
            //                // console.log(handler);
            //            }
            //        });
            //        if (this.isDebug) {
            //            console.log("subscribeBroadcastFor: " + this.eventIdentificator + "." + eventName);
            //            // console.log(handler);
            //        }
            //    };

            //    protected unsubscribeBrodcast(eventName: string, handler: Function) {
            //        //removeEventListener(eventName);
            //        if (this.isDebug) {
            //            console.log("unsubscribeBrodcast: " + this.eventIdentificator + "." + eventName);
            //        }
            //    }



            //    private _getSubscribersByName(name: string): Array<Object> {
            //        var ret = [];

            //        // this.subscribers have eventName:string and handler:function
            //        this.subscribers.forEach(function (obj: any, idx) {
            //            if (obj.eventName.toUpperCase() === name.toUpperCase()) {
            //                ret.push(obj);
            //            }
            //        });

            //        return ret;
            //    }

            //}// end class cEvent

        } // end namespace Events



    } // end namespace core
} // end namespace my