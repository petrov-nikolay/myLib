/// <reference path="../myControls.ts" />
/// <reference path="Calendar.Tools.ts" />


namespace my {

    export namespace calendar {


        export interface iDay {
            element: HTMLDivElement;
            value: Date;
            dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
            gridPosition: number;
            isInMonth: boolean;
            isToday: boolean;
            isSelected: boolean;
            events: my.core.controls.Events;
            Title: HTMLSpanElement;
        }




        export interface iCalendar {
            element: HTMLDivElement;

            events: my.core.calendar.Events;

            title: my.core.calendar.Title;
            body: my.core.calendar.Body;

            displayDate: Date;
            settings: my.core.calendar.Settings;


            days: Array<my.calendar.iDay>;

            selectedDate: Date;
            selectedDay: my.calendar.iDay;

        }



    } // END namespace calendar



    export namespace core {

        export namespace calendar {


            export abstract class core extends my.core.controls.core implements my.calendar.iCalendar {
                ctlType: string = "calendar.core";
                element: HTMLDivElement;

                readOnly: boolean = false; //not used here
                reset: Function; // not in use here 
                // not used here
                value: any; //not used here
                disabled: boolean = false;
                events: my.core.calendar.Events;

                settings: my.core.calendar.Settings = new my.core.calendar.Settings();

                title: my.core.calendar.Title;
                body: my.core.calendar.Body;

                days: Array<my.calendar.iDay> = [];


                private _selectedDay: my.calendar.iDay;
                get selectedDay(): my.calendar.iDay {
                    return this._selectedDay;
                }
                set selectedDay(val: my.calendar.iDay) {
                    this._selectedDay = val;
                    this.events.daySelected.dispatch(this, val);
                    this._selectedDate = val.value;
                }

                private _selectedDate: Date = new Date();
                get selectedDate(): Date {
                    return this._selectedDate;
                }


                private _displayDate: Date = new Date();
                get displayDate(): Date {
                    return this._displayDate;
                }
                set displayDate(val: Date) {
                    this._displayDate = val;
                    this.title.updateCurrentDateText()
                    this.body.createDatesGrid(val);
                }


                constructor() {
                    super("div");

                    this.initEvents();
                    this.title = new my.core.calendar.Title(this);
                    this.body = new my.core.calendar.Body(this);

                    this.css = new my.css.Calendar(this.element);
                }

                // separate function so the children can extend the event classes and init their new event clasess not the core events
                initEvents() {
                    this.events = new my.core.calendar.Events(this);
                }

                abstract rebind();



            } // end calendar.monthView







            export abstract class Day extends my.core.controls.core implements my.calendar.iDay {
                ctlType: string = "ctlButton";

                readOnly: boolean = false; // not used here
                reset: Function; // not used here
                element: HTMLDivElement;
                css: my.css.CalendarDay;

                get disabled(): boolean {
                    return this.element.classList.contains("disable");
                };
                set disabled(val: boolean) {
                    if (val) {
                        this.element.classList.add("disable");
                    } else {
                        this.element.classList.remove("disable");
                    }

                };


                Title: HTMLSpanElement;

                gridPosition: number;

                data: my.data.DataTable;

                value: Date;
                dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";


                private _isInMonth: boolean = true;
                get isInMonth(): boolean {
                    return this._isInMonth;
                }
                set isInMonth(val: boolean) {
                    this._isInMonth = val;
                    if (val) {
                        this.element.classList.remove("inactive");
                    } else {
                        this.element.classList.add("inactive");
                    }
                }

                private _isToday: boolean = false;
                get isToday(): boolean {
                    return this._isToday;
                }
                set isToday(val: boolean) {
                    this._isToday = val;
                    if (val) {
                        this.element.classList.add("today");
                    } else {
                        this.element.classList.remove("today");
                    }
                }

                private _isSelected: boolean = true;
                get isSelected(): boolean {
                    return this._isSelected;
                }
                set isSelected(val: boolean) {
                    this._isSelected = val;
                    if (val) {
                        this.element.classList.add("selected");
                    } else {
                        this.element.classList.remove("selected");
                    }
                }

                constructor(value: Date) {
                    super("div")

                    this.value = value;

                    this._createTitle();
                    this.css = new my.css.CalendarDay(this.element);
                    if (my.calendar.tools.compareDates(value, new Date(), "date")) {
                        this.isToday = true;
                    }
                }

