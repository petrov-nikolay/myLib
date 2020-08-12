/// <reference path="Core/Controls.ts" />
/// <reference path="myCSS.ts" />
/// <reference path="Data/myData.ts" />



namespace my {

    export namespace controls {




        //export interface ITooltip {
        //    target: HTMLElement,
        //    title?: string,
        //    position?: string,
        //    contentTemplate?: Function,
        //    event?: string
        //}

        export class ctlButton extends my.core.controls.core {
            ctlType: string = "ctlButton";
            element: HTMLInputElement;
            readOnly: boolean = false; // not used here
            reset: Function; // not used here
            // not used here
            css: my.css.Button;  // need this to expose busston specific css functions



            set _value(val: string) {
                this.element.value = val;
            }
            get _value(): string {
                return this.element.value;
            }

            get disabled(): boolean { return this.element.disabled };
            set disabled(val: boolean) { this.element.disabled = val };


            constructor(text: string, clickHandler: my.events.iEventHandler) {
                super('input');

                this.validation = undefined; // this control will not have validation in it
                this.element.type = "button";
                this.value = text;
                this.events.click.subscribe(this, clickHandler);
                this.css = new my.css.Button(this.element);
            }




        } // end ctlButton


        export class ctlText extends my.core.controls.core {
            ctlType: string = "ctlText";
            get placeholderText(): string { return this.elementText.placeholder; }
            set placeholderText(val: string) { this.elementText.placeholder = val; }

            elementText: HTMLInputElement;
            elementIconPH: HTMLElement;
            elementErrorPH: HTMLElement;

            element: HTMLElement;
            readOnly: boolean = false; // need to implement span replace here 
            reset: Function = () => { this._value = undefined };



            get disabled(): boolean { return this.elementText.disabled; }
            set disabled(val: boolean) { this.elementText.disabled = val; }

            get maxlength(): number {
                return this.elementText.maxLength;
            }
            set maxlength(val: number) {
                this.elementText.maxLength = val;
            }

            private _isPassword: boolean = false;
            get isPassword(): boolean {
                return this._isPassword;
            }
            set isPassword(val: boolean) {
                this._isPassword = val;
                if (val) {
                    this.elementText.type = "password";
                } else {
                    this.elementText.type = "text";
                }

            }

            // ovverride _value to affect changes on this.element if binding is set
            get _value(): string {
                return this.elementText.value;
            }
            set _value(val: string) {
                if (val == undefined) {
                    val = "";
                }
                this.elementText.value = val;
            }

            // non bindig way to manipulate text value
            get text(): string {
                return this.elementText.value;
            }
            set text(val: string) {
                this.elementText.value = val;
            }


            private _enableClear: boolean
            get enableClear(): boolean {
                return this._enableClear;
            }
            set enableClear(val: boolean) {
                this._enableClear = val;
                this._addIcoButton(val, "Search");
            }

            private _allowedChars: string;
            get allowedChars() {
                return this._allowedChars;
            }
            set allowedChars(val: string) {
                //NOT WORKING AT THE MOMENT
                this._restrictInput(val);
                this._allowedChars = val;
            }


            private _align: "left" | "center" | "right" = "right";
            get align(): "left" | "center" | "right" {
                return this._align;
            }
            set align(val: "left" | "center" | "right") {
                this._align = val;
                if (val != "left") {
                    this.elementText.style.textAlign = val;
                } else {
                    this.elementText.style.textAlign = "";
                }
            }

            constructor(text: string | my.data.binding.Observable) {
                super('div');
                this.elementIconPH = document.createElement('div');
                this.element.appendChild(this.elementIconPH);  // need this first so the place holder will stay as first element
                this.elementErrorPH = document.createElement('div');
                this.element.appendChild(this.elementErrorPH);

                this.elementText = document.createElement('input');
                this.elementText.type = "text";
                this.element.appendChild(this.elementText);
                this.eventElement = this.elementText; // the html events need the actual control to fire corectly

                this.value = text;
                this.css = new css.Text(this.element);
                //binding
                this.events.change.subscribe(this, this.onValueChange.bind(this));

                this.events.valueValidated.subscribe(this, this._onValueValidated.bind(this));
            }


