/// <reference path="Core/CSS.ts" />
/// <reference path="myThemes.ts" />



namespace my {
    // CSS.Themes is at the bottom


    export namespace css {
        export enum eColorStyles {
            primary = "primary",
            secondary = "secondary",
            success = "success",
            info = "info",
            warning = "warning",
            danger = "danger",
        }

        export class Button extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.elements.button);
            }

            set colorStyle(val: my.css.eColorStyles) {
                this.add('btn-' + val);
            }; //end setColor

        };

        export class FixedActionButton extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                this.add("btn-fixed");
                this.add("btnFixedBottomRight");
            }

            set colorStyle(val: my.css.eColorStyles) {
                this.add('btn-' + val);
            }; //end setColor

        };

        export class IconButton extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                this.add("btn-ico");

            }

            set colorStyle(val: my.css.eColorStyles) {
                this.add('btn-' + val);
            }; //end setColor

        };


        export class Text extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                // this.setSizes(6, 1);
                this.add(this.currentTeheme.elements.input);

            }
        }//end Text

        export class Icon extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);


                this.add(this.currentTeheme.elements.icon);

            }
            set colorStyle(val: my.css.eColorStyles) {
                this.add('btn-' + val);
            }; //end setColor
        }; // end Icon

        export class Checkbox extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                // this.setSizes(6, 1);
                this.add(this.currentTeheme.elements.checkbox);
            }
        }//end Text


        export class List extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                // this.setSizes(12, 4);
                this.add(this.currentTeheme.lists.list);

            }
        }//end List
        export class ListItem extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                //this.setSizes(6, 1);
                this.add(this.currentTeheme.lists.listItem);

            }
        }//end List


        export class Toast extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                // this.setSizes(12, 4);
                this.add(this.currentTeheme.lists.toast);

            }
        }//end class Toast
        export class ToastItem extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                //this.setSizes(6, 1);
                this.add(this.currentTeheme.lists.toastItem);

            }
        }//end class ToastItem


        //#region DROPDOWN

        export class DropDown extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                //this.setSizes(3, 2);
                this.add(this.currentTeheme.elements.dropDown);

            }

        };
        export class DropDownList extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                //this.setSizes(12, 4);
                this.add(this.currentTeheme.lists.dropdown);

            }
        }//end List
        export class DropDownListItem extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                //this.setSizes(6, 1);
                this.add(this.currentTeheme.lists.dropdownItem);

            }
        }//end List

        //#endregion


        //#region FORM 

        export class form extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                this.setSizes("xs12");
                //this.setSizeOffsets("l1");

                this.add(this.currentTeheme.form);

            }
        }//end frm
        export class formGroup extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                // this.add("justify-content-center");
                this.add(this.currentTeheme.formGroup);

            }
        }//end frmRow
        export class formItem extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                //this.setSizes("xs12,s6,m6,l4,xl3");
                this.add(this.currentTeheme.formItem);

            }
        }//end frmElement
        export class formControl extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);


                //this.setSizes(12, 6, 4);
                this.add(this.currentTeheme.formControl);

            }
        }//end frmElement

        //#endregion


        //#region TABLE

        export class Table extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.table);

            }
        }//end grTable
        export class tRow extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.tRow);

            }
        }//end tRow
        export class tColumn extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                //this.setSizes("xs1");
                this.add(this.currentTeheme.tColumn);

            }
        }//end tColumn
        export class tCell extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                //this.setSizes(1);
                this.add(this.currentTeheme.tCell);

            }
        }//end tCell

        //#endregion


        ////#region GRID

        //export class grTable extends my.core.css {
        //    constructor(element: HTMLElement) {
        //        super(element, my.theme.current);
        //        this.add(this.currentTeheme.grTable);

        //    }
        //}//end grTable
        //export class grRow extends my.core.css {
        //    constructor(element: HTMLElement) {
        //        super(element, my.theme.current);
        //        this.add(this.currentTeheme.grRow);

        //    }
        //}//end grRow
        //export class grColumn extends my.core.css {
        //    constructor(element: HTMLElement) {
        //        super(element, my.theme.current);

        //        this.setSizes("xs1");
        //        this.add(this.currentTeheme.grColumn);

        //    }
        //}//end grColumn
        //export class grCell extends my.core.css {
        //    constructor(element: HTMLElement) {
        //        super(element, my.theme.current);

        //        //this.setSizes(1);
        //        this.add(this.currentTeheme.grCell);

        //    }
        //}//end grCell


        //#endregion


        //#region CARD

        export class Card extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                //this.setSizes("m12,l10");
                //this.setSizeOffsets("xl1");
                this.add(this.currentTeheme.card);
            }
        }//end card
        export class cardHeader extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.cardHeader);
            }
        }//end Header
        export class cardBody extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.cardBody);
            }
        }//end cardBody
        export class cardFooter extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.cardFooter);
            }
        }//end Footer

        //#endregion


        //#region TABS

        export class Tabs extends my.core.css {

            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.lists.tabs);
            }

        }//end class Tabs

        export class TabsItem extends my.core.css {

            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.lists.tabsItem);
            }

        }// end class TabsItem
        //#endregion


        //#region CALENDAR

        export class Calendar extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.calendar);

            }
        }//end Calendar

        export class CalendarDay extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.calendarDay);

            }
        }//end CalendarDay

        export class CalendarDropDown extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.calendarDropDown);

            }
        }//end CalendarDropDown


        //#endregion

        export class AppScreen extends my.core.css {
            constructor(element: HTMLElement) {
                super(element, my.theme.current);

                this.add(this.currentTeheme.appScreen);
                this.setSizes("xs12,xl10,offset_xl1");
                //this.setSizeOffsets("xl1");

            }

            set colorStyle(val: my.css.eColorStyles) {
                this.add('btn-' + val);
            }; //end setColor

        };


    }; //END CSS namecpace


}//end my