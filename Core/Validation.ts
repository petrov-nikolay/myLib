
namespace my {

    export namespace controls {

        export interface iValidationRule {
            type: 'required' | 'custom';
            message: string;
            validate(val: any): boolean;
            customFunc(val: any): boolean;
        }

    }


    export namespace core {

        export namespace controls {

            export namespace validation {


                export class validationGroup {
                    rules: Array<my.controls.iValidationRule> = [];

                    errorText: string;
                    private _isValid: boolean = true;
                    get isValid(): boolean {
                        return this._isValid;
                    }
                    set isValid(val: boolean) {
                        this._isValid = val;
                        this.parent.events.valueValidated.dispatch(this, this.isValid);
                    }

                    parent: my.controls.iControl;

                    constructor(parent: my.controls.iControl) {
                        this.parent = parent;
                    }

                    validate(value: any): boolean {
                        var res: boolean = true;
                        // if (this.rules.length == 0) {
                        //     this.isValid = true;
                        // }
                        // this.isValid = true;
                        this.rules.forEach((rule: my.controls.iValidationRule, idx) => {

                            if (rule.validate(value) == false) {
                                res = false;
                                this.errorText = rule.message;
                            }
                        });

                        this.isValid = res;

                        return this.isValid;
                    }

                    add(type: 'required' | 'custom', message: string = undefined, customFunc: (val: any) => boolean = undefined) {
                        var rule: my.controls.iValidationRule;
                        switch (type) {
                            case "required": {
                                if (message == undefined) {
                                    message = "value is required";
                                }
                                rule = new vrRequired(message);
                                rule.type = type;
                                if (customFunc != undefined) {
                                    rule.customFunc = customFunc;
                                }
                                break;
                            }
                            case "custom": {
                                rule = new vrCustom(message);
                                rule.type = type;
                                if (customFunc != undefined) {
                                    rule.customFunc = customFunc;
                                }
                                break;
                            }
                            default: {
                                console.log("Invalid validation type passed to validationGroup.add");
                            }

                        }


                        this.rules.push(rule);
                    }

                    remove(val: my.controls.iValidationRule) {
                        const index = this.rules.indexOf(val, 0);
                        if (index > -1) {
                            this.rules.splice(index, 1);
                        }
                    }

                    getByType(type: 'required' | 'custom'): my.controls.iValidationRule {
                        var ret: my.controls.iValidationRule;

                        for (var i = 0; i < this.rules.length; ++i) {

                            if (this.rules[i].type == type) {
                                ret = this.rules[i];
                                break;
                            }
                        }

                        return ret;
                    }

                } // end class validationGroup


                export class vrRequired implements my.controls.iValidationRule {

                    type: "required";
                    message: string;

                    customFunc: any; // format must be customFunc(val: any): boolean;


                    constructor(message: string = undefined) {
                        if (message) {
                            this.message = message;
                        } else {
                            this.message = "the filed is required";
                        }
                    }


                    validate(val: any): boolean {
                        var ret: boolean = false;


                        var v: any;
                        // if ((val instanceof my.core.data.binding.Observable) || (val instanceof my.data.binding.Observable)) {
                        //     v = val.value
                        // } else {
                        //     v = val;
                        // }

                        if ((typeof val === "object") && (val !== null)) {
                            return true;
                        }

                        v = val;



                        if ((v != undefined) && (v !== "")) { // important to be !== not just !=
                            //all good check for custom function definition
                            if (this.customFunc != undefined) {
                                ret = this.customFunc(v);
                            } else {
                                ret = true;
                            }
                        }
                        if (ret == false) {
                            console.log("required validation result:" + ret);
                        }
                        return ret;
                    }

                } // end class vrRequired


                export class vrCustom implements my.controls.iValidationRule {

                    type: "custom";
                    message: string;

                    customFunc: any; // format must be customFunc(val: any): boolean;


                    constructor(message: string = undefined) {
                        if (message) {
                            this.message = message;
                        } else {
                            this.message = "custom validation text";
                        }
                    }


                    validate(val: any): boolean {
                        var ret: boolean = true;


                        if (this.customFunc != undefined) {
                            ret = this.customFunc(val);
                        }


                        if (ret == false) {
                            // console.log("custom validation result:" + ret);
                        }
                        return ret;
                    }

                } // end class vrCustom



            }; // end Validation
        }; // end form



    }; // end core
}; //end my