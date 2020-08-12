/// <reference path="Core/Controls.ts" />

namespace my {
    export namespace menu {

        export class sidenav extends my.core.controls.coreData {
            ctlType: string = "ctlSidenav";
            element: HTMLInputElement;
            readOnly: boolean = false; //not used here
            reset: Function; //not used here
            // not used here
            get disabled(): boolean { return this.element.disabled; }
            set disabled(val: boolean) { this.element.disabled = val; }

            container: HTMLElement;
            containerToPush: HTMLElement = document.getElementById("spacontainer");

            private _nav: HTMLElement;
            trigger: HTMLElement;
            private _items: Array<Object>;

            type: 'push' | 'overlay' = 'push';
            width: string = "200px";

            dataColumnURL: string = "URL";
            dataColumnLabel: string = "Label";
            dataColumnSubmenu: string = "SubMenus";

            constructor(trigger: HTMLElement) {
                super('div');
                this.container = document.createElement("div");
                this.container.id = "sideMenu";
                this.container.classList.add("sideMenu");

                this.trigger = trigger;
                //document.addEventListener("click", this._hideMenuIfOpen.bind(this));
                this._create();
            }

            rebind() {
                this._update();
            }


            private _create() {
                this._nav = document.createElement("ul");
                this._nav.style.width = this.width;
                this._nav.appendChild(this._createSearchItem());
                this.trigger.addEventListener("click", this._toggleMenu.bind(this));
            }

            private _createSubMenu(label: string, data: any): HTMLElement {
                var self = this;
                var ul = document.createElement("ul");
                var btnBack = this._createSubmenuBack(label);
                btnBack.onclick = function (e: MouseEvent) {
                    e.preventDefault();
                    ul.parentElement.removeChild(ul);
                };
                ul.appendChild(btnBack);
                data.value.forEach(function (obj: any, idx) {
                    ul.appendChild(self._createItem(obj[self.dataColumnURL].value, obj[self.dataColumnLabel].value, undefined));
                });
                ul.className = "submenu-content";
                return ul;
            }

            private _createSubmenuBack(label: string) {
                var navEl = document.createElement("li");

                var i = new my.controls.ctlIcon(my.theme.current.icons.arrow_left);

                var a = document.createElement("a");
                a.text = label;
                a.appendChild(i.element);
                //d.appendChild(s);
                navEl.appendChild(a);
                return navEl;
            }


            private _createItem(link: string, label: string, data: my.data.DataTable): HTMLElement {
                var navEl = document.createElement("li");
                var a = document.createElement("a");
                a.href = link;
                a.text = label;
                a.setAttribute("data-i18n", label);

                navEl.appendChild(a);
                var self = this;
                if ((data != undefined) && (data.value.length > 0)) {
                    //navEl.appendChild(this._createSubMenu(data));
                    navEl.className = "sideMenu-submenu";
                    a.onclick = function (e) {
                        e.preventDefault();
                        self._showSubMenu(label, data);
                    };
                    var i = new my.controls.ctlIcon(my.theme.current.icons.arrow_right);

                    a.appendChild(i.element);
                }

                return navEl;
            }

            private _showSubMenu(label: string, data: my.data.DataTable) {
                this._nav.appendChild(this._createSubMenu(label, data));
            }


            private _toggleMenu(ev: MouseEvent) {
                ev.stopPropagation();
                // "sideMenu-open" is used only as a toggle flag at the moment - no CSS attached
                if (this.container.classList.contains("sideMenu-open") == false) {
                    this.container.classList.add("sideMenu-open");
                    //open the menu
                    this.container.style.width = this.width;
                    if (this.type == "push") {
                        this.containerToPush.style.transition = "0.5s";  // add animation
                        this.containerToPush.style.marginLeft = this.width;
                    }

                } else {
                    this.container.classList.remove("sideMenu-open");
                    this.container.style.width = "0";
                    if (this.type == "push") {
                        this.containerToPush.style.marginLeft = "0";
                    }
                }
            }

            private _update() {
                var self = this;
                // this._nav.appendChild(this._createSearchItem());
                this.data.rows.forEach((row: my.data.iDataRow, idx) => {
                    self._nav.appendChild(self._createItem(row.items[self.dataColumnURL].value, row.items[self.dataColumnLabel].value, row.items[self.dataColumnSubmenu]));
                });

                this.container.appendChild(this._nav);
                document.getElementsByTagName("body")[0].appendChild(self.container);
            }

