/// <reference path="..\Core\Event.ts" />
/// <reference path="App.ts" />

namespace my {

    export namespace app {

        export interface iScreen {
            id: string;
            /**
             *property is used when screen navigation is called to pass data  to the screen we want to show
             *value is updated only when passing data and will be ovveriden when show is called with navData param
             *
             * @type {object}
             * @memberof iScreen
             */
            navData: object;
            /**
             * property is for manual updates only, it will not be ovveriden by the navigation functtions and stays available for the lifetime of the screen
             * can add as many properties as you want. Do not put to many things here ! use to add data when screen is created
             *
             * @type {object}
             * @memberof iScreen
             */
            data: object;
            element: HTMLElement;

            onBeforeShow: () => any;

            show: (navData: object) => any;
            onShow: () => any;

            hide: () => any;
            onHide: () => any;

            getUrlParam(paramName?: string): string;
            title: string;
        }

    } // end namespace app


    export namespace core {

        export namespace app {



            export abstract class Screen implements my.app.iScreen {
                element: HTMLElement;
                placeholder: HTMLElement;
                title: string; // override in children

                private _isLoaded: boolean = false;

                css: my.core.css;

                screenItems: Array<{ name: string, ctrl: my.controls.iControl }> = [];

                id: string;

                // onnavDataChange: Function;
                navData: object;
                data: object;

                constructor(id: string) {
                    this.element = document.createElement("div");
                    this.element.className = "screen";
                    this.element.classList.add("scr-" + this.constructor.name);
                    this.element.id = id;
                    this.id = id;

                    this.css = new my.css.AppScreen(this.element);
                }

                show(navData: object = undefined) {

                    if (navData) {
                        this.navData = navData;
                    }

                    if (this.onBeforeShow) {
                        //if children whant to do something before every show event
                        this.onBeforeShow();
                    }
                    if (this.placeholder) {
                        this.placeholder.innerHTML = "";
                        this.placeholder.appendChild(this.element);
                    } else {
                        console.log('no placeholder definition for screen:' + this.id.toString())
                    }


                    if (this._isLoaded == false) {
                        this.onLoad(); // load once if not loaded before
                        my.events.global.navigation.dispatch(this, "SCREEN.LOAD");
                        this._isLoaded = true;
                    }

                    //if children whant to do something after every show event
                    this.onShow();
                    my.events.global.navigation.dispatch(this, "SCREEN.SHOW");
                }

                hide() {
                    if (this.onHide) {
                        //if children whant to do something after every show event
                        this.onHide();
                    }
                }

                screenItemAdd(val: my.controls.iControl, controlName: string) {
                    this.screenItems.push({ name: controlName, ctrl: val });
                }

                screenItemGet(controlName: string) {
                    var ret;
                    this.screenItems.forEach((item, idx) => {
                        if (item.name == controlName) {
                            ret = item.ctrl;
                        }
                    });
                    return ret;
                }



                abstract onLoad(): void; // called 1 time on the first SHOW

                abstract onBeforeShow(): void;
                abstract onShow(): void;
                abstract onHide(): void;



                getUrlParam(paramName: string = undefined): string {
                    var sRet;
                    var url = document.location.href.split("#")[1]; //get all after the #;
                    //url = url.substring(url.indexOf("/") + 1); //get all after first "/"

                    if (url.length == 0) {
                        return undefined;
                    }
                    var arr = url.split("/");
                    if (paramName == undefined) {
                        return arr[1]; // returns first value
                    }

                    var i: number = -1;
                    arr.forEach((itm: string, idx) => {
                        if (itm == paramName) {
                            i = idx + 1;
                        }
                    });

                    if (i > -1) {
                        sRet = arr[i];
                    }

                    return sRet;
                }




            }; // end Screen






        }; //end namespace app

    }; //end namespace core


}; //end namespace my

