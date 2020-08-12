/// <reference path="Controls.ts" />



namespace my {
    "use strict";
    export namespace core {

        export namespace modal {

            export class ctlMask {
                ctlType: string = "ctlMask";
                element: HTMLDivElement;
                id: string;
                onClick: Function;

                constructor(id: string) {
                    this.element = document.createElement('div');
                    this.id = id;
                    this.element.classList.add("modal");
                    this.element.classList.add("mask");

                    this.element.onclick = () => {
                        if (this.onClick) {
                            this.onClick();
                        }
                    }

                };

                show() {
                    document.body.appendChild(this.element);
                    document.body.style.overflow = 'hidden';
                };

                hide() {
                    document.body.removeChild(this.element);
                    document.body.style.overflow = '';
                }

            }; // end ctlMask


            export abstract class core extends my.controls.ctlCard {

                mask: ctlMask;

                events: Events;

                constructor() {
                    super();


                    this.element.classList.add("modal");
                    this.mask = new ctlMask(this.id + '_mask');
                    this.events = new Events(this);

                };


                show() {
                    if (tools.isIE()) {
                        // max-width doesnt work on IE, ofcourse..
                        // needs width
                        this.element.classList.add("open-ie");
                    } else {
                        this.element.classList.add("open");
                    }

                    document.body.appendChild(this.element);
                    this.mask.show();
                    this.events.show.dispatch(this);
                };

                hide() {
                    // remove() is not supported in IE11, how unexpectedly
                    if (tools.isIE()) {
                        document.body.removeChild(this.element);
                        this.mask.hide();

                        return;
                    }

                    this.element.remove();
                    this.mask.hide();
                    this.events.hide.dispatch(this);
                };




            }; // end modal


            export class Events extends my.core.controls.Events {
                hide: my.core.events.core;
                show: my.core.events.core;
                result: my.core.events.core;

                constructor(eventTarget: my.controls.iControl) {
                    super(eventTarget);
                    this.hide = new my.core.events.core("Modal_hide");
                    this.show = new my.core.events.core("Modal_show");
                    this.result = new my.core.events.core("Modal_result");
                }


            } //end Control.Events


            export class modalHeader {
                element: HTMLDivElement;


                plhClose: HTMLElement;;
                plhTitle: HTMLElement;


                set text(val: string) {
                    this.plhTitle.innerHTML = '';
                    var title = document.createElement('h4');
                    title.innerText = val;
                    this.plhTitle.appendChild(title);
                };

                set showBtnClose(val: boolean) {
                    if (val) {
                        this.plhClose.style.visibility = "visible";
                    }
                    else {
                        this.plhClose.style.visibility = "hidden";
                    }
                }

                parent: my.core.modal.core;
                constructor(parent: my.core.modal.core) {
                    this.parent = parent;
                    this.element = document.createElement('div');
                    this.element.className = 'modal_header';
                    this._initPlaceholders();
                };

                private _initPlaceholders() {
                    this.plhClose = document.createElement("div");
                    this.plhTitle = document.createElement("div");
                    this.plhClose.style.cssFloat = "right"
                    this.plhTitle.style.cssFloat = "left"
                    this.element.appendChild(this.plhClose);
                    this.element.appendChild(this.plhTitle);

                    var ico = new my.controls.ctlIcon(my.theme.current.icons.close);
                    ico.element.classList.add("ico-btn");
                    ico.events.click.subscribe(this, (s, e, d) => {
                        this.parent.hide();
                    });


                    this.plhClose.appendChild(ico.element);
                }

            }

            export class modalBody {
                element: HTMLDivElement;
                set text(val: string) { this.element.innerText = val; };

                constructor() {
                    this.element = document.createElement('div');
                    this.element.className = 'modal_body';

                };
            };

            export class modalFooter {
                element: HTMLDivElement;
                set text(val: string) { this.element.innerText = ''; };
                addClass(val: string): void { this.element.classList.add(val) };

                constructor() {
                    this.element = document.createElement('div');
                    this.element.className = 'modal_footer';

                };
            };

        } // end namespace modal


    } // end namespace core 
} // end namespace my