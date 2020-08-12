/// <reference path="Event.ts" />
/// <reference path="CSS.ts" />
/// <reference path="../Data/Data.ts" />
/// <reference path="Validation.ts" />


namespace my {
    "use strict";

    export namespace controls {


        export interface iControl {
            // must inherits
            element: HTMLElement;
            eventElement: HTMLElement;
            reset: Function;  // Resets the value to undefined.
            value: any;
            readOnly: boolean; //  replace all elements in with span
            disabled: boolean; //  kills interaction with the control
            ctlType: string;


            // properties
            id: string;

            visible: boolean;

            elementAttr: { name: string, value: string }[]; //  all values from here are set to the container using the 'setAttribute' function
            style: CSSStyleDeclaration;


            css: my.core.css;

            itemData: Object;// Array<Object>; // stroe data in to be used in templates or events (usualy passed by data driven controls)

            validation: my.core.controls.validation.validationGroup;
            events: my.core.controls.Events;

        };

        export interface iTemplateFunction {
            (sender: any, data: any): iControl;
        }


        enum Direction {
            Up = "UP",
            Down = "DOWN",
            Left = "LEFT",
            Right = "RIGHT",
        }


    }

    export namespace core {

        export namespace controls {


            export class Events {
                target: my.controls.iControl;

                //CUSTOM EVENTS
                valueChanged: my.core.events.core;
                dataChanged: my.core.events.core; // used only in coreData controls
                valueValidated: my.core.events.core;


                //STANDARD HTML ELEMENT EVENTS
                click: my.core.events.htmlCore;
                dblclick: my.core.events.htmlCore;
                focus: my.core.events.htmlCore;
                keypress: my.core.events.htmlCore;
                keydown: my.core.events.htmlCore;
                keyup: my.core.events.htmlCore;
                change: my.core.events.htmlCore;
                mouseover: my.core.events.htmlCore;
                mouseenter: my.core.events.htmlCore;
                mouseleave: my.core.events.htmlCore;

                constructor(Target: my.controls.iControl) {
                    this.target = Target;
                    //this.isDebug = true; // comment this to stop the console log

                    //CUSTOM EVENTS
                    this.valueChanged = new my.core.events.core("valueChanged");
                    this.dataChanged = new my.core.events.core("dataChanged");  // used only in coreData controls
                    this.valueValidated = new my.core.events.core("valueValidated");


                    //STANDARD HTML ELEMENT EVENTS
                    this.click = new my.core.events.htmlCore(this.target, "click")
                    this.dblclick = new my.core.events.htmlCore(this.target, "dblclick")
                    this.focus = new my.core.events.htmlCore(this.target, "focus")
                    this.keypress = new my.core.events.htmlCore(this.target, "keypress")
                    this.keydown = new my.core.events.htmlCore(this.target, "keydown")
                    this.keyup = new my.core.events.htmlCore(this.target, "keyup")
                    this.change = new my.core.events.htmlCore(this.target, "change")
                    this.mouseover = new my.core.events.htmlCore(this.target, "mouseover")
                    this.mouseenter = new my.core.events.htmlCore(this.target, "mouseenter")
                    this.mouseleave = new my.core.events.htmlCore(this.target, "mouseleave")

                }


            } //end Control.Events


            export abstract class core implements my.controls.iControl {
                ctluid: string = tools.newGuid();
                // must inherits
                element: HTMLElement;
                eventElement: HTMLElement;
                abstract reset: Function;  // Resets the value to undefined.
                abstract readOnly: boolean; //  replace all elements in with span?
                abstract disabled: boolean;
                abstract ctlType: string; //


                events: Events;
                // properties
                private _id: string;
                get id(): string {
                    if (!this._id) {
                        this._id = tools.newGuid();
                    }
                    return this._id;
                };
                set id(val: string) { this._id = val; };


                /**
               * sets or gets component visibility. will return false if parent is invisible
               * @param val  if value is passed will set the style to visible
               * @returns      true/false if component and parent are true/false.
               */
                get visible(): boolean {
                    return Boolean(this.element.classList.contains("active")); //will return false if the parent is ivisible
                }
                set visible(val: boolean) {

                    if (val) {
                        this.style.display = "";
                    } else {
                        this.style.display = "none";
                    }

                }


                appendControl(control: my.controls.iControl) { this.element.appendChild(control.element); };


                //#region databind

                // ovverride _value to affect changes on this.element - check samples


