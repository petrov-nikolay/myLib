/// <reference path="myList.ts" />

namespace my {



    export namespace controls {




        export class ctlTabs extends my.core.controls.List {
            ctlType: string = "ctlTabs";

            private _monitorURL: boolean = true;
            get monitorURL(): boolean {
                return this._monitorURL;
            }
            set monitorURL(val: boolean) {
                this._monitorURL = val;
                if (val) {
                    window.onhashchange = this.locationHashChanged.bind(this);
                }

            }

            constructor(keyColumn: string, labelColumn: string, data: my.data.DataTable) {
                super(keyColumn, labelColumn, data);

                this.css = new my.css.Tabs(this.element);
                this.monitorURL = true;
                //use this to update the tab on creation
                this.locationHashChanged();
            }

            //caled by the parent on data change
            rebind(): void {
                this.items = [];

                var self = this;
                this.clearAll();
                var key: string;
                var type: "link" | "text" | "icon" | "linkicon" = "link"; // will accept also "text", "icon", "linkicon" 
                var isSelected: boolean = false;

                if (this.data) {
                    // [].forEach because the TS is compiled to ES5 and not ES6 - changed
                    this.data.rows.forEach((dRow: my.data.iDataRow, idx) => {
                        isSelected = false;
                        //check if we have valid data
                        if (dRow.items[self.labelColumn] == undefined) {
                            console.log("missing data for labelColumn");
                        }
                        key = undefined;
                        if (dRow.items[self.keyColumn]) { // add key if we have it - not important if we don't
                            key = dRow.items[self.keyColumn].value;
                        }
                        type = undefined;
                        if (dRow.items["type"]) { // add key if we have it - not important if we don't
                            type = dRow.items["type"].value;
                        }


                        if (dRow.items["selected"]) {
                            if (dRow.items["selected"].value == 1) {
                                isSelected = true;
                            }
                        }

                        self.addItem(dRow.items[self.labelColumn].value, key, type, isSelected, dRow);

                    });
                } else {

                    console.log('ctlTabs.bind: no data');
                }

                var d = document.createElement("div");
                d.id = "shadow";
                this.element.appendChild(d);

                var noneSelested = true;
                this.items.forEach((itm: ctlTabsItem, idx) => {
                    if (itm.isSelected) {
                        noneSelested = false;
                    }
                });
                if (noneSelested) {
                    this.selectedItem = this.items[0];
                }

            }

            private _onItemClick(item: ctlListItem) {
                this.selectedItem = item;

                this.events.itemClick.dispatch(this, item.itemData);
            }

            clearAll() {
                this.items = [];
                this.element.innerHTML = ''; // clear the items before start adding new
            }

            addItem(text: string, link: string, type: "link" | "text" | "icon" | "linkicon", selected: boolean = false, data: any = undefined) {
                var li: ctlTabsItem;

                li = new ctlTabsItem(text, link, type);;

                li.isSelected = selected;
                if (selected) {
                    this.selectedItem = li;
                }



                //if (self.itemTemplate) {
                //    li.itemTemplate = self.itemTemplate(self, item);
                //}
                //if (self.itemPostProcesing) {
                //    self.itemPostProcesing(li);
                //}

                li.onClick = this._onItemClick.bind(this);
                li.itemData = data;
                this.items.push(li);
                this.element.appendChild(li.element);
            }


            locationHashChanged() {

                var hash = location.hash;


                this.items.forEach((itm: ctlTabsItem, idx) => {
                    if (itm.link.toLowerCase().includes(hash.toLowerCase())) {
                        this.selectedItem = itm;
                    }

                });

            }


        } // end class ctlTabs


        export class ctlTabsItem extends my.core.controls.ListItem {
            ctlType: string = "ctlTabsItem";

            isSelected: boolean = false;
            link: string;
            type: "link" | "text" | "icon" | "linkicon";

            // not shure is working need to implement templating at some point
            set itemTemplate(itmTempleate: my.controls.iControl) {
                if (itmTempleate) {
                    this.element.innerHTML = '';
                    this.element.appendChild(itmTempleate.element);
                }
            }; //  represent the item containing the vale of the <LI>

            //we can't use normal click event for tabs we need the "<a>" to be the only click that trigers item selection
            onClick: (itm: ctlTabsItem) => void

            constructor(text: string, link: string, type: "link" | "text" | "icon" | "linkicon") { //, itemTemplate: HTMLElement = undefined) {
                super("", "");
                this.css = new css.TabsItem(this.element);

                //this.text = text;
                this.link = link;
                this.type = type;

                switch (type) {
                    case "link":
                        this.element.appendChild(this._addLink(text, link).element);
                        break;
                    case "icon":
                        this.element.appendChild(this._addIcon(text).element);
                        break;
                    case "linkicon":
                        var lnk: my.controls.ctlLink = this._addLink("", link);
                        lnk.element.appendChild(this._addIcon(text).element);
                        this.element.appendChild(lnk.element);
                        break;
                    case "text":
                        this.element.appendChild(new ctlSpan(text).element);
                        break;
                    default:
                        this.element.appendChild(this._addLink(text, link).element);
                        break;
                }

            }; //  end constructor


            private _addIcon(text: string): my.controls.ctlIcon {
                var ico: my.controls.ctlIcon = new my.controls.ctlIcon(text);
                return ico;
            }

            private _addLink(text: string, link: string): my.controls.ctlLink {
                var ctlLink: my.controls.ctlLink = new my.controls.ctlLink(text, link);
                ctlLink.events.click.subscribe(this, this.onLinkClick.bind(this));
                return ctlLink;
            }

            private onLinkClick(sender, event, data) {
                if (this.onClick) {
                    this.onClick(this);
                }
            }

        }; //  end class ctlTabsItem






    } // END NAMESPACE CONTROLS


}// END NAMESPACE MY