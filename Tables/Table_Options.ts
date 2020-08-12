

namespace my {
    export namespace core {
        export namespace table {


            export class Options {

                table: my.table.iTable;

                select_SingleRow: boolean = true;
                select_MultyRow: boolean = false;

                useDblClickAsEdit: boolean = true;

                enable_DeleteRowHover: boolean = false;



                set allow_TitleAddNew(val: boolean) {
                    if (val) {
                        this.table.tTitle.showAddNew()
                    } else {
                        this.table.tTitle.hideAddNew();
                    }
                }

                set allow_TitleSearch(val: boolean) {
                    if (val) {
                        this.table.tTitle.showTitleSearch();
                    } else {
                        this.table.tTitle.hideTitleSearch();
                    }
                }

                set allow_TitleFilter(val: boolean) {
                    if (val) {
                        this.table.tTitle.showTitleFilter();
                    } else {
                        this.table.tTitle.hideTitleFilter();
                    }
                }




                allow_Edit: boolean = true;

                allow_sorting: boolean = true;

                showTotals: boolean = false;





                constructor(table: my.table.iTable) {
                    this.table = table;

                }


            }// end class Options



        } //end namespace Table
    } //end namespace core
} //end namespace my