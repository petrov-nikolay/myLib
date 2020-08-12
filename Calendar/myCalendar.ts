/// <reference path="../myControls.ts" />
/// <reference path="Calendar.ts" />

namespace my {

    export namespace calendar {

        export interface iCalendarEvent {
            title: string;
            details: string;
            ownerUID: string;
            startDate: Date;
            endDate: Date;
            isAllDay: boolean;
        }

        export class daySelection extends my.core.calendar.core {


            constructor() {
                super();

                this.events.dayClick.subscribe(this, this._onDayClick.bind(this));
                this.settings.dayCaptions = "Short";
                this.body.createDatesGrid(new Date()); // refreshing the body so the new option "short" can be used
            }

            private _onDayClick(s, e, d: my.calendar.iDay) {
                this.value = this.selectedDay;
            }


            rebind() {

            }

        } // END class daySelection


        export class monthView extends my.core.calendar.core {

            private _editForm: my.forms.Standard;
            get editForm(): my.forms.Standard {
                return this._editForm;
            }
            set editForm(val: my.forms.Standard) {
                this._editForm = val;
                this.editModal.Body.appendChild(val.element);
            }
            editModal: my.controls.modal.popup;
            editModalTitle: string;
            calEvents: Array<my.calendar.iCalendarEvent> = [];


            private _dataSet: my.data.iDataSet;
            get dataSet(): my.data.iDataSet {
                return this._dataSet;
            }
            set dataSet(val: my.data.iDataSet) {
                this._dataSet = val;
                if (val) {
                    this._dataSet.events.Loaded.subscribe(this, this.rebind.bind(this));
                }
                //this._updateDataRow();
            }


            constructor() {
                super();

                this.events.dayClick.subscribe(this, this._onDayClick.bind(this));
                this.editModal = new my.controls.modal.popup();

                this.settings.dayCaptions = "Short";
                this.displayDate = new Date;
            }

            rebind() {
                var t = this.dataSet.getTable()
                t.value.forEach((item, idx) => {
                    this._addCalItem(item);
                });
            }

            private _onDayClick(s, e, d: my.calendar.iDay) {
                this.selectedDay = d;
                this.editModal.title = this.editModalTitle + my.calendar.tools.getFormatedValue(d.value);
                this.editModal.show();
            }

            private _addCalItem(data: my.data.DataTable) {
                var d: my.calendar.Day;
                this.days.forEach((item: my.calendar.Day, idx) => {
                    if (data.value == item.data) {
                        d = item;
                    }
                });


            }


            addCalEvent(val: my.calendar.iCalendarEvent) {
                if (val == undefined) return;

                this.calEvents.push(val);
            }

            paintEvent(val: my.calendar.iCalendarEvent) {
                if (this._dateIsInGrid(val.startDate) == false) {
                    if (this._dateIsInGrid(val.endDate) == false) {
                        //if start date and enddate not in grid = do nothing 
                        return;
                    }
                }

                var startDate = val.startDate.toISOString().split("T")[0]
                // startdate or end date are in the grid
                this.days.forEach((item: my.calendar.Day, idx) => {
                    if (item.value.toISOString().split("T")[0] = startDate) {
                        item.addCalEvent(val);
                    }
                });

            }


            private _dateIsInGrid(val: Date): boolean {

                if ((val.getFullYear() == this.displayDate.getFullYear()) && (val.getMonth() == this.displayDate.getMonth())) {
                    return true;   // matches YYYY/MM
                }

                var bret: boolean = false
                //check the dates otside the display month
                this.days.forEach((item: my.calendar.iDay, idx) => {
                    if (item.isInMonth == false) {
                        if (my.calendar.tools.compareDates(val, item.value, "date")) {
                            bret = true;
                        }
                    }
                });

                return bret;
            }

        } // END class monthView 



        export class Day extends my.core.calendar.Day {
            calEvents: Array<my.calendar.iCalendarEvent> = [];

            constructor(val: Date) {
                super(val);
            }

            addCalEvent(val: my.calendar.iCalendarEvent) {
                if (val == undefined) return;

                this.calEvents.push(val);

                var el = document.createElement("div");
                el.innerText = val.title;
                el.className = "calEvent";
                this.element.appendChild(el);
            }


        } // END class Day


    } // END namespace calendar

}// END NAMESPACE MY