            private _createSearchItem() {
                var navEl = document.createElement("li");
                var searchControl: my.controls.ctlText = new my.controls.ctlText('');
                searchControl.maxlength = 16;
                navEl.className = "submenu";
                searchControl.events.keyup.subscribe(this, this._FilterItems.bind(this));
                //var i = new my.controls.ctlIcon(my.theme.current.icons.search);

                //searchControl.setIcon(i);
                searchControl.enableClear = true;
                navEl.appendChild(searchControl.element);

                return navEl;
            }

            private _FilterItems(s, e, d) {
                var self = this;
                var inputValue: string = s.value.toLowerCase();
                var keyCode: number = e.keyCode;

                if (inputValue.length >= 3) {
                    while (this._nav.childNodes.length > 1) {
                        this._nav.removeChild(this._nav.lastChild);
                    }

                    this.data.rows.forEach((row: my.data.iDataRow, idx) => {

                        row.items["SubMenus"].value.forEach((element, idx) => {
                            if (element.Label.value.toLowerCase().includes(inputValue)) {
                                //console.log(element.Label.value)
                                self._nav.appendChild(self._createItem(element[self.dataColumnURL].value, element[self.dataColumnLabel].value, element[self.dataColumnSubmenu]));
                            }
                        });

                    });
                }
                if ((keyCode === 8 || keyCode === 46) && inputValue.length < 3) {
                    while (this._nav.childNodes.length > 1) {
                        this._nav.removeChild(this._nav.lastChild);
                    }
                    this.data.rows.forEach((row: my.data.iDataRow, idx) => {

                        self._nav.appendChild(self._createItem(row.items[self.dataColumnURL].value, row.items[self.dataColumnLabel].value, row.items[self.dataColumnSubmenu]));
                    });

                }
            }

        }; //end sidenav


        export class topnav extends my.core.controls.core {
            ctlType: string = "ctlTopNav";
            element: HTMLInputElement;
            readOnly: boolean = false; //not used here
            reset: Function; //not used here
            // not used here
            get disabled(): boolean { return this.element.disabled; }
            set disabled(val: boolean) { this.element.disabled = val; }


            primaryTable: string = "Menus";
            subMenuTable: string = "SubMenus";

            container: HTMLElement;
            private _nav: HTMLElement;

            navSideMenuTrigger: HTMLElement;
            navTopLeft: HTMLElement;
            navTopRight: HTMLElement;
            navTopNotifications: HTMLElement;
            private _lMenu: HTMLElement;
            private _rMenu: HTMLElement;

            items: Array<Object> = [];

            dataColumnURL: string = "URL";
            dataColumnLabel: string = "Label";
            dataColumnSubmenu: string = "SubMenus";


            private _dataSet: my.data.iDataSet;
            get dataSet(): my.data.iDataSet {
                return this._dataSet;
            }
            set dataSet(val: my.data.iDataSet) {
                this._dataSet = val;
                if (val) {
                    this._dataSet.events.Loaded.subscribe(this, this._rebind.bind(this));
                }
                //this._updateDataRow();
            }


            constructor() {
                super('div');
                // this.container = document.createElement("div");
                // this.container.id = "topMenu";
                // this.container.classList.add("topMenu");

                document.addEventListener("click", (e: MouseEvent) => {
                    this._cloaseAllOpenMenus();
                });


                this._create();
            }


            private _create() {
                var mainContainer = document.createElement("div");
                mainContainer.innerHTML = `
                    <div id="navSideMenuTrigger" class="plc"></div>
                    <div id="navTopLeft" class="plc"></div>
                    <div id="spacer" class="plc"></div>
                    <div id="navTopNotifications" class="plc"></div>
                    <div id="navTopRight" class="plc"></div>
                `;

                this.container = mainContainer;
                this.container.id = "topMenu";
                this.container.classList.add("topMenu");

                this.navSideMenuTrigger = <HTMLElement>mainContainer.getElementsByClassName("plc")[0];
                this.navTopLeft = <HTMLElement>mainContainer.getElementsByClassName("plc")[1];
                this.navTopNotifications = <HTMLElement>mainContainer.getElementsByClassName("plc")[3];
                this.navTopRight = <HTMLElement>mainContainer.getElementsByClassName("plc")[4];

                // create UL containers for the menus
                this._lMenu = document.createElement("ul");
                this._rMenu = document.createElement("ul");
                this.navTopLeft.appendChild(this._lMenu);
                this.navTopRight.appendChild(this._rMenu);

                this.showTrigger(true);
                //this._nav = document.createElement("ul");
                //this._nav.appendChild(this._createTrigger());
            }

