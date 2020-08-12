
namespace my {
    "use strict";
    export namespace core {


        export namespace themes {


            export interface iIcons {
                add: string;
                add_circle_outline: string;
                arrow_down: string;
                arrow_left: string;
                arrow_right: string;
                arrow_sort_down: string;
                arrow_sort_up: string;
                arrow_up: string;
                back: string;
                check: string;
                clear: string;
                close: string;
                create: string;
                delete: string;
                done: string;
                edit: string;
                error: string;
                filter: string;
                menu: string;
                new: string;
                next: string;
                previous: string;
                print: string;
                remove: string;
                save: string;
                search: string;
                sync: string;

            };


            export interface iColors {
                primary: string;
                secondary: string;
                success: string;
                info: string;
                warning: string;
                danger: string;
            };



            export interface iSizes {
                //size prefixes
                xs: string;
                s: string;
                m: string;
                l: string;
                xl: string;
                //offset prefixes
                offset_xs: string;
                offset_s: string;
                offset_m: string;
                offset_l: string;
                offset_xl: string;

            };


            export interface iElements {
                buttonRound: string;
                button: string;
                input: string;
                textarea: string;
                checkbox: string;
                radiobutton: string;
                dropDown: string;
                icon: string;
            };

            export interface iLists {
                list: string;
                listItem: string;

                toast: string;
                toastItem: string;

                autocomplete: string;
                autocompleteItem: string;

                dropdown: string;
                dropdownItem: string;

                tabs: string;
                tabsItem: string;
            };



            export interface iTheme {
                size: iSizes;

                colors: iColors;
                icons: iIcons;

                elements: iElements;
                lists: iLists;

                active: string;
                disabled: string;

                column: string;
                row: string;

                alighLeft: string;
                alignRight: string;
                alignCenter: string;
                floatLeft: string;
                floatRight: string;


                // table classes
                table: string;
                tRow: string;
                tColumn: string;
                tCell: string;

                //form classes
                form: string;
                formGroup: string;
                formItem: string;
                formControl: string;

                //calendar classes
                calendar: string;
                calendarDay: string;
                calendarDropDown: string;

                ////grid table classes
                //grTable: string;
                //grRow: string;
                //grColumn: string;
                //grCell: string;

                //card classes
                card: string;
                cardHeader: string;
                cardBody: string;
                cardFooter: string;


                appScreen: string;
            } //end class Theme




        }; //end themes namespace


    } // end namespace core

} // end namespace my