                private _createTitle() {
                    this.Title = document.createElement("span");
                    this.Title.innerText = this.value.getDate().toString();
                    this.Title.className = "title";
                    this.element.appendChild(this.Title);
                }



            } // end calendar.monthViewDay







            export class Title {
                ctlType: string = "Calendar.Title";
                element: HTMLElement;
                calendar: my.calendar.iCalendar



                set text(val: string) {
                    //this.plhText.innerText = val;
                }

                private _currentDateElement: HTMLElement;

                constructor(calendar: my.calendar.iCalendar) {
                    this.element = document.createElement('div');
                    this.calendar = calendar;
                    this.calendar.element.appendChild(this.element);
                    this._init();
                    this._createBtnToday();
                    this._createMonthSelector();
                };



                private _createBtnToday() {
                    var btnToday = new my.controls.ctlButton("today", (s, e, d) => {
                        this.calendar.displayDate = new Date();
                        this.updateCurrentDateText()
                    })
                    this.element.appendChild(btnToday.element);
                }

                updateCurrentDateText() {
                    var mm = my.calendar.tools.getMonthAsText(this.calendar.displayDate);

                    this._currentDateElement.innerText = mm + " " + this.calendar.displayDate.getFullYear();
                }

                private _createMonthSelector() {
                    var container = document.createElement("div");
                    container.className = "monthSelector";
                    var icoL = new my.controls.ctlIcon(my.theme.current.icons.previous);
                    icoL.element.classList.add("ico-btn");
                    icoL.events.click.subscribe(this, (s, e, d) => {
                        this.calendar.displayDate = my.calendar.tools.getPrevMonth(this.calendar.displayDate);
                        this.updateCurrentDateText()
                    });
                    // left icon finished
                    var icoR = new my.controls.ctlIcon(my.theme.current.icons.next);
                    icoR.element.classList.add("ico-btn");
                    icoR.events.click.subscribe(this, (s, e, d) => {
                        this.calendar.displayDate = my.calendar.tools.getNextMonth(this.calendar.displayDate);
                        this.updateCurrentDateText()
                    });
                    // right icon finished
                    this._currentDateElement = document.createElement("span");
                    this.updateCurrentDateText()


                    container.appendChild(icoL.element);
                    container.appendChild(icoR.element);
                    container.appendChild(this._currentDateElement);
                    this.element.appendChild(container);
                    console.log("calendar._createMonthSelector: finished");
                }
                private _init() {
                    this.calendar.element.appendChild(this.element);
                    //this.plhText = document.createElement('span');
                    this.element.classList.add('title');
                    //this.element.appendChild(this.plhText);
                }



            }; // end table.TTitle








            export class Body {
                ctlType: string = "Calendar.Title";
                element: HTMLElement;
                calendar: my.calendar.iCalendar

                dayCaptions = {
                    "Single": ["M", "T", "W", "T", , "F", "S", "S"]
                    , "Short": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                    , "Full": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                }

                constructor(calendar: my.calendar.iCalendar) {
                    this.element = document.createElement('div');
                    this.element.classList.add("body");
                    this.calendar = calendar;
                    this.calendar.element.appendChild(this.element);

                    this.createDatesGrid(calendar.displayDate);
                }

