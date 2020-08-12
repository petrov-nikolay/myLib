/// <reference path="App.ts" />
/// <reference path="App.Screen.ts" />

var moduleName: string;
var moduleProperties: Array<object>; // this is here just to create the variable so it will compile, actual values are in the JS script properties declaration in the HTML

namespace my {

    export namespace app {

        export abstract class standard extends my.core.app.core {

            properties: Array<Object> = moduleProperties;

            private _data: any;
            get data(): any {
                return this._data;
            }
            set data(val: any) {
                this._data = val;
            }

            events: EventsApp;

            toast: my.controls.ctlToast;
            set enableToast(val: boolean) {
                if ((val) && (this.toast == undefined)) {
                    this.toast = new my.controls.ctlToast();
                    this.containers.main.appendChild(this.toast.element);
                }
            }

            constructor(maincontainer: string) {
                super(maincontainer);
                this.events = new my.app.EventsApp();
                //this.events.init.dispatch(this); // not used at all for the moment
            }

            getPropertyByName(name: string, defaultResponce: string = undefined): string {
                var sRet: string = defaultResponce;

                if (moduleProperties) {
                    moduleProperties.forEach((item, idx) => {
                        if (item["Name"] == name) {
                            sRet = item["Value"];
                        }
                    });
                }

                return sRet;
            }


        }; //end class standard


        export class EventsApp {
            init: my.core.events.core;
            global: my.core.events.coreGlobal;

            constructor() {
                this.init = new my.core.events.core("appInit");
                this.global = new my.core.events.coreGlobal();
            }


        }; //end class EventsApp


        export abstract class screenbase extends my.core.app.Screen {
            parentApp: my.app.iApp;
            header: my.app.screenHeader;

            private _title = ""
            get title(): string {
                return this._title;
            }
            set title(val: string) {
                this.header.title = val;
                this._title = val;
            }

            constructor(id: string, app: my.app.iApp) {
                super(id);
                this.parentApp = app;


                this._init();


                this.header = new my.app.screenHeader(this);
                if (moduleName != undefined) {
                    this.title = moduleName;
                }
            }

            private _init() {
                if (this.placeholder === undefined) {
                    this.placeholder = this.parentApp.containers.body;
                }

            }

            onBeforeShow() {

            }

            onHide() {

            }



        }; //end class screenbase


        export class screenHeader {
            element: HTMLDivElement;
            parent: my.core.app.Screen;
            titlePlaceholder: HTMLDivElement;
            breadcrumbPlaceholder: HTMLDivElement;


            set title(val: string) {

                this.titlePlaceholder.innerHTML = '';


                var title = document.createElement('h1');
                title.innerText = val;
                this.titlePlaceholder.appendChild(title);
            };

            constructor(parent: my.core.app.Screen) {
                this.parent = parent;
                this.element = document.createElement('div');
                this.element.className = 'screen_header';
                this.parent.element.insertBefore(this.element, this.parent.element.firstChild);
                this.titlePlaceholder = document.createElement('div');
                this.element.appendChild(this.titlePlaceholder);
            }

        }; // class screenHeader





    }; //end namespace app

}; // end namespace my