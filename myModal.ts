/// <reference path="myControls.ts" />
/// <reference path="Core/Modal.ts" />


namespace my {

    export namespace controls {


        export namespace modal {

            export class popup extends my.core.modal.core {
                ctlType: string = "popup";

                constructor() {
                    super();
                    this.title = " ";
                    this.buttons.addCloseButton((s, e, d) => {
                        this.hide();
                    })
                };


            } // end class popup


            export class popAlert extends my.controls.modal.popup {
                ctlType: string = "popAlert";
                constructor() {
                    super();

                    var btn = new ctlButton("OK", (s, e, d) => {
                        this.hide();
                    });

                    //btn.css.setColor = my.theme.current.colors.info;

                    this.Footer.appendChild(btn.element);
                };


            };//  END popAlert


            export class popConfirm extends my.controls.modal.popup {
                ctlType: string = "popConfirm";

                resulthandler: any;

                constructor(text: string, resulthandler: (val: boolean) => void) {
                    super();
                    this.resulthandler = resulthandler;

                    this.element.classList.add("confirm");
                    this.Body.innerText = text;
                    this._init();
                };



                private _init() {

                    var btnYes = new my.controls.ctlButton('Yes', (s, e, d) => {
                        this.resulthandler(true);
                        this.hide();
                    });
                    //btnYes.element.setAttribute("data-i18n", "Yes");
                    btnYes.css.colorStyle = my.css.eColorStyles.success;

                    var btnNo = new my.controls.ctlButton('No', (s, e, d) => {
                        this.resulthandler(false);
                        this.hide();
                    });
                    btnNo.css.colorStyle = my.css.eColorStyles.danger;
                    //btnNo.element.setAttribute("data-i18n", "No");


                    this.Footer.appendChild(btnYes.element);
                    this.Footer.appendChild(btnNo.element);

                }


            };//  END popConfirm

            //    export class popDetails extends modal {
            //        ctlType: string = 'popDetails';

            //        constructor(body: HTMLElement, head: HTMLElement = undefined, foot: Array<HTMLElement> = undefined) {
            //            super('popDetails');

            //            this.sHeader = head;
            //            this.sBody = body;
            //            this.sFooter = foot;
            //        }

            //        set sHeader(val: HTMLElement) {
            //            if (val) {
            //                this.header.element.appendChild(val);
            //                this.element.appendChild(this.header.element);
            //            }
            //        }

            //        set sBody(val: HTMLElement) {
            //            if (val) {
            //                this.body.element.appendChild(val);
            //                this.element.appendChild(this.body.element);
            //            }
            //        }

            //        set sFooter(val: Array<HTMLElement>) {
            //            if (val) {
            //                val.forEach((obj, idx) => {
            //                    this.footer.element.appendChild(obj);
            //                })

            //                this.element.appendChild(this.footer.element);
            //            }
            //        }

            //        close() {
            //            this.hide()
            //        }

            //        show() {
            //            this._show();
            //        }
            //    }
            //}




        } // end namespace modal 

    } // END namespace CONTROLS
}// END namespace MY