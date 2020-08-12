/// <reference path="myApp.ts" />

namespace my {
    export namespace app {
        export namespace templates {


            export class tmplListPage extends my.app.screenbase {
                parentApp: my.app.iApp;
                tblData: my.data.DataSet;
                tbl: my.table.Standard;
                tblConfig: {};

                onTblEdit: (data: any) => any;
                editScreenName: string = "d";
                onTblNew: (data: any) => any;
                newScreenName: string = "d";

                constructor(id: string, app: my.app.iApp) {
                    super(id, app);
                }

                onLoad() {
                    this._generateContent();
                }

                onShow() {
                    this.tbl.rebind();
                }

                private _generateContent() {

                    var cfg = new my.table.Config(this.tblConfig);
                    this.tbl = new my.table.Standard(this.tblData, cfg);

                    this.tbl.options.allow_TitleAddNew = true;
                    this.tbl.options.enable_DeleteRowHover = true;

                    //apply config again to ovverride "allow_TitleAddNew", "enable_DeleteRowHover" if someone change them in the config
                    if (cfg.tableCfg.options) {
                        this.tbl.applyTableOptionsCfg(cfg.tableCfg.options);
                    }
                    this.tbl.css.add("table-clickable");

                    this.tbl.events.editClick.subscribe(this, this.onEditClick.bind(this));
                    this.tbl.events.newClick.subscribe(this, this.onNewClick.bind(this));

                    this.element.appendChild(this.tbl.element);

                };


                onEditClick(sender: object, event: my.events.iEvent | CustomEvent, data: my.data.DataRow) {
                    if (this.onTblEdit) {
                        this.onTblEdit(data);
                    } else {
                        this.parentApp.navTo(this.editScreenName, data.items["UID"].value, { 'UID': data.items["UID"].value, 'Title': sender["cells"][0].value });
                    }
                }

                onNewClick(sender: object, event: my.events.iEvent | CustomEvent, data: any) {
                    if (this.onTblNew) {
                        this.onTblNew(data);
                    } else {
                        this.parentApp.navTo(this.newScreenName, "new", undefined);
                    }
                }

            } //end class tmplListPage 




        } // end namespace Templates
    } // end namespace app
} // end namespace My


