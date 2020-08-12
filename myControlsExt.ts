/// <reference path="myControls.ts" />

namespace my {

    export namespace controls {

        export class ctlFormElement extends my.core.controls.core {
            ctlType: string = "ctlLabel";
            element: HTMLDivElement;

            readOnly: boolean = false; // irrelevant in this element
            reset: Function; // irrelevant in this element
            // not used here
            disabled: boolean = false; // irrelevant in this element

            label: string;
            control: my.controls.iControl;

            set data(val: my.data.binding.Observable) {

            }

            constructor(label: string, control: my.controls.iControl) {
                super('div');
                this.validation = undefined; // this control will not have validation in it
                this.label = label;

                this.control = control;

                this._create();
            }


            rebind() {

            }


            private _create() {
                var lbl = new my.controls.ctlLabel(this.label, this.control.id);
                var lblContainer = document.createElement("div");
                lblContainer.appendChild(lbl.element);
                this.element.appendChild(lblContainer);

                var ctlContainer = document.createElement("div");
                ctlContainer.appendChild(this.control.element);
                this.element.appendChild(ctlContainer);

            }

        } // end class ctlFormElement


        export class ctlTextEX extends my.controls.ctlText {

            constructor(text: string | my.data.binding.Observable, label: string) {
                super(text);
                this._create();
            }

            private _create() {
                var lbl = new my.controls.ctlLabel(this.text, this.elementText.id);
                var lblContainer = document.createElement("div");
                lblContainer.appendChild(lbl.element);
                this.element.appendChild(lblContainer);
            }


        } // end class ctlTextEX



        export class ctlDivList extends my.core.controls.core {
            ctlType: string = "ctlDivList";
            element: HTMLDivElement;
            readOnly: boolean = false;
            reset: Function;
            // not used here
            disabled: boolean = false;
            value: string;

            //items: Array<iControl> = [];

            constructor() {
                super('div');
            }


            addElement(el: HTMLElement, addPosition: "top" | "bottom" = "bottom") {
                //this.items.push(el);

                if (addPosition == "top") {
                    this.element.insertBefore(el, this.element.firstChild)
                } else {
                    this.element.appendChild(el)
                }
            }



        } //  class ctlDivList


        export class ctlDivListItem extends my.core.controls.core {
            ctlType: string = "ctlDivListItem";
            element: HTMLDivElement;
            readOnly: boolean = false;
            reset: Function;
            // not used here
            disabled: boolean = false;
            value: string;

            constructor() {
                super('div');

            }

        } // class ctlDivListItem


        export class ctlToast extends ctlDivList {
            ctlType: string = "ctlDivList";

            interval: number = 5000;

            position: "top" | "bottom" = "top";

            constructor() {
                super();
                this.css = new css.Toast(this.element);
            }


            add(text: string, color: "info" | "error" | "success" = "info") {
                var el: ctlToastItem = new ctlToastItem(text);
                var position: "top" | "bottom" = "top";
                if (this.position == "top") {
                    //show toast at the top
                    //add the messages in the bottom
                    position = "bottom";
                }

                el.element.classList.add(color);

                this.addElement(el.element, position);

                el.element.classList.add("fadein");
                //hide then remove
                setTimeout(() => {
                    el.element.classList.remove("fadein");
                    el.element.classList.add("fadeout");

                    setTimeout(() => {
                        this.element.removeChild(el.element);
                    }, 1000);
                }, this.interval);

            }





        } // end class ctlToast

        export class ctlToastItem extends ctlDivListItem {
            constructor(text: string) {
                super();
                this.element.innerText = text;
                this.css = new css.ToastItem(this.element);
            }
        } // end class ctlToastItem


        export class ctlIconButton extends my.core.controls.core {
            ctlType: string = "ctlIconButton";
            element: HTMLButtonElement;
            readOnly: boolean = false; // not used here
            reset: Function; // not used here
            // not used here
            css: my.css.Button;  // need this to expose busston specific css functions

            icon: my.controls.ctlIcon;

            // set _value(val: string) {
            //     this.element.value = val;
            // }
            // get _value(): string {
            //     return this.element.value;
            // }

