/// <reference path="../Core/Controls.ts" />
/// <reference path="../myControls.ts" />
/// <reference path="../Data/myData.ts" />

namespace my {
    export namespace core {
        export namespace table {


            export class Pagination extends my.core.controls.core {

                private table: my.table.Simple;
                ctlType: string = "table.pager";
                element: HTMLDivElement;
                pagerPlaceholder: HTMLDivElement;
                sizerPlaceholder: HTMLDivElement;
                elementUL: HTMLUListElement;

                items: Array<HTMLLIElement> = [];
                readOnly: boolean = false; //not used here
                reset: Function; // not in use here 
                // not used here
                value: any; //not used here
                disabled: boolean = false;
                events: my.core.table.EventsPagination;
                dropDown: my.controls.ctlDropDown;
                private _totalItems: number = 0;
                private _pageCount: number = 0;
                get pageCount(): number {
                    return this._pageCount;
                }
                set pageCount(val: number) {
                    if (val == undefined) { val = 0; }
                    if (val != this.pageCount) {
                        //need to update the html
                        this._pageCount = val;
                        this.update();
                    }
                }

                private _pageCurrent: number = 1;
                get pageCurrent(): number {
                    return this._pageCurrent;
                }
                set pageCurrent(val: number) {
                    if (val == undefined) { val = 1; }
                    if (val != this._pageCurrent) {
                        //need to update the html
                        this._pageCurrent = val;
                        //this._updateActive();
                        this.update();
                        this.events.pageChange.dispatch(this, val);
                    }
                }

                //use this only when you want to update the value without this.table.dataRebind()
                // ususaly fist time loading when params are read
                set pageCurrentUpdate(val: number) {
                    if (typeof (val) == "string") {
                        val = parseInt(val);  // some time value is passed as string
                    }
                    this._pageCurrent = val;
                }


                private _pageSize: number = 10;
                get pageSize(): number {
                    return this._pageSize;
                }
                set pageSize(val: number) {

                    if (val != this.pageSize) {
                        //need to update the html
                        this._pageSize = val;
                        if (Math.ceil(this._totalItems / val) < this.pageCurrent) {
                            this.pageCurrent = 1;
                        }

                        //console.log(this.pageCurrent)
                        this.events.pageSizeChange.dispatch(this, val);

                    }
                }

                constructor(table: my.table.Simple) {
                    super('div');
                    this.table = table;
                    this.events = new my.core.table.EventsPagination(this);
                    this.table.plhPagination.appendChild(this.element);
                    this.element.classList.add("my-pagination");
                    this.pagerPlaceholder = document.createElement("div");
                    this.pagerPlaceholder.classList.add("col-11");
                    this.element.appendChild(this.pagerPlaceholder);
                    this.sizerPlaceholder = document.createElement("div");
                    this.element.appendChild(this.sizerPlaceholder);
                }


                init(s, e, d) {
                    //console.log("_tablePaginationInit");
                    var tblData: my.data.DataTable = s.getTable();
                    if ((tblData) && (tblData.length > 0)) {
                        var row: my.data.DataRow = tblData.rows[0];

                        //this.pageCount = row.items["pCount"].value;
                        this.pageCount = Math.ceil(this.table.dataTable.length / this.pageSize);
                        this.pageCurrent = 1; //  row.items["pCurrent"].value;

                        if (row.items.hasOwnProperty("TotalCnt") && Number(row.items["TotalCnt"].value) > 10 && this.sizerPlaceholder.innerHTML === "") {
                            this._totalItems = Number(row.items["TotalCnt"].value);
                            this._generateDropDownForItems(this._pageSize.toString());
                        }
                    } else {
                        if (this.pageCurrent > this.pageCount) {
                            this.pageCurrent = 1;
                        }
                    }
                    this.update();


                }


                private update() {
                    //create the main control
                    this.items = [];
                    var data: Array<my.core.table.PaginationItem> = this._calculate();
                    this.elementUL = document.createElement("ul");
                    this.elementUL.classList.add("my-pagination-pager");

                    var liElement: HTMLLIElement;
                    data.forEach((itm: my.core.table.PaginationItem, idx) => {
                        if (itm.index == -1) {
                            liElement = this._addPagerItemSpacer();

                        } else {
                            liElement = this._addPagerItem(itm)

                        }
                        this.items.push(liElement);
                        this.elementUL.appendChild(liElement);
                    });
                    this.pagerPlaceholder.innerHTML = "";
                    this.pagerPlaceholder.appendChild(this.elementUL);


                }

