
/// <reference path="myControls.ts" />

namespace my {

    export namespace controls {

        export class ctlCard extends my.core.controls.core {
            ctlType: string = "ctlCard";
            element: HTMLDivElement;
            readOnly: boolean = false;
            reset: Function;
            // not used here
            disabled: boolean = false;
            value: string;

            Header: HTMLDivElement;

            private _title: string;
            get title(): string {
                return this._title;
            }
            set title(val: string) {
                this._title = val;
                this._createHeader(val);
            }
            plhClose: HTMLDivElement;  //placeholder in the header
            plhNotify: HTMLDivElement; //placeholder in the header

            Body: HTMLDivElement;
            private _Footer: HTMLDivElement;
            get Footer(): HTMLDivElement {
                if (this._Footer == undefined) {
                    this._createFooter();
                }

                return this._Footer;
            }

            private _eventNotificationCode: string;
            get eventNotificationCode(): string {
                return this._eventNotificationCode;
            }
            set eventNotificationCode(val: string) {
                this._eventNotificationCode = val;
                my.events.global.standard.subscribe(this, val, this._onNotification.bind(this));
            }

            buttons: CardButtons;

            constructor() {
                super('div');
                this.buttons = new CardButtons(this);
                this.css = new my.css.Card(this.element);
                this.Body = document.createElement("div");
                var bCSS = new my.css.cardBody(this.Body); //used here only for now
                this.element.appendChild(this.Body);

            }

            private _onNotification(sender, event, data, code) {
                if (data.result) {
                    this.addNotificationSuccess(data.text);
                } else {
                    this.addNotificationError(data.text);
                }

            }

            private _createHeader(val: string) {
                if (this.Header != undefined) {
                    this.Header.firstElementChild.textContent = val;
                } else {
                    this.Header = document.createElement("div");
                    var hCSS = new my.css.cardHeader(this.Header);

                    var s = document.createElement("span");
                    s.innerText = val;
                    this.Header.appendChild(s);
                    this.element.insertBefore(this.Header, this.element.firstChild); // insert on top

                    //add placeholders
                    this.plhClose = document.createElement("div");
                    this.plhNotify = document.createElement("div");
                    this.plhClose.style.cssFloat = "right"
                    this.plhNotify.style.cssFloat = "right"
                    this.Header.appendChild(this.plhClose);
                    this.Header.appendChild(this.plhNotify);

                }
            }

            private _createFooter() {
                this._Footer = document.createElement("div");
                this.element.appendChild(this._Footer); // insert on bottom
                var fCSS = new my.css.cardFooter(this._Footer);
            }



            addNotificationSuccess(text: string = "") {
                //use the text to add tooltip or more info

                if (this.Header == undefined) { return; }
                var ico = new my.controls.ctlIcon(my.theme.current.icons.sync);
                ico.element.classList.add("ico-btn");
                this.plhNotify.classList.add("cardNotifySuccess");

                this._addNotifyIcon(ico);
                this._hideIcon(ico.element);
                ico.element.onclick = (e) => {
                    this._addNotifyBar(text, false)
                }
            }

            addNotificationError(text: string = "") {
                //use the text to add tooltip or more info

                if (this.Header == undefined) { return; }
                var ico = new my.controls.ctlIcon(my.theme.current.icons.error); // error_outline
                ico.element.classList.add("ico-btn");
                this.plhNotify.classList.add("cardNotifyError");

                this._addNotifyIcon(ico);
                ico.element.onclick = (e) => {
                    this._addNotifyBar(text, true);
                }
            }



            private _addNotifyIcon(ico: my.controls.ctlIcon) {
                ico.style.cssFloat = "right";
                this.plhNotify.innerHTML = ""; //remove old icons if any
                this.plhNotify.appendChild(ico.element);
            }

            private _addNotifyBar(text: string, isError: boolean = false) {
                var bar = document.createElement("div");
                bar.classList.add("notificationBar");
                bar.innerText = text;
                bar.style.top = this.Header.clientHeight + "px";
                this.Header.appendChild(bar);
                if (isError) {
                    bar.classList.add("error");
                }
                bar.classList.add("fadein");

                var ico = new my.controls.ctlIcon("close");
                ico.element.classList.add("ico-btn");
                ico.element.onclick = (e) => {
                    this.Header.removeChild(bar);
                }

                bar.appendChild(ico.element);
            }

            private _hideIcon(ico: HTMLElement) {
                ico.classList.add("fadein");
                //hide then remove
                setTimeout(() => {
                    ico.classList.remove("fadein");
                    ico.classList.add("fadeout");

                    setTimeout(() => {
                        this.plhNotify.innerHTML = "";//.removeChild(ico);
                    }, 1000);
                }, 4000);


            }


        } // class ctlCard

        class CardButtons {
            card: ctlCard;

            constructor(val: ctlCard) {
                this.card = val;
            }

            addCloseButton(clickHandler: my.events.iEventHandler) {
                if (this.card.Header == undefined) { return; }

                var ico = new my.controls.ctlIcon(my.theme.current.icons.close);
                ico.element.classList.add("ico-btn");
                ico.events.click.subscribe(this.card, clickHandler);

                this.card.plhClose.innerHTML = ""; //remove old icons if any
                this.card.plhClose.appendChild(ico.element);
            }

            addFooterBtn(label: string, clickHandler: my.events.iEventHandler, cssColorStyle: my.css.eColorStyles = undefined) {
                if (this.card.Footer == undefined) { return; }

                var btn: my.controls.ctlButton = new my.controls.ctlButton(label, clickHandler);
                if (cssColorStyle) {
                    btn.css.colorStyle = cssColorStyle;
                }
                btn.element.style.cssFloat = "right";
                this.card.Footer.appendChild(btn.element);
            }

            addFooterBtnCustom(btn: my.controls.ctlButton) {
                btn.element.style.cssFloat = "right";
                this.card.Footer.appendChild(btn.element);
            }

        } // end class CardButtons


    }// end namespace controls 
} // end namespace my