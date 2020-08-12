/// <reference path="../myControls.ts" />
/// <reference path="Calendar.ts" />

namespace my {

    export namespace calendar {


        export class tools {



            static getGridPosition(val: Date): number {
                var ret: number = val.getDay();
                if (ret == 0) {
                    ret = 7;
                }
                return ret;
            }

            static getLastDayOfMonth(val: Date): Date {
                var yyyy = val.getFullYear();
                var mm = val.getMonth();
                var dd = val.getDate();
                if (mm == 12) { // move to next year if it is december
                    mm = 1;
                    yyyy = yyyy + 1;
                } else {
                    mm = mm + 1;
                }
                var ret: Date = new Date(yyyy, mm, 0);

                return ret;
            }

            static getFirstDayOfMonth(val: Date): Date {
                val.setDate(1);
                var ret: Date = new Date(val);

                return ret;
            }

            static getPrevMonth(val: Date): Date {
                var yyyy = val.getFullYear();
                var mm = val.getMonth();
                var dd = val.getDate();
                if (mm == 1) { // move to next year if it is december
                    mm = 12;
                    yyyy = yyyy - 1;
                } else {
                    mm = mm - 1;
                }
                var ret: Date = new Date(yyyy, mm, dd);

                return ret;
            }

            static getNextMonth(val: Date): Date {
                var yyyy = val.getFullYear();
                var mm = val.getMonth();
                var dd = val.getDate();
                if (mm == 12) { // move to next year if it is december
                    mm = 1;
                    yyyy = yyyy + 1;
                } else {
                    mm = mm + 1;
                }
                var ret: Date = new Date(yyyy, mm, dd);

                return ret;
            }


            static getMonthAsText(val: Date): string {
                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];

                var ret = monthNames[val.getMonth()];
                return ret;
            }

            static compareDates(d1: Date, d2: Date, type: "all" | "date" | "time" = "all"): boolean {
                var ret = false;
                var aDate1 = d1.toISOString().split("T");
                var aDate2 = d2.toISOString().split("T");
                var time1 = aDate1[1].split(",")[0]
                var time2 = aDate2[1].split(",")[0];
                switch (type) {
                    case "date":
                        ret = (aDate1[0] == aDate2[0]);
                        break;
                    case "time":
                        ret = (time1 == time2);
                        break;
                    default:
                        ret = ((aDate1[0] == aDate2[0]) && (time1 == time2));
                        break;
                }

                return ret;
            }

            static getDayOfWeek(val: Date): number {
                var ret = val.getDay();
                //stupid thing returns 0 for sunday so fix is needed 
                if (ret == 0) {
                    ret = 7;
                }
                return ret;
            }

            static getFormatedValue(val: Date): string {
                var ret: string;
                var m = val.getMonth() + 1; // month is 0 for january
                var mm = my.tools.padStart(m.toString(), 2, "0");
                ret = val.getFullYear() + "-" + mm + "-" + my.tools.padStart(val.getDate().toString(), 2, "0");

                return ret;
            }

        } // END class tools 


    } // END namespace calendar

}// END NAMESPACE MY