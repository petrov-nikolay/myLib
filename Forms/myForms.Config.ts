/// <reference path="../Core/Config.ts" />

namespace my {

    export namespace forms {

        export class Config extends my.core.config.cManager {

            frmGroups: Array<FrmGroupCfg> = [];
            formCfg: my.forms.FrmCfg = new my.forms.FrmCfg();


            constructor(json: object = undefined) {
                super();
                if (json) {
                    this.JSON = json;
                    this.parseData(json);
                }
            }



            //#region PARSE JSON CONFIG

            parseData(val: any) {

                if (val.hasOwnProperty("groups")) {
                    var groups: Array<object> = val.groups;
                    this.frmGroups = [];
                    groups.forEach((item) => {
                        this.frmGroups.push(this._parseGroup(item));
                    }, this);

                    this._applyDefaults();
                    this.parseControl(this.formCfg, val);

                } else {
                    console.log("bad form config, no groups definition in config!");
                }

            };

            private _parseGroup(val: any): FrmGroupCfg {
                var fGroupCfg: FrmGroupCfg = new FrmGroupCfg();
                this.parseGroup(val, fGroupCfg);

                if (val.hasOwnProperty("items")) {
                    fGroupCfg.items = this._parseItems(val.items, fGroupCfg);
                }
                return fGroupCfg;
            }

            private _parseItems(val: Array<object>, gCfg: FrmGroupCfg): Array<FrmItemCfg> {
                var ret: Array<FrmItemCfg> = [];

                val.forEach((item: any, idx) => {
                    var fItem: FrmItemCfg = new FrmItemCfg();
                    //GROUP config - setup general item config 
                    if (gCfg.itemSize) {
                        fItem.size = gCfg.itemSize;
                    }
                    this.parseColumn(item, fItem);
                    if (item.hasOwnProperty("linkedDataColumn")) {
                        fItem.linkedDataColumn = item["linkedDataColumn"];
                    }
                    if (item.hasOwnProperty("linkedFilterColumn")) {
                        fItem.linkedFilterColumn = item["linkedFilterColumn"];
                    }
                    ret.push(fItem);

                });
                return ret;
            }

            customParse(val: object, col: my.config.iColumn) {
                // no custom parese for tables for now
            }





            private _applyDefaults() {

                this.frmGroups.forEach((fGroup, idx) => {
                    if (fGroup.name.toLowerCase() == "infodates") {
                        this.infoDates(fGroup);
                    }

                    this.applyDefaultSizes(fGroup.items);
                    // fGroup.items.forEach((itm, i) => {
                    //     if (itm.size == undefined) {
                    //         itm.size = s;
                    //     }
                    // });

                }, this);


            }


            defaultSizeFunction(col: my.config.iColumn, totalCols: number) {
                var l = totalCols;
                var s = this._sizes["12_6_4"];
                if ((l == 1) || (l == 5) || (l == 8) || (l == 11)) {
                    s = this._sizes["12_6_4"];
                }
                if (l == 2) {
                    s = this._sizes["12_6_6"];
                }
                if ((l == 3) || (l == 6) || (l == 9) || (l == 12)) {
                    s = this._sizes["12_4_4"];
                }
                if ((l == 4) || (l == 7) || (l == 10)) {
                    s = this._sizes["12_6_3"];
                }

                col.size = s;

            }





            private _sizes = {
                "12_6_3": "s12,m6,l3"
                , "12_6_4": "s12,m6,l4"
                , "12_6_6": "s12,m6,l6"
                , "12_4_4": "s12,m4,l4"

            }


            infoDates(fGr: FrmGroupCfg) {
                fGr.items = [];

                var fItem: FrmItemCfg = new FrmItemCfg();
                fItem.dataColumn = 'CreatedOn';
                fItem.label = 'CreatedOn';
                fItem.dataType = my.config.dataType.datetime;
                fItem.type = my.config.type.label;
                fItem.visibleInInsertMode = false;
                fItem.size = "s12,m3";
                fGr.items.push(fItem);

                var fItemC: FrmItemCfg = new FrmItemCfg();
                fItemC.dataColumn = 'CreatedBy';
                fItemC.label = 'CreatedBy';
                fItemC.dataType = my.config.dataType.string;
                fItemC.type = my.config.type.label;
                fItemC.visibleInInsertMode = false;
                fItemC.size = "s12,m3";
                fGr.items.push(fItemC);

                var fItemED: FrmItemCfg = new FrmItemCfg();
                fItemED.dataColumn = 'LastEditOn';
                fItemED.label = 'LastEditOn';
                fItemED.dataType = my.config.dataType.datetime;
                fItemED.type = my.config.type.label;
                fItemED.visibleInInsertMode = false;
                fItemED.size = "s12,m3";
                fGr.items.push(fItemED);

                var fItemE: FrmItemCfg = new FrmItemCfg();
                fItemE.dataColumn = 'LastEditBy';
                fItemE.label = 'LastEditBy';
                fItemE.dataType = my.config.dataType.string;
                fItemE.type = my.config.type.label;
                fItemE.visibleInInsertMode = false;
                fItemE.size = "s12,m3";
                fGr.items.push(fItemE);

            }

            //#endregion


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





        } // end frmConfig


        export class FrmGroupCfg extends my.core.config.cColumGroup {
            // title: string;
            // items: Array<FrmItemCfg>;
            // options: Array<object>;
            // itemSize: string;
            constructor() {
                super();
            }
        }


        export class FrmItemCfg extends my.core.config.cColumn {

            constructor() {
                super();
            }
        }

        export class FrmCfg extends my.core.config.cControl {
            constructor() {
                super();
            }
        }



    } // end form
} //end my




// SAMPLE JSON config
// {
//    groups: [
//        {
//            name: "default", items: [
//                { dataColumn: "Name", label: "Name", size: "50%", dataType: "text", ctloptions: {maxlength: 50} }
//                { dataColumn: "Name", label: "Name", size: "50%", dataType: "number", ctloptions: { min: "10", max: "100" } }
//                , { dataColumn: "ModuleUID", label: "Module", size: "50%", dataType: "dropdown", dataTable: "Modules" }
//                , { dataColumn: "GroupUID", label: "Group", size: "30%", dataType: "dropdown", dataTable: "MenuGroups" }
//            ]
//        }
//        , {
//            name: "details", items: [
//                , { dataColumn: "CreatedOn", label: "CreatedOn", dataType: "label", visibleInInsertMode: false } //no size here, default logic in affect
//                , { dataColumn: "CreatedBy", label: "CreatedBy", dataType: "label", visibleInInsertMode: false }

//            ]
//        }
//    ],
//    options: { itemsize: "m6,xl6"}
// }