            get disabled(): boolean {
                return this.element.disabled;
            }
            set disabled(val: boolean) {
                this.element.disabled = val;
                if (val) {
                    this.element.classList.add("disabled");
                } else {
                    this.element.classList.remove("disabled");
                }
            }


            constructor(icon: string, clickHandler: my.events.iEventHandler) {
                super('button');
                //this.element.style.zIndex = "100";
                this.validation = undefined; // this control will not have validation in it
                this.events.click.subscribe(this, clickHandler);
                this.css = new my.css.IconButton(this.element);
                this._createIcon(icon);
            }


            private _createIcon(icon: string) {
                this.icon = new my.controls.ctlIcon(icon);
                this.element.appendChild(this.icon.element);
            }

        } // end ctlIconButton


        export class ctlFixedActionButton extends my.core.controls.core {
            ctlType: string = "ctlDivList";
            element: HTMLDivElement;
            readOnly: boolean = false;
            reset: Function;             // not used here
            disabled: boolean = false;

            triggerIcon: string;
            triggerAction: "hover" | "click" = "click";

            btnTrigger: my.controls.ctlIconButton;
            btnListContainer: my.controls.ctlDivList;
            btnList: Array<iControl> = [];

            constructor(icon: string, onClickOverride: (s, e, d) => any = undefined) {
                super("div");
                this.css = new my.css.FixedActionButton(this.element);

                this.triggerIcon = icon;

                //btn list container
                this.btnListContainer = new my.controls.ctlDivList();
                this.element.appendChild(this.btnListContainer.element);
                this.btnListContainer.element.classList.add("btnFixedItems");

                this._createTrigger(onClickOverride);
            }


            addButton(id: string, ico: my.controls.ctlIconButton) {
                ico.element.classList.add("btn-round");
                this.btnListContainer.addElement(ico.element);
                this.btnList.push(ico); // add it in the array so we can control visible = true/false later
            }


            hideButton(id: string) {
                this.btnList.forEach((itm, idx) => {
                    if (itm.id == id) {
                        //itm.style.visibility = "hidden";
                        itm.element.classList.add("hidden");
                    }
                });
            }

            showButton(id: string) {
                this.btnList.forEach((itm, idx) => {
                    if (itm.id == id) {
                        //itm.style.visibility = "visible";
                        itm.element.classList.remove("hidden");
                    }
                });
            }








            private _createTrigger(onClickOverride: (s, e, d) => any) {
                if (onClickOverride) { // use for single button cases where no need for additional buttons/options
                    this.btnTrigger = new ctlIconButton(this.triggerIcon, onClickOverride);

                } else {
                    this.btnTrigger = new ctlIconButton(this.triggerIcon, this._onTriggerClick.bind(this));

                }

                //btn trigger
                this.btnTrigger.element.classList.add("trigger");
                this.btnTrigger.element.classList.add("btn-round")

                this.element.appendChild(this.btnTrigger.element);


                this.element.onmouseenter = () => {
                    if (this.triggerAction == "hover") {
                        this.btnListContainer.element.classList.add("open");
                    }
                }

                this.element.onmouseleave = () => {
                    if (this.triggerAction == "hover") {
                        this.btnListContainer.element.classList.remove("open");
                    }
                }

                // this.element.onclick = () => {
                //     if (this.triggerAction = "click") {
                //         if (this.btnListContainer.element.classList.contains("open")) {
                //             this.btnListContainer.element.classList.remove("open");
                //         } else {
                //             this.btnListContainer.element.classList.add("open");
                //         }
                //     }
                // }




            }

            private _onTriggerClick(s, e, d) {
                if (this.btnListContainer.element.classList.contains("open")) {
                    this.btnListContainer.element.classList.remove("open");
                    this.btnTrigger.icon.icon = this.triggerIcon;
                } else {
                    this.btnListContainer.element.classList.add("open");
                    this.btnTrigger.icon.icon = my.theme.current.icons.close;
                }
            }


        } // end class ctlFixedActionButton

    } // END NAMESPACE CONTROLS
}// END NAMESPACE MY