                private _addPagerItem(data: my.core.table.PaginationItem): HTMLLIElement {
                    var rLi = document.createElement("li");
                    rLi.innerText = data.label;
                    if (data.isCurrent) {
                        rLi.classList.add("active");
                    }
                    rLi.addEventListener("click", (e) => {
                        this.pageCurrent = data.index;
                        this.events.pageClick.dispatch(this, data);
                    });
                    return rLi;
                }

                private _addPagerItemSpacer(): HTMLLIElement {
                    var rLi = document.createElement("li");
                    rLi.innerText = "...";
                    rLi.classList.add("pspacer");
                    return rLi;
                }


                private _updateActive() {
                    // clear the old active and set the new

                    this.items.forEach((itm: HTMLLIElement, idx) => {
                        if (itm.innerText == this.pageCurrent.toString()) {
                            itm.classList.add("active");
                        }
                        else {
                            itm.classList.remove("active");
                        }
                    });


                }

                private _calculate(): Array<my.core.table.PaginationItem> {
                    var rArr: Array<my.core.table.PaginationItem> = [];

                    // var iMiddle = Math.round(this.pageCount / 2);
                    // if (this.pageCurrent > 2) {
                    //     iMiddle = this.pageCurrent;
                    // }
                    var empty = new my.core.table.PaginationItem();
                    empty.label = "...";
                    empty.index = -1;

                    if (this.pageCount < 24) {
                        this._generateItems(rArr, 1, this.pageCount);
                    } else {
                        var lenght1 = 3;
                        if ((this.pageCurrent >= 3) && (this.pageCurrent < 6)) {
                            lenght1 = this.pageCurrent + 1;
                        }
                        this._generateItems(rArr, 1, lenght1);
                        rArr.push(empty);
                        var lastPage = this.pageCount - 3;

                        if ((this.pageCurrent > 5) && (this.pageCurrent < lastPage)) {
                            this._generateItems(rArr, this.pageCurrent - 1, this.pageCurrent + 1);
                            rArr.push(empty);
                        }
                        this._generateItems(rArr, lastPage, this.pageCount);
                    }

                    return rArr
                }



                private _generateItems(rArr: Array<my.core.table.PaginationItem>, iFrom, iTo) {
                    //var rArr: Array<my.core.table.PaginationItem> = [];
                    for (var i = iFrom; i <= iTo; i++) {
                        var itm = new my.core.table.PaginationItem();
                        itm.index = i;
                        itm.label = i.toString();
                        if (i == this.pageCurrent) {
                            itm.isCurrent = true;
                        }

                        rArr.push(itm);
                    }
                    //return rArr;
                }

                private _generateDropDownForItems(val) {

                    var dropDownDSet = new my.data.DataSet('Values');
                    dropDownDSet.data = { Values: [{ UID: '10', Name: '10' }, { UID: '20', Name: '20' }, { UID: '50', Name: '50' }, { UID: '100', Name: '100' }] }
                    this.dropDown = new my.controls.ctlDropDown(val, val);
                    this.dropDown.data = dropDownDSet.getTable('Values');
                    this.dropDown.css.setSizes('xs1', true);
                    this.dropDown.events.change.subscribe(this, (s, e, d) => {
                        this.pageSize = Number(s['value']);
                    })
                    this.sizerPlaceholder.appendChild(this.dropDown.element);
                }


                goToFirst() {

                }

                goToLast() {

                }

                goToPrev() {

                }

                goToNext() {

                }

                goTo(val: number) {

                }






            }// end class Pagination

            export class EventsPagination extends my.core.controls.Events {
                pageChange: my.core.events.core;
                pageSizeChange: my.core.events.core;
                pageClick: my.core.events.core;
                firstClick: my.core.events.core;
                lastClick: my.core.events.core;
                prevClick: my.core.events.core;
                nextClick: my.core.events.core;

                constructor(eventTarget: my.controls.iControl) {
                    super(eventTarget);
                    this.pageChange = new my.core.events.core("Pager_pageChange");
                    this.pageSizeChange = new my.core.events.core("Pager_pageSizeChange");
                    this.pageClick = new my.core.events.core("Pager_pageClick");
                    this.firstClick = new my.core.events.core("Pager_firstClick");
                    this.lastClick = new my.core.events.core("Pager_lastClick");
                    this.prevClick = new my.core.events.core("Pager_prevClick");
                    this.nextClick = new my.core.events.core("Pager_nextClick");
                }


            }; //end class EventsPagination


            export class PaginationItem {
                index: number = 0;
                label: string = "1";
                clickEnabled: boolean = true;
                isCurrent: boolean = false;
            }





        }; //end namespace table
    }; //end namespace Core
}; //end namespace my