            showTrigger(val: boolean) {
                if (val) {

                    //var navEl = document.createElement("li");
                    //var a = document.createElement("a");
                    //a.className = "trigger";
                    var i = new my.controls.ctlIcon(my.theme.current.icons.menu);
                    i.element.id = "trigger";
                    //a.appendChild(i.element);
                    //navEl.appendChild(a);
                    //return navEl;

                    this.navSideMenuTrigger.appendChild(i.element);
                } else {
                    this.navSideMenuTrigger.innerHTML = "";
                }
            }



            private _rebind() {

                var self = this;
                this.dataSet.tables[this.primaryTable].rows.forEach((row: my.data.iDataRow, idx) => {

                    var sURL = row.items[self.dataColumnURL].value;
                    var sLabel = row.items[self.dataColumnLabel].value;
                    var isRight = row.items["AlignRight"].value;
                    var dt: my.data.DataTable = this.dataSet.tables[this.subMenuTable];
                    var subMenuData = dt.getFilteredArray("RootUID", row.items["UID"].value);
                    var itm = self._createItem(sURL, sLabel, subMenuData, isRight);
                    if (row.items["AlignRight"].value) {
                        self._rMenu.appendChild(itm);
                    } else {
                        self._lMenu.appendChild(itm);
                    }

                });

                //this.container.appendChild(this._nav);
                document.getElementsByTagName("body")[0].appendChild(self.container);
            }


            private _createItem(link: string, label: string, data: Array<Object>, alignRight: number): HTMLElement {
                var navEl = document.createElement("li");
                if (alignRight == 1) {
                    navEl.classList.add("AlignRight");
                }

                var a = document.createElement("a");

                a.text = label;
                a.setAttribute("data-i18n", label);

                navEl.appendChild(a);


                if ((data != undefined) && (data.length > 0)) {
                    navEl.appendChild(this._createSubMenu(data));
                    navEl.classList.add("submenu");
                    navEl.onclick = this._toggleMenu.bind(this);
                } else {
                    // we have no dropdon menu
                    a.href = link;
                }
                this.items.push(navEl);
                return navEl;
            }


            private _createSubMenu(data: Array<Object>): HTMLElement {
                var self = this;
                var ul = document.createElement("ul");
                data.forEach(function (obj: any, idx) {
                    ul.appendChild(self._createItem(obj[self.dataColumnURL], obj[self.dataColumnLabel], undefined, 0));
                });
                ul.className = "submenu-content";
                return ul;
            }




            // addRight(title: string, data: my.data.DataTable) {
            //     var ul = document.createElement("ul");
            //     ul.className = "my-top-menu-right";
            //     var li = document.createElement("li");
            //     li.innerHTML = "<a >" + title + "</a>";
            //     ul.appendChild(li);

            //     li.appendChild(this._createSubMenu(data));

            //     this.container.appendChild(ul);
            // }


            private _toggleMenu(ev: MouseEvent) {
                ev.stopPropagation();
                this._cloaseAllOpenMenus();
                var el: HTMLElement = ev.target["parentElement"];
                if (el.classList.contains("show") == false) {
                    el.classList.add("show");
                    document.addEventListener('click', (event) => {
                        el.classList.remove("show");
                    });
                } else {
                    el.classList.remove("show");
                }
            }

            private _cloaseAllOpenMenus() {
                var arr: HTMLCollectionOf<Element> = document.getElementsByClassName("submenu show");
                for (var i = 0; i < arr.length; i++) {
                    arr[i].classList.remove("show");
                }
            }

        } // end class topnav


    } // end namespace menu
} // end namespace my