            private _onValueValidated(s, e, d) {
                if (this.validation.isValid) {
                    this.elementErrorPH.innerHTML = "";
                    this.element.classList.remove("error");
                } else {
                    var ico: my.controls.ctlIcon = new my.controls.ctlIcon("error");
                    this.elementErrorPH.innerHTML = "";
                    this.elementErrorPH.appendChild(ico.element);
                    //var top = this.element.offsetTop + (this.element.offsetHeight - ico.element.offsetHeight) / 2;
                    //ico.element.style.top = top + "px";
                    ico.tooltip = this.validation.errorText;
                    this.element.classList.add("error");
                }
            }


            onValueChange(sender: any, event: any, data: any) {
                this.value = sender.value;
            }

            private _addIcoButton(enabled: boolean, type: "Search" | "Clear") {
                if (enabled) {
                    var ico: my.controls.ctlIcon;
                    if (type == "Search") {
                        ico = new my.controls.ctlIcon(my.theme.current.icons.search);
                    } else {
                        ico = new my.controls.ctlIcon(my.theme.current.icons.clear);
                        if (this.elementText.value.length == 0) {
                            ico.visible = false; // don't show "clear" icon if we don't have text
                        }

                        this.elementText.onkeyup = (e: KeyboardEvent) => {
                            if (this.elementText.value.length == 0) {
                                ico.visible = false;
                            } else {
                                ico.visible = true;
                            }
                        }

                        ico.element.onclick = (e: MouseEvent) => {
                            this.elementText.value = "";
                        };
                    }
                    this.elementIconPH.appendChild(ico.element);

                } else {
                    //this.element.removeChild(this.element.getElementsByTagName("i")[0]);
                    this.elementIconPH.innerHTML = "";
                }
            }

            private _restrictInput(chars: string) {
                if (chars.length == 0) {
                    return;
                }



                if (this._allowedChars == undefined) {
                    //prevents multiple adding of the same event
                    this.events.keydown.subscribe(this, (s, e: KeyboardEvent, d) => {
                        //check system buttons
                        if ((e.key == "Backspace") || (e.key == "Enter") || (e.key == "ArrowLeft") || (e.key == "ArrowRight") || (e.key == "Tab") || (e.key == "Delete")) {
                            return true;
                        }

                        if (chars.indexOf(e.key) == -1) {

                            //NOT WORKING FOR SOME REASON
                            // also check for the system keys here - back , arrows, enter .......
                            e.preventDefault();
                            return false;
                        }
                        return true;
                    });
                }


            } // end _restrictInput

            setIcon(val: ctlIcon, position: "left" | "right" = "right") {
                if (val) {
                    val.element.style.visibility = "hidden";
                    this.elementIconPH.innerHTML = "";
                    //var top = (my.tools.getElementSize(this.element).height - my.tools.getElementSize(val.element).height) / 2;
                    //val.element.style.top = top + "px";
                    this.elementIconPH.appendChild(val.element);
                    var txt = this.element;

                    //document.body.addEventListener("load", () => {
                    this.elementText.onload = () => {
                        var top = (txt.clientHeight - val.element.clientHeight) / 2;
                        val.element.style.top = top + "px";
                        val.element.style.visibility = "visible";
                    }

                }
            } // 

        } // end ctlText


        export class ctlNumber extends my.controls.ctlText {
            ctlType: string = "ctlNumber";
            //     element: HTMLElement;
            private _min: number;
            get min(): number {
                return this._min; //+this.elementText.min;
            }
            set min(val: number) {
                this._min = val;
                this.elementText.min = val.toString();
            }
            private _max: number;
            get max(): number {
                return this._max;// +this.elementText.max;
            }
            set max(val: number) {
                this._max = val;
                this.elementText.max = val.toString();
            }

            isMoney: boolean = false;

