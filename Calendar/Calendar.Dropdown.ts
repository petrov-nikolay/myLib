/// <reference path="../myControls.ts" />
/// <reference path="Calendar.ts" />


namespace my {


    export namespace core {

        export namespace calendar {

            export abstract class coreCalendarDropDown extends my.core.controls.core {
                ctlType: string = "ctlCalendarDropDown";
                element: HTMLInputElement;
                readOnly: boolean = false; //not used here
                reset: Function; //not used here
                defaultText: string = "Please Select";



                get disabled(): boolean { return this.element.disabled; }
                set disabled(val: boolean) {
                    this.element.disabled = val;
                    this.ctlTrigger.disabled = val;
                }

                private _dataColumn: string = "";
                get dataColumn(): string {
                    return this._dataColumn;
                }
                set dataColumn(val: string) {
                    this._dataColumn = val;
                }

                ctlTrigger: my.controls.iControl; // the elment trigering the selection show
                ctlCalendar: my.calendar.daySelection; // the element that shows the selection
                items: my.controls.ctlListItem[] = [];

                selectedItem: my.controls.ctlListItem;

                private __value: string;
                get _value(): string {
                    return this.__value;
                }
                set _value(val: string) {
                    if (val == undefined) {
                        val = "";
                    }
                    this.__value = val;
                    if (this.ctlTrigger) {

                        if (val.length > 6) {
                            this.ctlTrigger.value = this.getFormatedValue(new Date(val));
                        } else {
                            this.ctlTrigger.value = this.defaultText;
                        }

                    }

                    if (this.ctlCalendar) {
                        if (val.length > 6) {
                            this.ctlCalendar.displayDate = new Date(val);
                        } else {
                            this.ctlCalendar.displayDate = new Date();
                        }

                    }


                }



                constructor(value: string) {
                    super('div');

                    this.css = new my.css.CalendarDropDown(this.element);
                    //var self: ctlDropDown = this;
                    this.value = value;

                    //init the calendar
                    this.ctlCalendar = new my.calendar.daySelection();
                    this.ctlCalendar.events.dayClick.subscribe(this, this.onDayClick.bind(this));
                    // set custom CSS for the dropdon list


                    // add triger and list in the dropdown container

                    this.element.appendChild(this.ctlCalendar.element);



                }



                protected onDayClick(sender, e, day: my.calendar.iDay) {

                    // valu has updated - pased validation and other cheks inside 
                    var d = this.getFormatedValue(day.value);
                    if (this.value != d) {
                        this.value = d;
                        this.events.change.dispatch(this, this.value);
                    }
                    this.hideCalendar();
                    this.ctlTrigger.value = this.value;
                };


                getFormatedValue(val: Date) {
                    var ret: string;
                    var m = val.getMonth() + 1; // month is 0 for january
                    var mm = my.tools.padStart(m.toString(), 2, "0");
                    ret = val.getFullYear() + "-" + mm + "-" + my.tools.padStart(val.getDate().toString(), 2, "0");

                    return ret;
                }



                private closeEventHandle: any; // created only for the removeEventListener to keep the eventtt handler to be closed

                showCalendar() {
                    // if (this.closeEventHandle) { // prevent another lisener if second click on the button
                    //     return;
                    // }

                    this.ctlCalendar.css.add(this.css.currentTeheme.active); // add class active 

                    this.alignDropdownCalendarPosition(this.ctlTrigger.element);
                    this.closeEventHandle = this._closeCalendar.bind(this);
                    document.addEventListener('click', this.closeEventHandle.bind(this), false);
                };


                private _closeCalendar(e: any) {
                    if (!this.ctlTrigger.element.contains(e.target)) {
                        if (!this.ctlCalendar.element.contains(e.target)) {
                            this.hideCalendar();
                        }
                    }
                };


                hideCalendar() {
                    this.ctlCalendar.css.remove(this.css.currentTeheme.active); //remove css class active

                    document.removeEventListener('click', this.closeEventHandle);
                    this.closeEventHandle = undefined;
                }


                private alignDropdownCalendarPosition(htmlEl: HTMLElement): void {
                    // ADD HERE the rest of the positional calculations 
                    var topPos: number = htmlEl.offsetTop + htmlEl.offsetHeight;

                    if (this.ctlTrigger.ctlType == "ctlText") { topPos = htmlEl.offsetTop + htmlEl.offsetHeight; }
                    this.ctlCalendar.style.top = (topPos).toString() + 'px';
                    this.ctlCalendar.style.left = htmlEl.offsetLeft.toString() + 'px';
                    //this.ctlCalendar.style.minWidth = htmlEl.offsetWidth.toString() + 'px';
                };




            }; //end coreCalendarDropDown



        } // namespace calendar

    } // end namespace core


    export namespace calendar {




        // DropDown as Button
        export class calendarDropDown extends my.core.calendar.coreCalendarDropDown {
            ctlType: string = "ctlCalendarDropDown";
            ctlTrigger: my.controls.ctlButton;

            isOptional: boolean = false;

            constructor(value: string = undefined, defaultText = undefined) {
                super(value);
                var self = this;

                if (defaultText) {
                    this.defaultText = defaultText;
                }
                this.ctlTrigger = new my.controls.ctlButton(this.defaultText, (sender, event, data) => {
                    self.showCalendar();
                });

                this.element.appendChild(this.ctlTrigger.element);

            };


        }; // END ctlDropDown



        // // DropDown as text box
        // export class ctlAutocomplete extends my.core.controls.DropDown {
        //     ctlType: string = "ctlAutocomplete";
        //     ctlTrigger: ctlText;

        //     get maxlength(): number {
        //         return this.ctlTrigger.maxlength;
        //     }
        //     set maxlength(val: number) {
        //         this.ctlTrigger.maxlength = val;
        //     }


        //     constructor(value: string) {
        //         super(value);
        //         var self = this;
        //         this.ctlTrigger = new ctlText('');
        //         this.ctlTrigger.events.keyup.subscribe(this, this.onTriggerKeyUp.bind(this));
        //         this.ctlTrigger.events.focus.subscribe(this, this.onTriggerFocus.bind(this));
        //         this.ctlTrigger.isTwoWayBinding = false;


        //         var ico: ctlIcon = new ctlIcon(this.css.currentTeheme.icons.clear);
        //         ico.events.click.subscribe(this, this.onClear.bind(this));
        //         this.ctlTrigger.placeholder = "type here";

        //         this.element.appendChild(this.ctlTrigger.element);
        //         this.element.appendChild(ico.element);
        //     };

        //     protected onTriggerKeyUp(sender: my.controls.iControl, e: my.events.iEvent, data: any): void {

        //         this.ctlList.filterBy("Name", this.ctlTrigger.value as string);
        //         if (this.ctlList.visible === false) {

        //             this.showList();
        //         }
        //     }

        //     protected onTriggerFocus(sender: my.controls.iControl, e: my.events.iEvent, data: any): void {

        //         console.log("ctlTrigger.onFocus");
        //         if (this.ctlList.visible === false) {

        //             this.showList();
        //         }
        //     }

        //     protected onClear(sender: my.controls.iControl, e: my.events.iEvent, data: any): void {
        //         this.value = "trigger:clear";
        //         this.ctlList.resetListItemDisplay();
        //     }


        // }; // END ctlAutocomplete









    } // END NAMESPACE CONTROLS


}// END NAMESPACE MY