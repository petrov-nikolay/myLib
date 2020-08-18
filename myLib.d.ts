declare namespace my {
    namespace core {
        namespace themes {
            interface iIcons {
                add: string;
                add_circle_outline: string;
                arrow_down: string;
                arrow_left: string;
                arrow_right: string;
                arrow_sort_down: string;
                arrow_sort_up: string;
                arrow_up: string;
                back: string;
                check: string;
                clear: string;
                close: string;
                create: string;
                delete: string;
                done: string;
                edit: string;
                error: string;
                filter: string;
                menu: string;
                new: string;
                next: string;
                previous: string;
                print: string;
                remove: string;
                save: string;
                search: string;
                sync: string;
            }
            interface iColors {
                primary: string;
                secondary: string;
                success: string;
                info: string;
                warning: string;
                danger: string;
            }
            interface iSizes {
                xs: string;
                s: string;
                m: string;
                l: string;
                xl: string;
                offset_xs: string;
                offset_s: string;
                offset_m: string;
                offset_l: string;
                offset_xl: string;
            }
            interface iElements {
                buttonRound: string;
                button: string;
                input: string;
                textarea: string;
                checkbox: string;
                radiobutton: string;
                dropDown: string;
                icon: string;
            }
            interface iLists {
                list: string;
                listItem: string;
                toast: string;
                toastItem: string;
                autocomplete: string;
                autocompleteItem: string;
                dropdown: string;
                dropdownItem: string;
                tabs: string;
                tabsItem: string;
            }
            interface iTheme {
                size: iSizes;
                colors: iColors;
                icons: iIcons;
                elements: iElements;
                lists: iLists;
                active: string;
                disabled: string;
                column: string;
                row: string;
                alighLeft: string;
                alignRight: string;
                alignCenter: string;
                floatLeft: string;
                floatRight: string;
                table: string;
                tRow: string;
                tColumn: string;
                tCell: string;
                form: string;
                formGroup: string;
                formItem: string;
                formControl: string;
                calendar: string;
                calendarDay: string;
                calendarDropDown: string;
                card: string;
                cardHeader: string;
                cardBody: string;
                cardFooter: string;
                appScreen: string;
            }
        }
    }
}
declare namespace my {
    namespace core {
        class css {
            element: HTMLElement;
            currentTeheme: my.core.themes.iTheme;
            constructor(element: HTMLElement, theme: my.core.themes.iTheme);
            add(val: string): void;
            remove(val: string): void;
            removeAll(): void;
            contains(val: string): boolean;
            private _size;
            get size(): string;
            set size(val: string);
            private _setMinMaxWidth;
            setSizes(sizes: string, clearOld?: boolean): void;
            clearSizes(size?: "xs" | "s" | "m" | "l" | "xl" | "all", isOffset?: boolean): void;
        }
    }
}
declare namespace my {
    namespace core {
        namespace themes {
            namespace bootstrap {
                class cIcons implements my.core.themes.iIcons {
                    add: string;
                    add_circle_outline: string;
                    arrow_down: string;
                    arrow_left: string;
                    arrow_right: string;
                    arrow_sort_down: string;
                    arrow_sort_up: string;
                    arrow_up: string;
                    back: string;
                    check: string;
                    clear: string;
                    close: string;
                    create: string;
                    delete: string;
                    done: string;
                    edit: string;
                    error: string;
                    filter: string;
                    menu: string;
                    new: string;
                    next: string;
                    previous: string;
                    print: string;
                    remove: string;
                    save: string;
                    search: string;
                    sync: string;
                }
                class cColors implements my.core.themes.iColors {
                    primary: string;
                    secondary: string;
                    success: string;
                    info: string;
                    warning: string;
                    danger: string;
                }
                class cSizes implements my.core.themes.iSizes {
                    xs: string;
                    s: string;
                    m: string;
                    l: string;
                    xl: string;
                    offset_xs: string;
                    offset_s: string;
                    offset_m: string;
                    offset_l: string;
                    offset_xl: string;
                }
                class cLists implements my.core.themes.iLists {
                    list: string;
                    listItem: string;
                    toast: string;
                    toastItem: string;
                    autocomplete: string;
                    autocompleteItem: string;
                    dropdown: string;
                    dropdownItem: string;
                    tabs: string;
                    tabsItem: string;
                }
                class cElements implements my.core.themes.iElements {
                    buttonRound: string;
                    button: string;
                    input: string;
                    textarea: string;
                    checkbox: string;
                    radiobutton: string;
                    dropDown: string;
                    icon: string;
                }
                class theme implements my.core.themes.iTheme {
                    size: my.core.themes.iSizes;
                    colors: my.core.themes.iColors;
                    icons: my.core.themes.iIcons;
                    elements: my.core.themes.iElements;
                    lists: my.core.themes.iLists;
                    active: string;
                    disabled: string;
                    column: string;
                    row: string;
                    alighLeft: string;
                    alignRight: string;
                    alignCenter: string;
                    floatLeft: string;
                    floatRight: string;
                    table: string;
                    tRow: string;
                    tColumn: string;
                    tCell: string;
                    form: string;
                    formGroup: string;
                    formItem: string;
                    formControl: string;
                    calendar: string;
                    calendarDay: string;
                    calendarDropDown: string;
                    card: string;
                    cardHeader: string;
                    cardBody: string;
                    cardFooter: string;
                    appScreen: string;
                    constructor();
                }
            }
        }
    }
    class theme {
        static current: my.core.themes.iTheme;
    }
}
declare namespace my {
    namespace css {
        enum eColorStyles {
            primary = "primary",
            secondary = "secondary",
            success = "success",
            info = "info",
            warning = "warning",
            danger = "danger"
        }
        class Button extends my.core.css {
            constructor(element: HTMLElement);
            set colorStyle(val: my.css.eColorStyles);
        }
        class FixedActionButton extends my.core.css {
            constructor(element: HTMLElement);
            set colorStyle(val: my.css.eColorStyles);
        }
        class IconButton extends my.core.css {
            constructor(element: HTMLElement);
            set colorStyle(val: my.css.eColorStyles);
        }
        class Text extends my.core.css {
            constructor(element: HTMLElement);
        }
        class Icon extends my.core.css {
            constructor(element: HTMLElement);
            set colorStyle(val: my.css.eColorStyles);
        }
        class Checkbox extends my.core.css {
            constructor(element: HTMLElement);
        }
        class List extends my.core.css {
            constructor(element: HTMLElement);
        }
        class ListItem extends my.core.css {
            constructor(element: HTMLElement);
        }
        class Toast extends my.core.css {
            constructor(element: HTMLElement);
        }
        class ToastItem extends my.core.css {
            constructor(element: HTMLElement);
        }
        class DropDown extends my.core.css {
            constructor(element: HTMLElement);
        }
        class DropDownList extends my.core.css {
            constructor(element: HTMLElement);
        }
        class DropDownListItem extends my.core.css {
            constructor(element: HTMLElement);
        }
        class form extends my.core.css {
            constructor(element: HTMLElement);
        }
        class formGroup extends my.core.css {
            constructor(element: HTMLElement);
        }
        class formItem extends my.core.css {
            constructor(element: HTMLElement);
        }
        class formControl extends my.core.css {
            constructor(element: HTMLElement);
        }
        class Table extends my.core.css {
            constructor(element: HTMLElement);
        }
        class tRow extends my.core.css {
            constructor(element: HTMLElement);
        }
        class tColumn extends my.core.css {
            constructor(element: HTMLElement);
        }
        class tCell extends my.core.css {
            constructor(element: HTMLElement);
        }
        class Card extends my.core.css {
            constructor(element: HTMLElement);
        }
        class cardHeader extends my.core.css {
            constructor(element: HTMLElement);
        }
        class cardBody extends my.core.css {
            constructor(element: HTMLElement);
        }
        class cardFooter extends my.core.css {
            constructor(element: HTMLElement);
        }
        class Tabs extends my.core.css {
            constructor(element: HTMLElement);
        }
        class TabsItem extends my.core.css {
            constructor(element: HTMLElement);
        }
        class Calendar extends my.core.css {
            constructor(element: HTMLElement);
        }
        class CalendarDay extends my.core.css {
            constructor(element: HTMLElement);
        }
        class CalendarDropDown extends my.core.css {
            constructor(element: HTMLElement);
        }
        class AppScreen extends my.core.css {
            constructor(element: HTMLElement);
            set colorStyle(val: my.css.eColorStyles);
        }
    }
}
declare namespace my {
    class tools {
        static newGuid(): string;
        static newShortCode(length?: number, caseSensitive?: boolean): string;
        static round(nmb: number, fractions: number): string;
        static getElementByValue(arr: Array<object>, elementName: string, elementValue: string): any;
        static getIndexByValue(arr: Array<object>, elementName: string, elementValue: string): number;
        static B64Encode(str: string): string;
        static B64Decode(str: string): string;
        static isIE(userAgent?: any): boolean;
        static setCookie(cname: string, cvalue: string, exdays: number, domain?: string): void;
        static getCookie(cname: any): string;
        static parseURLParams(data: string): Object;
        static log(from: string, data?: any): void;
        static padStart(str: string, padTo: number, padWith: string): string;
        static objHavePropertyCaseInsensitive(o: Object, property: string): boolean;
        static exportToCsv(filename: string, rows: object[]): void;
        static getElementSize(val: HTMLElement): {
            "height": number;
            "width": number;
        };
        static formatDateTimeString(val: string): string;
        static formtDateString(val: string): string;
        static getElementPositionOnForm(element: HTMLElement): {
            "top": number;
            "left": number;
        };
        static getWindowSize(height: number, width: number): "lg" | "md" | "sm" | "xs";
    }
}
declare namespace my {
    namespace events {
        interface iEventHandler {
            (sender: object, event: iEvent | CustomEvent | KeyboardEvent | MouseEvent, data: any): void;
        }
        interface iEventGlobalHandler {
            (sender: object, event: iEventGlobal, data: any, code: string): void;
        }
        interface iEvent {
            id: string;
            name: string;
            subscribers: Array<my.core.events.eventSubscriber>;
            subscribe(subscriber: object, handler: Function, defaultData: any): any;
            dispatch(sender: object, data: any): any;
            unsubscribe(subscriber: object): any;
            unsubscribe(handler: Function): any;
        }
        interface iEventGlobal {
            subscribers: Array<my.core.events.eventGlobalSubscriber>;
            subscribe(subscriber: object, code: string, handler: Function, defaultData: any): any;
            dispatch(sender: object, code: string, data: any): any;
        }
        class global {
            static standard: my.core.events.coreGlobal;
            static navigation: my.core.events.coreGlobal;
            static init(): void;
        }
    }
    namespace core {
        namespace events {
            class eventSubscriber {
                subscriber: object;
                data: any;
                handler: my.events.iEventHandler;
            }
            class eventGlobalSubscriber {
                subscriber: object;
                data: any;
                handler: my.events.iEventGlobalHandler;
                code: string;
            }
            class core implements my.events.iEvent {
                subscribers: Array<eventSubscriber>;
                id: string;
                name: string;
                constructor(name: string);
                subscribe(subscriber: object, handler: my.events.iEventHandler, defaultData?: any): void;
                dispatch(sender: object, data?: any): void;
                unsubscribe(handler: my.events.iEventHandler): any;
                unsubscribe(subscriber: object): any;
                private _unsubscribeBySubscriber;
                private _unsubscribeByHandler;
            }
            class coreGlobal implements my.events.iEventGlobal {
                static subscribers: Array<eventGlobalSubscriber>;
                get subscribers(): Array<eventGlobalSubscriber>;
                id: string;
                constructor();
                subscribe(subscriber: object, code: string, handler: my.events.iEventGlobalHandler, defaultData?: any): void;
                dispatch(sender: object, code: string, data?: any): void;
            }
            class htmlCore implements my.events.iEvent {
                subscribers: Array<eventSubscriber>;
                id: string;
                target: my.controls.iControl;
                name: string;
                eventIdentificator: string;
                constructor(target: my.controls.iControl, name: string);
                subscribe(subscriber: object, handler: my.events.iEventHandler, defaultData?: any): void;
                dispatch(sender: object, data?: any): void;
                unsubscribe(handler: my.events.iEventHandler): any;
                unsubscribe(subscriber: object): any;
                private _unsubscribeBySubscriber;
                private _unsubscribeByHandler;
            }
        }
    }
}
declare namespace my {
    namespace data {
        namespace binding {
            interface iObservable {
                subscribers: Array<my.core.data.binding.bindingSubscriber>;
                value: string | number | boolean | object;
                subscribe(subscriber: object, handler: my.core.data.binding.iBindingHandler, defaultData?: any): any;
                dispatch(sender: object, data: any): any;
            }
        }
    }
    namespace core {
        namespace data {
            namespace binding {
                interface iBindingHandler {
                    (sender: object, data: any): void;
                }
                class bindingSubscriber {
                    subscriber: object;
                    data: any;
                    handler: iBindingHandler;
                }
                class Observable implements my.data.binding.iObservable {
                    subscribers: Array<bindingSubscriber>;
                    id: string;
                    onValueChange: (val: string | number | boolean | object) => void;
                    protected _value: string | number | boolean | object;
                    get value(): string | number | boolean | object;
                    set value(val: string | number | boolean | object);
                    constructor(val?: string | number | boolean | object);
                    subscribe(subscriber: object, handler: iBindingHandler, defaultData?: any): void;
                    private _subscriberExists;
                    dispatch(sender: object, data: any): void;
                    unsubscribe(handler: iBindingHandler): any;
                    unsubscribe(subscriber: object): any;
                    private _unsubscribeBySubscriber;
                    private _unsubscribeByHandler;
                }
                class ObservableArrayRow {
                    __subscribers: Array<bindingSubscriber>;
                    __isChanged: boolean;
                    __bindVisible: boolean;
                    __tableName: string;
                    constructor();
                    getAsObject(): Object;
                    getAsArray(): Array<{
                        "Name": String;
                        "data": Observable;
                    }>;
                    subscribe(subscriber: object, handler: iBindingHandler, defaultData?: any): void;
                    private _handlerExists;
                    dispatch(sender: object, data: any): void;
                }
                class ObservableArray extends Observable {
                    private _filter;
                    get filter(): my.data.Filter;
                    set filter(val: my.data.Filter);
                    get oArray(): Array<ObservableArrayRow>;
                    protected _value: Array<ObservableArrayRow>;
                    get value(): any;
                    set value(val: any);
                    get length(): number;
                    name: string;
                    constructor(val: Array<Object> | Object, name?: string);
                    computedObservables: Array<{
                        name: string;
                        co: ComputedObservable;
                    }>;
                    private _encode;
                    private _encodeItem;
                    addComputed(name: string, co: ComputedObservable): void;
                    getTotalSum(column: string): number;
                    getAsArray(filterCol?: string, filterVal?: string): Array<Object>;
                    getStructureOnly(): Object;
                    private _decode;
                    private _decodeItem;
                    findFirst(Name: string, Value: string): ObservableArrayRow;
                    subscribeForChildChange(func: (row: any, value: any) => void): void;
                }
                class ComputedObservable implements my.data.binding.iObservable {
                    subscribers: Array<bindingSubscriber>;
                    id: string;
                    computeFunction: (data: any) => string | number | boolean | object;
                    onValueChange: (val: string | number | boolean | object) => void;
                    protected _value: string | number | boolean | object;
                    get value(): string | number | boolean | object;
                    items: Array<Observable>;
                    data: any;
                    constructor(computeFunction: (data: any) => string | number | boolean | object);
                    compute(): void;
                    subscribe(subscriber: object, handler: iBindingHandler, defaultData?: any): void;
                    private _subscriberExists;
                    dispatch(sender: object, data: any): void;
                    unsubscribe(handler: iBindingHandler): any;
                    unsubscribe(subscriber: object): any;
                    private _unsubscribeBySubscriber;
                    private _unsubscribeByHandler;
                }
                class ReadOnlyBind {
                    private _property;
                    private _element;
                    get _value(): string | number | boolean;
                    set _value(val: string | number | boolean);
                    private _valueBind;
                    set value(val: any);
                    get value(): any;
                    changeEvent: my.events.iEvent;
                    constructor(element: any, property: string, changeEvent: my.events.iEvent);
                    onBaidingChange(sender: object, data: any): void;
                    raiseBaidingChange(data: any): void;
                }
            }
        }
    }
}
declare namespace my {
    namespace data {
        interface iDataSet {
            primaryTable: string;
            events: my.core.data.Events;
            tables: object;
            data: object;
            server: ServerDataSet;
            local: LocalDataSet;
            getTable(tblName?: string): my.data.DataTable;
            delData(uid: string, table: string, onSuccesshandler: Function): any;
            getData(params?: Array<object>): any;
            sendData(data: any, onSuccesshandler: Function): any;
            sortby: string;
            filtersForRequest: Array<my.data.Filter>;
            filtersForResponce: Array<my.data.Filter>;
            page: number;
            pageSize: number;
            tableNames: Array<string>;
            paramsGetData: Array<{
                name: string;
                value: string;
            }>;
        }
        interface iDataTable {
            value: any;
            tableName: string;
            rows: Array<iDataRow>;
            columns: Array<DataColumn>;
            filters: my.core.data.filterManager;
            newRow(): DataRow;
            findFirst(Name: string, Value: string): my.data.DataRow;
            subscribe(subscriber: object, handler: my.core.data.binding.iBindingHandler, defaultData?: any): any;
            dispatch(sender: object, data: any): any;
        }
        interface iDataRow {
            items: object;
            itemsArray: Array<DataColumn>;
            RowState: "Unchanged" | "Added" | "Deleted" | "Modified";
            tableName: string;
            AcceptChanges(): any;
            delete(): any;
            setAdded(): any;
            setModified(): any;
            subscribe(subscriber: object, handler: my.core.data.binding.iBindingHandler, defaultData?: any): any;
            getAsObject(): object;
            getAsJSONReadyObject(): object;
            addColumn(name: string, value: string | number | boolean): any;
        }
        class iFilter {
            column: string;
            value: string;
        }
    }
    namespace core {
        namespace data {
            abstract class DataSet {
                tableNames: Array<string>;
                primaryTable: string;
                tables: object;
                monitorForitemChanges: boolean;
                events: my.core.data.Events;
                get data(): object;
                set data(val: object);
                constructor(tableNames: string);
                private _parseTable;
                private _onTableModified;
            }
            abstract class DataTable extends my.core.data.binding.Observable {
                tableName: string;
                rows: Array<my.data.iDataRow>;
                filters: filterManager;
                get value(): any;
                set value(val: any);
                get length(): number;
                pageCurrent: number;
                pageSize: number;
                constructor(val: Array<Object> | Object, name?: string);
                abstract parse(arr: Array<Object>): any;
                currentOrderBy: string;
                orderBy(orderBy: string, type?: "ASC" | "DESC", notify?: boolean): void;
                filterBy(filterValue: string): number;
                filterRows(): number;
            }
            class DataColumn {
                Name: string;
                Data: my.data.binding.iObservable;
                Type: "observable" | "computed";
                ComputeFunc: (row: my.data.iDataRow) => any;
            }
            class DataRow {
                subscribers: Array<my.core.data.binding.bindingSubscriber>;
                items: object;
                itemsArray: Array<DataColumn>;
                RowState: "Unchanged" | "Added" | "Deleted" | "Modified";
                __bindVisible: boolean;
                __page: number;
                tableName: string;
                constructor(data: object, table: string);
                protected _parse(data: object): void;
                protected _addColumn(name: string, value: my.data.binding.iObservable, subscribeForChanges?: boolean): DataColumn;
                private _onRowChange;
                AcceptChanges(): void;
                delete(): void;
                setAdded(): void;
                setModified(): void;
                hasValue(value: string): boolean;
                hasValues(arrFilters: my.data.iFilter[], isExactMatch?: boolean): boolean;
                subscribe(subscriber: object, handler: my.core.data.binding.iBindingHandler, defaultData?: any): void;
                private _handlerExists;
                dispatch(sender: object, data: any): void;
            }
            class Events {
                Modified: my.core.events.core;
                Loaded: my.core.events.core;
                constructor();
            }
            class filterManager {
                parentTable: my.core.data.DataTable;
                items: my.data.iFilter[];
                operator: '=' | '!=' | '<' | '>' | '<=' | '>=';
                get SQL(): string;
                constructor(parent: my.core.data.DataTable);
                by(column: string, value: string): void;
                add(filter: my.data.iFilter): void;
                remove(column: string): void;
                indexOf(dataColumn: string): number;
            }
        }
    }
}
declare namespace my {
    namespace controls {
        interface iValidationRule {
            type: 'required' | 'custom';
            message: string;
            validate(val: any): boolean;
            customFunc(val: any): boolean;
        }
    }
    namespace core {
        namespace controls {
            namespace validation {
                class validationGroup {
                    rules: Array<my.controls.iValidationRule>;
                    errorText: string;
                    private _isValid;
                    get isValid(): boolean;
                    set isValid(val: boolean);
                    parent: my.controls.iControl;
                    constructor(parent: my.controls.iControl);
                    validate(value: any): boolean;
                    add(type: 'required' | 'custom', message?: string, customFunc?: (val: any) => boolean): void;
                    remove(val: my.controls.iValidationRule): void;
                    getByType(type: 'required' | 'custom'): my.controls.iValidationRule;
                }
                class vrRequired implements my.controls.iValidationRule {
                    type: "required";
                    message: string;
                    customFunc: any;
                    constructor(message?: string);
                    validate(val: any): boolean;
                }
                class vrCustom implements my.controls.iValidationRule {
                    type: "custom";
                    message: string;
                    customFunc: any;
                    constructor(message?: string);
                    validate(val: any): boolean;
                }
            }
        }
    }
}
declare namespace my {
    namespace controls {
        interface iControl {
            element: HTMLElement;
            eventElement: HTMLElement;
            reset: Function;
            value: any;
            readOnly: boolean;
            disabled: boolean;
            ctlType: string;
            id: string;
            visible: boolean;
            elementAttr: {
                name: string;
                value: string;
            }[];
            style: CSSStyleDeclaration;
            css: my.core.css;
            itemData: Object;
            validation: my.core.controls.validation.validationGroup;
            events: my.core.controls.Events;
        }
        interface iTemplateFunction {
            (sender: any, data: any): iControl;
        }
    }
    namespace core {
        namespace controls {
            class Events {
                target: my.controls.iControl;
                valueChanged: my.core.events.core;
                dataChanged: my.core.events.core;
                valueValidated: my.core.events.core;
                click: my.core.events.htmlCore;
                dblclick: my.core.events.htmlCore;
                focus: my.core.events.htmlCore;
                keypress: my.core.events.htmlCore;
                keydown: my.core.events.htmlCore;
                keyup: my.core.events.htmlCore;
                change: my.core.events.htmlCore;
                mouseover: my.core.events.htmlCore;
                mouseenter: my.core.events.htmlCore;
                mouseleave: my.core.events.htmlCore;
                constructor(Target: my.controls.iControl);
            }
            abstract class core implements my.controls.iControl {
                ctluid: string;
                element: HTMLElement;
                eventElement: HTMLElement;
                abstract reset: Function;
                abstract readOnly: boolean;
                abstract disabled: boolean;
                abstract ctlType: string;
                events: Events;
                private _id;
                get id(): string;
                set id(val: string);
                get visible(): boolean;
                set visible(val: boolean);
                appendControl(control: my.controls.iControl): void;
                private _valueBind;
                _value: string | number | boolean | object;
                set value(val: string | number | boolean | object | my.core.data.binding.Observable | my.core.data.binding.ComputedObservable);
                get value(): string | number | boolean | object | my.core.data.binding.Observable | my.core.data.binding.ComputedObservable;
                onBaidingChange(sender: object, data: any): void;
                raiseValueChange(data: any): void;
                isTwoWayBinding: boolean;
                itemData: Object;
                elementAttr: {
                    name: string;
                    value: string;
                }[];
                style: CSSStyleDeclaration;
                css: my.core.css;
                validation: my.core.controls.validation.validationGroup;
                private _tooltipPlaceholder;
                set tooltip(val: string);
                set tooltipPlacement(val: "top" | "right" | "bottom" | "left");
                constructor(htmlType: string);
                focus(): void;
            }
            abstract class coreData extends core {
                private _dataTable;
                set data(val: my.data.iDataTable);
                get data(): my.data.iDataTable;
                abstract rebind(): any;
                onBaidingChange(sender: object, data: any): void;
                raiseDataBaidingChange(data: any): void;
            }
        }
    }
}
declare namespace my {
    namespace dts {
        interface iCommHandler {
            (sender: any, responce: iDtsResponce): any;
        }
        interface iDtsResponce {
            result: boolean;
            text: string;
            details: string;
            data: any;
            xhr: XMLHttpRequest;
        }
        class connResponce {
            result: boolean;
            text: string;
            details: string;
            data: any;
            xhr: XMLHttpRequest;
            constructor(strJSON: string);
            private _parseJSON;
        }
    }
    namespace core {
        namespace dts {
            class core {
                id: string;
                url: string;
                type: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
                data: Array<Object> | string;
                token: string;
                onError: my.dts.iCommHandler;
                onSuccess: my.dts.iCommHandler;
                headers: Array<{
                    Key: string;
                    Value: string;
                }>;
                Call(): void;
                onError401: my.dts.iCommHandler;
                private _onError401;
                private _onError;
                private _onSuccess;
                serialize(obj: object): string;
            }
        }
    }
}
declare namespace my {
    namespace dts {
        class conn {
            urlGet: string;
            urlPost: string;
            urlCommit: string;
            urlDelete: string;
            set url(val: string);
            token: string;
            private _getDTS;
            private _postDTS;
            constructor(url: string);
            get(onSuccess?: any, onError?: any, params?: Array<object>): void;
            post(data: any, onSuccess?: any, onError?: any): void;
            postDataTable(data: any, onSuccess?: any, onError?: any): void;
            put(data: any, onSuccess?: any, onError?: any): void;
            putDataTable(data: any, onSuccess?: any, onError?: any): void;
            delete(uid: any, table: string, onSuccess?: any, onError?: any): void;
            private _formatData;
            private _URLFriendly;
        }
    }
}
declare namespace my {
    namespace data {
        namespace binding {
            class Observable extends my.core.data.binding.Observable {
                constructor(val: string | number | boolean | object);
            }
            class ReadOnlyBind extends my.core.data.binding.ReadOnlyBind {
                constructor(element: any, property: string, changeEvent?: my.events.iEvent);
            }
            class ComputedObservable extends my.core.data.binding.ComputedObservable {
                constructor(computeFunction: (data: any) => any);
            }
        }
        class Filter implements my.data.iFilter {
            column: string;
            value: string;
            constructor(col?: string, val?: string);
        }
        class DataSet extends my.core.data.DataSet implements iDataSet {
            eventNotificationCode: string;
            sortby: string;
            filtersForRequest: Array<my.data.Filter>;
            filtersForResponce: Array<my.data.Filter>;
            page: number;
            pageSize: number;
            paramsGetData: Array<{
                name: string;
                value: string;
            }>;
            onSuccess: (sender: any, code: "get" | "send" | "del", responce: any) => void;
            onError: (sender: any, code: "get" | "send" | "del", responce: any) => void;
            deleteRequiresTableName: boolean;
            private workMode;
            server: ServerDataSet;
            local: LocalDataSet;
            get url(): string;
            set url(val: string);
            private _isLiveUpdate;
            get isLiveUpdate(): boolean;
            set isLiveUpdate(val: boolean);
            constructor(tables: string);
            private _generateTables;
            getData(params?: Array<object>): void;
            sendData(data: my.data.DataRow, onSuccesshandler: Function): void;
            delData(uid: string, table: string, onSuccesshandler: Function): void;
            onChildElementDataChange(sender: any, event: any, data: {
                "table": DataTable;
                "row": DataRow;
                "value": any;
            }): void;
            getTable(tblName?: string): my.data.DataTable;
        }
        class DataTable extends my.core.data.DataTable implements iDataTable {
            columns: Array<DataColumn>;
            rows: Array<my.data.DataRow>;
            get length(): number;
            constructor(val: Array<Object> | Object, name?: string);
            parse(arr: Array<Object>): void;
            private _parseRow;
            private _parseCoumns;
            private _addColumn;
            private _onRowChange;
            newRow(): DataRow;
            addComputedColumn(name: string, fCompute: (row: my.data.iDataRow) => any): void;
            findFirst(Name: string, Value: string): my.data.DataRow;
            getFilteredArray(filterCol: string, filterVal: string): Array<Object>;
        }
        class DataColumn extends my.core.data.DataColumn {
        }
        class DataRow extends my.core.data.DataRow implements my.data.iDataRow {
            constructor(data: object, table: string);
            getAsObject(): object;
            getAsJSONReadyObject(): object;
            addColumn(name: string, value: string | number | boolean): void;
            addComputedColumn(name: string, fCompute: (row: my.data.iDataRow) => any): void;
        }
    }
}
declare namespace my {
    namespace controls {
        class ctlButton extends my.core.controls.core {
            ctlType: string;
            element: HTMLInputElement;
            readOnly: boolean;
            reset: Function;
            css: my.css.Button;
            set _value(val: string);
            get _value(): string;
            get disabled(): boolean;
            set disabled(val: boolean);
            constructor(text: string, clickHandler: my.events.iEventHandler);
        }
        class ctlText extends my.core.controls.core {
            ctlType: string;
            get placeholderText(): string;
            set placeholderText(val: string);
            elementText: HTMLInputElement;
            elementIconPH: HTMLElement;
            elementErrorPH: HTMLElement;
            element: HTMLElement;
            readOnly: boolean;
            reset: Function;
            get disabled(): boolean;
            set disabled(val: boolean);
            get maxlength(): number;
            set maxlength(val: number);
            private _isPassword;
            get isPassword(): boolean;
            set isPassword(val: boolean);
            get _value(): string;
            set _value(val: string);
            get text(): string;
            set text(val: string);
            private _enableClear;
            get enableClear(): boolean;
            set enableClear(val: boolean);
            private _allowedChars;
            get allowedChars(): string;
            set allowedChars(val: string);
            private _align;
            get align(): "left" | "center" | "right";
            set align(val: "left" | "center" | "right");
            constructor(text: string | my.data.binding.Observable);
            private _onValueValidated;
            onValueChange(sender: any, event: any, data: any): void;
            private _addIcoButton;
            private _restrictInput;
            setIcon(val: ctlIcon, position?: "left" | "right"): void;
        }
        class ctlNumber extends my.controls.ctlText {
            ctlType: string;
            private _min;
            get min(): number;
            set min(val: number);
            private _max;
            get max(): number;
            set max(val: number);
            isMoney: boolean;
            constructor(text: string | my.data.binding.Observable);
            private _customValidation;
            private _onTextKeyUp;
            private _validateMinMax;
            private _validateText;
        }
        class ctlTextArea extends my.core.controls.core {
            ctlType: string;
            element: HTMLTextAreaElement;
            readOnly: boolean;
            reset: Function;
            get disabled(): boolean;
            set disabled(val: boolean);
            get _value(): string;
            set _value(val: string);
            onValueChange(sender: any, event: any, data: any): void;
            constructor(text: string | my.data.binding.Observable);
        }
        class ctlSpan extends my.core.controls.core {
            ctlType: string;
            element: HTMLSpanElement;
            readOnly: boolean;
            reset: Function;
            disabled: boolean;
            get _value(): string;
            set _value(val: string);
            dispalyFormat: "Default" | "Money";
            constructor(text: string | my.data.binding.Observable | my.data.binding.ComputedObservable);
            private _displayFormat;
        }
        class ctlHeading extends my.core.controls.core {
            ctlType: string;
            element: HTMLHeadingElement;
            readOnly: boolean;
            reset: Function;
            disabled: boolean;
            get _value(): string;
            set _value(val: string);
            constructor(type: "h1" | "h2" | "h3" | "h4", text: string | my.data.binding.Observable);
        }
        class ctlLabel extends my.core.controls.core {
            ctlType: string;
            element: HTMLLabelElement;
            readOnly: boolean;
            reset: Function;
            disabled: boolean;
            get _value(): string;
            set _value(val: string);
            constructor(text: string | my.data.binding.Observable, labelFor: string);
        }
        class ctlIcon extends my.core.controls.core {
            ctlType: string;
            element: HTMLLabelElement;
            readOnly: boolean;
            reset: Function;
            disabled: boolean;
            css: my.css.Icon;
            set icon(val: string);
            constructor(iconName: string);
        }
        class ctlCheckBox extends my.core.controls.core {
            ctlType: string;
            element: HTMLElement;
            elCheckBox: HTMLInputElement;
            elLabel: HTMLLabelElement;
            private _readOnly;
            get readOnly(): boolean;
            set readOnly(val: boolean);
            reset: Function;
            get disabled(): boolean;
            set disabled(val: boolean);
            get _value(): number;
            set _value(val: number);
            onValueChange(sender: any, event: any, data: any): void;
            constructor(text: string, checked?: boolean | my.data.binding.Observable);
            private _showReadOnlyValue;
        }
        class ctlRadio extends my.core.controls.core {
            ctlType: string;
            element: HTMLInputElement;
            readOnly: boolean;
            reset: Function;
            get disabled(): boolean;
            set disabled(val: boolean);
            get _value(): boolean;
            set _value(val: boolean);
            onValueChange(sender: any, event: any, data: any): void;
            private _text;
            set text(val: string | my.data.binding.Observable);
            get text(): string | my.data.binding.Observable;
            constructor(text: string | my.data.binding.Observable, group: string, value: string, selected?: boolean);
        }
        class ctlLink extends my.core.controls.core {
            ctlType: string;
            element: HTMLAnchorElement;
            readOnly: boolean;
            reset: Function;
            disabled: boolean;
            get _value(): string;
            set _value(val: string);
            private _text;
            set text(val: string | my.data.binding.Observable);
            get text(): string | my.data.binding.Observable;
            constructor(text: string, url: string, target?: string);
        }
    }
}
declare namespace my {
    namespace controls {
        export class ctlCard extends my.core.controls.core {
            ctlType: string;
            element: HTMLDivElement;
            readOnly: boolean;
            reset: Function;
            disabled: boolean;
            value: string;
            Header: HTMLDivElement;
            private _title;
            get title(): string;
            set title(val: string);
            plhClose: HTMLDivElement;
            plhNotify: HTMLDivElement;
            Body: HTMLDivElement;
            private _Footer;
            get Footer(): HTMLDivElement;
            private _eventNotificationCode;
            get eventNotificationCode(): string;
            set eventNotificationCode(val: string);
            buttons: CardButtons;
            constructor();
            private _onNotification;
            private _createHeader;
            private _createFooter;
            addNotificationSuccess(text?: string): void;
            addNotificationError(text?: string): void;
            private _addNotifyIcon;
            private _addNotifyBar;
            private _hideIcon;
        }
        class CardButtons {
            card: ctlCard;
            constructor(val: ctlCard);
            addCloseButton(clickHandler: my.events.iEventHandler): void;
            addFooterBtn(label: string, clickHandler: my.events.iEventHandler, cssColorStyle?: my.css.eColorStyles): void;
            addFooterBtnCustom(btn: my.controls.ctlButton): void;
        }
        export {};
    }
}
declare namespace my {
    namespace controls {
        class ctlFormElement extends my.core.controls.core {
            ctlType: string;
            element: HTMLDivElement;
            readOnly: boolean;
            reset: Function;
            disabled: boolean;
            label: string;
            control: my.controls.iControl;
            set data(val: my.data.binding.Observable);
            constructor(label: string, control: my.controls.iControl);
            rebind(): void;
            private _create;
        }
        class ctlTextEX extends my.controls.ctlText {
            constructor(text: string | my.data.binding.Observable, label: string);
            private _create;
        }
        class ctlDivList extends my.core.controls.core {
            ctlType: string;
            element: HTMLDivElement;
            readOnly: boolean;
            reset: Function;
            disabled: boolean;
            value: string;
            constructor();
            addElement(el: HTMLElement, addPosition?: "top" | "bottom"): void;
        }
        class ctlDivListItem extends my.core.controls.core {
            ctlType: string;
            element: HTMLDivElement;
            readOnly: boolean;
            reset: Function;
            disabled: boolean;
            value: string;
            constructor();
        }
        class ctlToast extends ctlDivList {
            ctlType: string;
            interval: number;
            position: "top" | "bottom";
            constructor();
            add(text: string, color?: "info" | "error" | "success"): void;
        }
        class ctlToastItem extends ctlDivListItem {
            constructor(text: string);
        }
        class ctlIconButton extends my.core.controls.core {
            ctlType: string;
            element: HTMLButtonElement;
            readOnly: boolean;
            reset: Function;
            css: my.css.Button;
            icon: my.controls.ctlIcon;
            get disabled(): boolean;
            set disabled(val: boolean);
            constructor(icon: string, clickHandler: my.events.iEventHandler);
            private _createIcon;
        }
        class ctlFixedActionButton extends my.core.controls.core {
            ctlType: string;
            element: HTMLDivElement;
            readOnly: boolean;
            reset: Function;
            disabled: boolean;
            triggerIcon: string;
            triggerAction: "hover" | "click";
            btnTrigger: my.controls.ctlIconButton;
            btnListContainer: my.controls.ctlDivList;
            btnList: Array<iControl>;
            constructor(icon: string, onClickOverride?: (s: any, e: any, d: any) => any);
            addButton(id: string, ico: my.controls.ctlIconButton): void;
            hideButton(id: string): void;
            showButton(id: string): void;
            private _createTrigger;
            private _onTriggerClick;
        }
    }
}
declare namespace my {
    namespace menu {
        class sidenav extends my.core.controls.coreData {
            ctlType: string;
            element: HTMLInputElement;
            readOnly: boolean;
            reset: Function;
            get disabled(): boolean;
            set disabled(val: boolean);
            container: HTMLElement;
            containerToPush: HTMLElement;
            private _nav;
            trigger: HTMLElement;
            private _items;
            type: 'push' | 'overlay';
            width: string;
            dataColumnURL: string;
            dataColumnLabel: string;
            dataColumnSubmenu: string;
            constructor(trigger: HTMLElement);
            rebind(): void;
            private _create;
            private _createSubMenu;
            private _createSubmenuBack;
            private _createItem;
            private _showSubMenu;
            private _toggleMenu;
            private _update;
            private _createSearchItem;
            private _FilterItems;
        }
        class topnav extends my.core.controls.core {
            ctlType: string;
            element: HTMLInputElement;
            readOnly: boolean;
            reset: Function;
            get disabled(): boolean;
            set disabled(val: boolean);
            primaryTable: string;
            subMenuTable: string;
            container: HTMLElement;
            private _nav;
            navSideMenuTrigger: HTMLElement;
            navTopLeft: HTMLElement;
            navTopRight: HTMLElement;
            navTopNotifications: HTMLElement;
            private _lMenu;
            private _rMenu;
            items: Array<Object>;
            dataColumnURL: string;
            dataColumnLabel: string;
            dataColumnSubmenu: string;
            private _dataSet;
            get dataSet(): my.data.iDataSet;
            set dataSet(val: my.data.iDataSet);
            constructor();
            private _create;
            showTrigger(val: boolean): void;
            private _rebind;
            private _createItem;
            private _createSubMenu;
            private _toggleMenu;
            private _cloaseAllOpenMenus;
        }
    }
}
declare namespace my {
    namespace core {
        namespace modal {
            class ctlMask {
                ctlType: string;
                element: HTMLDivElement;
                id: string;
                onClick: Function;
                constructor(id: string);
                show(): void;
                hide(): void;
            }
            abstract class core extends my.controls.ctlCard {
                mask: ctlMask;
                events: Events;
                constructor();
                show(): void;
                hide(): void;
            }
            class Events extends my.core.controls.Events {
                hide: my.core.events.core;
                show: my.core.events.core;
                result: my.core.events.core;
                constructor(eventTarget: my.controls.iControl);
            }
            class modalHeader {
                element: HTMLDivElement;
                plhClose: HTMLElement;
                plhTitle: HTMLElement;
                set text(val: string);
                set showBtnClose(val: boolean);
                parent: my.core.modal.core;
                constructor(parent: my.core.modal.core);
                private _initPlaceholders;
            }
            class modalBody {
                element: HTMLDivElement;
                set text(val: string);
                constructor();
            }
            class modalFooter {
                element: HTMLDivElement;
                set text(val: string);
                addClass(val: string): void;
                constructor();
            }
        }
    }
}
declare namespace my {
    namespace controls {
        namespace modal {
            class popup extends my.core.modal.core {
                ctlType: string;
                constructor();
            }
            class popAlert extends my.controls.modal.popup {
                ctlType: string;
                constructor();
            }
            class popConfirm extends my.controls.modal.popup {
                ctlType: string;
                resulthandler: any;
                constructor(text: string, resulthandler: (val: boolean) => void);
                private _init;
            }
        }
    }
}
declare namespace my {
    namespace app {
        interface iApp {
            screens: iScreen[];
            containers: my.core.app.cContainers;
            navTo(screen: string, urlParams: string, navData: object): any;
            data: any;
            url: string;
        }
    }
    namespace core {
        namespace app {
            abstract class core implements my.app.iApp {
                screens: my.app.iScreen[];
                containers: cContainers;
                name: string;
                ver: string;
                data: any;
                currentScreenName: string;
                currentScreen: my.app.iScreen;
                previousScreen: my.app.iScreen;
                sessionStart: Date;
                seesionDuration: 30;
                get url(): string;
                constructor(maincontainer: string);
                private _onNavigationEvent;
                getCurrentNavigationAddress(): {
                    screenname: string;
                    params: string;
                };
                navStart(): void;
                navTo(screen: string, urlParams?: string, navData?: object): void;
                navToSilent(screen: string, urlParams?: string, navData?: object): void;
                private _navTo;
                navToPreviousScreen(urlOverride?: string): void;
                navToHome(): void;
                showSplash(param: boolean): void;
                addScreen(val: my.app.iScreen): void;
            }
            class cContainers {
                private _main;
                private _heder;
                private _body;
                private _footer;
                constructor(cont: any);
                get main(): HTMLElement;
                get heder(): HTMLElement;
                get body(): HTMLElement;
                get futer(): HTMLElement;
                private _createElement;
                private _findElement;
            }
        }
    }
}
declare namespace my {
    namespace app {
        interface iScreen {
            id: string;
            navData: object;
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
    }
    namespace core {
        namespace app {
            abstract class Screen implements my.app.iScreen {
                element: HTMLElement;
                placeholder: HTMLElement;
                title: string;
                private _isLoaded;
                css: my.core.css;
                screenItems: Array<{
                    name: string;
                    ctrl: my.controls.iControl;
                }>;
                id: string;
                navData: object;
                data: object;
                constructor(id: string);
                show(navData?: object): void;
                hide(): void;
                screenItemAdd(val: my.controls.iControl, controlName: string): void;
                screenItemGet(controlName: string): any;
                abstract onLoad(): void;
                abstract onBeforeShow(): void;
                abstract onShow(): void;
                abstract onHide(): void;
                getUrlParam(paramName?: string): string;
            }
        }
    }
}
declare var moduleName: string;
declare var moduleProperties: Array<object>;
declare namespace my {
    namespace app {
        abstract class standard extends my.core.app.core {
            properties: Array<Object>;
            private _data;
            get data(): any;
            set data(val: any);
            events: EventsApp;
            toast: my.controls.ctlToast;
            set enableToast(val: boolean);
            constructor(maincontainer: string);
            getPropertyByName(name: string, defaultResponce?: string): string;
        }
        class EventsApp {
            init: my.core.events.core;
            global: my.core.events.coreGlobal;
            constructor();
        }
        abstract class screenbase extends my.core.app.Screen {
            parentApp: my.app.iApp;
            header: my.app.screenHeader;
            private _title;
            get title(): string;
            set title(val: string);
            constructor(id: string, app: my.app.iApp);
            private _init;
            onBeforeShow(): void;
            onHide(): void;
        }
        class screenHeader {
            element: HTMLDivElement;
            parent: my.core.app.Screen;
            titlePlaceholder: HTMLDivElement;
            breadcrumbPlaceholder: HTMLDivElement;
            set title(val: string);
            constructor(parent: my.core.app.Screen);
        }
    }
}
declare namespace my {
    namespace app {
        namespace templates {
            class tMapping extends my.app.screenbase {
                leftTbaleName: string;
                leftTbaleTitle: string;
                leftList: my.controls.ctlList;
                leftDS: my.data.DataSet;
                rightTbaleName: string;
                rightTbaleTitle: string;
                rightTable: my.table.Standard;
                rightDS: my.data.DataSet;
                rightTableCfg: object;
                parentApp: my.app.iApp;
                leftPlaceHolder: HTMLElement;
                rightPlaceHolder: HTMLElement;
                constructor(id: string, app: my.app.iApp);
                onLoad(): void;
                onShow(): void;
                private _generateBase;
                private _generateLeftList;
                onRowClick(sender: object, event: my.events.iEvent | CustomEvent, data: any): void;
                private _tableUpdated;
                private _generateRightTable;
            }
        }
    }
}
declare namespace my {
    namespace app {
        namespace templates {
            class tmplListPage extends my.app.screenbase {
                parentApp: my.app.iApp;
                tblData: my.data.DataSet;
                tbl: my.table.Standard;
                tblConfig: {};
                onTblEdit: (data: any) => any;
                editScreenName: string;
                onTblNew: (data: any) => any;
                newScreenName: string;
                constructor(id: string, app: my.app.iApp);
                onLoad(): void;
                onShow(): void;
                private _generateContent;
                onEditClick(sender: object, event: my.events.iEvent | CustomEvent, data: my.data.DataRow): void;
                onNewClick(sender: object, event: my.events.iEvent | CustomEvent, data: any): void;
            }
        }
    }
}
declare namespace my {
    namespace calendar {
        class tools {
            static getGridPosition(val: Date): number;
            static getLastDayOfMonth(val: Date): Date;
            static getFirstDayOfMonth(val: Date): Date;
            static getPrevMonth(val: Date): Date;
            static getNextMonth(val: Date): Date;
            static getMonthAsText(val: Date): string;
            static compareDates(d1: Date, d2: Date, type?: "all" | "date" | "time"): boolean;
            static getDayOfWeek(val: Date): number;
            static getFormatedValue(val: Date): string;
        }
    }
}
declare namespace my {
    namespace calendar {
        interface iDay {
            element: HTMLDivElement;
            value: Date;
            dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
            gridPosition: number;
            isInMonth: boolean;
            isToday: boolean;
            isSelected: boolean;
            events: my.core.controls.Events;
            Title: HTMLSpanElement;
        }
        interface iCalendar {
            element: HTMLDivElement;
            events: my.core.calendar.Events;
            title: my.core.calendar.Title;
            body: my.core.calendar.Body;
            displayDate: Date;
            settings: my.core.calendar.Settings;
            days: Array<my.calendar.iDay>;
            selectedDate: Date;
            selectedDay: my.calendar.iDay;
        }
    }
    namespace core {
        namespace calendar {
            abstract class core extends my.core.controls.core implements my.calendar.iCalendar {
                ctlType: string;
                element: HTMLDivElement;
                readOnly: boolean;
                reset: Function;
                value: any;
                disabled: boolean;
                events: my.core.calendar.Events;
                settings: my.core.calendar.Settings;
                title: my.core.calendar.Title;
                body: my.core.calendar.Body;
                days: Array<my.calendar.iDay>;
                private _selectedDay;
                get selectedDay(): my.calendar.iDay;
                set selectedDay(val: my.calendar.iDay);
                private _selectedDate;
                get selectedDate(): Date;
                private _displayDate;
                get displayDate(): Date;
                set displayDate(val: Date);
                constructor();
                initEvents(): void;
                abstract rebind(): any;
            }
            abstract class Day extends my.core.controls.core implements my.calendar.iDay {
                ctlType: string;
                readOnly: boolean;
                reset: Function;
                element: HTMLDivElement;
                css: my.css.CalendarDay;
                get disabled(): boolean;
                set disabled(val: boolean);
                Title: HTMLSpanElement;
                gridPosition: number;
                data: my.data.DataTable;
                value: Date;
                dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
                private _isInMonth;
                get isInMonth(): boolean;
                set isInMonth(val: boolean);
                private _isToday;
                get isToday(): boolean;
                set isToday(val: boolean);
                private _isSelected;
                get isSelected(): boolean;
                set isSelected(val: boolean);
                constructor(value: Date);
                private _createTitle;
            }
            class Title {
                ctlType: string;
                element: HTMLElement;
                calendar: my.calendar.iCalendar;
                set text(val: string);
                private _currentDateElement;
                constructor(calendar: my.calendar.iCalendar);
                private _createBtnToday;
                updateCurrentDateText(): void;
                private _createMonthSelector;
                private _init;
            }
            class Body {
                ctlType: string;
                element: HTMLElement;
                calendar: my.calendar.iCalendar;
                dayCaptions: {
                    "Single": string[];
                    "Short": string[];
                    "Full": string[];
                };
                constructor(calendar: my.calendar.iCalendar);
                createDatesGrid(val: Date): void;
                private _calculateCalendarGrid;
                private _createDaysOfWeekLabels;
                private _createRow;
                private _createColTitle;
            }
            class Events extends my.core.controls.Events {
                dayClick: my.core.events.core;
                dayDblClick: my.core.events.core;
                dayMouseEnter: my.core.events.core;
                daySelected: my.core.events.core;
                constructor(eventTarget: my.controls.iControl);
            }
            class Settings {
                dayCaptions: "Single" | "Short" | "Full";
                showDaysFromOnlyCurrentMonth: boolean;
            }
        }
    }
}
declare namespace my {
    namespace core {
        namespace calendar {
            abstract class coreCalendarDropDown extends my.core.controls.core {
                ctlType: string;
                element: HTMLInputElement;
                readOnly: boolean;
                reset: Function;
                defaultText: string;
                get disabled(): boolean;
                set disabled(val: boolean);
                private _dataColumn;
                get dataColumn(): string;
                set dataColumn(val: string);
                ctlTrigger: my.controls.iControl;
                ctlCalendar: my.calendar.daySelection;
                items: my.controls.ctlListItem[];
                selectedItem: my.controls.ctlListItem;
                private __value;
                get _value(): string;
                set _value(val: string);
                constructor(value: string);
                protected onDayClick(sender: any, e: any, day: my.calendar.iDay): void;
                getFormatedValue(val: Date): string;
                private closeEventHandle;
                showCalendar(): void;
                private _closeCalendar;
                hideCalendar(): void;
                private alignDropdownCalendarPosition;
            }
        }
    }
    namespace calendar {
        class calendarDropDown extends my.core.calendar.coreCalendarDropDown {
            ctlType: string;
            ctlTrigger: my.controls.ctlButton;
            isOptional: boolean;
            constructor(value?: string, defaultText?: any);
        }
    }
}
declare namespace my {
    namespace calendar {
        interface iCalendarEvent {
            title: string;
            details: string;
            ownerUID: string;
            startDate: Date;
            endDate: Date;
            isAllDay: boolean;
        }
        class daySelection extends my.core.calendar.core {
            constructor();
            private _onDayClick;
            rebind(): void;
        }
        class monthView extends my.core.calendar.core {
            private _editForm;
            get editForm(): my.forms.Standard;
            set editForm(val: my.forms.Standard);
            editModal: my.controls.modal.popup;
            editModalTitle: string;
            calEvents: Array<my.calendar.iCalendarEvent>;
            private _dataSet;
            get dataSet(): my.data.iDataSet;
            set dataSet(val: my.data.iDataSet);
            constructor();
            rebind(): void;
            private _onDayClick;
            private _addCalItem;
            addCalEvent(val: my.calendar.iCalendarEvent): void;
            paintEvent(val: my.calendar.iCalendarEvent): void;
            private _dateIsInGrid;
        }
        class Day extends my.core.calendar.Day {
            calEvents: Array<my.calendar.iCalendarEvent>;
            constructor(val: Date);
            addCalEvent(val: my.calendar.iCalendarEvent): void;
        }
    }
}
declare namespace my {
    namespace config {
        enum dataType {
            string = "string",
            number = "number",
            decimal = "decimal",
            boolean = "boolean",
            datetime = "datetime",
            date = "date",
            list = "list",
            custom = "custom",
            sum = "sum"
        }
        enum type {
            text = "text",
            textarea = "textarea",
            number = "number",
            checkbox = "checkbox",
            datetime = "datetime",
            date = "date",
            autocomplete = "autocomplete",
            dropdown = "dropdown",
            label = "label"
        }
        class iControl {
            title: string;
            size: string;
            options: Array<Object>;
        }
        class iColumGroup {
            name: string;
            title: string;
            items: Array<my.config.iColumn>;
            options: Array<object>;
            itemSize: string;
        }
        interface iColumn {
            isHidden: boolean;
            label: string;
            size: string;
            dataType: my.config.dataType;
            type: my.config.type;
            align: "left" | "center" | "right";
            dataTable: string;
            dataTableKeyColumn: string;
            dataTableLabelColumn: string;
            dataColumn: string;
            linkedDataColumn: string;
            linkedFilterColumn: string;
            isEditable: boolean;
            visibleInInsertMode: boolean;
            visibleInEditMode: boolean;
            defaultValue: string;
            isMandatory: boolean;
            ctlOptions: Array<object>;
            VisibleOnSize: "xs" | "sm" | "md" | "lg";
        }
    }
    namespace core {
        namespace config {
            abstract class cManager {
                columnsCfg: my.config.iColumn[];
                JSON: object;
                ModuleProperties_HiddenColumns: Array<string>;
                constructor();
                abstract parseData(val: any): any;
                parseControl(val: object, ctl: my.config.iControl): void;
                abstract parseCotrolCustom(val: object, ctl: my.config.iControl): any;
                parseGroup(val: object, colG: my.config.iColumGroup): void;
                abstract parseGroupCustom(val: object, colG: my.config.iColumGroup): any;
                parseColumn(val: object, col: my.config.iColumn): void;
                abstract parseColumnCustom(val: object, col: my.config.iColumn): any;
                applyDefaultSizes(arr: my.config.iColumn[]): void;
                abstract defaultSizeFunction(col: my.config.iColumn, totalCols: number): any;
                private _getTotalVisibleColumns;
                private _getModuleProperties_hiddenColumns;
                private _isHiddenByModule;
            }
            class cControl {
                title: string;
                size: string;
                options: Array<Object>;
            }
            class cColumGroup {
                name: string;
                title: string;
                items: Array<my.config.iColumn>;
                options: Array<object>;
                itemSize: string;
            }
            abstract class cColumn implements my.config.iColumn {
                isHidden: boolean;
                label: string;
                size: string;
                private _dataType;
                get dataType(): my.config.dataType;
                set dataType(val: my.config.dataType);
                private _type;
                get type(): my.config.type;
                set type(val: my.config.type);
                align: "left" | "center" | "right";
                dataTable: string;
                dataTableKeyColumn: string;
                dataTableLabelColumn: string;
                dataColumn: string;
                linkedDataColumn: string;
                linkedFilterColumn: string;
                isEditable: boolean;
                visibleInInsertMode: boolean;
                visibleInEditMode: boolean;
                defaultValue: string;
                isMandatory: boolean;
                ctlOptions: Array<object>;
                VisibleOnSize: "xs" | "sm" | "md" | "lg";
            }
        }
    }
}
declare namespace my {
    namespace data {
        class LocalDataSet {
            private localDb;
            private localSyncManager;
            private ds;
            private data;
            private stack;
            private _cacheStorage;
            private _cacheTableName;
            private _expiredInMinutes;
            private _backgroundSyncDateStart;
            private _responseBackgroundSync;
            private eventNotificationCode;
            get CacheStorage(): "Exist" | "NotInit" | "NotExist" | "Expired";
            constructor(val: my.data.DataSet);
            private initSyncManager;
            saveData(lstTableNames: string[], data: object, loadAllData: boolean): void;
            syncData(OnResponse: Function): number;
            sendData(data: my.data.DataRow, onSuccessHandler: Function): void;
            getData(params?: Array<object>, onCustomSuccess?: (sender: any, responce: my.dts.connResponce) => any): void;
            delData(uid: string, table: string, onSuccesshandler: Function): void;
            private saveDataInCache;
            private onErrorHandler;
            private loadData;
            private loadDbCacheData;
            private PrepeareData;
            private FilteringData;
            private SortingData;
            private PagingData;
            private generateServerPakage;
            private finalizeSync;
            private startBackgroundSyncThread;
            private syncWaitingData;
            private readSyncData;
            private generateCacheTableName;
        }
    }
}
declare namespace my {
    namespace data {
        class ServerDataSet {
            ds: my.data.iDataSet;
            dts: my.dts.conn;
            eventNotificationCode: string;
            private _url;
            get url(): string;
            set url(val: string);
            constructor(val: my.data.iDataSet);
            getData(params?: Array<object>, onCustomSuccess?: (sender: any, responce: my.dts.connResponce) => any): void;
            private _onSuccessGet;
            private _onErrorGet;
            private _parseServerDataResponce;
            private _getDefaultParams;
            private _parseSendData;
            sendData(dRow: my.data.DataRow, onSuccesshandler: Function, onHTTPError?: Function): void;
            private _sendDataNew;
            private _sendDataUpdate;
            private _onSuccessSend;
            private _onErrorSend;
            private _sendOffline;
            delData(uid: string, table: string, onSuccesshandler: Function): void;
            private _onSuccessDelete;
            private _onErrorDelete;
        }
    }
}
declare namespace my {
    namespace data {
        class TableSchemaInfo {
            tableName: string;
            tableKey: string;
            AutoIncrementKey: boolean;
        }
        class LocalDb {
            private indexedDB;
            private db;
            private request;
            private _onSuccess;
            private _databaseName;
            private _processingChangeDBVersion;
            private static instance;
            static getInstance(DatabaseName: string, onSuccess?: any): LocalDb;
            private constructor();
            createTableIfNotExist(createTables: TableSchemaInfo[], onSuccess?: any): void;
            existTable(tableName: string): boolean;
            saveData(tableName: string, data: any, onSuccess?: any, onError?: any): void;
            getData(tableName: string, onSuccess?: any): void;
            getDataByKey(tableName: string, key: any, onSuccess?: any): void;
            removeData(tableName: string, key: any): void;
            clearData(tableName: string): void;
            private OnSuccessInitDb;
            private OnErrorInitDb;
        }
    }
}
declare namespace my {
    namespace core {
        namespace controls {
        }
    }
    namespace controls {
    }
}
declare namespace my {
    namespace core {
        namespace controls {
            class EventsDataView extends my.core.controls.Events {
                itemClick: my.core.events.core;
                constructor(eventTarget: my.controls.iControl);
            }
            abstract class DataView extends my.core.controls.coreData {
                ctlType: string;
                element: HTMLDivElement;
                readOnly: boolean;
                reset: Function;
                disabled: boolean;
                set dataRow(val: my.data.DataRow);
                dsDataTable: string;
                private _dsRowUID;
                get dsRowUID(): string;
                set dsRowUID(val: string);
                set dsData(val: my.data.DataSet);
                events: EventsDataView;
                Template: string;
                constructor(sTemplate?: string);
                rebind(): void;
                renderTemplate(dataRow: my.data.DataRow): void;
            }
        }
    }
    namespace controls {
        class ctlDataView extends my.core.controls.DataView {
            ctlType: string;
            constructor(sTemplate?: string);
        }
    }
}
declare namespace my {
    namespace core {
        namespace controls {
            class EventsList extends my.core.controls.Events {
                itemClick: my.core.events.core;
                constructor(eventTarget: my.controls.iControl);
            }
            abstract class List extends my.core.controls.coreData {
                ctlType: string;
                element: HTMLUListElement;
                readOnly: boolean;
                reset: Function;
                disabled: boolean;
                get _value(): string;
                keyColumn: string;
                labelColumn: string;
                private _selectedItem;
                get selectedItem(): ListItem;
                set selectedItem(val: ListItem);
                items: ListItem[];
                events: EventsList;
                dsDataTable: string;
                private _dsData;
                get dsData(): my.data.DataSet;
                set dsData(val: my.data.DataSet);
                constructor(keyColumn: string, labelColumn: string, data?: my.data.DataTable);
            }
            abstract class ListItem extends my.core.controls.core {
                ctlType: string;
                element: HTMLUListElement;
                readOnly: boolean;
                reset: Function;
                disabled: boolean;
                uid: string;
                get _value(): string;
                set _value(val: string);
                onValueChange(sender: any, event: any, data: any): void;
                set text(val: string);
                get text(): string;
                set itemTemplate(itmTempleate: my.controls.iControl);
                constructor(uid: string, text: string);
            }
        }
    }
    namespace controls {
        class ctlList extends my.core.controls.List {
            ctlType: string;
            itemPostProcesing: (li: my.controls.ctlListItem) => any;
            itemTemplate: iTemplateFunction;
            title: string;
            constructor(keyColumn: string, labelColumn: string, data?: my.data.DataTable);
            private _createItems;
            private _addItem;
            filterBy(column: string, value: string): void;
            resetListItemDisplay(): void;
            private onItemClick;
            rebind(): void;
        }
        class ctlListItem extends my.core.controls.ListItem {
            ctlType: string;
            set itemTemplate(itmTempleate: my.controls.iControl);
            constructor(uid: string, text: string);
        }
    }
}
declare namespace my {
    namespace core {
        namespace controls {
            abstract class DropDown extends my.core.controls.coreData {
                ctlType: string;
                element: HTMLInputElement;
                readOnly: boolean;
                reset: Function;
                defaultText: string;
                dsDataTable: string;
                private _dsData;
                get dsData(): my.data.DataSet;
                set dsData(val: my.data.DataSet);
                private _popupMode;
                addNone: boolean;
                label: string;
                elementErrorPH: HTMLElement;
                private divPopucCtlList;
                private divTitlePopup;
                private elPopupLabel;
                private elPopucCloseButton;
                get disabled(): boolean;
                set disabled(val: boolean);
                private _keyColumn;
                get keyColumn(): string;
                set keyColumn(val: string);
                private _labelColumn;
                get labelColumn(): string;
                set labelColumn(val: string);
                parentFilterColumn: string;
                private _parentDropdown;
                get parentDropdown(): DropDown;
                set parentDropdown(val: DropDown);
                ctlTrigger: my.controls.iControl;
                ctlList: my.controls.ctlList;
                items: my.controls.ctlListItem[];
                selectedItem: my.controls.ctlListItem;
                get valueText(): string;
                autocompleteThreshold: number;
                constructor(value: string);
                private onCloseButtonClick;
                private _onValueValidated;
                private changeWindowSize;
                abstract onAfterRebind(): any;
                rebind(): void;
                protected onlistItemClick(sender: any, e: any, row: my.data.iDataRow): void;
                private closeEventHandle;
                showList(): void;
                hideList(e: any): void;
                private alignDropdownListPosition;
                private _reset;
            }
        }
    }
    namespace controls {
        class ctlDropDown extends my.core.controls.DropDown {
            ctlType: string;
            ctlTrigger: ctlButton;
            isOptional: boolean;
            constructor(value: string, defaultText?: any);
            onAfterRebind(): void;
        }
        class ctlAutocomplete extends my.core.controls.DropDown {
            ctlType: string;
            ctlTrigger: ctlText;
            get maxlength(): number;
            set maxlength(val: number);
            btnClear: ctlIcon;
            constructor(value: string);
            onAfterRebind(): void;
            protected onTriggerKeyUp(sender: my.controls.iControl, e: my.events.iEvent, data: any): void;
            protected onTriggerFocus(sender: my.controls.iControl, e: my.events.iEvent, data: any): void;
            protected onClear(sender: my.controls.iControl, e: my.events.iEvent, data: any): void;
        }
    }
}
declare namespace my {
    namespace controls {
        class ctlTabs extends my.core.controls.List {
            ctlType: string;
            private _monitorURL;
            get monitorURL(): boolean;
            set monitorURL(val: boolean);
            constructor(keyColumn: string, labelColumn: string, data: my.data.DataTable);
            rebind(): void;
            private _onItemClick;
            clearAll(): void;
            addItem(text: string, link: string, type: "link" | "text" | "icon" | "linkicon", selected?: boolean, data?: any): void;
            locationHashChanged(): void;
        }
        class ctlTabsItem extends my.core.controls.ListItem {
            ctlType: string;
            isSelected: boolean;
            link: string;
            type: "link" | "text" | "icon" | "linkicon";
            set itemTemplate(itmTempleate: my.controls.iControl);
            onClick: (itm: ctlTabsItem) => void;
            constructor(text: string, link: string, type: "link" | "text" | "icon" | "linkicon");
            private _addIcon;
            private _addLink;
            private onLinkClick;
        }
    }
}
declare namespace my {
    namespace core {
        namespace form {
            abstract class core extends my.core.controls.core {
                ctlType: string;
                element: HTMLDivElement;
                readOnly: boolean;
                reset: Function;
                disabled: boolean;
                Groups: Array<frmGroup>;
                private _mode;
                get mode(): "insert" | "edit";
                set mode(val: "insert" | "edit");
                private _dataSet;
                get dataSet(): my.data.iDataSet;
                set dataSet(val: my.data.iDataSet);
                private _currentDataRowUID;
                private _currentDataRow;
                get dataRow(): my.data.iDataRow;
                dataRowUID: string;
                private _DataTableName;
                get DataTableName(): string;
                set DataTableName(val: string);
                events: my.core.form.EventsForm;
                options: frmOptions;
                constructor();
                validate(): boolean;
                private _resetForm;
                private _getGroupByName;
                getFitemByColumn(val: string): frmItem;
                private _rebind;
                abstract rebind(): any;
                private _updateDataRow;
                private _getDataRow;
                getEmptyFormData(): my.data.DataRow;
                private _getBlankForm;
            }
            abstract class frmGroup extends my.core.controls.core {
                ctlType: string;
                element: HTMLLabelElement;
                readOnly: boolean;
                reset: Function;
                update(): void;
                disabled: boolean;
                name: string;
                value: string;
                items: Array<frmItem>;
                constructor(name: string);
                addItem(item: frmItem): void;
                isValid(): boolean;
                getFitemByColumn(val: string): frmItem;
            }
            abstract class frmItem extends my.core.controls.core {
                ctlType: string;
                element: HTMLDivElement;
                ctlPlaceHolder: HTMLDivElement;
                ctlValidationErrorPlaceHolder: HTMLDivElement;
                private _r;
                get readOnly(): boolean;
                set readOnly(val: boolean);
                reset: Function;
                disabled: boolean;
                parentForm: my.forms.iForm;
                private _itemControl;
                get itemControl(): my.controls.iControl;
                set itemControl(val: my.controls.iControl);
                dataType: my.config.dataType;
                type: my.config.type;
                dataTable: string;
                dataColumn: string;
                defaultValue: string;
                visibleInInsertMode: boolean;
                visibleInEditMode: boolean;
                private _isHidden;
                get isHidden(): boolean;
                set isHidden(val: boolean);
                private _isMandatory;
                get isMandatory(): boolean;
                set isMandatory(val: boolean);
                private _label;
                get label(): string;
                set label(val: string);
                private _labelLocation;
                get labelLocation(): "left" | "top";
                set labelLocation(val: "left" | "top");
                constructor(itemControl: my.controls.iControl, parentForm: my.forms.iForm);
                private _applyOptions;
                bind(ds: my.data.iDataSet): void;
                private _bindFormControls;
                get isValid(): boolean;
                updateValidationStatus(val: Boolean, errText: string): void;
                private _addErrorIcon;
            }
            class EventsForm extends my.core.controls.Events {
                itemClick: my.core.events.core;
                submitClick: my.core.events.core;
                clearClick: my.core.events.core;
                constructor(eventTarget: my.controls.iControl);
            }
            class frmOptions {
                Attributes: {
                    name: string;
                    value: string;
                }[];
                labelLocation: "left" | "top";
                minColWidth: number;
                OptionalMark: string;
                OptionalMarkVisible: boolean;
                RequiredMark: string;
                RequiredMarkVisible: boolean;
            }
        }
    }
}
declare namespace my {
    namespace forms {
        class Config extends my.core.config.cManager {
            frmGroups: Array<FrmGroupCfg>;
            formCfg: my.forms.FrmCfg;
            constructor(json?: object);
            parseData(val: any): void;
            private _parseGroup;
            private _parseItems;
            customParse(val: object, col: my.config.iColumn): void;
            private _applyDefaults;
            defaultSizeFunction(col: my.config.iColumn, totalCols: number): void;
            private _sizes;
            infoDates(fGr: FrmGroupCfg): void;
            parseCotrolCustom(val: object, ctl: my.config.iControl): void;
            parseGroupCustom(val: object, col: my.config.iColumGroup): void;
            parseColumnCustom(val: object, col: my.config.iColumn): void;
        }
        class FrmGroupCfg extends my.core.config.cColumGroup {
            constructor();
        }
        class FrmItemCfg extends my.core.config.cColumn {
            constructor();
        }
        class FrmCfg extends my.core.config.cControl {
            constructor();
        }
    }
}
declare namespace my {
    namespace forms {
        class Custom extends my.core.form.core implements iForm {
            ctlType: string;
            Groups: Array<my.forms.fGroup>;
            options: my.forms.fOptions;
            items: Array<fItem>;
            constructor(dataSet: my.data.iDataSet);
            rebind(): void;
            createControl(label: string, column: string, dataType: my.config.dataType, type: my.config.type): fItem;
            validate(): boolean;
            save(onSucess: Function): void;
        }
    }
}
declare namespace my {
    namespace forms {
        interface iForm {
            Groups: Array<my.forms.fGroup>;
            dataSet: my.data.iDataSet;
            dataRow: my.data.iDataRow;
            events: my.core.form.EventsForm;
            options: my.forms.fOptions;
        }
        class Standard extends my.core.form.core implements iForm {
            ctlType: string;
            Groups: Array<fGroup>;
            options: fOptions;
            constructor(dataSet: my.data.iDataSet, config?: my.forms.Config);
            rebind(): void;
            private _rebindItems;
            addGroup(group: fGroup): void;
            private _config;
            get config(): my.forms.Config;
            set config(val: my.forms.Config);
            private _createFormByConfig;
            private _createGroupsByConfig;
            save(onSucess: Function): void;
        }
        class fGroup extends my.core.form.frmGroup {
            parentForm: my.forms.iForm;
            constructor(title: string, parentForm: iForm);
            private _applyCtlOptions;
            createItemByConfig(fItemCfg: my.forms.FrmItemCfg): void;
            addFormItem(el: my.controls.iControl, cfg: my.forms.FrmItemCfg): void;
            getFormItem(dataColumn: string): fItem;
        }
        class fItem extends my.core.form.frmItem {
            constructor(ctrl: my.controls.iControl, parent: my.forms.iForm);
        }
        class fOptions extends my.core.form.frmOptions {
            itemsize: string;
        }
    }
}
declare namespace my {
    namespace core {
        namespace table {
            class Options {
                table: my.table.iTable;
                select_SingleRow: boolean;
                select_MultyRow: boolean;
                useDblClickAsEdit: boolean;
                enable_DeleteRowHover: boolean;
                set allow_TitleAddNew(val: boolean);
                set allow_TitleSearch(val: boolean);
                set allow_TitleFilter(val: boolean);
                allow_Edit: boolean;
                allow_sorting: boolean;
                showTotals: boolean;
                constructor(table: my.table.iTable);
            }
        }
    }
}
declare namespace my {
    namespace table {
        interface iCell {
            element: HTMLTableCellElement;
            value: any;
            text: string;
            ctl: my.controls.iControl;
            tColumn: my.table.iColumn;
        }
        interface iColumn extends my.config.iColumn {
            isDefault: boolean;
            orderBy: boolean;
            orderType: "ASC" | "DESC";
            templateHeader: my.controls.iTemplateFunction;
            templateBody: my.controls.iTemplateFunction;
            templateFuter: my.controls.iTemplateFunction;
        }
        interface iRow {
            element: HTMLTableRowElement;
            value: object;
            uid: string;
            table: my.table.iTable;
            cells: my.table.iCell[];
            index: number;
            itemData: any;
            addCell(cell: my.table.iCell): any;
        }
        interface iTable {
            element: HTMLDivElement;
            elementTable: HTMLTableElement;
            events: my.core.table.Events;
            columns: my.table.iColumn[];
            tTitle: my.core.table.TTitle;
            tHead: my.core.table.THead;
            tBody: my.core.table.TBody;
            tFoot: my.core.table.TFoot;
            plhPagination: HTMLElement;
            currentSelectedRow: my.core.table.Row;
            options: my.core.table.Options;
        }
    }
    namespace core {
        namespace table {
            abstract class Core extends my.core.controls.core {
                ctlType: string;
                element: HTMLDivElement;
                elementTable: HTMLTableElement;
                readOnly: boolean;
                reset: Function;
                value: any;
                disabled: boolean;
                events: my.core.table.Events;
                columns: my.table.iColumn[];
                tTitle: my.core.table.TTitle;
                tHead: my.core.table.THead;
                tBody: my.core.table.TBody;
                tFoot: my.core.table.TFoot;
                options: my.core.table.Options;
                private _currentSelectedRow;
                get currentSelectedRow(): my.core.table.Row;
                set currentSelectedRow(val: my.core.table.Row);
                private _plhPagination;
                get plhPagination(): HTMLElement;
                constructor();
                initEvents(): void;
                abstract rebind(): any;
            }
            class Column extends my.core.config.cColumn implements my.table.iColumn {
                visible: boolean;
                orderBy: boolean;
                orderType: "ASC" | "DESC";
                templateHeader: my.controls.iTemplateFunction;
                templateBody: my.controls.iTemplateFunction;
                templateFuter: my.controls.iTemplateFunction;
                isDefault: boolean;
                constructor(label: string, dataColumn: string, size: string);
            }
            class Row extends my.core.controls.core implements my.table.iRow {
                ctlType: string;
                element: HTMLTableRowElement;
                readOnly: boolean;
                reset: Function;
                disabled: boolean;
                itemData: my.data.DataRow;
                get value(): object;
                get uid(): string;
                table: my.table.iTable;
                cells: my.table.iCell[];
                index: number;
                constructor(table: my.table.iTable);
                clear(): void;
                addCell(cell: my.table.iCell): void;
                private _onRowClick;
                private _onRowDblClick;
                private _onRowMouseEnter;
            }
            class thCell extends my.core.controls.core implements my.table.iCell {
                ctlType: string;
                element: HTMLTableCellElement;
                readOnly: boolean;
                reset: Function;
                private _ctl;
                get ctl(): my.controls.iControl;
                set ctl(val: my.controls.iControl);
                disabled: boolean;
                row: my.core.table.Row;
                value: any;
                text: string;
                tColumn: my.table.iColumn;
                constructor(row: my.core.table.Row);
            }
            class tdCell extends my.core.controls.core implements my.table.iCell {
                ctlType: string;
                private _ctl;
                get ctl(): my.controls.iControl;
                set ctl(val: my.controls.iControl);
                element: HTMLTableCellElement;
                readOnly: boolean;
                reset: Function;
                disabled: boolean;
                text: string;
                get _value(): string;
                set _value(val: string);
                tColumn: my.table.iColumn;
                constructor(col: my.table.iColumn);
                private _parseColProperties;
            }
            class THead {
                ctlType: string;
                element: HTMLTableSectionElement;
                rows: my.table.iRow[];
                table: my.table.iTable;
                constructor(table: my.table.iTable);
                clear(): void;
                addRow(row: my.table.iRow): void;
            }
            class TBody {
                ctlType: string;
                element: HTMLTableSectionElement;
                rows: my.core.table.Row[];
                table: my.table.iTable;
                constructor(table: my.table.iTable);
                clear(): void;
                addRow(row: my.core.table.Row): void;
            }
            class TFoot {
                ctlType: string;
                element: HTMLTableSectionElement;
                rows: my.table.iRow[];
                table: my.table.iTable;
                constructor(table: my.table.iTable);
                clear(): void;
                addRow(row: my.table.iRow): void;
            }
            class TTitle {
                ctlType: string;
                element: HTMLElement;
                table: my.table.iTable;
                plhAddNew: HTMLDivElement;
                plhNotify: HTMLDivElement;
                plhEdit: HTMLDivElement;
                plhDelete: HTMLDivElement;
                plhText: HTMLSpanElement;
                plhFilter: HTMLDivElement;
                plhSearch: HTMLDivElement;
                plhCustomCtrl: HTMLDivElement;
                set text(val: string);
                constructor(table: my.table.iTable);
                private _createAddNew;
                showAddNew(): void;
                hideAddNew(): void;
                showTitleSearch(): void;
                hideTitleSearch(): void;
                showTitleFilter(): void;
                hideTitleFilter(): void;
                createNotify(): void;
                hideNotify(): void;
                createEdit(subscriber: any, handler: my.events.iEventHandler): void;
                createDelete(subscriber: any, handler: my.events.iEventHandler): void;
                addCustomControl(ctl: my.controls.iControl): void;
                removeCustomControl(): void;
                private _init;
                private _initPlaceHolders;
            }
            class Events extends my.core.controls.Events {
                rowClick: my.core.events.core;
                rowDblClick: my.core.events.core;
                rowMouseEnter: my.core.events.core;
                rowSelected: my.core.events.core;
                cellClick: my.core.events.core;
                newClick: my.core.events.core;
                delClick: my.core.events.core;
                editClick: my.core.events.core;
                sortClick: my.core.events.core;
                filter: my.core.events.core;
                dataSorted: my.core.events.core;
                dataFiltered: my.core.events.core;
                constructor(eventTarget: my.controls.iControl);
            }
        }
    }
}
declare namespace my {
    namespace core {
        namespace table {
            class Pagination extends my.core.controls.core {
                private table;
                ctlType: string;
                element: HTMLDivElement;
                pagerPlaceholder: HTMLDivElement;
                sizerPlaceholder: HTMLDivElement;
                elementUL: HTMLUListElement;
                items: Array<HTMLLIElement>;
                readOnly: boolean;
                reset: Function;
                value: any;
                disabled: boolean;
                events: my.core.table.EventsPagination;
                dropDown: my.controls.ctlDropDown;
                private _totalItems;
                private _pageCount;
                get pageCount(): number;
                set pageCount(val: number);
                private _pageCurrent;
                get pageCurrent(): number;
                set pageCurrent(val: number);
                set pageCurrentUpdate(val: number);
                private _pageSize;
                get pageSize(): number;
                set pageSize(val: number);
                constructor(table: my.table.Simple);
                init(s: any, e: any, d: any): void;
                private update;
                private _addPagerItem;
                private _addPagerItemSpacer;
                private _updateActive;
                private _calculate;
                private _generateItems;
                private _generateDropDownForItems;
                goToFirst(): void;
                goToLast(): void;
                goToPrev(): void;
                goToNext(): void;
                goTo(val: number): void;
            }
            class EventsPagination extends my.core.controls.Events {
                pageChange: my.core.events.core;
                pageSizeChange: my.core.events.core;
                pageClick: my.core.events.core;
                firstClick: my.core.events.core;
                lastClick: my.core.events.core;
                prevClick: my.core.events.core;
                nextClick: my.core.events.core;
                constructor(eventTarget: my.controls.iControl);
            }
            class PaginationItem {
                index: number;
                label: string;
                clickEnabled: boolean;
                isCurrent: boolean;
            }
        }
    }
}
declare namespace my {
    namespace core {
        namespace table {
            class Sorting extends my.core.controls.core {
                private table;
                ctlType: string;
                element: HTMLDivElement;
                readOnly: boolean;
                reset: Function;
                value: any;
                disabled: boolean;
                events: my.core.table.EventsSorting;
                currentOrderByDirection: "ASC" | "DESC";
                private _currentOrderBy;
                get currentOrderBy(): string;
                set currentOrderBy(val: string);
                set currentOrderByUpdate(val: string);
                constructor(table: my.table.iTable);
                private _onTHCellClick;
                private _addSortIcon;
            }
            class EventsSorting extends my.core.controls.Events {
                OrderByChange: my.core.events.core;
                constructor(eventTarget: my.controls.iControl);
            }
        }
    }
}
declare namespace my {
    namespace table {
        class Config extends my.core.config.cManager {
            columnsCfg: my.table.ColumnCfg[];
            tableCfg: my.table.TableCfg;
            constructor(json?: object);
            parseData(val: any): void;
            private _parseColumns;
            defaultSizeFunction(col: my.config.iColumn, totalCols: number): void;
            parseCotrolCustom(val: object, ctl: my.config.iControl): void;
            parseGroupCustom(val: object, col: my.config.iColumGroup): void;
            parseColumnCustom(val: object, col: my.config.iColumn): void;
        }
        class ColumnCfg extends my.core.config.cColumn {
            isDefault: boolean;
            constructor();
        }
        class TableCfg extends my.core.config.cControl {
            constructor();
        }
    }
}
declare namespace my {
    namespace table {
        class Simple extends my.core.table.Core {
            private _columns;
            set columns(val: my.table.iColumn[]);
            get columns(): my.table.iColumn[];
            dataSet: my.data.iDataSet;
            private _DataTableName;
            get DataTableName(): string;
            set DataTableName(val: string);
            private _cfg;
            private _dataTable;
            get dataTable(): my.data.DataTable;
            set dataTable(val: my.data.DataTable);
            private _tableSize;
            get TableSize(): string;
            set TableSize(val: string);
            customControlHandler: (data: any) => my.controls.iControl;
            currentPage: number;
            constructor(dataset: my.data.iDataSet, cfg?: my.table.Config);
            private _onDataLoad;
            calculateTableSize(height: number, width: number): void;
            rebind(): void;
            private _onDataTableChange;
            recreateRows(): void;
            private _createColumns;
            private _updateColumnVisibility;
            private _updateCellVisibility;
            private _addHeadRow;
            beforeAddBodyRow(row: my.table.iRow): void;
            afterAddBodyRow(row: my.table.iRow): void;
            private _addBodyRow;
            addToCell(cell: my.table.iCell, col: my.table.iColumn, data: my.data.DataRow): void;
            private _defaultCreatedOnRender;
            private _dateRender;
            deleteRow(s: any, e: any, row: my.table.iRow): void;
        }
    }
}
declare namespace my {
    namespace table {
        class Standard extends Simple {
            ctlType: string;
            events: my.table.Events;
            pagination: my.core.table.Pagination;
            sorting: my.core.table.Sorting;
            filtering: my.core.table.Filtering;
            totals: my.table.Totals;
            tTitle: my.core.table.TTitle;
            set title(val: string);
            private _urlParams;
            get urlParams(): string;
            set urlParams(val: string);
            constructor(dataset: my.data.iDataSet, cfg: Config);
            initEvents(): void;
            private _addEditClick;
            private _tableChangeSize;
            private _addLoadEvent;
            private _addShowEvent;
            private _applyConfig;
            private _applyTableCfg;
            applyTableOptionsCfg(options: Array<object>): void;
            rebind(): void;
            private _onRowMouseEnter;
            _createDeleteRowButton(row: my.table.iRow): void;
            private _onFilterChange;
            private _onPaginationPageSizeChange;
            private _onPaginationPageChange;
            private _onSortingOrderByChange;
            updateURL(): void;
        }
        class Events extends my.core.table.Events {
            screenLoad: my.core.events.core;
            screenShow: my.core.events.core;
            constructor(eventTarget: my.controls.iControl);
        }
    }
}
declare namespace my {
    namespace core {
        namespace table {
            class Filtering {
                isClientFiltering: boolean;
                private table;
                _txtSearchBy: my.controls.ctlText;
                currentSearchBy: string;
                events: my.core.table.EventsFiltering;
                constructor(table: my.table.iTable);
                private _addTitleSearch;
                private _onSearch;
            }
            class EventsFiltering extends my.core.events.core {
                FilterByChange: my.core.events.core;
                constructor();
            }
        }
    }
}
declare namespace my {
    namespace table {
        class FixedHeader {
            table: my.table.iTable;
            element: HTMLElement;
            isHidden: boolean;
            constructor(table: my.table.iTable);
            private _showhide;
            private _showFixedHeader;
            private _hideFixedHeader;
        }
    }
}
declare namespace my {
    namespace table {
        class InlineEdit extends Simple {
            ctlType: string;
            optionsInlineEdit: my.core.table.optionsInlineEdit;
            onInsert: (data: any) => any;
            frmInsert: my.forms.Custom;
            insertRow: my.table.iRow;
            constructor(dataset: my.data.iDataSet, cfg: Config);
            private _initEvents;
            private _addHeadRowInsert;
            addToForm(col: my.table.iColumn, data: any): my.forms.fItem;
            afterAddBodyRow(row: my.table.iRow): void;
        }
    }
    namespace core {
        namespace table {
            class optionsInlineEdit {
                mode: "inline" | "inlineForm";
                positionOfNewElement: "top" | "bottom";
            }
        }
    }
}
declare namespace my {
    namespace table {
        class Totals {
            private _table;
            private _columns;
            private _JSON;
            get JSON(): object;
            set JSON(val: object);
            constructor(table: Standard);
            private _createTotalRow;
            private _createTotalItem;
            private _calculateTotals;
            private _calculateItemTotal;
            private _parseData;
        }
        class TotalColumnConfig {
            dataColumn: string;
            colspan: number;
            prefix: string;
            _total: number;
            total: my.data.binding.Observable;
        }
    }
}
