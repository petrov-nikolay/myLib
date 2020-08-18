/// <reference path="..\Core\Event.ts" />

namespace my {

    export namespace app {
        // use this in all screens so each screen have the main app object
        export interface iApp {
            screens: iScreen[];
            containers: my.core.app.cContainers;
            navTo(screen: string, urlParams: string, navData: object);
            data: any;
            url: string;
        };



    } // end namespace app



    export namespace core {

        export namespace app {



            export abstract class core implements my.app.iApp {
                public screens: my.app.iScreen[] = [];
                public containers: cContainers;
                public name: string = 'app';
                public ver: string = '0.0.0';
                public data: any;
                public currentScreenName: string;
                public currentScreen: my.app.iScreen;
                public previousScreen: my.app.iScreen;
                sessionStart: Date;
                seesionDuration: 30; //min

                /**
                 *returns the URL to the current app based on the <script> definition in the HTML
                 *
                 * @readonly
                 * @type {string}
                 * @memberof core
                 */
                get url(): string {
                    var sRet: string = document.getElementById("moduleScript").getAttribute('src');
                    sRet = sRet.substring(0, sRet.lastIndexOf("/"));
                    return sRet;
                }



                public constructor(maincontainer: string) {
                    this.containers = new cContainers(maincontainer);
                    //listener to proxy the event to onNavigationEvent
                    window.addEventListener('hashchange', this._onNavigationEvent.bind(this));

                    my.events.global.init();
                }

                //proxy the event to onNavigationEvent
                private _onNavigationEvent(e: HashChangeEvent) {
                    //var nav = { screenname: '', params: '' };
                    var nav = this.getCurrentNavigationAddress();

                    // check if we change screen or just updatet the URL with some other params
                    if (this.currentScreenName != nav.screenname) {
                        this.navTo(nav.screenname, nav.params);
                    }
                }

                public getCurrentNavigationAddress() {
                    var ret = { screenname: '', params: '' };

                    var url = document.location.href.split("#")[1]; //get all after the #

                    ret.screenname = "home"; //go home by default
                    ret.params = "";
                    if ((url !== undefined) && (url !== "")) {
                        // use first param as screen name 
                        if (url.indexOf("/") > 0) {
                            ret.screenname = url.substring(0, url.indexOf("/"));
                        } else {
                            ret.screenname = url;
                        }

                        // confirmwe have params
                        if (url.indexOf("/") > 0) {
                            ret.params = url.substring(url.indexOf("/") + 1);
                        }
                    }

                    return ret;
                }


                public navStart() {
                    var nav = this.getCurrentNavigationAddress();
                    var screenmatch: boolean = false;
                    this.screens.forEach((itm, idx) => {
                        if (nav.screenname == itm.id) {
                            screenmatch = true;
                        }
                    });

                    if (screenmatch) {
                        this.navTo(nav.screenname, nav.params);
                    } else {
                        this.navToHome();// got to first screen if we can't match url with screens
                    }

                }// end navStart

                public navTo(screen: string, urlParams: string = undefined, navData: object = undefined) {
                    this._navTo(false, screen, urlParams, navData);
                }

                public navToSilent(screen: string, urlParams: string = undefined, navData: object = undefined) {
                    this._navTo(true, screen, urlParams, navData);
                }

                private _navTo(isSilent: boolean, screen: string, urlParams: string = undefined, navData: object = undefined) {

                    var isNavSuccess: boolean = false;
                    this.screens.forEach((scr, idx) => {

                        if (scr.id.toLowerCase() == screen.toLowerCase()) {
                            // screen found navigate to it 

                            if (this.currentScreen) { // first load of the App this is empty
                                this.currentScreen.hide();
                            }

                            this.currentScreenName = screen;
                            this.previousScreen = this.currentScreen; //store the previous screen for navigation back
                            this.currentScreen = scr;


                            if (isSilent == false) {  // no changes of URL's if silent = true
                                var url = "#" + screen;
                                if (urlParams) {
                                    url = url + "/" + urlParams;
                                }
                                window.location.href = url;
                            }
                            scr.show(navData);

                            if (isSilent == false) {  // no changes of URL's if silent = true
                                history.pushState({
                                    id: scr.id
                                }, scr.title, url);
                            }
                            isNavSuccess = true;
                        }

                    }); // end foreach

                    if (isNavSuccess == false) {
                        //console.log("can't navigate to: " + screen);
                    }

                } // end navTo


                public navToPreviousScreen(urlOverride: string = undefined) {
                    history.back();
                }

                public navToHome() {
                    var url = this.getCurrentNavigationAddress();
                    if (url.screenname == this.screens[0].id) {
                        this.navTo(this.screens[0].id, url.params);
                    } else {
                        this.navTo(this.screens[0].id);
                    }

                }




                public showSplash(param: boolean) {
                    var html: HTMLElement = document.createElement('div');
                    html.setAttribute('id', 'splash');
                    html.setAttribute('style', 'position: fixed;top: 0;right: 0;bottom: 0;left: 0;background-color: #fff;z-index:9000');
                    html.innerHTML = ` <div class="preloader-wrapper big active">
                                    <div class="spinner-layer spinner-blue">
                                        <div class="circle-clipper left">
                                            <div class="circle"> </div>
                                        </div>
                                        <div class="gap-patch">
                                            <div class="circle"> </div>
                                        </div>
                                        <div class="circle-clipper right">
                                            <div class="circle"> </div>
                                        </div>
                                    </div>
                                </div>`;
                    if (param) {
                        document.body.appendChild(html);
                    } else {

                        document.body.removeChild(document.getElementById('splash'));
                    }
                };

                public addScreen(val: my.app.iScreen) {
                    this.screens.push(val);
                }




            };  //end class core





            export class cContainers {
                private _main: string;
                private _heder: string;
                private _body: string;
                private _footer: string;

                constructor(cont) {
                    this._main = cont;
                    this._heder = "appheader";
                    this._body = "appbody";
                    this._footer = "appfooter";


                };

                get main(): HTMLElement {
                    return this._findElement(this._main);
                }
                get heder(): HTMLElement {
                    return this._findElement(this._heder);
                }
                get body(): HTMLElement {
                    return this._findElement(this._body);
                }
                get futer(): HTMLElement {
                    return this._findElement(this._footer);
                }



                private _createElement(id: string): HTMLElement {
                    var htmle = document.createElement('div');
                    htmle.id = id;
                    htmle.setAttribute('width', '100%');
                    return htmle;
                }

                private _findElement(id: string) {
                    var htmle = document.getElementById(id);
                    if (htmle === undefined) {
                        alert('missing core element: ' + id);
                    }
                    return htmle;

                }
            } //end class cContainers




        }; //end namespace app

    }; //end namespace core

}; //end namespace my