                private _valueBind: my.core.data.binding.Observable | my.core.data.binding.ComputedObservable;
                public _value: string | number | boolean | object;
                set value(val: string | number | boolean | object | my.core.data.binding.Observable | my.core.data.binding.ComputedObservable) {
                    //validation first
                    //if (!this._validationCheck(val)) {


                    if ((this.validation) && (!this.validation.validate(val))) {
                        //validation failed do not update value
                        return;
                    }

                    // value is valid


                    if ((val instanceof my.core.data.binding.Observable) || (val instanceof my.core.data.binding.ComputedObservable)) {
                        this._valueBind = val;
                        this._value = val.value as string | number | boolean | object;
                        val.subscribe(this, this.onBaidingChange.bind(this));
                    } else {
                        // val is simple string | number | boolean
                        this._value = val;
                        if (this._valueBind) {
                            // we have simple type value so if control is bound push vluechange event
                            this.raiseValueChange(val);
                        }

                    }


                };
                get value(): string | number | boolean | object | my.core.data.binding.Observable | my.core.data.binding.ComputedObservable {
                    return this._value;
                }

                //override if needed
                onBaidingChange(sender: object, data: any) {
                    this._value = data;
                }

                raiseValueChange(data: any) {
                    if (this.isTwoWayBinding) {
                        this._valueBind.dispatch(this, data);
                        // directly dispatch instead of passing to
                        // this._valueBind.value = data;
                        // to prevent dispatching to it self 
                        // dispatch have if (s.subscriber != sender)  in it and it will fail if we push it true the observable
                    }
                    this.events.valueChanged.dispatch(this, data);
                }

                public isTwoWayBinding: boolean = true;

                //#endregion



                itemData: Object;//Array<Object>;
                elementAttr: { name: string, value: string }[] = []; //  all values from here are set to the container using the 'setAttribute' function
                style: CSSStyleDeclaration;


                css: my.core.css;

                validation: my.core.controls.validation.validationGroup;

                //tooltip
                private _tooltipPlaceholder: HTMLElement;

                set tooltip(val: string) {
                    this.element.setAttribute('data-tooltip', val);
                    this.element.onmouseenter = (ev: MouseEvent) => {

                    };

                    this.element.classList.add("tooltip");


                    if (this._tooltipPlaceholder == undefined) {
                        this._tooltipPlaceholder = document.createElement("span");
                        this._tooltipPlaceholder.classList.add("tooltiptext");

                    }
                    this._tooltipPlaceholder.innerText = val;
                    this.element.appendChild(this._tooltipPlaceholder);

                    if (val) {
                        var minWidth = val.length * 8;
                        if (minWidth > 200) {
                            minWidth = 200;
                        }
                    }

                    this._tooltipPlaceholder.style.minWidth = minWidth + "px";
                }


                set tooltipPlacement(val: "top" | "right" | "bottom" | "left") {
                    this.element.setAttribute('data-placement', val);
                }


                constructor(htmlType: string) {
                    this.element = document.createElement(htmlType);
                    this.events = new Events(this);
                    var cls: any = this.constructor;
                    this.element.setAttribute('data-ctl', cls.name);
                    this.style = this.element.style;
                    this.validation = new my.core.controls.validation.validationGroup(this);
                };


                // FUNCTIONS

                focus(): void {
                    // Sets focus on the widget
                    this.element.focus();
                };





            } // end class controls.core

            export abstract class coreData extends core {

                //#region databind

                // ovverride _value to affect changes on this.element - check samples


                private _dataTable: my.data.iDataTable;
                set data(val: my.data.iDataTable) {
                    if (val) {
                        if (!(val instanceof my.core.data.DataTable)) {
                            console.log("Invalid Data Format passed to \"Data\" property!"); return;
                        }
                        this._dataTable = val;
                        this.rebind();
                        //val.unsubscribe(this);  -- we have check for duplicates on subscribe
                        val.subscribe(this, this.onBaidingChange.bind(this));
                        this.events.dataChanged.dispatch(this, data);
                    }
                };
                get data(): my.data.iDataTable {
                    return this._dataTable;
                }

                // mandatory for data driven complex controls, do all reataching of data here
                abstract rebind();

                //override if needed
                onBaidingChange(sender: object, data: any) {
                    this.rebind();
                }
                // not calling it at the moment
                raiseDataBaidingChange(data: any) {
                    this._dataTable.dispatch(this, data);
                    this.events.valueChanged.dispatch(this, data);
                }

                //#endregion

            }






        } // end namespace control

    } // end namespace core

} // end namespace my