                createDatesGrid(val: Date) {

                    var row: HTMLDivElement = this._createRow();
                    this.element.innerHTML = "";
                    //this.element.appendChild(this._createDaysOfWeekLabels());

                    var dCaptions = [];
                    switch (this.calendar.settings.dayCaptions) {
                        case "Single":
                            dCaptions = this.dayCaptions.Single;
                            break;
                        case "Short":
                            dCaptions = this.dayCaptions.Short;
                            break;
                        case "Full":
                            dCaptions = this.dayCaptions.Full;
                            break;
                        default:
                            dCaptions = this.dayCaptions.Single;
                            break;
                    }

                    dCaptions.forEach((itm, idx) => {
                        this.element.appendChild(this._createColTitle(itm));
                    });
                    // this.element.appendChild(this._createColTitle("Mon"));
                    // this.element.appendChild(this._createColTitle("Tue"));
                    // this.element.appendChild(this._createColTitle("Wed"));
                    // this.element.appendChild(this._createColTitle("Thu"));
                    // this.element.appendChild(this._createColTitle("Fri"));
                    // this.element.appendChild(this._createColTitle("Sat"));
                    // this.element.appendChild(this._createColTitle("Sun"));

                    //this.element.appendChild(row);
                    var rowItems = 0;
                    var arr = this._calculateCalendarGrid(val);
                    arr.forEach((itm: Date, idx) => {
                        var day: my.calendar.iDay;
                        day = new my.calendar.Day(itm);

                        day.gridPosition = idx;
                        day.events.click.subscribe(this, (s, e, d) => {
                            this.calendar.events.dayClick.dispatch(this, day);
                        });
                        this.calendar.days.push(day);

                        // if (rowItems == 7) {
                        //     row = this._createRow();

                        //     this.element.appendChild(row);
                        //     rowItems = 0;
                        // }
                        //row.appendChild(day.element);
                        this.element.appendChild(day.element);

                        if (itm.getMonth() != val.getMonth()) {
                            day.isInMonth = false;
                            if (this.calendar.settings.showDaysFromOnlyCurrentMonth) {
                                day.Title.style.visibility = "hidden";
                            } else {
                                day.Title.style.visibility = "visible";
                            }

                        }

                        rowItems++;
                    });
                }

                private _calculateCalendarGrid(val: Date): Array<Date> {
                    var _date = val;
                    var arrDays: Array<Date> = [];
                    var firstDay = my.calendar.tools.getFirstDayOfMonth(_date);
                    var lastDay = my.calendar.tools.getLastDayOfMonth(_date);
                    var firstOfMountPosition = my.calendar.tools.getGridPosition(firstDay);
                    var LastOfMountPosition = my.calendar.tools.getGridPosition(lastDay);

                    if (firstOfMountPosition > 1) {
                        //first of the month is not monday so we need to fill all the days to monday
                        for (var i = 1; i < firstOfMountPosition; i++) {
                            var l = new Date();
                            l.setDate(firstDay.getDate() - i);
                            arrDays.unshift(l); // unshift adds in the beginign, we start with the dates bacwords
                        }
                    }

                    //calculate the rest of the days
                    var daysToGenerate = lastDay.getDate();
                    // get the days to the end of the week after last day of the calendar month
                    daysToGenerate = daysToGenerate + (7 - my.calendar.tools.getDayOfWeek(lastDay));  // stupid thing returns 0 for sunday so proper get date is needed

                    for (var i = 0; i < daysToGenerate; i++) {
                        var d = new Date(Number(firstDay));
                        d.setDate(firstDay.getDate() + i);
                        arrDays.push(d);
                    }


                    return arrDays;
                }

                private _createDaysOfWeekLabels(): HTMLDivElement {
                    var row = this._createRow();
                    row.appendChild(this._createColTitle("Mon"));
                    row.appendChild(this._createColTitle("Tue"));
                    row.appendChild(this._createColTitle("Wed"));
                    row.appendChild(this._createColTitle("Thu"));
                    row.appendChild(this._createColTitle("Fri"));
                    row.appendChild(this._createColTitle("Sat"));
                    row.appendChild(this._createColTitle("Sun"));


                    return row;
                }

                private _createRow(): HTMLDivElement {
                    var row: HTMLDivElement = document.createElement("div");
                    row.className = "row";
                    return row;
                }

                private _createColTitle(text): HTMLDivElement {
                    var col: HTMLDivElement = document.createElement("div");
                    col.className = "colTitle";
                    col.innerText = text;
                    return col;
                }


            } // end calendar.Body

            export class Events extends my.core.controls.Events {
                dayClick: my.core.events.core;
                dayDblClick: my.core.events.core;
                dayMouseEnter: my.core.events.core;
                daySelected: my.core.events.core;

                constructor(eventTarget: my.controls.iControl) {
                    super(eventTarget);
                    this.dayClick = new my.core.events.core("dayClick");
                    this.dayDblClick = new my.core.events.core("dayDblClick");
                    this.dayMouseEnter = new my.core.events.core("dayMouseEnter");
                    this.daySelected = new my.core.events.core("daySelected");
                }

            } //end class tblEvents



            export class Settings {
                dayCaptions: "Single" | "Short" | "Full" = "Single";
                showDaysFromOnlyCurrentMonth: boolean = true;
            } // end class settings



        } // END NAMESPACE calendar

    } // END NAMESPACE core
}// END NAMESPACE MY