
namespace my {
    "use strict";

    export namespace config {

        export enum dataType { string = "string", number = "number", decimal = "decimal", boolean = "boolean", datetime = "datetime", date = "date", list = "list", custom = "custom", sum = "sum" }
        export enum type { text = "text", textarea = "textarea", number = "number", checkbox = "checkbox", datetime = "datetime", date = "date", autocomplete = "autocomplete", dropdown = "dropdown", label = "label" }


        export class iControl {
            title: string;
            size: string;
            options: Array<Object>;
        }

        export class iColumGroup {
            name: string;
            title: string;
            items: Array<my.config.iColumn>;
            options: Array<object>;
            itemSize: string;
        }

        export interface iColumn {
            isHidden: boolean;
            label: string;
            size: string;
            dataType: my.config.dataType;// "string" | "number" | "decimal" | "boolean" | "datetime" | "date" | "list" | "custom" | "sum";
            type: my.config.type;// "text" | "textarea" | "number" | "checkbox" | "datetime" | "date" | "autocomplete" | "dropdown" | "label";
            align: "left" | "center" | "right";

            // DATA Params

            dataTable: string;
            dataTableKeyColumn: string;
            dataTableLabelColumn: string;

            dataColumn: string;
            //options: Array<object>;

            linkedDataColumn: string;  // use this to identyfy the control to use as parent
            linkedFilterColumn: string;  // use this to configure the column to filter by with the parent value


            // EDIT MODE params

            isEditable: boolean;
            visibleInInsertMode: boolean;
            visibleInEditMode: boolean;
            defaultValue: string; // when inserting 
            isMandatory: boolean;
            ctlOptions: Array<object>; // possibly custom for form
            VisibleOnSize: "xs" | "sm" | "md" | "lg";

        }
    } // END namespace config



    export namespace core {

        export namespace config {


            export abstract class cManager {

                columnsCfg: my.config.iColumn[];

                JSON: object;

                ModuleProperties_HiddenColumns: Array<string>;

                constructor() {
                    this.ModuleProperties_HiddenColumns = this._getModuleProperties_hiddenColumns();
                }

                abstract parseData(val: any);



                parseControl(val: object, ctl: my.config.iControl) {

                    if (val.hasOwnProperty("title")) {
                        ctl.title = val["title"];
                    }
                    if (val.hasOwnProperty("size")) {
                        ctl.size = val["size"];
                    }
                    if (val.hasOwnProperty("options")) {
                        ctl.options = val["options"];
                    }

                    this.parseCotrolCustom(val, ctl)

                } // end _parseTable

                abstract parseCotrolCustom(val: object, ctl: my.config.iControl)


                parseGroup(val: object, colG: my.config.iColumGroup) {

                    if (val.hasOwnProperty("name")) {
                        colG.name = val["name"];
                    }
                    if (val.hasOwnProperty("title")) {
                        colG.title = val["title"];
                    }
                    if (val.hasOwnProperty("options")) {
                        colG.options = val["options"];
                    }
                    if (val.hasOwnProperty("itemSize")) {
                        colG.itemSize = val["itemSize"];
                    }

                    this.parseGroupCustom(val, colG);
                }
                abstract parseGroupCustom(val: object, colG: my.config.iColumGroup)


                //#region COLUMN

                parseColumn(val: object, col: my.config.iColumn) {


                    if (val.hasOwnProperty("isHidden")) {
                        col.isHidden = val["isHidden"];
                    }
                    if (val.hasOwnProperty("label")) {
                        col.label = val["label"];
                    }
                    if (val.hasOwnProperty("size")) {
                        col.size = val["size"];
                    }

                    if (val.hasOwnProperty("dataType")) {
                        col.dataType = val["dataType"];
                    }
                    if (val.hasOwnProperty("type")) {
                        col.type = val["type"];
                    }
                    if (val.hasOwnProperty("align")) {
                        col.align = val["align"];
                    }

                    if (val.hasOwnProperty("dataTable")) {
                        col.dataTable = val["dataTable"];
                    }
                    if (val.hasOwnProperty("dataTableKey")) {
                        col.dataTableKeyColumn = val["dataTableKey"];
                    } else {
                        col.dataTableKeyColumn = "UID";  // default column to use for joining
                    }
                    if (val.hasOwnProperty("dataTableLabel")) {
                        col.dataTableLabelColumn = val["dataTableLabel"];
                    } else {
                        col.dataTableLabelColumn = "Name"; // default column to use for Label
                    }


                    if (val.hasOwnProperty("dataColumn")) {
                        col.dataColumn = val["dataColumn"];
                    }
                    // we know the column we hide the column if in the list
                    if (this._isHiddenByModule(col.dataColumn)) {
                        col.isHidden = true;
                    }


                    if (val.hasOwnProperty("linkedDataColumn")) {
                        col.linkedDataColumn = val["linkedDataColumn"];
                    }

                    if (val.hasOwnProperty("linkedFilterColumn")) {
                        col.linkedFilterColumn = val["linkedFilterColumn"];
                    }


                    if (val.hasOwnProperty("ctlOptions")) {
                        col.ctlOptions = val["ctlOptions"];
                    }


                    if (val.hasOwnProperty("isEditable")) {
                        col.isEditable = val["isEditable"];
                    }

                    if (val.hasOwnProperty("visibleInInsertMode")) {
                        col.visibleInInsertMode = val["visibleInInsertMode"];
                    }
                    if (val.hasOwnProperty("visibleInEditMode")) {
                        col.visibleInEditMode = val["visibleInEditMode"];
                    }
                    if (val.hasOwnProperty("defaultValue")) {
                        col.defaultValue = val["defaultValue"];
                    }
                    if (val.hasOwnProperty("isMandatory")) {
                        col.isMandatory = val["isMandatory"];
                    }
                    if (val.hasOwnProperty("VisibleOnSize")) {
                        col.VisibleOnSize = val["VisibleOnSize"];
                    }

                    this.parseColumnCustom(val, col);

                } // end  parseColumn

