/// <reference path="Core/CSS.ts" />
/// <reference path="Core/Themes.ts" />



namespace my {


    export namespace core {
        export namespace themes {
            export namespace bootstrap {

                export class cIcons implements my.core.themes.iIcons {
                    add: string = "add";
                    add_circle_outline: string = "add_circle_outline";
                    arrow_down: string = "arrow_downward";
                    arrow_left: string = "arrow_left";
                    arrow_right: string = "arrow_right";
                    arrow_sort_down: string = "arrow_sort_down";
                    arrow_sort_up: string = "arrow_sort_up";
                    arrow_up: string = "arrow_upward";
                    back: string = "arrow_back";
                    check: string = "check";
                    clear: string = "clear";
                    close: string = "close";
                    create: string = "create";
                    delete: string = "delete";
                    done: string = "done";
                    edit: string = "edit";
                    error: string = "error";
                    filter: string = "filter";
                    menu: string = "menu";
                    new: string = "new";
                    next: string = "next";
                    previous: string = "previous";
                    print: string = "print";
                    remove: string = "remove_circle_outline";
                    save: string = "save";
                    search: string = "search";
                    sync: string = "sync";

                };

                export class cColors implements my.core.themes.iColors {
                    primary: string = "primary";
                    secondary: string = "secondary";
                    success: string = "success";
                    info: string = "info";
                    warning: string = "warning";
                    danger: string = "red";
                };

                export class cSizes implements my.core.themes.iSizes {
                    //size prefixes
                    xs: string = "col-";
                    s: string = "col-sm-";
                    m: string = "col-md-";
                    l: string = "col-lg-";
                    xl: string = "col-xl-";

                    //offset prefixes
                    offset_xs: string = "offset-";
                    offset_s: string = "offset-sm-";
                    offset_m: string = "offset-md-";
                    offset_l: string = "offset-lg-";
                    offset_xl: string = "offset-xl-";
                };

                export class cLists implements my.core.themes.iLists {
                    list: string = "my-list";
                    listItem: string = "my-list-item";

                    toast: string = "toast-group";
                    toastItem: string = "toast-group-item";

                    autocomplete: string = "";
                    autocompleteItem: string = "";

                    dropdown: string = "my-dd-list"; // this is the list UL not the actual control
                    dropdownItem: string = "my-dd-item";

                    tabs: string = "my-tabs";
                    tabsItem: string = "my-tabs-item";
                };

                export class cElements implements my.core.themes.iElements {
                    buttonRound: string = "btn btn-round btn-primary";
                    button: string = "btn btn-primary";
                    input: string = "my-input";
                    textarea: string = "";
                    checkbox: string = "my-checkbox";
                    radiobutton: string = "";
                    dropDown: string = "my-dd";
                    //icon: string = "material-icons";
                    icon: string = "my-icons";
                };



                export class theme implements my.core.themes.iTheme {
                    size: my.core.themes.iSizes;
                    colors: my.core.themes.iColors;
                    icons: my.core.themes.iIcons;

                    elements: my.core.themes.iElements;
                    lists: my.core.themes.iLists;


                    active: string = "active";
                    disabled: string = "disabled";

                    column: string = "";
                    row: string = "row";

                    alighLeft: string = "left-align";
                    alignRight: string = "right-align";
                    alignCenter: string = "center-align";
                    floatLeft: string = "left";
                    floatRight: string = "right";

                    // table classes
                    table: string = "table";
                    tRow: string;
                    tColumn: string;
                    tCell: string;

                    //form classes
                    form: string = "my-form";
                    formGroup: string = "row";
                    formItem: string = "my-frm-itm";
                    formControl: string = "frm-control";

                    calendar: string = "my-calendar";
                    calendarDay: string = "my-calendar-day";
                    calendarDropDown: string = "my-calendar-dd";
                    //grid table classes
                    // grTable: string = "table";
                    // grRow: string;
                    // grColumn: string;
                    // grCell: string;

                    //card classes
                    card: string = "card";
                    cardHeader: string = "card-title";
                    cardBody: string = "card-body";
                    cardFooter: string = "card-footer";

                    appScreen: string = "screen"

                    constructor() {
                        this.colors = new cColors();
                        this.icons = new cIcons();
                        this.size = new cSizes();
                        this.elements = new cElements();
                        this.lists = new cLists();
                        //this.init();
                    }




                } //end class Theme

            }; // end namespace bootstrap



        }; //end themes namespace
    }; //end core

    export class theme {
        static current: my.core.themes.iTheme = new my.core.themes.bootstrap.theme();
    }


}//end my