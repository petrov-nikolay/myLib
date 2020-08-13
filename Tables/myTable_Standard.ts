/// <reference path="../myControls.ts" />
/// <reference path="Table.ts" />
/// <reference path="myTable_Simple.ts" />



namespace my {
    export namespace table {


        export class Standard extends Simple {
            ctlType: string = "table_Standard";

            events: my.table.Events;
            pagination: my.core.table.Pagination;
            sorting: my.core.table.Sorting;
            filtering: my.core.table.Filtering;
            totals: my.table.Totals;


            tTitle: my.core.table.TTitle;


            set title(val: string) {
                this.tTitle.text = val;
            }

            private _urlParams: string;
            get urlParams(): string {
                return this._urlParams;
            }
            set urlParams(val: string) {
                this._urlParams = val;
            }


            constructor(dataset: my.data.iDataSet, cfg: Config) {

                super(dataset, cfg);

                this.tTitle = new my.core.table.TTitle(this);

                this.events.rowMouseEnter.subscribe(this, this._onRowMouseEnter.bind(this));

                this.pagination = new my.core.table.Pagination(this);
                this.pagination.events.pageChange.subscribe(this, this._onPaginationPageChange.bind(this));
                this.pagination.events.pageSizeChange.subscribe(this, this._onPaginationPageSizeChange.bind(this));
                this.sorting = new my.core.table.Sorting(this);
                this.sorting.events.OrderByChange.subscribe(this, this._onSortingOrderByChange.bind(this));

                this.filtering = new my.core.table.Filtering(this);
                this.filtering.events.FilterByChange.subscribe(this, this._onFilterChange.bind(this));

                this.totals = new my.table.Totals(this);

                this.dataSet = dataset;
                this.dataSet.events.Loaded.subscribe(this, this.pagination.init.bind(this.pagination));

                if (cfg) {
                    // the parent class generates the columns based on the config
                    // here we do mostly general table setup and some settings
                    this._applyConfig(cfg);
                }

                //init the fixed header on scroll
                //var t = new my.table.FixedHeader(this);
            }

            //core class will call this insted it's own init for core events
            initEvents() {
                this.events = new my.table.Events(this);

                //events for useDblClickAsEdit
                this.events.rowClick.subscribe(this, this._addEditClick.bind(this));
                this.events.rowDblClick.subscribe(this, this._addEditClick.bind(this));

                this.events.screenLoad.subscribe(this, this._addLoadEvent.bind(this))
                this.events.screenShow.subscribe(this, this._addShowEvent.bind(this));

                window.addEventListener("resize", this._tableChangeSize.bind(this));
            }


            private _addEditClick(s, e: my.events.iEvent, data) {
                if (this.options.allow_Edit == false) {
                    return;
                }

                if ((e.name == 'rowClick') && (this.options.useDblClickAsEdit == false)) {
                    this.events.editClick.dispatch(s, data);
                }
                if ((e.name == 'rowDblClick') && (this.options.useDblClickAsEdit == true)) {
                    this.events.editClick.dispatch(s, data);
                }

            }

            private _tableChangeSize() {
                this.calculateTableSize(window.innerHeight, window.innerWidth);
            }

            private _addLoadEvent(s, e: my.events.iEvent, data) {
                this.calculateTableSize(this.tBody.element.clientHeight, this.tBody.element.clientWidth);
            }

            private _addShowEvent(s, e: my.events.iEvent, data) {
                this.calculateTableSize(this.tBody.element.clientHeight, this.tBody.element.clientWidth);
            }

            //#region APPLY   CONFIG

            private _applyConfig(cfg: my.table.Config) {
                this._applyTableCfg(cfg);

            }


            private _applyTableCfg(cfg: my.table.Config) {
                if (cfg.tableCfg.title) {
                    this.title = cfg.tableCfg.title; // set title only if we have one
                }
                if (cfg.tableCfg.size) {
                    this.css.size = cfg.tableCfg.size;
                }
                if (cfg.tableCfg.options) {
                    this.applyTableOptionsCfg(cfg.tableCfg.options);
                }
            }

            applyTableOptionsCfg(options: Array<object>) {
                if (options == undefined) {
                    return;
                }
                var self = this;

                options.forEach((itm, idx) => {
                    for (var propertyName in itm) {
                        if (propertyName in self.options) {
                            self.options[propertyName] = itm[propertyName];
                        }
                    }
                }, this);


            }


            //#endregion APPLY   CONFIG