            constructor(text: string | my.data.binding.Observable) {
                super(text);
                this.elementText.type = "text";
                this.elementText.onkeyup = this._onTextKeyUp.bind(this);
                this.min = -10000;
                this.max = 10000;

                //this.validation = new my.core.controls.validation.validationGroup("");
                this.validation.add("custom", "must be valid number", this._customValidation.bind(this));

            }

            private _customValidation(v): boolean {
                var i: any;
                if ((v == null) || (v == undefined)) {
                    return true;
                }
                if ((v instanceof my.core.data.binding.Observable) || (v instanceof my.data.binding.Observable)) {
                    if (v.value == undefined) {
                        return true; // need  value = udefined to be true so the forms can do INSERT mode corectly
                    } else {
                        i = v.value
                    }

                } else {
                    i = v;
                }
                if (i == "") {
                    return true;
                }
                i = parseInt(i);
                if (Number.isInteger(i)) {
                    return true;
                }

                return false;
            }


            private _onTextKeyUp(e: KeyboardEvent): any {
                var val: number = parseInt(this.elementText.value); // convert to number

                if (isNaN(val)) {
                    this._validateText(val);  // handles text and "-" minus sighn
                } else {
                    this.elementText.value = val.toString(); // resets the value of the control incase you type non valid integer like 12-, 12kkkk
                    this._validateMinMax(val);
                }
                return true;
            }


            private _validateMinMax(val: number) {
                if ((val < this.min) || (val > this.max)) {
                    if (val < this.min) {
                        this.elementText.value = this.min.toString();
                    } else {
                        this.elementText.value = this.max.toString();
                    }
                }
            }

            private _validateText(val: number) {
                if (this.elementText.value == "-") {
                    // do nothing
                    return;
                }


                if (this.elementText.value != "") {
                    this.elementText.value = ""; // fixes SPACE char
                }



            }

        } // end class ctlNumber 



        export class ctlTextArea extends my.core.controls.core {
            ctlType: string = "ctlTextArea";
            element: HTMLTextAreaElement;
            readOnly: boolean = false; // irrelevant in this element
            reset: Function = () => { this._value = undefined };
            // not used here
            get disabled(): boolean { return this.element.disabled; }
            set disabled(val: boolean) { this.element.disabled = val; }


            // ovverride _value to affect changes on this.element if binding is set
            get _value(): string {
                return this.element.value; // special use of value here because ot the textarea specifics
            }
            set _value(val: string) {
                if (val == undefined) {
                    val = "";
                }
                this.element.value = val;
            }
            onValueChange(sender: any, event: any, data: any) {
                this.value = sender.value;
            }

            constructor(text: string | my.data.binding.Observable) {
                super('textarea');
                this.value = text;
                //binding
                this.events.change.subscribe(this, this.onValueChange.bind(this));
            }

        } // end class ctlTextArea


        export class ctlSpan extends my.core.controls.core {
            ctlType: string = "ctlSpan";
            element: HTMLSpanElement;
            readOnly: boolean = false; // irrelevant in this element
            reset: Function = () => { this._value = undefined }; // need this when we reseting forms
            // not used here
            disabled: boolean = false; // irrelevant in this element

            //  value in this context is the inner text
            // ovverride _value to affect changes on this.element if binding is set
            get _value(): string {
                return this.element.innerText;
            }
            set _value(val: string) {
                if (val == undefined) {
                    val = "";
                }

                val = this._displayFormat(val);
                this.element.innerText = val;
            }


            dispalyFormat: "Default" | "Money" = "Default";


            constructor(text: string | my.data.binding.Observable | my.data.binding.ComputedObservable) {
                super('span');
                this.validation = undefined; // this control will not have validation in it
                this.value = text;
            }

            private _displayFormat(val: string): string {
                var ret = ""

                switch (this.dispalyFormat) {
                    case "Money":
                        ret = Number(val).toFixed(2);
                        break;
                    default:
                        return val;
                        break;
                }

                return ret;
            }

        } // end ctlSpan


