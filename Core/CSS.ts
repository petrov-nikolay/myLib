/// <reference path="Themes.ts" />

namespace my {
    "use strict";
    export namespace core {


        export class css {
            element: HTMLElement;
            currentTeheme: my.core.themes.iTheme;

            constructor(element: HTMLElement, theme: my.core.themes.iTheme) {
                this.element = element;
                this.currentTeheme = theme;
                this.removeAll(); // clear all classes befre we start
            };

            add(val: string) {
                if (val) {
                    if (val.includes(" ")) {
                        val.split(" ").forEach((itm, idx) => {
                            this.element.classList.add(itm.toString());
                        });
                    } else {  // single class
                        this.element.classList.add(val.toString());
                    }

                }
            };

            remove(val: string) {
                if (val) {
                    this.element.classList.remove(val.toString());
                }
            };

            removeAll() {
                this.element.className = "";
            };

            contains(val: string): boolean {
                return this.element.classList.contains(val.toString());
            };


            private _size: string;
            get size(): string {
                return this._size;
            }
            set size(val: string) {
                this._size = val;
                if (val == undefined) {
                    return;
                }
                if (val.indexOf("%") > -1) {
                    //passed val is %
                    this.clearSizes();
                    this._setMinMaxWidth(val);
                } else if ((val.indexOf("px") > -1) || (val.indexOf("rem") > -1)) {
                    //passed val is px
                    this.clearSizes();
                    this._setMinMaxWidth(val);
                } else {
                    //passed val is logical sizes, "xs1,s3,m4...."
                    this.setSizes(val);
                }
            }


            private _setMinMaxWidth(val: string) {

                if (val.indexOf("min") > -1) {
                    val = val.substring(3);
                    this.element.style.minWidth = val;
                } else if (val.indexOf("max") > -1) {
                    val = val.substring(3);
                    this.element.style.maxWidth = val;
                } else if (val.indexOf("all") > -1) {
                    val = val.substring(3);
                    this.element.style.minWidth = val;
                    this.element.style.maxWidth = val;
                    this.element.style.width = val;
                } else {
                    this.element.style.width = val;
                }


            }


            /**
            * set logical sizes based on the 1-12 system
            * @remarks
            * @param sizes - xs12,s12,m6,l4,xl3
            * 
            *
            *
            * @returns nothig
            *
            * @beta
            **/
            setSizes(sizes: string, clearOld: boolean = true) {
                var aSizes: Array<string> = sizes.split(",");
                if (clearOld) {
                    this.clearSizes("all");
                    this.clearSizes("all", true); // clear offsets
                }

                this.add(this.currentTeheme.column);

                aSizes.forEach((itm: string, idx) => {

                    if (itm.indexOf("xs") == 0) {
                        if (clearOld == false) { this.clearSizes("xs"); }
                        this.add(this.currentTeheme.size.xs + itm.split("xs")[1]);
                    }
                    else if (itm.indexOf("s") == 0) {
                        if (clearOld == false) { this.clearSizes("s"); }
                        this.add(this.currentTeheme.size.s + itm.split("s")[1]);
                    }
                    else if (itm.indexOf("m") == 0) {
                        if (clearOld == false) { this.clearSizes("m"); }
                        this.add(this.currentTeheme.size.m + itm.split("m")[1]);
                    }
                    else if (itm.indexOf("l") == 0) {
                        if (clearOld == false) { this.clearSizes("l"); }
                        this.add(this.currentTeheme.size.l + itm.split("l")[1]);
                    }
                    else if (itm.indexOf("xl") == 0) {
                        if (clearOld == false) { this.clearSizes("xl"); }
                        this.add(this.currentTeheme.size.xl + itm.split("xl")[1]);
                    }
                    else if (itm.indexOf("offset_xs") == 0) {
                        if (clearOld == false) { this.clearSizes("xs", true); }
                        this.add(this.currentTeheme.size.offset_xs + itm.split("offset_xs")[1]);
                    }
                    else if (itm.indexOf("offset_s") == 0) {
                        if (clearOld == false) { this.clearSizes("s", true); }
                        this.add(this.currentTeheme.size.offset_s + itm.split("offset_s")[1]);
                    }
                    else if (itm.indexOf("offset_m") == 0) {
                        if (clearOld == false) { this.clearSizes("m", true); }
                        this.add(this.currentTeheme.size.offset_m + itm.split("offset_m")[1]);
                    }
                    else if (itm.indexOf("offset_l") == 0) {
                        if (clearOld == false) { this.clearSizes("l", true); }
                        this.add(this.currentTeheme.size.offset_l + itm.split("offset_l")[1]);
                    }
                    else if (itm.indexOf("offset_xl") == 0) {
                        if (clearOld == false) { this.clearSizes("xl", true); }
                        this.add(this.currentTeheme.size.offset_xl + itm.split("offset_xl")[1]);
                    }


                });


            };