                abstract parseColumnCustom(val: object, col: my.config.iColumn)


                applyDefaultSizes(arr: my.config.iColumn[]) {
                    var totalCols = this._getTotalVisibleColumns(arr);
                    arr.forEach((itm: my.config.iColumn, idx) => {
                        if (itm.size == undefined) {
                            this.defaultSizeFunction(itm, totalCols);
                        }

                    });
                }

                abstract defaultSizeFunction(col: my.config.iColumn, totalCols: number);


                private _getTotalVisibleColumns(arr: my.config.iColumn[]): number {
                    var r = 0;
                    arr.forEach((itm: cColumn, idx) => {
                        if (itm.isHidden) {
                            r = r + 1;
                        }
                    });
                    return r;
                }

                //#endregion


                private _getModuleProperties_hiddenColumns(): Array<string> {
                    if (moduleProperties) {
                        var hideColsProp = moduleProperties.find(prop => prop['Name'] === 'HideColumns');
                        var propValue: string = hideColsProp['Value'];

                        return propValue.toLowerCase().replace(/\s/g, '').split(',');
                    }
                    return new Array();
                }

                private _isHiddenByModule(column: string): boolean {
                    var bRet: boolean = false;
                    this.ModuleProperties_HiddenColumns.forEach((itm: string, idx) => {
                        if (itm.toLowerCase() == column.toLowerCase()) {
                            bRet = true;
                        }
                    });

                    return bRet;
                }


            } // END abstract class cManager



            export class cControl {
                title: string;
                size: string;
                options: Array<Object>;
            }


            export class cColumGroup {
                name: string;
                title: string;
                items: Array<my.config.iColumn>;
                options: Array<object>;
                itemSize: string;
            }

            export abstract class cColumn implements my.config.iColumn {
                isHidden: boolean = false;
                label: string;
                size: string; //size in PX, % or any other valid CSS
                private _dataType: my.config.dataType;;
                get dataType(): my.config.dataType {
                    return this._dataType;
                }
                set dataType(val: my.config.dataType) {
                    switch (val) {
                        case "string":
                        case "number":
                        case "boolean":
                        case "datetime":
                        case "date":
                        case "list":
                        case "custom":
                        case "sum":
                            this._dataType = val
                            break;
                        default:
                            console.error("ERROR! config parsing unsupported dataType:" + val + ' ;value must be my.config.dataType;');
                            break;
                    }

                }

                private _type: my.config.type = my.config.type.text;
                get type(): my.config.type {
                    return this._type;
                }
                set type(val: my.config.type) {
                    switch (val) {
                        case "text":
                        case "textarea":
                        case "number":
                        case "checkbox":
                        case "datetime":
                        case "autocomplete":
                        case "dropdown":
                        case "label":
                            this._type = val
                            break;
                        default:
                            console.error("ERROR! config parsing unsupported type:" + val + ' ;value must be "text" | "textarea" | "number" | "checkbox" | "datetime" | "autocomplete" | "dropdown" | "label " ');
                            break;
                    }

                }

                align: "left" | "center" | "right" = "left";


                // DATA Params


                dataTable: string;
                dataTableKeyColumn: string;
                dataTableLabelColumn: string;


                dataColumn: string;
                //options: Array<object>;


                linkedDataColumn: string;  // use this to identyfy the control to use as parent
                linkedFilterColumn: string;  // use this to configure the column to filter by with the parent value



                // EDIT MODE params

                isEditable: boolean = false;
                visibleInInsertMode: boolean = true;
                visibleInEditMode: boolean = true;
                defaultValue: string; // when inserting 
                isMandatory: boolean = true;
                ctlOptions: Array<object>; // possibly custom for form
                VisibleOnSize: "xs" | "sm" | "md" | "lg";

            } // END abstract class cColumn





        } // end namespace config

    } // end namespace core

} // end namespace my