            rebind() {
                // this._parseURLparameters(); // get the URL params in the beginign to call the correct data

                // //pagination
                // if (this.pagination.pageCurrent) {
                //     this.dataSet.page = this.pagination.pageCurrent;
                // }
                // this.dataSet.pageSize = this.pagination.pageSize;

                // //sorting
                // if (this.sorting.currentOrderBy) {
                //     this.dataSet.sortby = this.sorting.currentOrderBy;
                // } else {
                //     this.sorting.currentOrderByUpdate = this.columns[0].dataColumn;
                //     this.dataSet.sortby = this.sorting.currentOrderBy;
                // }

                //filtering
                // we updating it from inside the filter class
                // if (this.filtering.currentFilterBy) {

                //     this.dataSet.filtersForResponce = this.filtering.currentFilterBy;
                // }


                //params are updated above so no custom params need to be pushed here
                this.dataSet.getData();
            }






            private _onRowMouseEnter(row: my.core.table.Row, e, d) {
                if (this.options.enable_DeleteRowHover) {
                    this._createDeleteRowButton(row);
                }
            }

            _createDeleteRowButton(row: my.table.iRow) {
                if (document.getElementById('rowdel')) {
                    document.getElementById('rowdel').remove();
                }

                var i: my.controls.ctlIcon = new my.controls.ctlIcon(my.theme.current.icons.delete);
                i.element.classList.add("row-btn");
                i.element.classList.add("color-red");
                i.element.id = "rowdel";
                row.element.lastChild.appendChild(i.element);
                // i.events.mouseover.subscribe(this, (s, e, d) => {
                //     i.icon = my.theme.current.icons.delete;
                // });
                i.events.click.subscribe(this, this.deleteRow.bind(this), row);
            }




            private _onFilterChange(s, e, d) {
                var f = new my.data.Filter(undefined, this.filtering.currentSearchBy);
                this.dataTable.filters.add(f);
                var bindVisible = this.dataTable.filterRows();
                this.pagination.pageCount = Math.ceil(bindVisible / this.pagination.pageSize);
            }

            private _onPaginationPageSizeChange(s, e, d) {
                this._onFilterChange(s, e, d);
            }
            private _onPaginationPageChange(s, e, d) {
                this.currentPage = this.pagination.pageCurrent;
                this.recreateRows();
            }


            private _onSortingOrderByChange(s, e, d) {
                if (this.options.allow_sorting) {
                    var val = this.sorting.currentOrderBy.split(" ");
                    this.dataTable.orderBy(val[0], this.sorting.currentOrderByDirection);

                }
            }

            updateURL() {
                // var link = window.location.hash;
                // link = link.split("/dp")[0];
                // var currentFilterBy: string = "";  // COL:val;col:val
                // this.filtering.currentFilterBy .forEach((itm: data.Filter, idx) => {
                //     currentFilterBy = currentFilterBy + itm.column + ":" + itm.value + ";"
                // });

                // window.location.href = link + "/dp/" + my.tools.B64Encode(`s=${this.sorting.currentOrderBy}&p=${this.pagination.pageCurrent}&ps=${this.pagination.pageSize}&f=${currentFilterBy}&se=${this.filtering.currentSearchBy}`);
            }

            // private _parseURLparameters() {
            //     var encParams: string = window.location.hash.split("/dp/")[1];
            //     var params: any = tools.parseURLParams(my.tools.B64Decode(encParams));
            //     if ((params) && (params.hasOwnProperty("s"))) {
            //         this.sorting.currentOrderByUpdate = params.s; // value update only - must call dataRebind after
            //     }
            //     if ((params) && (params.hasOwnProperty("p"))) {
            //         this.pagination.pageCurrentUpdate = params.p; // value update only - must call dataRebind after
            //     }
            //     if ((params) && (params.hasOwnProperty("ps"))) {
            //         this.pagination.pageSize = params.ps; // value update only - must call dataRebind after
            //     }
            //     if ((params) && (params.hasOwnProperty("f"))) {
            //         this.filtering.currentFilterBy = params.f; // value update only - must call dataRebind after
            //     }
            //     if ((params) && (params.hasOwnProperty("se"))) {
            //         this.filtering.currentSearchBy = params.se; // value update only - must call dataRebind after
            //     }

            //     //this.dataRebind();
            //     //not needed we are calling this frunction from inside dataRebind
            // }




        }; // end class Standard 




        export class Events extends my.core.table.Events {

            // screen events exist to cover the aoutoresize logic 
            // need event after the screen controls are loaded to detect the current size of table and hide/sow columns
            screenLoad: my.core.events.core;
            screenShow: my.core.events.core;

            constructor(eventTarget: my.controls.iControl) {
                super(eventTarget);
                this.screenLoad = new my.core.events.core("screenLoad");
                this.screenShow = new my.core.events.core("screenShow");
                // this event coms from APP.Screen.ts in the show function
                my.events.global.navigation.subscribe(this, "SCREEN.LOAD", (s, e, d) => {
                    this.screenLoad.dispatch(this);
                });
                my.events.global.navigation.subscribe(this, "SCREEN.SHOW", (s, e, d) => {
                    this.screenShow.dispatch(this);
                });
            }


        }; //end class tblEvents



    }; //end namespace table
}; //end namespace my