            clearSizes(size: "xs" | "s" | "m" | "l" | "xl" | "all" = "all", isOffset: boolean = false) {
                for (var i = 1; i < 13; i++) {   // clear all 12 possible values
                    switch (size) {
                        case "xs": {
                            if (isOffset) {
                                this.remove(this.currentTeheme.size.offset_xs + i.toString());
                            } else {
                                this.remove(this.currentTeheme.size.xs + i.toString());
                            }
                            break;
                        }
                        case "s": {
                            if (isOffset) {
                                this.remove(this.currentTeheme.size.offset_s + i.toString());
                            } else {
                                this.remove(this.currentTeheme.size.s + i.toString());
                            }
                            break;
                        }
                        case "m": {
                            if (isOffset) {
                                this.remove(this.currentTeheme.size.offset_m + i.toString());
                            } else {
                                this.remove(this.currentTeheme.size.m + i.toString());
                            }
                            break;
                        }
                        case "l": {
                            if (isOffset) {
                                this.remove(this.currentTeheme.size.offset_l + i.toString());
                            } else {
                                this.remove(this.currentTeheme.size.l + i.toString());
                            }
                            break;
                        }
                        case "xl": {
                            if (isOffset) {
                                this.remove(this.currentTeheme.size.offset_xl + i.toString());
                            } else {
                                this.remove(this.currentTeheme.size.xl + i.toString());
                            }
                            break;
                        }
                        default: {
                            if (isOffset) {
                                this.remove(this.currentTeheme.size.offset_xs + i.toString());
                                this.remove(this.currentTeheme.size.offset_s + i.toString());
                                this.remove(this.currentTeheme.size.offset_m + i.toString());
                                this.remove(this.currentTeheme.size.offset_l + i.toString());
                                this.remove(this.currentTeheme.size.offset_xl + i.toString());
                            } else {
                                this.remove(this.currentTeheme.size.xs + i.toString());
                                this.remove(this.currentTeheme.size.s + i.toString());
                                this.remove(this.currentTeheme.size.m + i.toString());
                                this.remove(this.currentTeheme.size.l + i.toString());
                                this.remove(this.currentTeheme.size.xl + i.toString());
                            }

                            break;
                        }


                    }
                }

            };

            // setSizeOffsets(sizes: string) {
            //     var aSizes: Array<string> = sizes.split(",");

            //     this.add(this.currentTeheme.column);

            //     aSizes.forEach((itm: string, idx) => {
            //         if (itm.indexOf("xs") == 0) {
            //             this.clearSizes("xs", true);
            //             this.add(this.currentTeheme.size.offset_xs + itm.split("xs")[1]);
            //         }
            //         else if (itm.indexOf("s") == 0) {
            //             this.clearSizes("s", true);
            //             this.add(this.currentTeheme.size.offset_s + itm.split("s")[1]);
            //         }
            //         else if (itm.indexOf("m") == 0) {
            //             this.clearSizes("m", true);
            //             this.add(this.currentTeheme.size.offset_m + itm.split("m")[1]);
            //         }
            //         else if (itm.indexOf("l") == 0) {
            //             this.clearSizes("l", true);
            //             this.add(this.currentTeheme.size.offset_l + itm.split("l")[1]);
            //         }
            //         else if (itm.indexOf("xl") == 0) {
            //             this.clearSizes("xl", true);
            //             this.add(this.currentTeheme.size.offset_xl + itm.split("xl")[1]);
            //         }

            //     });


            // };




        };



    } // end namespace core



} // end namespace my