        export class ctlHeading extends my.core.controls.core {
            ctlType: string = "ctlHeading";
            element: HTMLHeadingElement;
            readOnly: boolean = false; // irrelevant in this element
            reset: Function; // irrelevant in this element
            // not used here
            disabled: boolean = false; // irrelevant in this element

            //  value in this context is the inner text
            // ovverride _value to affect changes on this.element if binding is set
            get _value(): string {
                return this.element.innerText;
            }
            set _value(val: string) {
                if (val == undefined) {
                    val = "";
                }
                this.element.innerText = val;
            }

            // type stands for h1, h2, h3 etc
            constructor(type: "h1" | "h2" | "h3" | "h4", text: string | my.data.binding.Observable) {
                super(type);
                this.validation = undefined; // this control will not have validation in it
                this.value = text;
            }



        } // end ctlHeading


        export class ctlLabel extends my.core.controls.core {
            ctlType: string = "ctlLabel";
            element: HTMLLabelElement;
            readOnly: boolean = false; // irrelevant in this element
            reset: Function; // irrelevant in this element
            // not used here
            disabled: boolean = false; // irrelevant in this element

            //  value in this context is the innerText
            // ovverride _value to affect changes on this.element if binding is set
            get _value(): string {
                return this.element.innerText;
            }
            set _value(val: string) {
                this.element.innerText = val;
            }

            constructor(text: string | my.data.binding.Observable, labelFor: string) {
                super('label');
                this.validation = undefined; // this control will not have validation in it
                if (text) {
                    this.value = text;
                }
                this.element.htmlFor = labelFor;
            }


        } // end ctlLabel


        export class ctlIcon extends my.core.controls.core {
            ctlType: string = "ctlIcon";
            element: HTMLLabelElement;
            readOnly: boolean = false; // irrelevant in this element
            reset: Function; // irrelevant in this element
            // not used here
            disabled: boolean = false; // irrelevant in this element

            css: my.css.Icon;

            //  value in irelevent here
            set icon(val: string) {
                //this.element.innerText = val;  // material icons need this
                this.element.classList.add(val);
            }

            constructor(iconName: string) {
                super('i');
                this.validation = undefined; // this control will not have validation in it
                this.css = new css.Icon(this.element);
                this.icon = iconName;
            }


        } // end ctlIcon


        export class ctlCheckBox extends my.core.controls.core {
            ctlType: string = "ctlCheckBox";
            element: HTMLElement;
            elCheckBox: HTMLInputElement;
            elLabel: HTMLLabelElement;

            private _readOnly: boolean = false;
            get readOnly(): boolean {
                return this._readOnly;
            }

            set readOnly(val: boolean) {
                this._readOnly = val;
                if (val) {
                    this.elCheckBox.style.visibility = "hidden";
                    this.elCheckBox.style.display = "none";
                    this.elLabel.classList.add("ronly");
                    this._showReadOnlyValue();
                } else {
                    this.elLabel.innerText = "";
                    this.elLabel.classList.remove("ronly");
                    this.elCheckBox.style.visibility = "visible";
                    this.elCheckBox.style.display = "inline-block";
                }
            }

            reset: Function = () => { this.value = false };
            // not used here
            get disabled(): boolean { return this.elCheckBox.disabled }
            set disabled(val: boolean) { this.elCheckBox.disabled = val; }

            // ovverride _value to affect changes on this.element if binding is set
            get _value(): number {
                if (this.elCheckBox.checked == true)
                    return 1;
                else
                    return 0;
            }
            set _value(val: number) {
                if (val == undefined) {
                    val = 0;
                    this.value = 0;
                }
                if (typeof val == 'boolean') {
                    this.elCheckBox.checked = val;
                }
                else if (val > 0) {
                    this.elCheckBox.checked = true;
                    this.elLabel.classList.add("checked");
                }
                else {
                    this.elCheckBox.checked = false;
                    this.elLabel.classList.remove("checked");
                }

                if (this.readOnly) {
                    this._showReadOnlyValue();
                }
            }
            onValueChange(sender: any, event: any, data: any) {
                this.value = sender.value;
            }



