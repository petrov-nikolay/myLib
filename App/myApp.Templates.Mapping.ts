/// <reference path="myApp.ts" />

namespace my {
    export namespace app {
        export namespace templates {

            export class tMapping extends my.app.screenbase {

                leftTbaleName: string;
                leftTbaleTitle: string = "change leftTbaleTitle";
                leftList: my.controls.ctlList;
                leftDS: my.data.DataSet;

                rightTbaleName: string;
                rightTbaleTitle: string = "change rightTbaleTitle";
                rightTable: my.table.Standard;
                rightDS: my.data.DataSet;
                rightTableCfg: object;

                parentApp: my.app.iApp;

                leftPlaceHolder: HTMLElement;
                rightPlaceHolder: HTMLElement;


                constructor(id: string, app: my.app.iApp) {
                    super(id, app);
                }

                onLoad() {
                    this.leftDS = new my.data.DataSet(this.leftTbaleName);
                    this.leftDS.url = this.parentApp.url + "/data/" + this.leftTbaleName;
                    //this.leftDS.paramsGetData = [{ name: "", value: this.leftTbaleName }];

                    this.rightDS = new my.data.DataSet(this.rightTbaleName);
                    this.rightDS.isLiveUpdate = true;
                    this.rightDS.url = this.parentApp.url + "/data/" + this.rightTbaleName;


                    this._generateBase()
                }

                onShow() {
                    this.leftDS.getData();
                }


                private _generateBase() {
                    var div = document.createElement("div");
                    this.leftPlaceHolder = document.createElement("div");
                    this.rightPlaceHolder = document.createElement("div");

                    div.className = "row";
                    this.leftPlaceHolder.classList.add("col-3");
                    this.rightPlaceHolder.classList.add("col-8");
                    this.rightPlaceHolder.classList.add("offset-1");

                    div.appendChild(this.leftPlaceHolder);
                    div.appendChild(this.rightPlaceHolder);
                    this.element.appendChild(div);
                    this._generateLeftList();
                    this._generateRightTable();

                }

                private _generateLeftList() {

                    var tblSetup = {
                        columns: [
                            { dataColumn: "Name", label: "Name", size: "30%", dataType: "string" }
                        ]
                    };



                    this.leftList = new my.controls.ctlList("UID", "Name");
                    this.leftList.events.itemClick.subscribe(this, this.onRowClick.bind(this));
                    this.leftList.title = this.leftTbaleTitle;
                    this.leftList.element.classList.add("shadow");
                    this.leftDS.events.Loaded.subscribe(this, (s: my.data.DataSet, e, d) => {
                        this.leftList.data = s.getTable();
                    });

                    this.leftPlaceHolder.appendChild(this.leftList.element);


                };

                onRowClick(sender: object, event: my.events.iEvent | CustomEvent, data: any) {

                    this.rightDS.paramsGetData = [
                        //  { name: "", value: this.rightTbaleName }
                        { name: "", value: data.UID.value }

                    ];


                    this.rightTable.rebind();
                    //update title only if data is received
                    this.rightDS.events.Loaded.subscribe(this, this._tableUpdated.bind(this));
                }

                private _tableUpdated(s, e, d) {
                    this.rightTable.title = this.rightTbaleTitle + " for: " + this.leftList.selectedItem.text;
                }


                private _generateRightTable() {

                    var tblSetup: object = {
                        columns: [
                            , { dataColumn: "Name", label: "Page", size: "30%", dataType: "string" }
                            , { dataColumn: "Exist", label: "Exist", size: "10%", dataType: "boolean", isEditable: true }
                        ]
                    };

                    if (this.rightTableCfg) {
                        tblSetup = this.rightTableCfg; //external config
                    }

                    this.rightTable = new my.table.Standard(this.rightDS, new my.table.Config(tblSetup));
                    this.rightTable.title = this.rightTbaleTitle;
                    this.rightTable.options.allow_TitleAddNew = false;
                    //this.rightTable.css.add("table-clickable");

                    this.rightPlaceHolder.appendChild(this.rightTable.element);

                };



            } //end class tMapping




        } // end namespace Templates
    } // end namespace app
} // end namespace My
