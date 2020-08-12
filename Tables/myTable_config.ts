/// <reference path="../Core/Config.ts" />

namespace my {

    export namespace table {

        export class Config extends my.core.config.cManager {

            columnsCfg: my.table.ColumnCfg[];
            tableCfg: my.table.TableCfg = new my.table.TableCfg();



            constructor(json: object = undefined) {
                super();
                if (json) {
                    this.JSON = json;
                    this.parseData(json);
                }
            }



            parseData(val: any) {
                if (val.hasOwnProperty("columns")) {
                    this._parseColumns(val.columns)
                }
                this.parseControl(val, this.tableCfg);
                this.applyDefaultSizes(this.columnsCfg);
            }

            private _parseColumns(val: Array<object>) {
                this.columnsCfg = [];

                val.forEach((item: any, idx) => {
                    var tColumn: my.table.ColumnCfg = new my.table.ColumnCfg();
                    if (idx == 0) {
                        tColumn.isDefault = true; // set first column as default
                        //need better way to setup default column
                    }
                    this.parseColumn(item, tColumn);


                    // custom table property parsing
                    if (item.hasOwnProperty("isDefault")) {
                        tColumn.isDefault = item["isDefault"];
                    }


                    //finish parsing
                    this.columnsCfg.push(tColumn);
                });





            } // end private _parseColumns

            defaultSizeFunction(col: my.config.iColumn, totalCols: number) {
                if ((col.dataType == "boolean") || (col.dataType == "number")) {
                    col.size = "8%";
                } else {
                    col.size = Math.round(100 / totalCols) + "%";
                }
            }





            // CUSTOM PARSING

            parseCotrolCustom(val: object, ctl: my.config.iControl) {
                // no custom parese for tables for now
            }

            parseGroupCustom(val: object, col: my.config.iColumGroup) {
                //do nothing here
            }

            parseColumnCustom(val: object, col: my.config.iColumn) {
                // no custom parese for tables for now
            }


        } // end TableCfg

        export class ColumnCfg extends my.core.config.cColumn {
            isDefault: boolean;

            constructor() {
                super();
            }
        }


        export class TableCfg extends my.core.config.cControl {
            constructor() {
                super();
            }
        }




    }; //end namespace grid

}; //end namespace my



// JSON EXAMPLE

//{
//    title: "Menus"
//    ,size: "10%"
//    ,options: [
//              { "OPTIONNAME": OPTIONVALUE }
//              ]
//    ,columns: [
//        { dataColumn: "GroupUID", label: "Group", size: "30%", type:"dropdown", dataType: "list", dataTable: "MenuGroups" }
//        , { dataColumn: "Name", label: "Name", size: "30%", type:"text", dataType: "string" }
//        , { dataColumn: "ModuleUID", label: "Module", size: "30%", type:"dropdown", dataType: "dropdown", dataTable: "Modules" }
//        , { dataColumn: "URL", label: "URL", size: "30%", dataType: "text", VisibleOnSize: "xs" }
//        , { columnName: "MinAmount", label: "Min A", size: 1, dataType: "text", VisibleOnSize: "sm" }
//        , { columnName: "MaxAmount", label: "Max A", size: 1, dataType: "text", VisibleOnSize: "md" }
//        , { dataColumn: "CreatedOn", label: "CreatedOn", size: "10%", dataType: "datetime", VisibleOnSize: "lg" }
//    ]
//}