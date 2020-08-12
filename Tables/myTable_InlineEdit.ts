/// <reference path="../myControls.ts" />
/// <reference path="Table.ts" />
/// <reference path="myTable_Simple.ts" />


namespace my {
    export namespace table {

        export class InlineEdit extends Simple {
            ctlType: string = "table_InlineEdit";

            optionsInlineEdit: my.core.table.optionsInlineEdit;
            onInsert: (data: any) => any;
            frmInsert: my.forms.Custom;
            insertRow: my.table.iRow;

            constructor(dataset: my.data.iDataSet, cfg: Config) {
                super(dataset, cfg);

                this.optionsInlineEdit = new my.core.table.optionsInlineEdit();
                this.frmInsert = new my.forms.Custom(dataset);
                this.frmInsert.mode = "insert";
                this._initEvents();
                this._addHeadRowInsert();

                //custo things to clear from the standart table
                //this.tTitle.element.innerHTML = "";
                delete this.tTitle;

                this.element.classList.remove("table");
                this.element.classList.add("table-inline-edit");

                // this.options.allow_sorting = false;
                // this.options.enable_DeleteRowHover = false;
                // this.options.allow_TitleFilter = false;
                // this.options.allow_TitleSearch = false;
            }

            private _initEvents() {
                // we are using the table.Standard initEvents, here we just subscribe for things
                //this.events.editClick.subscribe(this, this._onEdit.bind(this));
            }


            private _addHeadRowInsert() {
                this.insertRow = new my.core.table.Row(this);
                this.insertRow.element.classList.add("row-header-insert");

                var td: my.core.table.tdCell;

                this.columns.forEach((col: my.core.table.Column, i) => {
                    var el = this.addToForm(col, undefined);
                    if (col.isHidden == false) {
                        col.isEditable = true;
                        td = new my.core.table.tdCell(col);

                        if (col.visibleInInsertMode) {
                            td.appendControl(el);
                        }

                        this.insertRow.addCell(td);
                    }
                });

                // form ready need to rebind for dropdowns and others working with external data
                this.frmInsert.rebind();


                var btnSave = new my.controls.ctlIconButton(my.theme.current.icons.new, (s, e, d) => {
                    // validation here 

                    // after validation make shure the form have same table name as the table
                    this.frmInsert.DataTableName = this.DataTableName;
                    this.frmInsert.save(() => {
                        this.frmInsert.reset();
                        this.dataSet.getData();
                    });

                });
                btnSave.element.classList.add("color-green");
                btnSave.element.classList.add("btn_add");
                var t = document.createElement("td");
                t.appendChild(btnSave.element);
                this.insertRow.element.appendChild(t);
                this.tHead.addRow(this.insertRow);

                //add empty row to detach from body
                var rEmpty: my.core.table.Row = new my.core.table.Row(this);
                rEmpty.element.classList.add("row-header-empty");
                rEmpty.element.innerHTML = `<td colspan="${this.columns.length - 1}"> </td>`;
                this.tHead.addRow(rEmpty);
            }


            addToForm(col: my.table.iColumn, data): my.forms.fItem {
                var oCleanValue;
                if (data) {
                    oCleanValue = data[col.dataColumn];
                }

                var e = this.frmInsert.createControl(undefined, col.dataColumn, col.dataType, col.type);
                e.defaultValue = col.defaultValue;

                if (col.dataTable) {
                    e.dataTable = col.dataTable;
                }


                return e;
            }


            afterAddBodyRow(row: my.table.iRow) {
                var i: my.controls.ctlIcon = new my.controls.ctlIcon(my.theme.current.icons.delete);
                i.element.classList.add("row-btn");
                i.element.classList.add("color-red");
                i.element.id = "rowdel";
                i.events.click.subscribe(this, this.deleteRow.bind(this), row);

                var t = document.createElement("td");
                t.appendChild(i.element);
                t.width = "1px";
                row.element.appendChild(t);
            }


        }; // end class InlineEdit 






    } //end namespace table

    export namespace core {
        export namespace table {
            export class optionsInlineEdit {

                mode: "inline" | "inlineForm" = "inline";
                positionOfNewElement: "top" | "bottom" = "top";

            }// end class optionsInlineEdit
        } //end namespace table
    }// end namespace core


} //end namespace my