            constructor(text: string, checked: boolean | my.data.binding.Observable = false) {
                super('div');
                this.elCheckBox = document.createElement('input');
                this.elLabel = document.createElement('label');

                this.elCheckBox.type = "checkbox";


                //kill the forward of the click,  when we use it in the table we do not want to go in edit mode
                this.elCheckBox.ondblclick = (e: MouseEvent) => {
                    e.stopImmediatePropagation();
                    //e.stopPropagation();
                    //e.preventDefault();
                }

                this.element.appendChild(this.elCheckBox);


                this.value = checked;
                this.css = new my.css.Checkbox(this.element);
                //binding
                this.events.change.subscribe(this, this.onValueChange.bind(this));

                if ((text != undefined) && (text != "")) {
                    this.elCheckBox.id = this.id; // nee ID to attach label to it
                    this.elLabel.innerText = text;
                    this.elLabel.htmlFor = this.id;

                }
                this.elLabel.style.display = "none";
                this.element.appendChild(this.elLabel);


                //this.elLabel.classList.add("toggle");
                //this.elLabel.innerHTML = "<span></span>";
            }


            private _showReadOnlyValue() {
                this.elLabel.style.display = "block";
                if (this._value) {
                    this.elLabel.innerText = "Yes";
                } else {
                    this.elLabel.innerText = "No";
                }
            }
        } // end ctlCheckBox


        export class ctlRadio extends my.core.controls.core {
            ctlType: string = "ctlRadio";
            element: HTMLInputElement;
            readOnly: boolean = false; // irrelevant in this element
            reset: Function = () => { this._value = false }; // reset in this context = remove checked
            // not used here
            get disabled(): boolean { return this.element.disabled }
            set disabled(val: boolean) { this.element.disabled = val; }

            // ovverride _value to affect changes on this.element if binding is set
            get _value(): boolean {
                return this.element.checked;
            }
            set _value(val: boolean) {
                this.element.checked = val;
            }
            onValueChange(sender: any, event: any, data: any) {
                this.value = sender.value;
            }
            //bindabe property
            private _text: my.data.binding.ReadOnlyBind;
            set text(val: string | my.data.binding.Observable) {
                this._text.value = val;
            }
            get text(): string | my.data.binding.Observable {
                return this._text.value;
            }

            constructor(text: string | my.data.binding.Observable, group: string, value: string, selected: boolean = false) {
                super('input');
                this.element.type = "radio";
                this.element.name = group; // this is the HTML input grouping property
                this.value = value;
                //binding
                this.events.change.subscribe(this, this.onValueChange.bind(this));
                //bindabe property
                this._text = new my.data.binding.ReadOnlyBind(this.element, "innerText", undefined);
                this.text = text;
            }
        }; // end ctlRadio


        export class ctlLink extends my.core.controls.core {
            ctlType: string = "ctlLink";
            element: HTMLAnchorElement;
            readOnly: boolean = false; // irrelevant in this element
            reset: Function; // irrelevant in this element
            // not used here
            disabled: boolean = false; // irrelevant in this element

            //  value in this context is the URL
            // ovverride _value to affect changes on this.element if binding is set
            get _value(): string {
                return this.element.href;
            }
            set _value(val: string) {
                this.element.href = val;
            }
            //bindabe property
            private _text: my.data.binding.ReadOnlyBind;
            set text(val: string | my.data.binding.Observable) {
                this._text.value = val;
            }
            get text(): string | my.data.binding.Observable {
                return this._text.value;
            }

            constructor(text: string, url: string, target: string = undefined) {
                super('a');
                this.validation = undefined; // this control will not have validation in it
                this.value = url;
                //bindabe property
                this._text = new my.data.binding.ReadOnlyBind(this.element, "text", undefined);
                this.text = text;
                if (target) {
                    this.element.target = target;
                }
            }

        }; // end ctlLink



    } // end namespace controls
}//  end namespace my 