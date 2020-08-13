"use strict";
var my;
(function (my) {
    "use strict";
    let core;
    (function (core) {
        let themes;
        (function (themes) {
            ;
            ;
            ;
            ;
            ;
        })(themes = core.themes || (core.themes = {}));
        ;
    })(core = my.core || (my.core = {}));
})(my || (my = {}));
var my;
(function (my) {
    "use strict";
    let core;
    (function (core) {
        class css {
            constructor(element, theme) {
                this.element = element;
                this.currentTeheme = theme;
                this.removeAll();
            }
            ;
            add(val) {
                if (val) {
                    if (val.includes(" ")) {
                        val.split(" ").forEach((itm, idx) => {
                            this.element.classList.add(itm.toString());
                        });
                    }
                    else {
                        this.element.classList.add(val.toString());
                    }
                }
            }
            ;
            remove(val) {
                if (val) {
                    this.element.classList.remove(val.toString());
                }
            }
            ;
            removeAll() {
                this.element.className = "";
            }
            ;
            contains(val) {
                return this.element.classList.contains(val.toString());
            }
            ;
            get size() {
                return this._size;
            }
            set size(val) {
                this._size = val;
                if (val == undefined) {
                    return;
                }
                if (val.indexOf("%") > -1) {
                    this.clearSizes();
                    this._setMinMaxWidth(val);
                }
                else if ((val.indexOf("px") > -1) || (val.indexOf("rem") > -1)) {
                    this.clearSizes();
                    this._setMinMaxWidth(val);
                }
                else {
                    this.setSizes(val);
                }
            }
            _setMinMaxWidth(val) {
                if (val.indexOf("min") > -1) {
                    val = val.substring(3);
                    this.element.style.minWidth = val;
                }
                else if (val.indexOf("max") > -1) {
                    val = val.substring(3);
                    this.element.style.maxWidth = val;
                }
                else if (val.indexOf("all") > -1) {
                    val = val.substring(3);
                    this.element.style.minWidth = val;
                    this.element.style.maxWidth = val;
                    this.element.style.width = val;
                }
                else {
                    this.element.style.width = val;
                }
            }
            setSizes(sizes, clearOld = true) {
                var aSizes = sizes.split(",");
                if (clearOld) {
                    this.clearSizes("all");
                    this.clearSizes("all", true);
                }
                this.add(this.currentTeheme.column);
                aSizes.forEach((itm, idx) => {
                    if (itm.indexOf("xs") == 0) {
                        if (clearOld == false) {
                            this.clearSizes("xs");
                        }
                        this.add(this.currentTeheme.size.xs + itm.split("xs")[1]);
                    }
                    else if (itm.indexOf("s") == 0) {
                        if (clearOld == false) {
                            this.clearSizes("s");
                        }
                        this.add(this.currentTeheme.size.s + itm.split("s")[1]);
                    }
                    else if (itm.indexOf("m") == 0) {
                        if (clearOld == false) {
                            this.clearSizes("m");
                        }
                        this.add(this.currentTeheme.size.m + itm.split("m")[1]);
                    }
                    else if (itm.indexOf("l") == 0) {
                        if (clearOld == false) {
                            this.clearSizes("l");
                        }
                        this.add(this.currentTeheme.size.l + itm.split("l")[1]);
                    }
                    else if (itm.indexOf("xl") == 0) {
                        if (clearOld == false) {
                            this.clearSizes("xl");
                        }
                        this.add(this.currentTeheme.size.xl + itm.split("xl")[1]);
                    }
                    else if (itm.indexOf("offset_xs") == 0) {
                        if (clearOld == false) {
                            this.clearSizes("xs", true);
                        }
                        this.add(this.currentTeheme.size.offset_xs + itm.split("offset_xs")[1]);
                    }
                    else if (itm.indexOf("offset_s") == 0) {
                        if (clearOld == false) {
                            this.clearSizes("s", true);
                        }
                        this.add(this.currentTeheme.size.offset_s + itm.split("offset_s")[1]);
                    }
                    else if (itm.indexOf("offset_m") == 0) {
                        if (clearOld == false) {
                            this.clearSizes("m", true);
                        }
                        this.add(this.currentTeheme.size.offset_m + itm.split("offset_m")[1]);
                    }
                    else if (itm.indexOf("offset_l") == 0) {
                        if (clearOld == false) {
                            this.clearSizes("l", true);
                        }
                        this.add(this.currentTeheme.size.offset_l + itm.split("offset_l")[1]);
                    }
                    else if (itm.indexOf("offset_xl") == 0) {
                        if (clearOld == false) {
                            this.clearSizes("xl", true);
                        }
                        this.add(this.currentTeheme.size.offset_xl + itm.split("offset_xl")[1]);
                    }
                });
            }
            ;
            clearSizes(size = "all", isOffset = false) {
                for (var i = 1; i < 13; i++) {
                    switch (size) {
                        case "xs": {
                            if (isOffset) {
                                this.remove(this.currentTeheme.size.offset_xs + i.toString());
                            }
                            else {
                                this.remove(this.currentTeheme.size.xs + i.toString());
                            }
                            break;
                        }
                        case "s": {
                            if (isOffset) {
                                this.remove(this.currentTeheme.size.offset_s + i.toString());
                            }
                            else {
                                this.remove(this.currentTeheme.size.s + i.toString());
                            }
                            break;
                        }
                        case "m": {
                            if (isOffset) {
                                this.remove(this.currentTeheme.size.offset_m + i.toString());
                            }
                            else {
                                this.remove(this.currentTeheme.size.m + i.toString());
                            }
                            break;
                        }
                        case "l": {
                            if (isOffset) {
                                this.remove(this.currentTeheme.size.offset_l + i.toString());
                            }
                            else {
                                this.remove(this.currentTeheme.size.l + i.toString());
                            }
                            break;
                        }
                        case "xl": {
                            if (isOffset) {
                                this.remove(this.currentTeheme.size.offset_xl + i.toString());
                            }
                            else {
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
                            }
                            else {
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
            }
            ;
        }
        core.css = css;
        ;
    })(core = my.core || (my.core = {}));
})(my || (my = {}));
var my;
(function (my) {
    let core;
    (function (core) {
        let themes;
        (function (themes) {
            let bootstrap;
            (function (bootstrap) {
                class cIcons {
                    constructor() {
                        this.add = "add";
                        this.add_circle_outline = "add_circle_outline";
                        this.arrow_down = "arrow_downward";
                        this.arrow_left = "arrow_left";
                        this.arrow_right = "arrow_right";
                        this.arrow_sort_down = "arrow_sort_down";
                        this.arrow_sort_up = "arrow_sort_up";
                        this.arrow_up = "arrow_upward";
                        this.back = "arrow_back";
                        this.check = "check";
                        this.clear = "clear";
                        this.close = "close";
                        this.create = "create";
                        this.delete = "delete";
                        this.done = "done";
                        this.edit = "edit";
                        this.error = "error";
                        this.filter = "filter";
                        this.menu = "menu";
                        this.new = "new";
                        this.next = "next";
                        this.previous = "previous";
                        this.print = "print";
                        this.remove = "remove_circle_outline";
                        this.save = "save";
                        this.search = "search";
                        this.sync = "sync";
                    }
                }
                bootstrap.cIcons = cIcons;
                ;
                class cColors {
                    constructor() {
                        this.primary = "primary";
                        this.secondary = "secondary";
                        this.success = "success";
                        this.info = "info";
                        this.warning = "warning";
                        this.danger = "red";
                    }
                }
                bootstrap.cColors = cColors;
                ;
                class cSizes {
                    constructor() {
                        this.xs = "col-";
                        this.s = "col-sm-";
                        this.m = "col-md-";
                        this.l = "col-lg-";
                        this.xl = "col-xl-";
                        this.offset_xs = "offset-";
                        this.offset_s = "offset-sm-";
                        this.offset_m = "offset-md-";
                        this.offset_l = "offset-lg-";
                        this.offset_xl = "offset-xl-";
                    }
                }
                bootstrap.cSizes = cSizes;
                ;
                class cLists {
                    constructor() {
                        this.list = "my-list";
                        this.listItem = "my-list-item";
                        this.toast = "toast-group";
                        this.toastItem = "toast-group-item";
                        this.autocomplete = "";
                        this.autocompleteItem = "";
                        this.dropdown = "my-dd-list";
                        this.dropdownItem = "my-dd-item";
                        this.tabs = "my-tabs";
                        this.tabsItem = "my-tabs-item";
                    }
                }
                bootstrap.cLists = cLists;
                ;
                class cElements {
                    constructor() {
                        this.buttonRound = "btn btn-round btn-primary";
                        this.button = "btn btn-primary";
                        this.input = "my-input";
                        this.textarea = "";
                        this.checkbox = "my-checkbox";
                        this.radiobutton = "";
                        this.dropDown = "my-dd";
                        this.icon = "my-icons";
                    }
                }
                bootstrap.cElements = cElements;
                ;
                class theme {
                    constructor() {
                        this.active = "active";
                        this.disabled = "disabled";
                        this.column = "";
                        this.row = "row";
                        this.alighLeft = "left-align";
                        this.alignRight = "right-align";
                        this.alignCenter = "center-align";
                        this.floatLeft = "left";
                        this.floatRight = "right";
                        this.table = "table";
                        this.form = "my-form";
                        this.formGroup = "row";
                        this.formItem = "my-frm-itm";
                        this.formControl = "frm-control";
                        this.calendar = "my-calendar";
                        this.calendarDay = "my-calendar-day";
                        this.calendarDropDown = "my-calendar-dd";
                        this.card = "card";
                        this.cardHeader = "card-title";
                        this.cardBody = "card-body";
                        this.cardFooter = "card-footer";
                        this.appScreen = "screen";
                        this.colors = new cColors();
                        this.icons = new cIcons();
                        this.size = new cSizes();
                        this.elements = new cElements();
                        this.lists = new cLists();
                    }
                }
                bootstrap.theme = theme;
            })(bootstrap = themes.bootstrap || (themes.bootstrap = {}));
            ;
        })(themes = core.themes || (core.themes = {}));
        ;
    })(core = my.core || (my.core = {}));
    ;
    class theme {
    }
    theme.current = new my.core.themes.bootstrap.theme();
    my.theme = theme;
})(my || (my = {}));
var my;
(function (my) {
    let css;
    (function (css) {
        let eColorStyles;
        (function (eColorStyles) {
            eColorStyles["primary"] = "primary";
            eColorStyles["secondary"] = "secondary";
            eColorStyles["success"] = "success";
            eColorStyles["info"] = "info";
            eColorStyles["warning"] = "warning";
            eColorStyles["danger"] = "danger";
        })(eColorStyles = css.eColorStyles || (css.eColorStyles = {}));
        class Button extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.elements.button);
            }
            set colorStyle(val) {
                this.add('btn-' + val);
            }
            ;
        }
        css.Button = Button;
        ;
        class FixedActionButton extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add("btn-fixed");
                this.add("btnFixedBottomRight");
            }
            set colorStyle(val) {
                this.add('btn-' + val);
            }
            ;
        }
        css.FixedActionButton = FixedActionButton;
        ;
        class IconButton extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add("btn-ico");
            }
            set colorStyle(val) {
                this.add('btn-' + val);
            }
            ;
        }
        css.IconButton = IconButton;
        ;
        class Text extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.elements.input);
            }
        }
        css.Text = Text;
        class Icon extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.elements.icon);
            }
            set colorStyle(val) {
                this.add('btn-' + val);
            }
            ;
        }
        css.Icon = Icon;
        ;
        class Checkbox extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.elements.checkbox);
            }
        }
        css.Checkbox = Checkbox;
        class List extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.lists.list);
            }
        }
        css.List = List;
        class ListItem extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.lists.listItem);
            }
        }
        css.ListItem = ListItem;
        class Toast extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.lists.toast);
            }
        }
        css.Toast = Toast;
        class ToastItem extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.lists.toastItem);
            }
        }
        css.ToastItem = ToastItem;
        class DropDown extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.elements.dropDown);
            }
        }
        css.DropDown = DropDown;
        ;
        class DropDownList extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.lists.dropdown);
            }
        }
        css.DropDownList = DropDownList;
        class DropDownListItem extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.lists.dropdownItem);
            }
        }
        css.DropDownListItem = DropDownListItem;
        class form extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.setSizes("xs12");
                this.add(this.currentTeheme.form);
            }
        }
        css.form = form;
        class formGroup extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.formGroup);
            }
        }
        css.formGroup = formGroup;
        class formItem extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.formItem);
            }
        }
        css.formItem = formItem;
        class formControl extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.formControl);
            }
        }
        css.formControl = formControl;
        class Table extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.table);
            }
        }
        css.Table = Table;
        class tRow extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.tRow);
            }
        }
        css.tRow = tRow;
        class tColumn extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.tColumn);
            }
        }
        css.tColumn = tColumn;
        class tCell extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.tCell);
            }
        }
        css.tCell = tCell;
        class Card extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.card);
            }
        }
        css.Card = Card;
        class cardHeader extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.cardHeader);
            }
        }
        css.cardHeader = cardHeader;
        class cardBody extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.cardBody);
            }
        }
        css.cardBody = cardBody;
        class cardFooter extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.cardFooter);
            }
        }
        css.cardFooter = cardFooter;
        class Tabs extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.lists.tabs);
            }
        }
        css.Tabs = Tabs;
        class TabsItem extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.lists.tabsItem);
            }
        }
        css.TabsItem = TabsItem;
        class Calendar extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.calendar);
            }
        }
        css.Calendar = Calendar;
        class CalendarDay extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.calendarDay);
            }
        }
        css.CalendarDay = CalendarDay;
        class CalendarDropDown extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.calendarDropDown);
            }
        }
        css.CalendarDropDown = CalendarDropDown;
        class AppScreen extends my.core.css {
            constructor(element) {
                super(element, my.theme.current);
                this.add(this.currentTeheme.appScreen);
                this.setSizes("xs12,xl10,offset_xl1");
            }
            set colorStyle(val) {
                this.add('btn-' + val);
            }
            ;
        }
        css.AppScreen = AppScreen;
        ;
    })(css = my.css || (my.css = {}));
    ;
})(my || (my = {}));
var my;
(function (my) {
    "use strict";
    class tools {
        static newGuid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        static newShortCode(length = 6, caseSensitive = false) {
            var ALPHABET = '23456789abdegjkmnpqrvwxyz';
            if (caseSensitive) {
                ALPHABET = '23456789abdegjkmnpqrvwxyzABDEGJKMNPQRVWXYZ';
            }
            var ID_LENGTH = length;
            var rtn = '';
            for (var i = 0; i < ID_LENGTH; i++) {
                rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
            }
            return rtn;
        }
        static round(nmb, fractions) {
            var ret = Math.round(nmb * Math.pow(10, fractions));
            return (ret / Math.pow(10, fractions)).toLocaleString('en', { minimumFractionDigits: fractions, useGrouping: false });
        }
        static getElementByValue(arr, elementName, elementValue) {
            var ret = undefined;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].hasOwnProperty(elementName)) {
                    if (arr[i][elementName] == elementValue) {
                        ret = arr[i];
                        break;
                    }
                }
            }
            return ret;
        }
        static getIndexByValue(arr, elementName, elementValue) {
            var ret = -1;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].hasOwnProperty(elementName)) {
                    if (arr[i][elementName] == elementValue) {
                        ret = i;
                        break;
                    }
                }
            }
            return ret;
        }
        static B64Encode(str) {
            if (window
                && "btoa" in window
                && "encodeURIComponent" in window) {
                var s = btoa(unescape(encodeURIComponent(str)));
                if (s.indexOf("+") == -1) {
                    return s;
                }
                else {
                    return encodeURIComponent(s);
                }
            }
            else {
                console.warn("b64EncodeUnicode requirements: window.btoa and window.encodeURIComponent functions");
                return null;
            }
        }
        static B64Decode(str) {
            if ((str == undefined) || (str == "")) {
                return str;
            }
            if (window
                && "atob" in window
                && "decodeURIComponent" in window) {
                return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(""));
            }
            else {
                console.warn("b64DecodeUnicode requirements: window.atob and window.decodeURIComponent functions");
                return null;
            }
        }
        static isIE(userAgent) {
            userAgent = userAgent || navigator.userAgent;
            return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge/") > -1;
        }
        static setCookie(cname, cvalue, exdays, domain = undefined) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = ";expires=" + d.toUTCString();
            var sDomain = "";
            if (domain) {
                sDomain = ";domain=" + domain;
            }
            document.cookie = cname + "=" + cvalue + expires + sDomain + ";path=/";
        }
        static getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        static parseURLParams(data) {
            var retObj;
            if ((data == undefined) || (data.length < 3) || (data.indexOf("=") == -1)) {
                return retObj;
            }
            retObj = {};
            var arr = data.split("&");
            arr.forEach((itm, idx) => {
                if (itm.indexOf("=") > -1) {
                    retObj[itm.split("=")[0]] = itm.split("=")[1];
                }
                else {
                    retObj[itm] = itm;
                }
            });
            return retObj;
        }
        static log(from, data = undefined) {
            var isDebug = window.location.href.indexOf("localhost");
            if (isDebug > -1) {
                if (data == undefined) {
                    console.log(from);
                }
                else {
                    console.log(from, data);
                }
            }
        }
        static padStart(str, padTo, padWith) {
            var s = str;
            while (s.length < padTo) {
                s = padWith + s;
            }
            return s;
        }
        static objHavePropertyCaseInsensitive(o, property) {
            var bRet = false;
            Object.getOwnPropertyNames(o).forEach((itm, idx) => {
                if (itm.toLowerCase() == property.toLocaleLowerCase()) {
                    bRet = true;
                }
            });
            return bRet;
        }
        static exportToCsv(filename, rows) {
            if (!rows || !rows.length) {
                return;
            }
            const separator = ',';
            const keys = Object.keys(rows[0]);
            const csvContent = keys.join(separator) +
                '\n' +
                rows.map(row => {
                    return keys.map(k => {
                        var cell = row[k] === null || row[k] === undefined ? '' : row[k];
                        cell = cell instanceof Date
                            ? cell.toLocaleString()
                            : cell.toString().replace(/"/g, '""');
                        if (cell.search(/("|,|\n)/g) >= 0) {
                            cell = `"${cell}"`;
                        }
                        return cell;
                    }).join(separator);
                }).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, filename);
            }
            else {
                const link = document.createElement('a');
                if (link.download !== undefined) {
                    const url = URL.createObjectURL(blob);
                    link.setAttribute('href', url);
                    link.setAttribute('download', filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }
        static getElementSize(val) {
            var ret = { "height": 0, "width": 0 };
            document.body.appendChild(val);
            var s = val.getClientRects();
            ret.height = s[0].height;
            ret.width = s[0].width;
            document.body.removeChild(val);
            return ret;
        }
        static formatDateTimeString(val) {
            var sRet = "";
            if (val == null) {
                return "";
            }
            sRet = val.replace("T", " ");
            sRet = sRet.substring(0);
            return sRet;
        }
        static formtDateString(val) {
            var sRet = "";
            if (val == null) {
                return "";
            }
            sRet = val.split("T")[0];
            sRet = sRet.split(" ")[0];
            return sRet;
        }
        static getElementPositionOnForm(element) {
            var rect = element.getBoundingClientRect();
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
        }
        static getWindowSize(height, width) {
            var windowSize;
            if (width >= 992) {
                windowSize = "lg";
            }
            else if (width >= 768) {
                windowSize = "md";
            }
            else if (width >= 576) {
                windowSize = "sm";
            }
            else {
                windowSize = "xs";
            }
            return windowSize;
        }
    }
    my.tools = tools;
})(my || (my = {}));
var my;
(function (my) {
    "use strict";
    let events;
    (function (events) {
        class global {
            static init() {
                if (this.standard == undefined) {
                    this.standard = new my.core.events.coreGlobal();
                }
                if (this.navigation == undefined) {
                    this.navigation = new my.core.events.coreGlobal();
                }
            }
        }
        events.global = global;
    })(events = my.events || (my.events = {}));
    let core;
    (function (core_1) {
        let events;
        (function (events) {
            class eventSubscriber {
            }
            events.eventSubscriber = eventSubscriber;
            class eventGlobalSubscriber {
            }
            events.eventGlobalSubscriber = eventGlobalSubscriber;
            class core {
                constructor(name) {
                    this.subscribers = [];
                    this.id = my.tools.newGuid();
                    this.name = name;
                }
                subscribe(subscriber, handler, defaultData = undefined) {
                    var ev = new eventSubscriber();
                    ev.subscriber = subscriber;
                    ev.data = defaultData;
                    ev.handler = handler;
                    this.subscribers.push(ev);
                }
                dispatch(sender, data = undefined) {
                    this.subscribers.forEach((ev, idx) => {
                        if (data === undefined) {
                            data = ev.data;
                        }
                        ev.handler(sender, this, data);
                    });
                }
                unsubscribe(param) {
                    if (typeof (param) == "object") {
                        this._unsubscribeBySubscriber(param);
                    }
                    else {
                        this._unsubscribeByHandler(param);
                    }
                }
                _unsubscribeBySubscriber(subscriber) {
                    for (var idx = 0; idx < this.subscribers.length; idx++) {
                        if (this.subscribers[idx].subscriber == subscriber) {
                            break;
                        }
                    }
                    ;
                    this.subscribers.splice(idx, 1);
                }
                _unsubscribeByHandler(handler) {
                    for (var idx = 0; idx < this.subscribers.length; idx++) {
                        if (this.subscribers[idx].handler == handler) {
                            break;
                        }
                    }
                    ;
                    this.subscribers.splice(idx, 1);
                }
            }
            events.core = core;
            class coreGlobal {
                constructor() {
                    this.id = "G_" + my.tools.newGuid();
                }
                get subscribers() {
                    return coreGlobal.subscribers;
                }
                subscribe(subscriber, code, handler, defaultData = undefined) {
                    var ev = new eventGlobalSubscriber();
                    ev.subscriber = subscriber;
                    ev.data = defaultData;
                    ev.handler = handler;
                    ev.code = code;
                    this.subscribers.push(ev);
                }
                dispatch(sender, code, data = undefined) {
                    var self = this;
                    this.subscribers.forEach((ev, idx) => {
                        if (ev.code == code) {
                            if (data === undefined) {
                                data = ev.data;
                            }
                            ev.handler(sender, self, data, code);
                        }
                        if (ev.code.toLowerCase() == "all") {
                            ev.handler(sender, self, data, code);
                        }
                    });
                }
            }
            coreGlobal.subscribers = [];
            events.coreGlobal = coreGlobal;
            class htmlCore {
                constructor(target, name) {
                    this.subscribers = [];
                    this.id = my.tools.newGuid();
                    this.target = target;
                    this.name = name;
                    this.eventIdentificator = this.target.element.nodeName + "/" + this.id;
                }
                subscribe(subscriber, handler, defaultData = undefined) {
                    var ev = new eventSubscriber();
                    ev.subscriber = subscriber;
                    ev.data = defaultData;
                    ev.handler = handler;
                    this.subscribers.push(ev);
                    if (this.target.eventElement == undefined) {
                        this.target.eventElement = this.target.element;
                    }
                    this.target.eventElement.addEventListener(this.name, (e) => {
                        var d;
                        if (ev.data) {
                            d = ev.data;
                        }
                        else if (e.detail) {
                            d = e.detail;
                        }
                        handler(this.target, e, d);
                    });
                }
                dispatch(sender, data = undefined) {
                    var event;
                    if (data == undefined) {
                        data = this.target.itemData;
                    }
                    if (my.tools.isIE()) {
                        event = document.createEvent("CustomEvent");
                        event.initCustomEvent(this.name, false, false, {
                            detail: data
                        });
                    }
                    else {
                        event = new CustomEvent(this.name, { detail: data });
                    }
                    if (this.target.eventElement == undefined) {
                        this.target.eventElement = this.target.element;
                    }
                    this.target.eventElement.dispatchEvent(event);
                }
                unsubscribe(param) {
                    if (typeof (param) == "object") {
                        this._unsubscribeBySubscriber(param);
                    }
                    else {
                        this._unsubscribeByHandler(param);
                    }
                }
                _unsubscribeBySubscriber(subscriber) {
                    for (var idx = 0; idx < this.subscribers.length; idx++) {
                        if (this.subscribers[idx].subscriber == subscriber) {
                            break;
                        }
                    }
                    ;
                    this.subscribers.splice(idx, 1);
                }
                _unsubscribeByHandler(handler) {
                    for (var idx = 0; idx < this.subscribers.length; idx++) {
                        if (this.subscribers[idx].handler == handler) {
                            break;
                        }
                    }
                    ;
                    this.subscribers.splice(idx, 1);
                }
            }
            events.htmlCore = htmlCore;
        })(events = core_1.events || (core_1.events = {}));
    })(core = my.core || (my.core = {}));
})(my || (my = {}));
var my;
(function (my) {
    "use strict";
    let core;
    (function (core) {
        let data;
        (function (data_1) {
            let binding;
            (function (binding) {
                class bindingSubscriber {
                }
                binding.bindingSubscriber = bindingSubscriber;
                class Observable {
                    constructor(val = undefined) {
                        this.subscribers = [];
                        this.id = my.tools.newGuid();
                        this._value = val;
                    }
                    get value() {
                        return this._value;
                    }
                    set value(val) {
                        this._value = val;
                        this.dispatch(this, val);
                    }
                    subscribe(subscriber, handler, defaultData = undefined) {
                        if (handler == undefined) {
                            console.error("handler cannot be empty");
                        }
                        if (this._subscriberExists(subscriber)) {
                            return;
                        }
                        var subscr = new bindingSubscriber();
                        subscr.subscriber = subscriber;
                        subscr.data = defaultData;
                        subscr.handler = handler;
                        this.subscribers.push(subscr);
                    }
                    _subscriberExists(subscriber) {
                        var bRet = false;
                        this.subscribers.forEach((itm, idx) => {
                            if (itm.subscriber == subscriber) {
                                bRet = true;
                            }
                        });
                        return bRet;
                    }
                    dispatch(sender, data) {
                        if (data != this._value) {
                            this._value = data;
                        }
                        if (this.onValueChange != undefined) {
                            this.onValueChange(data);
                        }
                        this.subscribers.forEach((s, idx) => {
                            if (s.subscriber != sender) {
                                if (data === undefined) {
                                    data = s.data;
                                }
                                s.handler(sender, data);
                            }
                        });
                    }
                    unsubscribe(param) {
                        if (typeof (param) == "object") {
                            this._unsubscribeBySubscriber(param);
                        }
                        else {
                            this._unsubscribeByHandler(param);
                        }
                    }
                    _unsubscribeBySubscriber(subscriber) {
                        for (var idx = 0; idx < this.subscribers.length; idx++) {
                            if (this.subscribers[idx].subscriber == subscriber) {
                                break;
                            }
                        }
                        ;
                        this.subscribers.splice(idx, 1);
                    }
                    _unsubscribeByHandler(handler) {
                        for (var idx = 0; idx < this.subscribers.length; idx++) {
                            if (this.subscribers[idx].handler == handler) {
                                break;
                            }
                        }
                        ;
                        this.subscribers.splice(idx, 1);
                    }
                }
                binding.Observable = Observable;
                ;
                class ObservableArrayRow {
                    constructor() {
                        this.__isChanged = false;
                        this.__bindVisible = true;
                        this.__subscribers = [];
                    }
                    getAsObject() {
                        var arr = this;
                        var _robj = {};
                        var obj;
                        for (var prop in arr) {
                            if (!prop.startsWith("__")) {
                                obj = arr[prop];
                                _robj[prop] = obj.value;
                            }
                        }
                        ;
                        return _robj;
                    }
                    getAsArray() {
                        var obj = this;
                        var _retAr = [];
                        for (var prop in obj) {
                            if (!prop.startsWith("__")) {
                                _retAr.push({ "Name": prop, "data": obj[prop] });
                            }
                        }
                        ;
                        return _retAr;
                    }
                    subscribe(subscriber, handler, defaultData = undefined) {
                        if (this._handlerExists(subscriber, handler)) {
                            return;
                        }
                        var subscr = new bindingSubscriber();
                        subscr.subscriber = subscriber;
                        subscr.data = defaultData;
                        subscr.handler = handler;
                        this.__subscribers.push(subscr);
                    }
                    _handlerExists(subscriber, handler) {
                        var bRet = false;
                        this.__subscribers.forEach((itm, idx) => {
                            if ((itm.subscriber == subscriber) && (itm.handler == handler)) {
                                bRet = true;
                            }
                        });
                        return bRet;
                    }
                    dispatch(sender, data) {
                        this.__subscribers.forEach((s, idx) => {
                            if (s.subscriber != sender) {
                                if (data === undefined) {
                                    data = s.data;
                                }
                                s.handler(sender, data);
                            }
                        });
                    }
                }
                binding.ObservableArrayRow = ObservableArrayRow;
                class ObservableArray extends Observable {
                    constructor(val, name = undefined) {
                        super();
                        this.computedObservables = [];
                        this.subscribers = [];
                        this.id = my.tools.newGuid();
                        this.value = val;
                        this.name = name;
                    }
                    get filter() {
                        return this._filter;
                    }
                    set filter(val) {
                        this._filter = val;
                        if (val == undefined) {
                            this._value.forEach((itm, idx) => {
                                itm.__bindVisible = true;
                            });
                        }
                    }
                    get oArray() {
                        return this._value;
                    }
                    get value() {
                        var f = this.filter;
                        if (f) {
                            this._value.forEach((itm, idx) => {
                                if (itm.hasOwnProperty(f.column)) {
                                    if ((itm[f.column].value === f.value) || (f.value.toLowerCase() == "all")) {
                                        itm.__bindVisible = true;
                                    }
                                    else {
                                        itm.__bindVisible = false;
                                    }
                                }
                            });
                        }
                        return this._value;
                    }
                    set value(val) {
                        if (val == undefined) {
                            console.log("passing undefined to ObservableArray");
                            return;
                        }
                        this._value = [];
                        if (Array.isArray(val)) {
                            if (val.length > 0) {
                                if (val[0] instanceof my.core.data.binding.ObservableArrayRow) {
                                    this._value = val;
                                }
                                else {
                                    this._encode(val);
                                }
                            }
                        }
                        else {
                            var valCheck = val;
                            if (valCheck.hasOwnProperty("__subscribers")) {
                                this._value = [val];
                            }
                            else {
                                this._encode([val]);
                            }
                        }
                        this.dispatch(this, this._value);
                    }
                    get length() {
                        return this._value.length;
                    }
                    _encode(arr) {
                        arr.forEach((item, idx) => {
                            this._value.push(this._encodeItem(item));
                        });
                    }
                    _encodeItem(obj) {
                        var retRow = new ObservableArrayRow();
                        retRow.__tableName = this.name;
                        for (var prop in obj) {
                            if (Array.isArray(obj[prop])) {
                                retRow[prop] = new ObservableArray(obj[prop], prop);
                            }
                            else {
                                var ob = new Observable(obj[prop]);
                                ob.subscribe(this, (s, d) => {
                                    retRow.dispatch(retRow, d);
                                });
                                retRow[prop] = ob;
                            }
                        }
                        this.computedObservables.forEach((itm, idx) => {
                            var rowComputed = new ComputedObservable(itm.co.computeFunction);
                            rowComputed.data = retRow;
                            retRow[itm.name] = rowComputed;
                        });
                        return retRow;
                    }
                    addComputed(name, co) {
                        this.computedObservables.push({ "name": name, "co": co });
                    }
                    getTotalSum(column) {
                        var ret;
                        this._value.forEach((itm, idx) => {
                            if (idx == 0) {
                                ret = 0;
                            }
                            if (itm[column]) {
                                ret = ret + Number(itm[column].value);
                            }
                        });
                        return ret;
                    }
                    getAsArray(filterCol = undefined, filterVal = undefined) {
                        var ret;
                        ret = this._decode(this._value, filterCol, filterVal);
                        return ret;
                    }
                    getStructureOnly() {
                        var aObj = {};
                        for (var item in this._value[0]) {
                            if (!item.startsWith("__")) {
                                aObj[item] = undefined;
                            }
                        }
                        return aObj;
                    }
                    _decode(arr, filterCol = undefined, filterVal = undefined) {
                        var useFilter = false;
                        if ((filterCol) && (filterVal)) {
                            useFilter = true;
                        }
                        var _arr = [];
                        var obj;
                        arr.forEach((item, idx) => {
                            obj = {};
                            this._decodeItem(item, obj);
                            if (useFilter) {
                                if (obj[filterCol].toLowerCase() == filterVal.toLowerCase()) {
                                    _arr.push(obj);
                                }
                            }
                            else {
                                _arr.push(obj);
                            }
                        });
                        return _arr;
                    }
                    _decodeItem(obj, newobj) {
                        for (var prop in obj) {
                            if (!prop.startsWith("__")) {
                                newobj[prop] = obj[prop].value;
                            }
                        }
                    }
                    findFirst(Name, Value) {
                        var ret;
                        if (Value == undefined) {
                            return ret;
                        }
                        Value = Value.toUpperCase();
                        var searchIn = this.value;
                        for (var i = 0; i < searchIn.length; i++) {
                            if (searchIn[i][Name] !== undefined) {
                                var val = searchIn[i][Name].value.toString();
                                if (val.toUpperCase() == Value) {
                                    ret = searchIn[i];
                                    break;
                                }
                            }
                        }
                        ;
                        return ret;
                    }
                    subscribeForChildChange(func) {
                        var obsrv;
                        this._value.forEach((row, idx) => {
                            row.subscribe(this, func);
                        });
                    }
                }
                binding.ObservableArray = ObservableArray;
                class ComputedObservable {
                    constructor(computeFunction) {
                        this.computeFunction = computeFunction;
                        this.subscribers = [];
                        this.id = my.tools.newGuid();
                        this.items = [];
                    }
                    get value() {
                        this.compute();
                        return this._value;
                    }
                    compute() {
                        if (this.computeFunction) {
                            this._value = this.computeFunction(this.data);
                            this.dispatch(this, this._value);
                        }
                    }
                    subscribe(subscriber, handler, defaultData = undefined) {
                        if (this._subscriberExists(subscriber)) {
                            return;
                        }
                        var subscr = new bindingSubscriber();
                        subscr.subscriber = subscriber;
                        subscr.data = defaultData;
                        subscr.handler = handler;
                        this.subscribers.push(subscr);
                    }
                    _subscriberExists(subscriber) {
                        var bRet = false;
                        this.subscribers.forEach((itm, idx) => {
                            if (itm.subscriber == subscriber) {
                                bRet = true;
                            }
                        });
                        return bRet;
                    }
                    dispatch(sender, data) {
                        if (data != this._value) {
                            this._value = data;
                        }
                        if (this.onValueChange != undefined) {
                            this.onValueChange(data);
                        }
                        this.subscribers.forEach((s, idx) => {
                            if (s.subscriber != sender) {
                                if (data === undefined) {
                                    data = s.data;
                                }
                                s.handler(sender, data);
                                console.log(sender.constructor.name + "; with id:" + this.id + " notified " + this.subscribers.length + " subscribers");
                            }
                        });
                    }
                    unsubscribe(param) {
                        if (typeof (param) == "object") {
                            this._unsubscribeBySubscriber(param);
                        }
                        else {
                            this._unsubscribeByHandler(param);
                        }
                    }
                    _unsubscribeBySubscriber(subscriber) {
                        for (var idx = 0; idx < this.subscribers.length; idx++) {
                            if (this.subscribers[idx].subscriber == subscriber) {
                                break;
                            }
                        }
                        ;
                        this.subscribers.splice(idx, 1);
                    }
                    _unsubscribeByHandler(handler) {
                        for (var idx = 0; idx < this.subscribers.length; idx++) {
                            if (this.subscribers[idx].handler == handler) {
                                break;
                            }
                        }
                        ;
                        this.subscribers.splice(idx, 1);
                    }
                }
                binding.ComputedObservable = ComputedObservable;
                ;
                class ReadOnlyBind {
                    constructor(element, property, changeEvent) {
                        this.changeEvent = changeEvent;
                        this._property = property;
                        this._element = element;
                    }
                    get _value() {
                        return this._element[this._property];
                    }
                    set _value(val) {
                        this._element[this._property] = val;
                    }
                    set value(val) {
                        if ((typeof (val) == "string") || (typeof (val) == "number") || (typeof (val) == "boolean")) {
                            this._value = val;
                            if (this._valueBind) {
                                this.raiseBaidingChange(val);
                            }
                        }
                        else if (val instanceof my.core.data.binding.Observable) {
                            this._valueBind = val;
                            this._value = val.value;
                            val.subscribe(this, this.onBaidingChange.bind(this));
                        }
                    }
                    ;
                    get value() {
                        return this._value;
                    }
                    onBaidingChange(sender, data) {
                        this._value = data;
                    }
                    raiseBaidingChange(data) {
                        this._valueBind.dispatch(this, data);
                        if (this.changeEvent) {
                            this.changeEvent.dispatch(this, data);
                        }
                    }
                }
                binding.ReadOnlyBind = ReadOnlyBind;
            })(binding = data_1.binding || (data_1.binding = {}));
            ;
        })(data = core.data || (core.data = {}));
        ;
    })(core = my.core || (my.core = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    "use strict";
    let data;
    (function (data_2) {
        class iFilter {
        }
        data_2.iFilter = iFilter;
    })(data = my.data || (my.data = {}));
    let core;
    (function (core) {
        let data;
        (function (data_3) {
            class DataSet {
                constructor(tableNames) {
                    this.tableNames = [];
                    this.tables = {};
                    this.monitorForitemChanges = false;
                    tableNames = tableNames.replace(" ", "");
                    this.tableNames = tableNames.split(",");
                    this.primaryTable = this.tableNames[0];
                    this.events = new my.core.data.Events();
                }
                get data() {
                    return this.tables;
                }
                ;
                set data(val) {
                    var tablesInObject = [];
                    if (typeof (val) == 'object') {
                        tablesInObject = Object.getOwnPropertyNames(val);
                    }
                    var tablesFound = 0;
                    this.tableNames.forEach((item, idx) => {
                        if (val.hasOwnProperty(item)) {
                            tablesFound = tablesFound + 1;
                        }
                    });
                    console.log("Dataset value update, Found:" + tablesFound + " From:" + this.tableNames.length);
                    tablesInObject.forEach((tblName, idx) => {
                        this._parseTable(val, tblName);
                    });
                    this.events.Loaded.dispatch(this, this.tables);
                    console.log("Data.Events.Loaded.dispatched");
                }
                ;
                ;
                _parseTable(val, tableName) {
                    if (val[tableName] instanceof my.core.data.binding.ObservableArray) {
                        this.tables[tableName].value = val[tableName].getAsArray();
                    }
                    else if (val[tableName] instanceof my.core.data.binding.ObservableArrayRow) {
                        console.error("Psssing Observable Row to dataset");
                        this.tables[tableName].value = val[tableName].getAsObject();
                    }
                    else {
                        if (this.tables[tableName]) {
                            this.tables[tableName].value = val[tableName];
                        }
                        else {
                            this.tables[tableName] = new my.core.data.binding.ObservableArray(val[tableName], tableName);
                        }
                        if (this.monitorForitemChanges) {
                            this.tables[tableName].subscribe(this, this._onTableModified.bind(this));
                        }
                    }
                }
                _onTableModified(s, d) {
                    this.events.Modified.dispatch(this, d);
                }
            }
            data_3.DataSet = DataSet;
            ;
            class DataTable extends my.core.data.binding.Observable {
                constructor(val, name = undefined) {
                    super();
                    this.subscribers = [];
                    this.id = my.tools.newGuid();
                    this.value = val;
                    if (name == undefined) {
                        name = "default_table_name";
                    }
                    this.tableName = name;
                    this.pageCurrent = 1;
                    this.pageSize = 10;
                    this.filters = new my.core.data.filterManager(this);
                }
                get value() {
                    return this.rows;
                }
                set value(val) {
                    if (val == undefined) {
                        console.log("passing undefined to DataTable");
                        return;
                    }
                    this.rows = [];
                    if (Array.isArray(val)) {
                        if (val.length > 0) {
                            this.parse(val);
                        }
                    }
                    else {
                        this.parse([val]);
                    }
                }
                get length() {
                    return this.rows.length;
                }
                orderBy(orderBy, type = "ASC", notify = true) {
                    if (!orderBy) {
                        return;
                    }
                    this.currentOrderBy = orderBy;
                    var sortColumn = orderBy;
                    this.rows = this.rows.sort((n1, n2) => {
                        var el1 = n1.items[sortColumn].value + "";
                        var el2 = n2.items[sortColumn].value + "";
                        if (el1 == null) {
                            el1 = "";
                        }
                        if (el2 == null) {
                            el2 = "";
                        }
                        if (type == "ASC") {
                            return el1.localeCompare(el2);
                        }
                        else {
                            return el1.localeCompare(el2) * -1;
                        }
                    });
                    this.filterRows();
                    if (notify) {
                        this.dispatch(this, undefined);
                    }
                }
                filterBy(filterValue) {
                    var f;
                    if ((filterValue != undefined) || (filterValue != "")) {
                        f = new my.data.Filter("ALL_COLUMNS", filterValue);
                        this.filters.add(f);
                    }
                    else {
                        this.filters.remove("ALL_COLUMNS");
                    }
                    return this.filterRows();
                }
                filterRows() {
                    var currentPage = 1;
                    var itemsInPage = 0;
                    var visibleItems = 0;
                    this.rows.forEach((row, idx) => {
                        if (this.filters.items.length > 0) {
                            row.__bindVisible = row.hasValues(this.filters.items);
                        }
                        else {
                            row.__bindVisible = true;
                        }
                        if (row.__bindVisible) {
                            visibleItems++;
                            row.__page = currentPage;
                            itemsInPage++;
                            if (itemsInPage == this.pageSize) {
                                currentPage++;
                                itemsInPage = 0;
                            }
                        }
                    });
                    this.dispatch(this, undefined);
                    return visibleItems;
                }
            }
            data_3.DataTable = DataTable;
            class DataColumn {
                constructor() {
                    this.Type = "observable";
                }
            }
            data_3.DataColumn = DataColumn;
            class DataRow {
                constructor(data, table) {
                    this.items = {};
                    this.__bindVisible = true;
                    this.__page = 0;
                    this.tableName = table;
                    this.subscribers = [];
                    this.itemsArray = [];
                    if (data) {
                        this._parse(data);
                    }
                }
                _parse(data) {
                    this.items = [];
                    for (var prop in data) {
                        var val = new my.data.binding.Observable(data[prop]);
                        var i = this._addColumn(prop, val);
                        this.itemsArray.push(i);
                        this.items[i.Name] = i.Data;
                    }
                }
                _addColumn(name, value, subscribeForChanges = true) {
                    var i = new DataColumn();
                    i.Name = name;
                    i.Data = value;
                    if (subscribeForChanges) {
                        i.Data.subscribe(this, (s, d) => {
                            if (this.RowState == "Unchanged") {
                                this.setModified();
                            }
                            if (this.RowState == undefined) {
                                this.RowState = "Unchanged";
                            }
                            else {
                                this.dispatch(this, d);
                            }
                            this._onRowChange();
                        });
                    }
                    return i;
                }
                _onRowChange() {
                    this.itemsArray.forEach((itm, idx) => {
                        if (itm.Data instanceof my.data.binding.ComputedObservable) {
                            itm.Data.computeFunction(this);
                        }
                    });
                }
                AcceptChanges() {
                    this.RowState = "Unchanged";
                }
                delete() {
                    this.RowState = "Deleted";
                }
                setAdded() {
                    this.RowState = "Added";
                }
                setModified() {
                    this.RowState = "Modified";
                }
                hasValue(value) {
                    var bRet = false;
                    this.itemsArray.forEach((col, idx) => {
                        if (col.Data.value.toString().toLocaleUpperCase().includes(value.toLocaleUpperCase())) {
                            bRet = true;
                        }
                    });
                    return bRet;
                }
                hasValues(arrFilters) {
                    var bRet = false;
                    arrFilters.forEach((f, fIdx) => {
                        this.itemsArray.forEach((col, cIdx) => {
                            if ((f.column == "ALL_COLUMNS") || (col.Name.toUpperCase() == f.column.toUpperCase())) {
                                if (col.Data.value.toString().toLocaleUpperCase().includes(f.value.toLocaleUpperCase())) {
                                    bRet = true;
                                }
                            }
                        });
                    });
                    return bRet;
                }
                subscribe(subscriber, handler, defaultData = undefined) {
                    if (this._handlerExists(subscriber, handler)) {
                        return;
                    }
                    var subscr = new my.core.data.binding.bindingSubscriber();
                    subscr.subscriber = subscriber;
                    subscr.data = defaultData;
                    subscr.handler = handler;
                    this.subscribers.push(subscr);
                }
                _handlerExists(subscriber, handler) {
                    var bRet = false;
                    this.subscribers.forEach((itm, idx) => {
                        if ((itm.subscriber == subscriber) && (itm.handler == handler)) {
                            bRet = true;
                        }
                    });
                    return bRet;
                }
                dispatch(sender, data) {
                    this.subscribers.forEach((s, idx) => {
                        if (s.subscriber != sender) {
                            if (data === undefined) {
                                data = s.data;
                            }
                            s.handler(sender, data);
                        }
                    });
                }
            }
            data_3.DataRow = DataRow;
            class Events {
                constructor() {
                    this.Modified = new my.core.events.core("data_Modified");
                    this.Loaded = new my.core.events.core("data_Loaded");
                }
            }
            data_3.Events = Events;
            class filterManager {
                constructor(parent) {
                    this.parentTable = parent;
                    this.items = [];
                }
                get SQL() {
                    var sSQL = ' AND ';
                    this.items.forEach(function (item, idx) {
                        +item.dataColumn + " = ";
                        if (Number(this.value) === NaN) {
                            sSQL = sSQL + "'" + this.value + "'";
                        }
                        else {
                            sSQL = sSQL + this.value;
                        }
                    }.bind(this));
                    return sSQL;
                }
                ;
                ;
                by(column, value) {
                    var idx = this.indexOf(column);
                    if (idx > -1) {
                        if (value.length > 0) {
                            this.items[idx].value = value;
                        }
                        else {
                            this.remove(column);
                        }
                    }
                    else {
                        var f = new my.data.Filter(column, value);
                        this.add(f);
                    }
                    this.parentTable.dispatch(this, undefined);
                }
                add(filter) {
                    this.items.push(filter);
                }
                remove(column) {
                    var idx = this.indexOf(column);
                    this.items.splice(idx, 1);
                }
                indexOf(dataColumn) {
                    var ret = undefined;
                    this.items.forEach(function (item, idx) {
                        if (item.column === dataColumn) {
                            ret = idx;
                        }
                    });
                    return ret;
                }
            }
            data_3.filterManager = filterManager;
            ;
        })(data = core.data || (core.data = {}));
        ;
    })(core = my.core || (my.core = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let core;
    (function (core) {
        let controls;
        (function (controls) {
            let validation;
            (function (validation) {
                class validationGroup {
                    constructor(parent) {
                        this.rules = [];
                        this._isValid = true;
                        this.parent = parent;
                    }
                    get isValid() {
                        return this._isValid;
                    }
                    set isValid(val) {
                        this._isValid = val;
                        this.parent.events.valueValidated.dispatch(this, this.isValid);
                    }
                    validate(value) {
                        var res = true;
                        this.rules.forEach((rule, idx) => {
                            if (rule.validate(value) == false) {
                                res = false;
                                this.errorText = rule.message;
                            }
                        });
                        this.isValid = res;
                        return this.isValid;
                    }
                    add(type, message = undefined, customFunc = undefined) {
                        var rule;
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
                    remove(val) {
                        const index = this.rules.indexOf(val, 0);
                        if (index > -1) {
                            this.rules.splice(index, 1);
                        }
                    }
                    getByType(type) {
                        var ret;
                        for (var i = 0; i < this.rules.length; ++i) {
                            if (this.rules[i].type == type) {
                                ret = this.rules[i];
                                break;
                            }
                        }
                        return ret;
                    }
                }
                validation.validationGroup = validationGroup;
                class vrRequired {
                    constructor(message = undefined) {
                        if (message) {
                            this.message = message;
                        }
                        else {
                            this.message = "the filed is required";
                        }
                    }
                    validate(val) {
                        var ret = false;
                        var v;
                        if ((typeof val === "object") && (val !== null)) {
                            return true;
                        }
                        v = val;
                        if ((v != undefined) && (v !== "")) {
                            if (this.customFunc != undefined) {
                                ret = this.customFunc(v);
                            }
                            else {
                                ret = true;
                            }
                        }
                        if (ret == false) {
                            console.log("required validation result:" + ret);
                        }
                        return ret;
                    }
                }
                validation.vrRequired = vrRequired;
                class vrCustom {
                    constructor(message = undefined) {
                        if (message) {
                            this.message = message;
                        }
                        else {
                            this.message = "custom validation text";
                        }
                    }
                    validate(val) {
                        var ret = true;
                        if (this.customFunc != undefined) {
                            ret = this.customFunc(val);
                        }
                        if (ret == false) {
                        }
                        return ret;
                    }
                }
                validation.vrCustom = vrCustom;
            })(validation = controls.validation || (controls.validation = {}));
            ;
        })(controls = core.controls || (core.controls = {}));
        ;
    })(core = my.core || (my.core = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    "use strict";
    let controls;
    (function (controls) {
        ;
        let Direction;
        (function (Direction) {
            Direction["Up"] = "UP";
            Direction["Down"] = "DOWN";
            Direction["Left"] = "LEFT";
            Direction["Right"] = "RIGHT";
        })(Direction || (Direction = {}));
    })(controls = my.controls || (my.controls = {}));
    let core;
    (function (core_2) {
        let controls;
        (function (controls) {
            class Events {
                constructor(Target) {
                    this.target = Target;
                    this.valueChanged = new my.core.events.core("valueChanged");
                    this.dataChanged = new my.core.events.core("dataChanged");
                    this.valueValidated = new my.core.events.core("valueValidated");
                    this.click = new my.core.events.htmlCore(this.target, "click");
                    this.dblclick = new my.core.events.htmlCore(this.target, "dblclick");
                    this.focus = new my.core.events.htmlCore(this.target, "focus");
                    this.keypress = new my.core.events.htmlCore(this.target, "keypress");
                    this.keydown = new my.core.events.htmlCore(this.target, "keydown");
                    this.keyup = new my.core.events.htmlCore(this.target, "keyup");
                    this.change = new my.core.events.htmlCore(this.target, "change");
                    this.mouseover = new my.core.events.htmlCore(this.target, "mouseover");
                    this.mouseenter = new my.core.events.htmlCore(this.target, "mouseenter");
                    this.mouseleave = new my.core.events.htmlCore(this.target, "mouseleave");
                }
            }
            controls.Events = Events;
            class core {
                constructor(htmlType) {
                    this.ctluid = my.tools.newGuid();
                    this.isTwoWayBinding = true;
                    this.elementAttr = [];
                    this.element = document.createElement(htmlType);
                    this.events = new Events(this);
                    var cls = this.constructor;
                    this.element.setAttribute('data-ctl', cls.name);
                    this.style = this.element.style;
                    this.validation = new my.core.controls.validation.validationGroup(this);
                }
                get id() {
                    if (!this._id) {
                        this._id = my.tools.newGuid();
                    }
                    return this._id;
                }
                ;
                set id(val) { this._id = val; }
                ;
                get visible() {
                    return Boolean(this.element.classList.contains("active"));
                }
                set visible(val) {
                    if (val) {
                        this.style.display = "";
                    }
                    else {
                        this.style.display = "none";
                    }
                }
                appendControl(control) { this.element.appendChild(control.element); }
                ;
                set value(val) {
                    if ((this.validation) && (!this.validation.validate(val))) {
                        return;
                    }
                    if ((val instanceof my.core.data.binding.Observable) || (val instanceof my.core.data.binding.ComputedObservable)) {
                        this._valueBind = val;
                        this._value = val.value;
                        val.subscribe(this, this.onBaidingChange.bind(this));
                    }
                    else {
                        this._value = val;
                        if (this._valueBind) {
                            this.raiseValueChange(val);
                        }
                    }
                }
                ;
                get value() {
                    return this._value;
                }
                onBaidingChange(sender, data) {
                    this._value = data;
                }
                raiseValueChange(data) {
                    if (this.isTwoWayBinding) {
                        this._valueBind.dispatch(this, data);
                    }
                    this.events.valueChanged.dispatch(this, data);
                }
                set tooltip(val) {
                    this.element.setAttribute('data-tooltip', val);
                    this.element.onmouseenter = (ev) => {
                    };
                    this.element.classList.add("tooltip");
                    if (this._tooltipPlaceholder == undefined) {
                        this._tooltipPlaceholder = document.createElement("span");
                        this._tooltipPlaceholder.classList.add("tooltiptext");
                    }
                    this._tooltipPlaceholder.innerText = val;
                    this.element.appendChild(this._tooltipPlaceholder);
                    if (val) {
                        var minWidth = val.length * 8;
                        if (minWidth > 200) {
                            minWidth = 200;
                        }
                    }
                    this._tooltipPlaceholder.style.minWidth = minWidth + "px";
                }
                set tooltipPlacement(val) {
                    this.element.setAttribute('data-placement', val);
                }
                ;
                focus() {
                    this.element.focus();
                }
                ;
            }
            controls.core = core;
            class coreData extends core {
                set data(val) {
                    if (val) {
                        if (!(val instanceof my.core.data.DataTable)) {
                            console.log("Invalid Data Format passed to \"Data\" property!");
                            return;
                        }
                        this._dataTable = val;
                        this.rebind();
                        val.subscribe(this, this.onBaidingChange.bind(this));
                        this.events.dataChanged.dispatch(this, core_2.data);
                    }
                }
                ;
                get data() {
                    return this._dataTable;
                }
                onBaidingChange(sender, data) {
                    this.rebind();
                }
                raiseDataBaidingChange(data) {
                    this._dataTable.dispatch(this, data);
                    this.events.valueChanged.dispatch(this, data);
                }
            }
            controls.coreData = coreData;
        })(controls = core_2.controls || (core_2.controls = {}));
    })(core = my.core || (my.core = {}));
})(my || (my = {}));
var my;
(function (my) {
    "use strict";
    let dts;
    (function (dts) {
        class connResponce {
            constructor(strJSON) {
                this.result = false;
                this.text = "invaid format from server responce";
                this.details = "";
                var sJSON = this._parseJSON(strJSON);
                if (sJSON) {
                    if (sJSON.result) {
                        this.result = sJSON.result;
                    }
                    if (sJSON.text) {
                        this.text = sJSON.text;
                    }
                    if (sJSON.details) {
                        this.details = sJSON.details;
                    }
                    if (sJSON.result) {
                        this.data = sJSON.data;
                    }
                }
                else {
                    this.result = true;
                    this.data = strJSON;
                }
            }
            _parseJSON(str) {
                var resp;
                try {
                    resp = JSON.parse(str);
                }
                catch (e) {
                    return undefined;
                }
                return resp;
            }
        }
        dts.connResponce = connResponce;
        ;
    })(dts = my.dts || (my.dts = {}));
    ;
    let core;
    (function (core_3) {
        let dts;
        (function (dts) {
            class core {
                constructor() {
                    this.type = 'POST';
                    this.headers = [];
                }
                Call() {
                    var self = this;
                    var xhr = new XMLHttpRequest();
                    xhr.open(this.type, this.url, true);
                    if ((this.type == 'POST') || (this.type == 'PUT')) {
                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    }
                    if (this.headers.length > 0) {
                        this.headers.forEach((itm, idx) => {
                            xhr.setRequestHeader(itm.Key, itm.Value);
                        });
                    }
                    if (this.token) {
                        xhr.setRequestHeader("x-access-token", this.token);
                    }
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            if (xhr.status === 200) {
                                self._onSuccess(xhr);
                                console.log("recponce received from: " + self.url);
                            }
                            else {
                                if (xhr.status === 401) {
                                    self._onError401(xhr);
                                }
                                console.log("onreadystatechange.status: " + xhr.status);
                            }
                        }
                        else {
                        }
                    };
                    xhr.onerror = function (a) {
                        my.tools.log("DTS error: " + xhr.statusText);
                        self._onError(xhr);
                    };
                    if (typeof (this.data) == "string") {
                        xhr.send(this.data);
                    }
                    else {
                        xhr.send(this.serialize(this.data));
                    }
                }
                ;
                _onError401(xhr) {
                    var cRes = new my.dts.connResponce("{}");
                    cRes.text = "server not autorized";
                    cRes.details = "status:" + xhr.status + ", " + xhr.statusText;
                    my.events.global.standard.dispatch(this, "error:401", cRes);
                    if (this.onError401) {
                        this.onError401(this, cRes);
                    }
                    console.log(xhr.status);
                }
                ;
                _onError(xhr) {
                    var cRes = new my.dts.connResponce("{}");
                    cRes.text = "server error";
                    cRes.details = "status:" + xhr.status + ", " + xhr.statusText;
                    if (this.onError) {
                        this.onError(this, cRes);
                    }
                    console.log(xhr.status);
                }
                ;
                _onSuccess(xhr) {
                    var cRes = new my.dts.connResponce(xhr.responseText);
                    cRes.xhr = xhr;
                    if (cRes.result) {
                        if (this.onSuccess) {
                            this.onSuccess(this, cRes);
                        }
                    }
                    else {
                        if (this.onError) {
                            this.onError(this, cRes);
                        }
                    }
                }
                ;
                serialize(obj) {
                    var str = [];
                    for (var p in obj)
                        if (obj.hasOwnProperty(p)) {
                            str.push(p + "=" + obj[p]);
                        }
                    return str.join("&");
                }
            }
            dts.core = core;
            ;
        })(dts = core_3.dts || (core_3.dts = {}));
        ;
    })(core = my.core || (my.core = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    "use strict";
    let dts;
    (function (dts) {
        class conn {
            constructor(url) {
                this.url = url;
                this.token = my.tools.getCookie("x-access-token");
            }
            set url(val) {
                this.urlGet = val;
                this.urlPost = val;
                this.urlCommit = val;
                this.urlDelete = val;
            }
            get(onSuccess = undefined, onError = undefined, params = undefined) {
                this._getDTS = new my.core.dts.core();
                this._getDTS.url = this.urlGet;
                this._getDTS.token = this.token;
                this._getDTS.type = 'GET';
                if (params) {
                    this._getDTS.url = this._getDTS.url + "/" + this._URLFriendly(params);
                }
                this._getDTS.onSuccess = onSuccess;
                this._getDTS.onError = onError;
                this._getDTS.Call();
            }
            ;
            post(data, onSuccess = undefined, onError = undefined) {
                this._postDTS = new my.core.dts.core();
                this._postDTS.url = this.urlPost;
                this._postDTS.token = this.token;
                this._postDTS.type = 'POST';
                this._postDTS.data = data;
                this._postDTS.onSuccess = onSuccess;
                this._postDTS.onError = onError;
                this._postDTS.Call();
            }
            ;
            postDataTable(data, onSuccess = undefined, onError = undefined) {
                this._postDTS = new my.core.dts.core();
                this._postDTS.url = this.urlPost;
                this._postDTS.token = this.token;
                this._postDTS.type = 'POST';
                this._postDTS.data = this._formatData(data, 'COMMIT');
                this._postDTS.onSuccess = onSuccess;
                this._postDTS.onError = onError;
                this._postDTS.Call();
            }
            ;
            put(data, onSuccess = undefined, onError = undefined) {
                this._postDTS = new my.core.dts.core();
                this._postDTS.url = this.urlCommit;
                this._postDTS.token = this.token;
                this._postDTS.type = 'PUT';
                this._postDTS.data = data;
                this._postDTS.onSuccess = onSuccess;
                this._postDTS.onError = onError;
                this._postDTS.Call();
            }
            ;
            putDataTable(data, onSuccess = undefined, onError = undefined) {
                this._postDTS = new my.core.dts.core();
                this._postDTS.url = this.urlCommit;
                this._postDTS.token = this.token;
                this._postDTS.type = 'PUT';
                this._postDTS.data = this._formatData(data, 'COMMIT');
                this._postDTS.onSuccess = onSuccess;
                this._postDTS.onError = onError;
                this._postDTS.Call();
            }
            ;
            delete(uid, table, onSuccess = undefined, onError = undefined) {
                this._postDTS = new my.core.dts.core();
                if (table !== undefined) {
                    this._postDTS.url = this.urlDelete + "/" + this._URLFriendly([{ "del": uid, "table": table }]);
                }
                else {
                    this._postDTS.url = this.urlDelete + "/" + this._URLFriendly([{ "del": uid }]);
                }
                this._postDTS.token = this.token;
                this._postDTS.type = 'DELETE';
                this._postDTS.data = this._formatData({ "tableDel": table }, 'DELETE');
                this._postDTS.onSuccess = onSuccess;
                this._postDTS.onError = onError;
                this._postDTS.Call();
            }
            ;
            _formatData(data, type = 'COMMIT') {
                var obj = {};
                obj['requestType'] = type;
                var rData = {};
                var _arr = [];
                switch (type) {
                    case 'COMMIT':
                        {
                            rData = data;
                            break;
                        }
                    default:
                        {
                            rData = data;
                        }
                }
                obj['requestData'] = my.tools.B64Encode(JSON.stringify(rData));
                return obj;
            }
            _URLFriendly(arr) {
                var str = [];
                arr.forEach((itm, idx) => {
                    for (var prop in itm) {
                        var v = itm[prop];
                        if (v !== null) {
                            if (prop == "") {
                                str.push(encodeURIComponent(v));
                            }
                            else {
                                str.push(encodeURIComponent(prop) + "/" + encodeURIComponent(v));
                            }
                        }
                    }
                });
                return str.join("/");
            }
        }
        dts.conn = conn;
        ;
    })(dts = my.dts || (my.dts = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    "use strict";
    let data;
    (function (data_4) {
        let binding;
        (function (binding) {
            class Observable extends my.core.data.binding.Observable {
                constructor(val) {
                    super(val);
                }
            }
            binding.Observable = Observable;
            ;
            class ReadOnlyBind extends my.core.data.binding.ReadOnlyBind {
                constructor(element, property, changeEvent = undefined) {
                    super(element, property, changeEvent);
                }
            }
            binding.ReadOnlyBind = ReadOnlyBind;
            class ComputedObservable extends my.core.data.binding.ComputedObservable {
                constructor(computeFunction) {
                    super(computeFunction);
                }
            }
            binding.ComputedObservable = ComputedObservable;
        })(binding = data_4.binding || (data_4.binding = {}));
        ;
        class Filter {
            constructor(col = "ALL_COLUMNS", val) {
                this.column = col;
                this.value = val;
            }
        }
        data_4.Filter = Filter;
        class DataSet extends my.core.data.DataSet {
            constructor(tables) {
                super(tables);
                this.eventNotificationCode = "DataSet";
                this.filtersForRequest = [];
                this.filtersForResponce = [];
                this.deleteRequiresTableName = false;
                this.workMode = "online";
                this._isLiveUpdate = false;
                this._generateTables(this.tableNames);
                this.server = new data_4.ServerDataSet(this);
                this.events.Modified.subscribe(this, this.onChildElementDataChange.bind(this));
            }
            get url() {
                return this.server.url;
            }
            set url(val) {
                this.server.url = val;
            }
            get isLiveUpdate() {
                return this._isLiveUpdate;
            }
            set isLiveUpdate(val) {
                this.monitorForitemChanges = val;
                this._isLiveUpdate = val;
            }
            ;
            _generateTables(tablNames) {
                this.tables = [];
                tablNames.forEach((tName, idx) => {
                    this.tables[tName] = new my.data.DataTable([], tName);
                });
            }
            getData(params = undefined) {
                if (this.workMode == "offline") {
                    this.local.getData(params);
                }
                else {
                    this.server.getData(params);
                }
            }
            sendData(data, onSuccesshandler) {
                if (this.workMode == "offline") {
                    this.local.sendData(data, onSuccesshandler);
                }
                else {
                    this.server.sendData(data, onSuccesshandler);
                }
            }
            delData(uid, table, onSuccesshandler) {
                if (this.deleteRequiresTableName == false) {
                    table = undefined;
                }
                if (this.workMode == "offline") {
                    this.local.delData(uid, table, onSuccesshandler);
                }
                else {
                    this.server.delData(uid, table, onSuccesshandler);
                }
            }
            onChildElementDataChange(sender, event, data) {
                if (this.isLiveUpdate) {
                    this.sendData(data.row, this.onSuccess);
                }
            }
            getTable(tblName = "default") {
                var ret;
                if (tblName == "default") {
                    ret = this.tables[this.primaryTable];
                }
                else {
                    if (this.data[tblName]) {
                        ret = this.tables[tblName];
                    }
                    else {
                        console.log("Unable to find table: " + tblName);
                    }
                }
                return ret;
            }
        }
        data_4.DataSet = DataSet;
        class DataTable extends my.core.data.DataTable {
            constructor(val, name = undefined) {
                super(val, name);
                this.columns = [];
            }
            get length() {
                return this.rows.length;
            }
            parse(arr) {
                this._parseCoumns(arr[0]);
                this.rows = [];
                var currentPage = 1;
                var itemsInPage = 0;
                arr.forEach((item, idx) => {
                    var row = this._parseRow(item);
                    row.__page = currentPage;
                    itemsInPage++;
                    if (itemsInPage == this.pageSize) {
                        currentPage++;
                        itemsInPage = 0;
                    }
                    this.rows.push(row);
                });
            }
            _parseRow(obj) {
                var retRow = new my.data.DataRow(obj, this.tableName);
                retRow.subscribe(this, this._onRowChange.bind(this));
                this.columns.forEach((col, idx) => {
                    if (col.Type == "computed") {
                        retRow.addComputedColumn(col.Name, col.ComputeFunc);
                    }
                });
                return retRow;
            }
            _parseCoumns(obj) {
                if ((this.columns == undefined) || (this.columns.length == 0)) {
                    this.columns = [];
                }
                for (var prop in obj) {
                    var col = new DataColumn();
                    col.Name = prop;
                    this._addColumn(col);
                    if (Array.isArray(obj[prop])) {
                        console.error("sub Array structures are not supported in DataTable");
                    }
                }
            }
            _addColumn(col) {
                var isNewColumn = true;
                this.columns.forEach((itm, idx) => {
                    if (itm.Name == col.Name) {
                        isNewColumn = false;
                    }
                });
                if (isNewColumn) {
                    this.columns.push(col);
                }
            }
            _onRowChange(row, value) {
                var tableChangeData = { "table": this, "row": row, "value": value };
                this.dispatch(this, tableChangeData);
            }
            newRow() {
                var obj = {};
                this.columns.forEach((col, idx) => {
                    obj[col.Name] = undefined;
                });
                var retRow = new DataRow(undefined, this.tableName);
                this.columns.forEach((col, idx) => {
                    if (col.Type == "observable") {
                        retRow.addColumn(col.Name, undefined);
                    }
                    else {
                        retRow.addComputedColumn(col.Name, col.ComputeFunc);
                    }
                });
                return retRow;
            }
            addComputedColumn(name, fCompute) {
                var col = new DataColumn();
                col.Name = name;
                col.ComputeFunc = fCompute;
                col.Type = "computed";
                this.columns.push(col);
                if (this.rows.length > 0) {
                    this.rows.forEach((row, idx) => {
                        row.addComputedColumn(col.Name, col.ComputeFunc);
                    });
                }
            }
            findFirst(Name, Value) {
                var ret;
                if (Value == undefined) {
                    return ret;
                }
                Value = Value.toUpperCase();
                var searchIn = this.value;
                for (var i = 0; i < searchIn.length; i++) {
                    var a = searchIn[i].items[Name];
                    if (a !== undefined) {
                        var val = a.value.toString();
                        if (val.toUpperCase() == Value) {
                            ret = searchIn[i];
                            break;
                        }
                    }
                }
                ;
                return ret;
            }
            getFilteredArray(filterCol, filterVal) {
                var arrRet = [];
                this.rows.forEach((row, idx) => {
                    var d = row.items[filterCol];
                    if (d) {
                        if (d.value.toString().toUpperCase() == filterVal.toUpperCase()) {
                            arrRet.push(row.getAsObject());
                        }
                    }
                });
                return arrRet;
            }
        }
        data_4.DataTable = DataTable;
        class DataColumn extends my.core.data.DataColumn {
        }
        data_4.DataColumn = DataColumn;
        class DataRow extends my.core.data.DataRow {
            constructor(data, table) {
                super(data, table);
            }
            getAsObject() {
                var oRet = {};
                this.itemsArray.forEach((itm, idx) => {
                    oRet[itm.Name] = itm.Data.value;
                });
                return oRet;
            }
            getAsJSONReadyObject() {
                var oRet = {};
                var obj = this.getAsObject();
                if (obj["UID"] == null) {
                    obj["UID"] = undefined;
                }
                oRet[this.tableName] = [obj];
                return oRet;
            }
            addColumn(name, value) {
                var val = new my.data.binding.Observable(value);
                var i = this._addColumn(name, val);
                this.itemsArray.push(i);
                this.items[i.Name] = i.Data;
            }
            addComputedColumn(name, fCompute) {
                var val = new my.data.binding.ComputedObservable(fCompute);
                var i = this._addColumn(name, val, false);
                this.itemsArray.push(i);
                this.items[i.Name] = i.Data;
            }
        }
        data_4.DataRow = DataRow;
    })(data = my.data || (my.data = {}));
})(my || (my = {}));
var my;
(function (my) {
    let controls;
    (function (controls) {
        class ctlButton extends my.core.controls.core {
            constructor(text, clickHandler) {
                super('input');
                this.ctlType = "ctlButton";
                this.readOnly = false;
                this.validation = undefined;
                this.element.type = "button";
                this.value = text;
                this.events.click.subscribe(this, clickHandler);
                this.css = new my.css.Button(this.element);
            }
            set _value(val) {
                this.element.value = val;
            }
            get _value() {
                return this.element.value;
            }
            get disabled() { return this.element.disabled; }
            ;
            set disabled(val) { this.element.disabled = val; }
            ;
        }
        controls.ctlButton = ctlButton;
        class ctlText extends my.core.controls.core {
            constructor(text) {
                super('div');
                this.ctlType = "ctlText";
                this.readOnly = false;
                this.reset = () => { this._value = undefined; };
                this._isPassword = false;
                this._align = "right";
                this.elementIconPH = document.createElement('div');
                this.element.appendChild(this.elementIconPH);
                this.elementErrorPH = document.createElement('div');
                this.element.appendChild(this.elementErrorPH);
                this.elementText = document.createElement('input');
                this.elementText.type = "text";
                this.element.appendChild(this.elementText);
                this.eventElement = this.elementText;
                this.value = text;
                this.css = new my.css.Text(this.element);
                this.events.change.subscribe(this, this.onValueChange.bind(this));
                this.events.valueValidated.subscribe(this, this._onValueValidated.bind(this));
            }
            get placeholderText() { return this.elementText.placeholder; }
            set placeholderText(val) { this.elementText.placeholder = val; }
            get disabled() { return this.elementText.disabled; }
            set disabled(val) { this.elementText.disabled = val; }
            get maxlength() {
                return this.elementText.maxLength;
            }
            set maxlength(val) {
                this.elementText.maxLength = val;
            }
            get isPassword() {
                return this._isPassword;
            }
            set isPassword(val) {
                this._isPassword = val;
                if (val) {
                    this.elementText.type = "password";
                }
                else {
                    this.elementText.type = "text";
                }
            }
            get _value() {
                return this.elementText.value;
            }
            set _value(val) {
                if (val == undefined) {
                    val = "";
                }
                this.elementText.value = val;
            }
            get text() {
                return this.elementText.value;
            }
            set text(val) {
                this.elementText.value = val;
            }
            get enableClear() {
                return this._enableClear;
            }
            set enableClear(val) {
                this._enableClear = val;
                this._addIcoButton(val, "Search");
            }
            get allowedChars() {
                return this._allowedChars;
            }
            set allowedChars(val) {
                this._restrictInput(val);
                this._allowedChars = val;
            }
            get align() {
                return this._align;
            }
            set align(val) {
                this._align = val;
                if (val != "left") {
                    this.elementText.style.textAlign = val;
                }
                else {
                    this.elementText.style.textAlign = "";
                }
            }
            _onValueValidated(s, e, d) {
                if (this.validation.isValid) {
                    this.elementErrorPH.innerHTML = "";
                    this.element.classList.remove("error");
                }
                else {
                    var ico = new my.controls.ctlIcon("error");
                    this.elementErrorPH.innerHTML = "";
                    this.elementErrorPH.appendChild(ico.element);
                    ico.tooltip = this.validation.errorText;
                    this.element.classList.add("error");
                }
            }
            onValueChange(sender, event, data) {
                this.value = sender.value;
            }
            _addIcoButton(enabled, type) {
                if (enabled) {
                    var ico;
                    if (type == "Search") {
                        ico = new my.controls.ctlIcon(my.theme.current.icons.search);
                    }
                    else {
                        ico = new my.controls.ctlIcon(my.theme.current.icons.clear);
                        if (this.elementText.value.length == 0) {
                            ico.visible = false;
                        }
                        this.elementText.onkeyup = (e) => {
                            if (this.elementText.value.length == 0) {
                                ico.visible = false;
                            }
                            else {
                                ico.visible = true;
                            }
                        };
                        ico.element.onclick = (e) => {
                            this.elementText.value = "";
                        };
                    }
                    this.elementIconPH.appendChild(ico.element);
                }
                else {
                    this.elementIconPH.innerHTML = "";
                }
            }
            _restrictInput(chars) {
                if (chars.length == 0) {
                    return;
                }
                if (this._allowedChars == undefined) {
                    this.events.keydown.subscribe(this, (s, e, d) => {
                        if ((e.key == "Backspace") || (e.key == "Enter") || (e.key == "ArrowLeft") || (e.key == "ArrowRight") || (e.key == "Tab") || (e.key == "Delete")) {
                            return true;
                        }
                        if (chars.indexOf(e.key) == -1) {
                            e.preventDefault();
                            return false;
                        }
                        return true;
                    });
                }
            }
            setIcon(val, position = "right") {
                if (val) {
                    val.element.style.visibility = "hidden";
                    this.elementIconPH.innerHTML = "";
                    this.elementIconPH.appendChild(val.element);
                    var txt = this.element;
                    this.elementText.onload = () => {
                        var top = (txt.clientHeight - val.element.clientHeight) / 2;
                        val.element.style.top = top + "px";
                        val.element.style.visibility = "visible";
                    };
                }
            }
        }
        controls.ctlText = ctlText;
        class ctlNumber extends my.controls.ctlText {
            constructor(text) {
                super(text);
                this.ctlType = "ctlNumber";
                this.isMoney = false;
                this.elementText.type = "text";
                this.elementText.onkeyup = this._onTextKeyUp.bind(this);
                this.min = -10000;
                this.max = 10000;
                this.validation.add("custom", "must be valid number", this._customValidation.bind(this));
            }
            get min() {
                return this._min;
            }
            set min(val) {
                this._min = val;
                this.elementText.min = val.toString();
            }
            get max() {
                return this._max;
            }
            set max(val) {
                this._max = val;
                this.elementText.max = val.toString();
            }
            _customValidation(v) {
                var i;
                if ((v == null) || (v == undefined)) {
                    return true;
                }
                if ((v instanceof my.core.data.binding.Observable) || (v instanceof my.data.binding.Observable)) {
                    if (v.value == undefined) {
                        return true;
                    }
                    else {
                        i = v.value;
                    }
                }
                else {
                    i = v;
                }
                if (i == "") {
                    return true;
                }
                i = parseInt(i);
                if (Number.isInteger(i)) {
                    return true;
                }
                return false;
            }
            _onTextKeyUp(e) {
                var val = parseInt(this.elementText.value);
                if (isNaN(val)) {
                    this._validateText(val);
                }
                else {
                    this.elementText.value = val.toString();
                    this._validateMinMax(val);
                }
                return true;
            }
            _validateMinMax(val) {
                if ((val < this.min) || (val > this.max)) {
                    if (val < this.min) {
                        this.elementText.value = this.min.toString();
                    }
                    else {
                        this.elementText.value = this.max.toString();
                    }
                }
            }
            _validateText(val) {
                if (this.elementText.value == "-") {
                    return;
                }
                if (this.elementText.value != "") {
                    this.elementText.value = "";
                }
            }
        }
        controls.ctlNumber = ctlNumber;
        class ctlTextArea extends my.core.controls.core {
            constructor(text) {
                super('textarea');
                this.ctlType = "ctlTextArea";
                this.readOnly = false;
                this.reset = () => { this._value = undefined; };
                this.value = text;
                this.events.change.subscribe(this, this.onValueChange.bind(this));
            }
            get disabled() { return this.element.disabled; }
            set disabled(val) { this.element.disabled = val; }
            get _value() {
                return this.element.value;
            }
            set _value(val) {
                if (val == undefined) {
                    val = "";
                }
                this.element.value = val;
            }
            onValueChange(sender, event, data) {
                this.value = sender.value;
            }
        }
        controls.ctlTextArea = ctlTextArea;
        class ctlSpan extends my.core.controls.core {
            constructor(text) {
                super('span');
                this.ctlType = "ctlSpan";
                this.readOnly = false;
                this.reset = () => { this._value = undefined; };
                this.disabled = false;
                this.dispalyFormat = "Default";
                this.validation = undefined;
                this.value = text;
            }
            get _value() {
                return this.element.innerText;
            }
            set _value(val) {
                if (val == undefined) {
                    val = "";
                }
                val = this._displayFormat(val);
                this.element.innerText = val;
            }
            _displayFormat(val) {
                var ret = "";
                switch (this.dispalyFormat) {
                    case "Money":
                        ret = Number(val).toFixed(2);
                        break;
                    default:
                        return val;
                        break;
                }
                return ret;
            }
        }
        controls.ctlSpan = ctlSpan;
        class ctlHeading extends my.core.controls.core {
            constructor(type, text) {
                super(type);
                this.ctlType = "ctlHeading";
                this.readOnly = false;
                this.disabled = false;
                this.validation = undefined;
                this.value = text;
            }
            get _value() {
                return this.element.innerText;
            }
            set _value(val) {
                if (val == undefined) {
                    val = "";
                }
                this.element.innerText = val;
            }
        }
        controls.ctlHeading = ctlHeading;
        class ctlLabel extends my.core.controls.core {
            constructor(text, labelFor) {
                super('label');
                this.ctlType = "ctlLabel";
                this.readOnly = false;
                this.disabled = false;
                this.validation = undefined;
                if (text) {
                    this.value = text;
                }
                this.element.htmlFor = labelFor;
            }
            get _value() {
                return this.element.innerText;
            }
            set _value(val) {
                this.element.innerText = val;
            }
        }
        controls.ctlLabel = ctlLabel;
        class ctlIcon extends my.core.controls.core {
            constructor(iconName) {
                super('i');
                this.ctlType = "ctlIcon";
                this.readOnly = false;
                this.disabled = false;
                this.validation = undefined;
                this.css = new my.css.Icon(this.element);
                this.icon = iconName;
            }
            set icon(val) {
                this.element.classList.add(val);
            }
        }
        controls.ctlIcon = ctlIcon;
        class ctlCheckBox extends my.core.controls.core {
            constructor(text, checked = false) {
                super('div');
                this.ctlType = "ctlCheckBox";
                this._readOnly = false;
                this.reset = () => { this.value = false; };
                this.elCheckBox = document.createElement('input');
                this.elLabel = document.createElement('label');
                this.elCheckBox.type = "checkbox";
                this.elCheckBox.ondblclick = (e) => {
                    e.stopImmediatePropagation();
                };
                this.element.appendChild(this.elCheckBox);
                this.value = checked;
                this.css = new my.css.Checkbox(this.element);
                this.events.change.subscribe(this, this.onValueChange.bind(this));
                if ((text != undefined) && (text != "")) {
                    this.elCheckBox.id = this.id;
                    this.elLabel.innerText = text;
                    this.elLabel.htmlFor = this.id;
                }
                this.elLabel.style.display = "none";
                this.element.appendChild(this.elLabel);
            }
            get readOnly() {
                return this._readOnly;
            }
            set readOnly(val) {
                this._readOnly = val;
                if (val) {
                    this.elCheckBox.style.visibility = "hidden";
                    this.elCheckBox.style.display = "none";
                    this.elLabel.classList.add("ronly");
                    this._showReadOnlyValue();
                }
                else {
                    this.elLabel.innerText = "";
                    this.elLabel.classList.remove("ronly");
                    this.elCheckBox.style.visibility = "visible";
                    this.elCheckBox.style.display = "inline-block";
                }
            }
            get disabled() { return this.elCheckBox.disabled; }
            set disabled(val) { this.elCheckBox.disabled = val; }
            get _value() {
                if (this.elCheckBox.checked == true)
                    return 1;
                else
                    return 0;
            }
            set _value(val) {
                if (val == undefined) {
                    val = 0;
                    this.value = 0;
                }
                if (typeof val == 'boolean') {
                    this.elCheckBox.checked = val;
                }
                else if (val > 0) {
                    this.elCheckBox.checked = true;
                    this.elLabel.classList.add("checked");
                }
                else {
                    this.elCheckBox.checked = false;
                    this.elLabel.classList.remove("checked");
                }
                if (this.readOnly) {
                    this._showReadOnlyValue();
                }
            }
            onValueChange(sender, event, data) {
                this.value = sender.value;
            }
            _showReadOnlyValue() {
                this.elLabel.style.display = "block";
                if (this._value) {
                    this.elLabel.innerText = "Yes";
                }
                else {
                    this.elLabel.innerText = "No";
                }
            }
        }
        controls.ctlCheckBox = ctlCheckBox;
        class ctlRadio extends my.core.controls.core {
            constructor(text, group, value, selected = false) {
                super('input');
                this.ctlType = "ctlRadio";
                this.readOnly = false;
                this.reset = () => { this._value = false; };
                this.element.type = "radio";
                this.element.name = group;
                this.value = value;
                this.events.change.subscribe(this, this.onValueChange.bind(this));
                this._text = new my.data.binding.ReadOnlyBind(this.element, "innerText", undefined);
                this.text = text;
            }
            get disabled() { return this.element.disabled; }
            set disabled(val) { this.element.disabled = val; }
            get _value() {
                return this.element.checked;
            }
            set _value(val) {
                this.element.checked = val;
            }
            onValueChange(sender, event, data) {
                this.value = sender.value;
            }
            set text(val) {
                this._text.value = val;
            }
            get text() {
                return this._text.value;
            }
        }
        controls.ctlRadio = ctlRadio;
        ;
        class ctlLink extends my.core.controls.core {
            constructor(text, url, target = undefined) {
                super('a');
                this.ctlType = "ctlLink";
                this.readOnly = false;
                this.disabled = false;
                this.validation = undefined;
                this.value = url;
                this._text = new my.data.binding.ReadOnlyBind(this.element, "text", undefined);
                this.text = text;
                if (target) {
                    this.element.target = target;
                }
            }
            get _value() {
                return this.element.href;
            }
            set _value(val) {
                this.element.href = val;
            }
            set text(val) {
                this._text.value = val;
            }
            get text() {
                return this._text.value;
            }
        }
        controls.ctlLink = ctlLink;
        ;
    })(controls = my.controls || (my.controls = {}));
})(my || (my = {}));
var my;
(function (my) {
    let controls;
    (function (controls) {
        class ctlCard extends my.core.controls.core {
            constructor() {
                super('div');
                this.ctlType = "ctlCard";
                this.readOnly = false;
                this.disabled = false;
                this.buttons = new CardButtons(this);
                this.css = new my.css.Card(this.element);
                this.Body = document.createElement("div");
                var bCSS = new my.css.cardBody(this.Body);
                this.element.appendChild(this.Body);
            }
            get title() {
                return this._title;
            }
            set title(val) {
                this._title = val;
                this._createHeader(val);
            }
            get Footer() {
                if (this._Footer == undefined) {
                    this._createFooter();
                }
                return this._Footer;
            }
            get eventNotificationCode() {
                return this._eventNotificationCode;
            }
            set eventNotificationCode(val) {
                this._eventNotificationCode = val;
                my.events.global.standard.subscribe(this, val, this._onNotification.bind(this));
            }
            _onNotification(sender, event, data, code) {
                if (data.result) {
                    this.addNotificationSuccess(data.text);
                }
                else {
                    this.addNotificationError(data.text);
                }
            }
            _createHeader(val) {
                if (this.Header != undefined) {
                    this.Header.firstElementChild.textContent = val;
                }
                else {
                    this.Header = document.createElement("div");
                    var hCSS = new my.css.cardHeader(this.Header);
                    var s = document.createElement("span");
                    s.innerText = val;
                    this.Header.appendChild(s);
                    this.element.insertBefore(this.Header, this.element.firstChild);
                    this.plhClose = document.createElement("div");
                    this.plhNotify = document.createElement("div");
                    this.plhClose.style.cssFloat = "right";
                    this.plhNotify.style.cssFloat = "right";
                    this.Header.appendChild(this.plhClose);
                    this.Header.appendChild(this.plhNotify);
                }
            }
            _createFooter() {
                this._Footer = document.createElement("div");
                this.element.appendChild(this._Footer);
                var fCSS = new my.css.cardFooter(this._Footer);
            }
            addNotificationSuccess(text = "") {
                if (this.Header == undefined) {
                    return;
                }
                var ico = new my.controls.ctlIcon(my.theme.current.icons.sync);
                ico.element.classList.add("ico-btn");
                this.plhNotify.classList.add("cardNotifySuccess");
                this._addNotifyIcon(ico);
                this._hideIcon(ico.element);
                ico.element.onclick = (e) => {
                    this._addNotifyBar(text, false);
                };
            }
            addNotificationError(text = "") {
                if (this.Header == undefined) {
                    return;
                }
                var ico = new my.controls.ctlIcon(my.theme.current.icons.error);
                ico.element.classList.add("ico-btn");
                this.plhNotify.classList.add("cardNotifyError");
                this._addNotifyIcon(ico);
                ico.element.onclick = (e) => {
                    this._addNotifyBar(text, true);
                };
            }
            _addNotifyIcon(ico) {
                ico.style.cssFloat = "right";
                this.plhNotify.innerHTML = "";
                this.plhNotify.appendChild(ico.element);
            }
            _addNotifyBar(text, isError = false) {
                var bar = document.createElement("div");
                bar.classList.add("notificationBar");
                bar.innerText = text;
                bar.style.top = this.Header.clientHeight + "px";
                this.Header.appendChild(bar);
                if (isError) {
                    bar.classList.add("error");
                }
                bar.classList.add("fadein");
                var ico = new my.controls.ctlIcon("close");
                ico.element.classList.add("ico-btn");
                ico.element.onclick = (e) => {
                    this.Header.removeChild(bar);
                };
                bar.appendChild(ico.element);
            }
            _hideIcon(ico) {
                ico.classList.add("fadein");
                setTimeout(() => {
                    ico.classList.remove("fadein");
                    ico.classList.add("fadeout");
                    setTimeout(() => {
                        this.plhNotify.innerHTML = "";
                    }, 1000);
                }, 4000);
            }
        }
        controls.ctlCard = ctlCard;
        class CardButtons {
            constructor(val) {
                this.card = val;
            }
            addCloseButton(clickHandler) {
                if (this.card.Header == undefined) {
                    return;
                }
                var ico = new my.controls.ctlIcon(my.theme.current.icons.close);
                ico.element.classList.add("ico-btn");
                ico.events.click.subscribe(this.card, clickHandler);
                this.card.plhClose.innerHTML = "";
                this.card.plhClose.appendChild(ico.element);
            }
            addFooterBtn(label, clickHandler, cssColorStyle = undefined) {
                if (this.card.Footer == undefined) {
                    return;
                }
                var btn = new my.controls.ctlButton(label, clickHandler);
                if (cssColorStyle) {
                    btn.css.colorStyle = cssColorStyle;
                }
                btn.element.style.cssFloat = "right";
                this.card.Footer.appendChild(btn.element);
            }
            addFooterBtnCustom(btn) {
                btn.element.style.cssFloat = "right";
                this.card.Footer.appendChild(btn.element);
            }
        }
    })(controls = my.controls || (my.controls = {}));
})(my || (my = {}));
var my;
(function (my) {
    let controls;
    (function (controls) {
        class ctlFormElement extends my.core.controls.core {
            constructor(label, control) {
                super('div');
                this.ctlType = "ctlLabel";
                this.readOnly = false;
                this.disabled = false;
                this.validation = undefined;
                this.label = label;
                this.control = control;
                this._create();
            }
            set data(val) {
            }
            rebind() {
            }
            _create() {
                var lbl = new my.controls.ctlLabel(this.label, this.control.id);
                var lblContainer = document.createElement("div");
                lblContainer.appendChild(lbl.element);
                this.element.appendChild(lblContainer);
                var ctlContainer = document.createElement("div");
                ctlContainer.appendChild(this.control.element);
                this.element.appendChild(ctlContainer);
            }
        }
        controls.ctlFormElement = ctlFormElement;
        class ctlTextEX extends my.controls.ctlText {
            constructor(text, label) {
                super(text);
                this._create();
            }
            _create() {
                var lbl = new my.controls.ctlLabel(this.text, this.elementText.id);
                var lblContainer = document.createElement("div");
                lblContainer.appendChild(lbl.element);
                this.element.appendChild(lblContainer);
            }
        }
        controls.ctlTextEX = ctlTextEX;
        class ctlDivList extends my.core.controls.core {
            constructor() {
                super('div');
                this.ctlType = "ctlDivList";
                this.readOnly = false;
                this.disabled = false;
            }
            addElement(el, addPosition = "bottom") {
                if (addPosition == "top") {
                    this.element.insertBefore(el, this.element.firstChild);
                }
                else {
                    this.element.appendChild(el);
                }
            }
        }
        controls.ctlDivList = ctlDivList;
        class ctlDivListItem extends my.core.controls.core {
            constructor() {
                super('div');
                this.ctlType = "ctlDivListItem";
                this.readOnly = false;
                this.disabled = false;
            }
        }
        controls.ctlDivListItem = ctlDivListItem;
        class ctlToast extends ctlDivList {
            constructor() {
                super();
                this.ctlType = "ctlDivList";
                this.interval = 5000;
                this.position = "top";
                this.css = new my.css.Toast(this.element);
            }
            add(text, color = "info") {
                var el = new ctlToastItem(text);
                var position = "top";
                if (this.position == "top") {
                    position = "bottom";
                }
                el.element.classList.add(color);
                this.addElement(el.element, position);
                el.element.classList.add("fadein");
                setTimeout(() => {
                    el.element.classList.remove("fadein");
                    el.element.classList.add("fadeout");
                    setTimeout(() => {
                        this.element.removeChild(el.element);
                    }, 1000);
                }, this.interval);
            }
        }
        controls.ctlToast = ctlToast;
        class ctlToastItem extends ctlDivListItem {
            constructor(text) {
                super();
                this.element.innerText = text;
                this.css = new my.css.ToastItem(this.element);
            }
        }
        controls.ctlToastItem = ctlToastItem;
        class ctlIconButton extends my.core.controls.core {
            constructor(icon, clickHandler) {
                super('button');
                this.ctlType = "ctlIconButton";
                this.readOnly = false;
                this.validation = undefined;
                this.events.click.subscribe(this, clickHandler);
                this.css = new my.css.IconButton(this.element);
                this._createIcon(icon);
            }
            get disabled() {
                return this.element.disabled;
            }
            set disabled(val) {
                this.element.disabled = val;
                if (val) {
                    this.element.classList.add("disabled");
                }
                else {
                    this.element.classList.remove("disabled");
                }
            }
            _createIcon(icon) {
                this.icon = new my.controls.ctlIcon(icon);
                this.element.appendChild(this.icon.element);
            }
        }
        controls.ctlIconButton = ctlIconButton;
        class ctlFixedActionButton extends my.core.controls.core {
            constructor(icon, onClickOverride = undefined) {
                super("div");
                this.ctlType = "ctlDivList";
                this.readOnly = false;
                this.disabled = false;
                this.triggerAction = "click";
                this.btnList = [];
                this.css = new my.css.FixedActionButton(this.element);
                this.triggerIcon = icon;
                this.btnListContainer = new my.controls.ctlDivList();
                this.element.appendChild(this.btnListContainer.element);
                this.btnListContainer.element.classList.add("btnFixedItems");
                this._createTrigger(onClickOverride);
            }
            addButton(id, ico) {
                ico.element.classList.add("btn-round");
                this.btnListContainer.addElement(ico.element);
                this.btnList.push(ico);
            }
            hideButton(id) {
                this.btnList.forEach((itm, idx) => {
                    if (itm.id == id) {
                        itm.element.classList.add("hidden");
                    }
                });
            }
            showButton(id) {
                this.btnList.forEach((itm, idx) => {
                    if (itm.id == id) {
                        itm.element.classList.remove("hidden");
                    }
                });
            }
            _createTrigger(onClickOverride) {
                if (onClickOverride) {
                    this.btnTrigger = new ctlIconButton(this.triggerIcon, onClickOverride);
                }
                else {
                    this.btnTrigger = new ctlIconButton(this.triggerIcon, this._onTriggerClick.bind(this));
                }
                this.btnTrigger.element.classList.add("trigger");
                this.btnTrigger.element.classList.add("btn-round");
                this.element.appendChild(this.btnTrigger.element);
                this.element.onmouseenter = () => {
                    if (this.triggerAction == "hover") {
                        this.btnListContainer.element.classList.add("open");
                    }
                };
                this.element.onmouseleave = () => {
                    if (this.triggerAction == "hover") {
                        this.btnListContainer.element.classList.remove("open");
                    }
                };
            }
            _onTriggerClick(s, e, d) {
                if (this.btnListContainer.element.classList.contains("open")) {
                    this.btnListContainer.element.classList.remove("open");
                    this.btnTrigger.icon.icon = this.triggerIcon;
                }
                else {
                    this.btnListContainer.element.classList.add("open");
                    this.btnTrigger.icon.icon = my.theme.current.icons.close;
                }
            }
        }
        controls.ctlFixedActionButton = ctlFixedActionButton;
    })(controls = my.controls || (my.controls = {}));
})(my || (my = {}));
var my;
(function (my) {
    let menu;
    (function (menu) {
        class sidenav extends my.core.controls.coreData {
            constructor(trigger) {
                super('div');
                this.ctlType = "ctlSidenav";
                this.readOnly = false;
                this.containerToPush = document.getElementById("spacontainer");
                this.type = 'push';
                this.width = "200px";
                this.dataColumnURL = "URL";
                this.dataColumnLabel = "Label";
                this.dataColumnSubmenu = "SubMenus";
                this.container = document.createElement("div");
                this.container.id = "sideMenu";
                this.container.classList.add("sideMenu");
                this.trigger = trigger;
                this._create();
            }
            get disabled() { return this.element.disabled; }
            set disabled(val) { this.element.disabled = val; }
            rebind() {
                this._update();
            }
            _create() {
                this._nav = document.createElement("ul");
                this._nav.style.width = this.width;
                this._nav.appendChild(this._createSearchItem());
                this.trigger.addEventListener("click", this._toggleMenu.bind(this));
            }
            _createSubMenu(label, data) {
                var self = this;
                var ul = document.createElement("ul");
                var btnBack = this._createSubmenuBack(label);
                btnBack.onclick = function (e) {
                    e.preventDefault();
                    ul.parentElement.removeChild(ul);
                };
                ul.appendChild(btnBack);
                data.value.forEach(function (obj, idx) {
                    ul.appendChild(self._createItem(obj[self.dataColumnURL].value, obj[self.dataColumnLabel].value, undefined));
                });
                ul.className = "submenu-content";
                return ul;
            }
            _createSubmenuBack(label) {
                var navEl = document.createElement("li");
                var i = new my.controls.ctlIcon(my.theme.current.icons.arrow_left);
                var a = document.createElement("a");
                a.text = label;
                a.appendChild(i.element);
                navEl.appendChild(a);
                return navEl;
            }
            _createItem(link, label, data) {
                var navEl = document.createElement("li");
                var a = document.createElement("a");
                a.href = link;
                a.text = label;
                a.setAttribute("data-i18n", label);
                navEl.appendChild(a);
                var self = this;
                if ((data != undefined) && (data.value.length > 0)) {
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
            _showSubMenu(label, data) {
                this._nav.appendChild(this._createSubMenu(label, data));
            }
            _toggleMenu(ev) {
                ev.stopPropagation();
                if (this.container.classList.contains("sideMenu-open") == false) {
                    this.container.classList.add("sideMenu-open");
                    this.container.style.width = this.width;
                    if (this.type == "push") {
                        this.containerToPush.style.transition = "0.5s";
                        this.containerToPush.style.marginLeft = this.width;
                    }
                }
                else {
                    this.container.classList.remove("sideMenu-open");
                    this.container.style.width = "0";
                    if (this.type == "push") {
                        this.containerToPush.style.marginLeft = "0";
                    }
                }
            }
            _update() {
                var self = this;
                this.data.rows.forEach((row, idx) => {
                    self._nav.appendChild(self._createItem(row.items[self.dataColumnURL].value, row.items[self.dataColumnLabel].value, row.items[self.dataColumnSubmenu]));
                });
                this.container.appendChild(this._nav);
                document.getElementsByTagName("body")[0].appendChild(self.container);
            }
            _createSearchItem() {
                var navEl = document.createElement("li");
                var searchControl = new my.controls.ctlText('');
                searchControl.maxlength = 16;
                navEl.className = "submenu";
                searchControl.events.keyup.subscribe(this, this._FilterItems.bind(this));
                searchControl.enableClear = true;
                navEl.appendChild(searchControl.element);
                return navEl;
            }
            _FilterItems(s, e, d) {
                var self = this;
                var inputValue = s.value.toLowerCase();
                var keyCode = e.keyCode;
                if (inputValue.length >= 3) {
                    while (this._nav.childNodes.length > 1) {
                        this._nav.removeChild(this._nav.lastChild);
                    }
                    this.data.rows.forEach((row, idx) => {
                        row.items["SubMenus"].value.forEach((element, idx) => {
                            if (element.Label.value.toLowerCase().includes(inputValue)) {
                                self._nav.appendChild(self._createItem(element[self.dataColumnURL].value, element[self.dataColumnLabel].value, element[self.dataColumnSubmenu]));
                            }
                        });
                    });
                }
                if ((keyCode === 8 || keyCode === 46) && inputValue.length < 3) {
                    while (this._nav.childNodes.length > 1) {
                        this._nav.removeChild(this._nav.lastChild);
                    }
                    this.data.rows.forEach((row, idx) => {
                        self._nav.appendChild(self._createItem(row.items[self.dataColumnURL].value, row.items[self.dataColumnLabel].value, row.items[self.dataColumnSubmenu]));
                    });
                }
            }
        }
        menu.sidenav = sidenav;
        ;
        class topnav extends my.core.controls.core {
            constructor() {
                super('div');
                this.ctlType = "ctlTopNav";
                this.readOnly = false;
                this.primaryTable = "Menus";
                this.subMenuTable = "SubMenus";
                this.items = [];
                this.dataColumnURL = "URL";
                this.dataColumnLabel = "Label";
                this.dataColumnSubmenu = "SubMenus";
                document.addEventListener("click", (e) => {
                    this._cloaseAllOpenMenus();
                });
                this._create();
            }
            get disabled() { return this.element.disabled; }
            set disabled(val) { this.element.disabled = val; }
            get dataSet() {
                return this._dataSet;
            }
            set dataSet(val) {
                this._dataSet = val;
                if (val) {
                    this._dataSet.events.Loaded.subscribe(this, this._rebind.bind(this));
                }
            }
            _create() {
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
                this.navSideMenuTrigger = mainContainer.getElementsByClassName("plc")[0];
                this.navTopLeft = mainContainer.getElementsByClassName("plc")[1];
                this.navTopNotifications = mainContainer.getElementsByClassName("plc")[3];
                this.navTopRight = mainContainer.getElementsByClassName("plc")[4];
                this._lMenu = document.createElement("ul");
                this._rMenu = document.createElement("ul");
                this.navTopLeft.appendChild(this._lMenu);
                this.navTopRight.appendChild(this._rMenu);
                this.showTrigger(true);
            }
            showTrigger(val) {
                if (val) {
                    var i = new my.controls.ctlIcon(my.theme.current.icons.menu);
                    i.element.id = "trigger";
                    this.navSideMenuTrigger.appendChild(i.element);
                }
                else {
                    this.navSideMenuTrigger.innerHTML = "";
                }
            }
            _rebind() {
                var self = this;
                this.dataSet.tables[this.primaryTable].rows.forEach((row, idx) => {
                    var sURL = row.items[self.dataColumnURL].value;
                    var sLabel = row.items[self.dataColumnLabel].value;
                    var isRight = row.items["AlignRight"].value;
                    var dt = this.dataSet.tables[this.subMenuTable];
                    var subMenuData = dt.getFilteredArray("RootUID", row.items["UID"].value);
                    var itm = self._createItem(sURL, sLabel, subMenuData, isRight);
                    if (row.items["AlignRight"].value) {
                        self._rMenu.appendChild(itm);
                    }
                    else {
                        self._lMenu.appendChild(itm);
                    }
                });
                document.getElementsByTagName("body")[0].appendChild(self.container);
            }
            _createItem(link, label, data, alignRight) {
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
                }
                else {
                    a.href = link;
                }
                this.items.push(navEl);
                return navEl;
            }
            _createSubMenu(data) {
                var self = this;
                var ul = document.createElement("ul");
                data.forEach(function (obj, idx) {
                    ul.appendChild(self._createItem(obj[self.dataColumnURL], obj[self.dataColumnLabel], undefined, 0));
                });
                ul.className = "submenu-content";
                return ul;
            }
            _toggleMenu(ev) {
                ev.stopPropagation();
                this._cloaseAllOpenMenus();
                var el = ev.target["parentElement"];
                if (el.classList.contains("show") == false) {
                    el.classList.add("show");
                    document.addEventListener('click', (event) => {
                        el.classList.remove("show");
                    });
                }
                else {
                    el.classList.remove("show");
                }
            }
            _cloaseAllOpenMenus() {
                var arr = document.getElementsByClassName("submenu show");
                for (var i = 0; i < arr.length; i++) {
                    arr[i].classList.remove("show");
                }
            }
        }
        menu.topnav = topnav;
    })(menu = my.menu || (my.menu = {}));
})(my || (my = {}));
var my;
(function (my) {
    "use strict";
    let core;
    (function (core_4) {
        let modal;
        (function (modal) {
            class ctlMask {
                constructor(id) {
                    this.ctlType = "ctlMask";
                    this.element = document.createElement('div');
                    this.id = id;
                    this.element.classList.add("modal");
                    this.element.classList.add("mask");
                    this.element.onclick = () => {
                        if (this.onClick) {
                            this.onClick();
                        }
                    };
                }
                ;
                show() {
                    document.body.appendChild(this.element);
                    document.body.style.overflow = 'hidden';
                }
                ;
                hide() {
                    document.body.removeChild(this.element);
                    document.body.style.overflow = '';
                }
            }
            modal.ctlMask = ctlMask;
            ;
            class core extends my.controls.ctlCard {
                constructor() {
                    super();
                    this.element.classList.add("modal");
                    this.mask = new ctlMask(this.id + '_mask');
                    this.events = new Events(this);
                }
                ;
                show() {
                    if (my.tools.isIE()) {
                        this.element.classList.add("open-ie");
                    }
                    else {
                        this.element.classList.add("open");
                    }
                    document.body.appendChild(this.element);
                    this.mask.show();
                    this.events.show.dispatch(this);
                }
                ;
                hide() {
                    if (my.tools.isIE()) {
                        document.body.removeChild(this.element);
                        this.mask.hide();
                        return;
                    }
                    this.element.remove();
                    this.mask.hide();
                    this.events.hide.dispatch(this);
                }
                ;
            }
            modal.core = core;
            ;
            class Events extends my.core.controls.Events {
                constructor(eventTarget) {
                    super(eventTarget);
                    this.hide = new my.core.events.core("Modal_hide");
                    this.show = new my.core.events.core("Modal_show");
                    this.result = new my.core.events.core("Modal_result");
                }
            }
            modal.Events = Events;
            class modalHeader {
                constructor(parent) {
                    this.parent = parent;
                    this.element = document.createElement('div');
                    this.element.className = 'modal_header';
                    this._initPlaceholders();
                }
                ;
                set text(val) {
                    this.plhTitle.innerHTML = '';
                    var title = document.createElement('h4');
                    title.innerText = val;
                    this.plhTitle.appendChild(title);
                }
                ;
                set showBtnClose(val) {
                    if (val) {
                        this.plhClose.style.visibility = "visible";
                    }
                    else {
                        this.plhClose.style.visibility = "hidden";
                    }
                }
                ;
                _initPlaceholders() {
                    this.plhClose = document.createElement("div");
                    this.plhTitle = document.createElement("div");
                    this.plhClose.style.cssFloat = "right";
                    this.plhTitle.style.cssFloat = "left";
                    this.element.appendChild(this.plhClose);
                    this.element.appendChild(this.plhTitle);
                    var ico = new my.controls.ctlIcon(my.theme.current.icons.close);
                    ico.element.classList.add("ico-btn");
                    ico.events.click.subscribe(this, (s, e, d) => {
                        this.parent.hide();
                    });
                    this.plhClose.appendChild(ico.element);
                }
            }
            modal.modalHeader = modalHeader;
            class modalBody {
                constructor() {
                    this.element = document.createElement('div');
                    this.element.className = 'modal_body';
                }
                set text(val) { this.element.innerText = val; }
                ;
                ;
            }
            modal.modalBody = modalBody;
            ;
            class modalFooter {
                constructor() {
                    this.element = document.createElement('div');
                    this.element.className = 'modal_footer';
                }
                set text(val) { this.element.innerText = ''; }
                ;
                addClass(val) { this.element.classList.add(val); }
                ;
                ;
            }
            modal.modalFooter = modalFooter;
            ;
        })(modal = core_4.modal || (core_4.modal = {}));
    })(core = my.core || (my.core = {}));
})(my || (my = {}));
var my;
(function (my) {
    let controls;
    (function (controls) {
        let modal;
        (function (modal) {
            class popup extends my.core.modal.core {
                constructor() {
                    super();
                    this.ctlType = "popup";
                    this.title = " ";
                    this.buttons.addCloseButton((s, e, d) => {
                        this.hide();
                    });
                }
                ;
            }
            modal.popup = popup;
            class popAlert extends my.controls.modal.popup {
                constructor() {
                    super();
                    this.ctlType = "popAlert";
                    var btn = new controls.ctlButton("OK", (s, e, d) => {
                        this.hide();
                    });
                    this.Footer.appendChild(btn.element);
                }
                ;
            }
            modal.popAlert = popAlert;
            ;
            class popConfirm extends my.controls.modal.popup {
                constructor(text, resulthandler) {
                    super();
                    this.ctlType = "popConfirm";
                    this.resulthandler = resulthandler;
                    this.element.classList.add("confirm");
                    this.Body.innerText = text;
                    this._init();
                }
                ;
                _init() {
                    var btnYes = new my.controls.ctlButton('Yes', (s, e, d) => {
                        this.resulthandler(true);
                        this.hide();
                    });
                    btnYes.css.colorStyle = my.css.eColorStyles.success;
                    var btnNo = new my.controls.ctlButton('No', (s, e, d) => {
                        this.resulthandler(false);
                        this.hide();
                    });
                    btnNo.css.colorStyle = my.css.eColorStyles.danger;
                    this.Footer.appendChild(btnYes.element);
                    this.Footer.appendChild(btnNo.element);
                }
            }
            modal.popConfirm = popConfirm;
            ;
        })(modal = controls.modal || (controls.modal = {}));
    })(controls = my.controls || (my.controls = {}));
})(my || (my = {}));
var my;
(function (my) {
    let app;
    (function (app) {
        ;
    })(app = my.app || (my.app = {}));
    let core;
    (function (core_5) {
        let app;
        (function (app) {
            class core {
                constructor(maincontainer) {
                    this.screens = [];
                    this.name = 'app';
                    this.ver = '0.0.0';
                    this.containers = new cContainers(maincontainer);
                    window.addEventListener('hashchange', this._onNavigationEvent.bind(this));
                    my.events.global.init();
                }
                get url() {
                    var sRet = document.getElementById("moduleScript").getAttribute('src');
                    sRet = sRet.substring(0, sRet.lastIndexOf("/"));
                    return sRet;
                }
                ;
                _onNavigationEvent(e) {
                    var nav = this.getCurrentNavigationAddress();
                    if (this.currentScreenName != nav.screenname) {
                        this.navTo(nav.screenname, nav.params);
                    }
                }
                getCurrentNavigationAddress() {
                    var ret = { screenname: '', params: '' };
                    var url = document.location.href.split("#")[1];
                    ret.screenname = "home";
                    ret.params = "";
                    if ((url !== undefined) && (url !== "")) {
                        if (url.indexOf("/") > 0) {
                            ret.screenname = url.substring(0, url.indexOf("/"));
                        }
                        else {
                            ret.screenname = url;
                        }
                        if (url.indexOf("/") > 0) {
                            ret.params = url.substring(url.indexOf("/") + 1);
                        }
                    }
                    return ret;
                }
                navStart() {
                    var nav = this.getCurrentNavigationAddress();
                    var screenmatch = false;
                    this.screens.forEach((itm, idx) => {
                        if (nav.screenname == itm.id) {
                            screenmatch = true;
                        }
                    });
                    if (screenmatch) {
                        this.navTo(nav.screenname, nav.params);
                    }
                    else {
                        this.navToHome();
                    }
                }
                navTo(screen, urlParams = undefined, navData = undefined) {
                    this._navTo(false, screen, urlParams, navData);
                }
                navToSilent(screen, urlParams = undefined, navData = undefined) {
                    this._navTo(true, screen, urlParams, navData);
                }
                _navTo(isSilent, screen, urlParams = undefined, navData = undefined) {
                    var isNavSuccess = false;
                    this.screens.forEach((scr, idx) => {
                        if (scr.id.toLowerCase() == screen.toLowerCase()) {
                            if (this.currentScreen) {
                                this.currentScreen.hide();
                            }
                            this.currentScreenName = screen;
                            this.previousScreen = this.currentScreen;
                            this.currentScreen = scr;
                            if (isSilent == false) {
                                var url = "#" + screen;
                                if (urlParams) {
                                    url = url + "/" + urlParams;
                                }
                                window.location.href = url;
                            }
                            scr.show(navData);
                            if (isSilent == false) {
                                history.pushState({
                                    id: scr.id
                                }, scr.title, url);
                            }
                            isNavSuccess = true;
                        }
                    });
                    if (isNavSuccess == false) {
                    }
                }
                navToPreviousScreen(urlOverride = undefined) {
                    history.back();
                }
                navToHome() {
                    var url = this.getCurrentNavigationAddress();
                    if (url.screenname == this.screens[0].id) {
                        this.navTo(this.screens[0].id, url.params);
                    }
                    else {
                        this.navTo(this.screens[0].id);
                    }
                }
                showSplash(param) {
                    var html = document.createElement('div');
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
                    }
                    else {
                        document.body.removeChild(document.getElementById('splash'));
                    }
                }
                ;
                addScreen(val) {
                    this.screens.push(val);
                }
            }
            app.core = core;
            ;
            class cContainers {
                constructor(cont) {
                    this._main = cont;
                    this._heder = "appheader";
                    this._body = "appbody";
                    this._footer = "appfooter";
                }
                ;
                get main() {
                    return this._findElement(this._main);
                }
                get heder() {
                    return this._findElement(this._heder);
                }
                get body() {
                    return this._findElement(this._body);
                }
                get futer() {
                    return this._findElement(this._footer);
                }
                _createElement(id) {
                    var htmle = document.createElement('div');
                    htmle.id = id;
                    htmle.setAttribute('width', '100%');
                    return htmle;
                }
                _findElement(id) {
                    var htmle = document.getElementById(id);
                    if (htmle === undefined) {
                        alert('missing core element: ' + id);
                    }
                    return htmle;
                }
            }
            app.cContainers = cContainers;
        })(app = core_5.app || (core_5.app = {}));
        ;
    })(core = my.core || (my.core = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let core;
    (function (core) {
        let app;
        (function (app) {
            class Screen {
                constructor(id) {
                    this._isLoaded = false;
                    this.screenItems = [];
                    this.element = document.createElement("div");
                    this.element.className = "screen";
                    this.element.classList.add("scr-" + this.constructor.name);
                    this.element.id = id;
                    this.id = id;
                    this.css = new my.css.AppScreen(this.element);
                }
                show(navData = undefined) {
                    if (navData) {
                        this.navData = navData;
                    }
                    if (this.onBeforeShow) {
                        this.onBeforeShow();
                    }
                    if (this.placeholder) {
                        this.placeholder.innerHTML = "";
                        this.placeholder.appendChild(this.element);
                    }
                    else {
                        console.log('no placeholder definition for screen:' + this.id.toString());
                    }
                    if (this._isLoaded == false) {
                        this.onLoad();
                        my.events.global.navigation.dispatch(this, "SCREEN.LOAD");
                        this._isLoaded = true;
                    }
                    this.onShow();
                    my.events.global.navigation.dispatch(this, "SCREEN.SHOW");
                }
                hide() {
                    if (this.onHide) {
                        this.onHide();
                    }
                }
                screenItemAdd(val, controlName) {
                    this.screenItems.push({ name: controlName, ctrl: val });
                }
                screenItemGet(controlName) {
                    var ret;
                    this.screenItems.forEach((item, idx) => {
                        if (item.name == controlName) {
                            ret = item.ctrl;
                        }
                    });
                    return ret;
                }
                getUrlParam(paramName = undefined) {
                    var sRet;
                    var url = document.location.href.split("#")[1];
                    if (url.length == 0) {
                        return undefined;
                    }
                    var arr = url.split("/");
                    if (paramName == undefined) {
                        return arr[1];
                    }
                    var i = -1;
                    arr.forEach((itm, idx) => {
                        if (itm == paramName) {
                            i = idx + 1;
                        }
                    });
                    if (i > -1) {
                        sRet = arr[i];
                    }
                    return sRet;
                }
            }
            app.Screen = Screen;
            ;
        })(app = core.app || (core.app = {}));
        ;
    })(core = my.core || (my.core = {}));
    ;
})(my || (my = {}));
;
var moduleName;
var moduleProperties;
var my;
(function (my) {
    let app;
    (function (app_1) {
        class standard extends my.core.app.core {
            constructor(maincontainer) {
                super(maincontainer);
                this.properties = moduleProperties;
                this.events = new my.app.EventsApp();
            }
            get data() {
                return this._data;
            }
            set data(val) {
                this._data = val;
            }
            set enableToast(val) {
                if ((val) && (this.toast == undefined)) {
                    this.toast = new my.controls.ctlToast();
                    this.containers.main.appendChild(this.toast.element);
                }
            }
            getPropertyByName(name, defaultResponce = undefined) {
                var sRet = defaultResponce;
                if (moduleProperties) {
                    moduleProperties.forEach((item, idx) => {
                        if (item["Name"] == name) {
                            sRet = item["Value"];
                        }
                    });
                }
                return sRet;
            }
        }
        app_1.standard = standard;
        ;
        class EventsApp {
            constructor() {
                this.init = new my.core.events.core("appInit");
                this.global = new my.core.events.coreGlobal();
            }
        }
        app_1.EventsApp = EventsApp;
        ;
        class screenbase extends my.core.app.Screen {
            constructor(id, app) {
                super(id);
                this._title = "";
                this.parentApp = app;
                this._init();
                this.header = new my.app.screenHeader(this);
                if (moduleName != undefined) {
                    this.title = moduleName;
                }
            }
            get title() {
                return this._title;
            }
            set title(val) {
                this.header.title = val;
                this._title = val;
            }
            _init() {
                if (this.placeholder === undefined) {
                    this.placeholder = this.parentApp.containers.body;
                }
            }
            onBeforeShow() {
            }
            onHide() {
            }
        }
        app_1.screenbase = screenbase;
        ;
        class screenHeader {
            constructor(parent) {
                this.parent = parent;
                this.element = document.createElement('div');
                this.element.className = 'screen_header';
                this.parent.element.insertBefore(this.element, this.parent.element.firstChild);
                this.titlePlaceholder = document.createElement('div');
                this.element.appendChild(this.titlePlaceholder);
            }
            set title(val) {
                this.titlePlaceholder.innerHTML = '';
                var title = document.createElement('h1');
                title.innerText = val;
                this.titlePlaceholder.appendChild(title);
            }
            ;
        }
        app_1.screenHeader = screenHeader;
        ;
    })(app = my.app || (my.app = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let app;
    (function (app_2) {
        let templates;
        (function (templates) {
            class tMapping extends my.app.screenbase {
                constructor(id, app) {
                    super(id, app);
                    this.leftTbaleTitle = "change leftTbaleTitle";
                    this.rightTbaleTitle = "change rightTbaleTitle";
                }
                onLoad() {
                    this.leftDS = new my.data.DataSet(this.leftTbaleName);
                    this.leftDS.url = this.parentApp.url + "/data/" + this.leftTbaleName;
                    this.rightDS = new my.data.DataSet(this.rightTbaleName);
                    this.rightDS.isLiveUpdate = true;
                    this.rightDS.url = this.parentApp.url + "/data/" + this.rightTbaleName;
                    this._generateBase();
                }
                onShow() {
                    this.leftDS.getData();
                }
                _generateBase() {
                    var div = document.createElement("div");
                    this.leftPlaceHolder = document.createElement("div");
                    this.rightPlaceHolder = document.createElement("div");
                    div.className = "row";
                    this.leftPlaceHolder.classList.add("col-3");
                    this.rightPlaceHolder.classList.add("col-8");
                    this.rightPlaceHolder.classList.add("offset-1");
                    div.appendChild(this.leftPlaceHolder);
                    div.appendChild(this.rightPlaceHolder);
                    this.element.appendChild(div);
                    this._generateLeftList();
                    this._generateRightTable();
                }
                _generateLeftList() {
                    var tblSetup = {
                        columns: [
                            { dataColumn: "Name", label: "Name", size: "30%", dataType: "string" }
                        ]
                    };
                    this.leftList = new my.controls.ctlList("UID", "Name");
                    this.leftList.events.itemClick.subscribe(this, this.onRowClick.bind(this));
                    this.leftList.title = this.leftTbaleTitle;
                    this.leftList.element.classList.add("shadow");
                    this.leftDS.events.Loaded.subscribe(this, (s, e, d) => {
                        this.leftList.data = s.getTable();
                    });
                    this.leftPlaceHolder.appendChild(this.leftList.element);
                }
                ;
                onRowClick(sender, event, data) {
                    this.rightDS.paramsGetData = [
                        { name: "", value: data.UID.value }
                    ];
                    this.rightTable.rebind();
                    this.rightDS.events.Loaded.subscribe(this, this._tableUpdated.bind(this));
                }
                _tableUpdated(s, e, d) {
                    this.rightTable.title = this.rightTbaleTitle + " for: " + this.leftList.selectedItem.text;
                }
                _generateRightTable() {
                    var tblSetup = {
                        columns: [
                            ,
                            { dataColumn: "Name", label: "Page", size: "30%", dataType: "string" },
                            { dataColumn: "Exist", label: "Exist", size: "10%", dataType: "boolean", isEditable: true }
                        ]
                    };
                    if (this.rightTableCfg) {
                        tblSetup = this.rightTableCfg;
                    }
                    this.rightTable = new my.table.Standard(this.rightDS, new my.table.Config(tblSetup));
                    this.rightTable.title = this.rightTbaleTitle;
                    this.rightTable.options.allow_TitleAddNew = false;
                    this.rightPlaceHolder.appendChild(this.rightTable.element);
                }
                ;
            }
            templates.tMapping = tMapping;
        })(templates = app_2.templates || (app_2.templates = {}));
    })(app = my.app || (my.app = {}));
})(my || (my = {}));
var my;
(function (my) {
    let app;
    (function (app_3) {
        let templates;
        (function (templates) {
            class tmplListPage extends my.app.screenbase {
                constructor(id, app) {
                    super(id, app);
                    this.editScreenName = "d";
                    this.newScreenName = "d";
                }
                onLoad() {
                    this._generateContent();
                }
                onShow() {
                    this.tbl.rebind();
                }
                _generateContent() {
                    var cfg = new my.table.Config(this.tblConfig);
                    this.tbl = new my.table.Standard(this.tblData, cfg);
                    this.tbl.options.allow_TitleAddNew = true;
                    this.tbl.options.enable_DeleteRowHover = true;
                    if (cfg.tableCfg.options) {
                        this.tbl.applyTableOptionsCfg(cfg.tableCfg.options);
                    }
                    this.tbl.css.add("table-clickable");
                    this.tbl.events.editClick.subscribe(this, this.onEditClick.bind(this));
                    this.tbl.events.newClick.subscribe(this, this.onNewClick.bind(this));
                    this.element.appendChild(this.tbl.element);
                }
                ;
                onEditClick(sender, event, data) {
                    if (this.onTblEdit) {
                        this.onTblEdit(data);
                    }
                    else {
                        this.parentApp.navTo(this.editScreenName, data.items["UID"].value, { 'UID': data.items["UID"].value, 'Title': sender["cells"][0].value });
                    }
                }
                onNewClick(sender, event, data) {
                    if (this.onTblNew) {
                        this.onTblNew(data);
                    }
                    else {
                        this.parentApp.navTo(this.newScreenName, "new", undefined);
                    }
                }
            }
            templates.tmplListPage = tmplListPage;
        })(templates = app_3.templates || (app_3.templates = {}));
    })(app = my.app || (my.app = {}));
})(my || (my = {}));
var my;
(function (my) {
    let calendar;
    (function (calendar) {
        class tools {
            static getGridPosition(val) {
                var ret = val.getDay();
                if (ret == 0) {
                    ret = 7;
                }
                return ret;
            }
            static getLastDayOfMonth(val) {
                var yyyy = val.getFullYear();
                var mm = val.getMonth();
                var dd = val.getDate();
                if (mm == 12) {
                    mm = 1;
                    yyyy = yyyy + 1;
                }
                else {
                    mm = mm + 1;
                }
                var ret = new Date(yyyy, mm, 0);
                return ret;
            }
            static getFirstDayOfMonth(val) {
                val.setDate(1);
                var ret = new Date(val);
                return ret;
            }
            static getPrevMonth(val) {
                var yyyy = val.getFullYear();
                var mm = val.getMonth();
                var dd = val.getDate();
                if (mm == 1) {
                    mm = 12;
                    yyyy = yyyy - 1;
                }
                else {
                    mm = mm - 1;
                }
                var ret = new Date(yyyy, mm, dd);
                return ret;
            }
            static getNextMonth(val) {
                var yyyy = val.getFullYear();
                var mm = val.getMonth();
                var dd = val.getDate();
                if (mm == 12) {
                    mm = 1;
                    yyyy = yyyy + 1;
                }
                else {
                    mm = mm + 1;
                }
                var ret = new Date(yyyy, mm, dd);
                return ret;
            }
            static getMonthAsText(val) {
                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                var ret = monthNames[val.getMonth()];
                return ret;
            }
            static compareDates(d1, d2, type = "all") {
                var ret = false;
                var aDate1 = d1.toISOString().split("T");
                var aDate2 = d2.toISOString().split("T");
                var time1 = aDate1[1].split(",")[0];
                var time2 = aDate2[1].split(",")[0];
                switch (type) {
                    case "date":
                        ret = (aDate1[0] == aDate2[0]);
                        break;
                    case "time":
                        ret = (time1 == time2);
                        break;
                    default:
                        ret = ((aDate1[0] == aDate2[0]) && (time1 == time2));
                        break;
                }
                return ret;
            }
            static getDayOfWeek(val) {
                var ret = val.getDay();
                if (ret == 0) {
                    ret = 7;
                }
                return ret;
            }
            static getFormatedValue(val) {
                var ret;
                var m = val.getMonth() + 1;
                var mm = my.tools.padStart(m.toString(), 2, "0");
                ret = val.getFullYear() + "-" + mm + "-" + my.tools.padStart(val.getDate().toString(), 2, "0");
                return ret;
            }
        }
        calendar.tools = tools;
    })(calendar = my.calendar || (my.calendar = {}));
})(my || (my = {}));
var my;
(function (my) {
    let core;
    (function (core_6) {
        let calendar;
        (function (calendar_1) {
            class core extends my.core.controls.core {
                constructor() {
                    super("div");
                    this.ctlType = "calendar.core";
                    this.readOnly = false;
                    this.disabled = false;
                    this.settings = new my.core.calendar.Settings();
                    this.days = [];
                    this._selectedDate = new Date();
                    this._displayDate = new Date();
                    this.initEvents();
                    this.title = new my.core.calendar.Title(this);
                    this.body = new my.core.calendar.Body(this);
                    this.css = new my.css.Calendar(this.element);
                }
                get selectedDay() {
                    return this._selectedDay;
                }
                set selectedDay(val) {
                    this._selectedDay = val;
                    this.events.daySelected.dispatch(this, val);
                    this._selectedDate = val.value;
                }
                get selectedDate() {
                    return this._selectedDate;
                }
                get displayDate() {
                    return this._displayDate;
                }
                set displayDate(val) {
                    this._displayDate = val;
                    this.title.updateCurrentDateText();
                    this.body.createDatesGrid(val);
                }
                initEvents() {
                    this.events = new my.core.calendar.Events(this);
                }
            }
            calendar_1.core = core;
            class Day extends my.core.controls.core {
                constructor(value) {
                    super("div");
                    this.ctlType = "ctlButton";
                    this.readOnly = false;
                    this._isInMonth = true;
                    this._isToday = false;
                    this._isSelected = true;
                    this.value = value;
                    this._createTitle();
                    this.css = new my.css.CalendarDay(this.element);
                    if (my.calendar.tools.compareDates(value, new Date(), "date")) {
                        this.isToday = true;
                    }
                }
                get disabled() {
                    return this.element.classList.contains("disable");
                }
                ;
                set disabled(val) {
                    if (val) {
                        this.element.classList.add("disable");
                    }
                    else {
                        this.element.classList.remove("disable");
                    }
                }
                ;
                get isInMonth() {
                    return this._isInMonth;
                }
                set isInMonth(val) {
                    this._isInMonth = val;
                    if (val) {
                        this.element.classList.remove("inactive");
                    }
                    else {
                        this.element.classList.add("inactive");
                    }
                }
                get isToday() {
                    return this._isToday;
                }
                set isToday(val) {
                    this._isToday = val;
                    if (val) {
                        this.element.classList.add("today");
                    }
                    else {
                        this.element.classList.remove("today");
                    }
                }
                get isSelected() {
                    return this._isSelected;
                }
                set isSelected(val) {
                    this._isSelected = val;
                    if (val) {
                        this.element.classList.add("selected");
                    }
                    else {
                        this.element.classList.remove("selected");
                    }
                }
                _createTitle() {
                    this.Title = document.createElement("span");
                    this.Title.innerText = this.value.getDate().toString();
                    this.Title.className = "title";
                    this.element.appendChild(this.Title);
                }
            }
            calendar_1.Day = Day;
            class Title {
                constructor(calendar) {
                    this.ctlType = "Calendar.Title";
                    this.element = document.createElement('div');
                    this.calendar = calendar;
                    this.calendar.element.appendChild(this.element);
                    this._init();
                    this._createBtnToday();
                    this._createMonthSelector();
                }
                set text(val) {
                }
                ;
                _createBtnToday() {
                    var btnToday = new my.controls.ctlButton("today", (s, e, d) => {
                        this.calendar.displayDate = new Date();
                        this.updateCurrentDateText();
                    });
                    this.element.appendChild(btnToday.element);
                }
                updateCurrentDateText() {
                    var mm = my.calendar.tools.getMonthAsText(this.calendar.displayDate);
                    this._currentDateElement.innerText = mm + " " + this.calendar.displayDate.getFullYear();
                }
                _createMonthSelector() {
                    var container = document.createElement("div");
                    container.className = "monthSelector";
                    var icoL = new my.controls.ctlIcon(my.theme.current.icons.previous);
                    icoL.element.classList.add("ico-btn");
                    icoL.events.click.subscribe(this, (s, e, d) => {
                        this.calendar.displayDate = my.calendar.tools.getPrevMonth(this.calendar.displayDate);
                        this.updateCurrentDateText();
                    });
                    var icoR = new my.controls.ctlIcon(my.theme.current.icons.next);
                    icoR.element.classList.add("ico-btn");
                    icoR.events.click.subscribe(this, (s, e, d) => {
                        this.calendar.displayDate = my.calendar.tools.getNextMonth(this.calendar.displayDate);
                        this.updateCurrentDateText();
                    });
                    this._currentDateElement = document.createElement("span");
                    this.updateCurrentDateText();
                    container.appendChild(icoL.element);
                    container.appendChild(icoR.element);
                    container.appendChild(this._currentDateElement);
                    this.element.appendChild(container);
                    console.log("calendar._createMonthSelector: finished");
                }
                _init() {
                    this.calendar.element.appendChild(this.element);
                    this.element.classList.add('title');
                }
            }
            calendar_1.Title = Title;
            ;
            class Body {
                constructor(calendar) {
                    this.ctlType = "Calendar.Title";
                    this.dayCaptions = {
                        "Single": ["M", "T", "W", "T", , "F", "S", "S"],
                        "Short": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                        "Full": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                    };
                    this.element = document.createElement('div');
                    this.element.classList.add("body");
                    this.calendar = calendar;
                    this.calendar.element.appendChild(this.element);
                    this.createDatesGrid(calendar.displayDate);
                }
                createDatesGrid(val) {
                    var row = this._createRow();
                    this.element.innerHTML = "";
                    var dCaptions = [];
                    switch (this.calendar.settings.dayCaptions) {
                        case "Single":
                            dCaptions = this.dayCaptions.Single;
                            break;
                        case "Short":
                            dCaptions = this.dayCaptions.Short;
                            break;
                        case "Full":
                            dCaptions = this.dayCaptions.Full;
                            break;
                        default:
                            dCaptions = this.dayCaptions.Single;
                            break;
                    }
                    dCaptions.forEach((itm, idx) => {
                        this.element.appendChild(this._createColTitle(itm));
                    });
                    var rowItems = 0;
                    var arr = this._calculateCalendarGrid(val);
                    arr.forEach((itm, idx) => {
                        var day;
                        day = new my.calendar.Day(itm);
                        day.gridPosition = idx;
                        day.events.click.subscribe(this, (s, e, d) => {
                            this.calendar.events.dayClick.dispatch(this, day);
                        });
                        this.calendar.days.push(day);
                        this.element.appendChild(day.element);
                        if (itm.getMonth() != val.getMonth()) {
                            day.isInMonth = false;
                            if (this.calendar.settings.showDaysFromOnlyCurrentMonth) {
                                day.Title.style.visibility = "hidden";
                            }
                            else {
                                day.Title.style.visibility = "visible";
                            }
                        }
                        rowItems++;
                    });
                }
                _calculateCalendarGrid(val) {
                    var _date = val;
                    var arrDays = [];
                    var firstDay = my.calendar.tools.getFirstDayOfMonth(_date);
                    var lastDay = my.calendar.tools.getLastDayOfMonth(_date);
                    var firstOfMountPosition = my.calendar.tools.getGridPosition(firstDay);
                    var LastOfMountPosition = my.calendar.tools.getGridPosition(lastDay);
                    if (firstOfMountPosition > 1) {
                        for (var i = 1; i < firstOfMountPosition; i++) {
                            var l = new Date();
                            l.setDate(firstDay.getDate() - i);
                            arrDays.unshift(l);
                        }
                    }
                    var daysToGenerate = lastDay.getDate();
                    daysToGenerate = daysToGenerate + (7 - my.calendar.tools.getDayOfWeek(lastDay));
                    for (var i = 0; i < daysToGenerate; i++) {
                        var d = new Date(Number(firstDay));
                        d.setDate(firstDay.getDate() + i);
                        arrDays.push(d);
                    }
                    return arrDays;
                }
                _createDaysOfWeekLabels() {
                    var row = this._createRow();
                    row.appendChild(this._createColTitle("Mon"));
                    row.appendChild(this._createColTitle("Tue"));
                    row.appendChild(this._createColTitle("Wed"));
                    row.appendChild(this._createColTitle("Thu"));
                    row.appendChild(this._createColTitle("Fri"));
                    row.appendChild(this._createColTitle("Sat"));
                    row.appendChild(this._createColTitle("Sun"));
                    return row;
                }
                _createRow() {
                    var row = document.createElement("div");
                    row.className = "row";
                    return row;
                }
                _createColTitle(text) {
                    var col = document.createElement("div");
                    col.className = "colTitle";
                    col.innerText = text;
                    return col;
                }
            }
            calendar_1.Body = Body;
            class Events extends my.core.controls.Events {
                constructor(eventTarget) {
                    super(eventTarget);
                    this.dayClick = new my.core.events.core("dayClick");
                    this.dayDblClick = new my.core.events.core("dayDblClick");
                    this.dayMouseEnter = new my.core.events.core("dayMouseEnter");
                    this.daySelected = new my.core.events.core("daySelected");
                }
            }
            calendar_1.Events = Events;
            class Settings {
                constructor() {
                    this.dayCaptions = "Single";
                    this.showDaysFromOnlyCurrentMonth = true;
                }
            }
            calendar_1.Settings = Settings;
        })(calendar = core_6.calendar || (core_6.calendar = {}));
    })(core = my.core || (my.core = {}));
})(my || (my = {}));
var my;
(function (my) {
    let core;
    (function (core) {
        let calendar;
        (function (calendar) {
            class coreCalendarDropDown extends my.core.controls.core {
                constructor(value) {
                    super('div');
                    this.ctlType = "ctlCalendarDropDown";
                    this.readOnly = false;
                    this.defaultText = "Please Select";
                    this._dataColumn = "";
                    this.items = [];
                    this.css = new my.css.CalendarDropDown(this.element);
                    this.value = value;
                    this.ctlCalendar = new my.calendar.daySelection();
                    this.ctlCalendar.events.dayClick.subscribe(this, this.onDayClick.bind(this));
                    this.element.appendChild(this.ctlCalendar.element);
                }
                get disabled() { return this.element.disabled; }
                set disabled(val) {
                    this.element.disabled = val;
                    this.ctlTrigger.disabled = val;
                }
                get dataColumn() {
                    return this._dataColumn;
                }
                set dataColumn(val) {
                    this._dataColumn = val;
                }
                get _value() {
                    return this.__value;
                }
                set _value(val) {
                    if (val == undefined) {
                        val = "";
                    }
                    this.__value = val;
                    if (this.ctlTrigger) {
                        if (val.length > 6) {
                            this.ctlTrigger.value = this.getFormatedValue(new Date(val));
                        }
                        else {
                            this.ctlTrigger.value = this.defaultText;
                        }
                    }
                    if (this.ctlCalendar) {
                        if (val.length > 6) {
                            this.ctlCalendar.displayDate = new Date(val);
                        }
                        else {
                            this.ctlCalendar.displayDate = new Date();
                        }
                    }
                }
                onDayClick(sender, e, day) {
                    var d = this.getFormatedValue(day.value);
                    if (this.value != d) {
                        this.value = d;
                        this.events.change.dispatch(this, this.value);
                    }
                    this.hideCalendar();
                    this.ctlTrigger.value = this.value;
                }
                ;
                getFormatedValue(val) {
                    var ret;
                    var m = val.getMonth() + 1;
                    var mm = my.tools.padStart(m.toString(), 2, "0");
                    ret = val.getFullYear() + "-" + mm + "-" + my.tools.padStart(val.getDate().toString(), 2, "0");
                    return ret;
                }
                showCalendar() {
                    this.ctlCalendar.css.add(this.css.currentTeheme.active);
                    this.alignDropdownCalendarPosition(this.ctlTrigger.element);
                    this.closeEventHandle = this._closeCalendar.bind(this);
                    document.addEventListener('click', this.closeEventHandle.bind(this), false);
                }
                ;
                _closeCalendar(e) {
                    if (!this.ctlTrigger.element.contains(e.target)) {
                        if (!this.ctlCalendar.element.contains(e.target)) {
                            this.hideCalendar();
                        }
                    }
                }
                ;
                hideCalendar() {
                    this.ctlCalendar.css.remove(this.css.currentTeheme.active);
                    document.removeEventListener('click', this.closeEventHandle);
                    this.closeEventHandle = undefined;
                }
                alignDropdownCalendarPosition(htmlEl) {
                    var topPos = htmlEl.offsetTop + htmlEl.offsetHeight;
                    if (this.ctlTrigger.ctlType == "ctlText") {
                        topPos = htmlEl.offsetTop + htmlEl.offsetHeight;
                    }
                    this.ctlCalendar.style.top = (topPos).toString() + 'px';
                    this.ctlCalendar.style.left = htmlEl.offsetLeft.toString() + 'px';
                }
                ;
            }
            calendar.coreCalendarDropDown = coreCalendarDropDown;
            ;
        })(calendar = core.calendar || (core.calendar = {}));
    })(core = my.core || (my.core = {}));
    let calendar;
    (function (calendar) {
        class calendarDropDown extends my.core.calendar.coreCalendarDropDown {
            constructor(value = undefined, defaultText = undefined) {
                super(value);
                this.ctlType = "ctlCalendarDropDown";
                this.isOptional = false;
                var self = this;
                if (defaultText) {
                    this.defaultText = defaultText;
                }
                this.ctlTrigger = new my.controls.ctlButton(this.defaultText, (sender, event, data) => {
                    self.showCalendar();
                });
                this.element.appendChild(this.ctlTrigger.element);
            }
            ;
        }
        calendar.calendarDropDown = calendarDropDown;
        ;
    })(calendar = my.calendar || (my.calendar = {}));
})(my || (my = {}));
var my;
(function (my) {
    let calendar;
    (function (calendar) {
        class daySelection extends my.core.calendar.core {
            constructor() {
                super();
                this.events.dayClick.subscribe(this, this._onDayClick.bind(this));
                this.settings.dayCaptions = "Short";
                this.body.createDatesGrid(new Date());
            }
            _onDayClick(s, e, d) {
                this.value = this.selectedDay;
            }
            rebind() {
            }
        }
        calendar.daySelection = daySelection;
        class monthView extends my.core.calendar.core {
            constructor() {
                super();
                this.calEvents = [];
                this.events.dayClick.subscribe(this, this._onDayClick.bind(this));
                this.editModal = new my.controls.modal.popup();
                this.settings.dayCaptions = "Short";
                this.displayDate = new Date;
            }
            get editForm() {
                return this._editForm;
            }
            set editForm(val) {
                this._editForm = val;
                this.editModal.Body.appendChild(val.element);
            }
            get dataSet() {
                return this._dataSet;
            }
            set dataSet(val) {
                this._dataSet = val;
                if (val) {
                    this._dataSet.events.Loaded.subscribe(this, this.rebind.bind(this));
                }
            }
            rebind() {
                var t = this.dataSet.getTable();
                t.value.forEach((item, idx) => {
                    this._addCalItem(item);
                });
            }
            _onDayClick(s, e, d) {
                this.selectedDay = d;
                this.editModal.title = this.editModalTitle + my.calendar.tools.getFormatedValue(d.value);
                this.editModal.show();
            }
            _addCalItem(data) {
                var d;
                this.days.forEach((item, idx) => {
                    if (data.value == item.data) {
                        d = item;
                    }
                });
            }
            addCalEvent(val) {
                if (val == undefined)
                    return;
                this.calEvents.push(val);
            }
            paintEvent(val) {
                if (this._dateIsInGrid(val.startDate) == false) {
                    if (this._dateIsInGrid(val.endDate) == false) {
                        return;
                    }
                }
                var startDate = val.startDate.toISOString().split("T")[0];
                this.days.forEach((item, idx) => {
                    if (item.value.toISOString().split("T")[0] = startDate) {
                        item.addCalEvent(val);
                    }
                });
            }
            _dateIsInGrid(val) {
                if ((val.getFullYear() == this.displayDate.getFullYear()) && (val.getMonth() == this.displayDate.getMonth())) {
                    return true;
                }
                var bret = false;
                this.days.forEach((item, idx) => {
                    if (item.isInMonth == false) {
                        if (my.calendar.tools.compareDates(val, item.value, "date")) {
                            bret = true;
                        }
                    }
                });
                return bret;
            }
        }
        calendar.monthView = monthView;
        class Day extends my.core.calendar.Day {
            constructor(val) {
                super(val);
                this.calEvents = [];
            }
            addCalEvent(val) {
                if (val == undefined)
                    return;
                this.calEvents.push(val);
                var el = document.createElement("div");
                el.innerText = val.title;
                el.className = "calEvent";
                this.element.appendChild(el);
            }
        }
        calendar.Day = Day;
    })(calendar = my.calendar || (my.calendar = {}));
})(my || (my = {}));
var my;
(function (my) {
    "use strict";
    let config;
    (function (config) {
        let dataType;
        (function (dataType) {
            dataType["string"] = "string";
            dataType["number"] = "number";
            dataType["decimal"] = "decimal";
            dataType["boolean"] = "boolean";
            dataType["datetime"] = "datetime";
            dataType["date"] = "date";
            dataType["list"] = "list";
            dataType["custom"] = "custom";
            dataType["sum"] = "sum";
        })(dataType = config.dataType || (config.dataType = {}));
        let type;
        (function (type) {
            type["text"] = "text";
            type["textarea"] = "textarea";
            type["number"] = "number";
            type["checkbox"] = "checkbox";
            type["datetime"] = "datetime";
            type["date"] = "date";
            type["autocomplete"] = "autocomplete";
            type["dropdown"] = "dropdown";
            type["label"] = "label";
        })(type = config.type || (config.type = {}));
        class iControl {
        }
        config.iControl = iControl;
        class iColumGroup {
        }
        config.iColumGroup = iColumGroup;
    })(config = my.config || (my.config = {}));
    let core;
    (function (core) {
        let config;
        (function (config) {
            class cManager {
                constructor() {
                    this.ModuleProperties_HiddenColumns = this._getModuleProperties_hiddenColumns();
                }
                parseControl(val, ctl) {
                    if (val.hasOwnProperty("title")) {
                        ctl.title = val["title"];
                    }
                    if (val.hasOwnProperty("size")) {
                        ctl.size = val["size"];
                    }
                    if (val.hasOwnProperty("options")) {
                        ctl.options = val["options"];
                    }
                    this.parseCotrolCustom(val, ctl);
                }
                parseGroup(val, colG) {
                    if (val.hasOwnProperty("name")) {
                        colG.name = val["name"];
                    }
                    if (val.hasOwnProperty("title")) {
                        colG.title = val["title"];
                    }
                    if (val.hasOwnProperty("options")) {
                        colG.options = val["options"];
                    }
                    if (val.hasOwnProperty("itemSize")) {
                        colG.itemSize = val["itemSize"];
                    }
                    this.parseGroupCustom(val, colG);
                }
                parseColumn(val, col) {
                    if (val.hasOwnProperty("isHidden")) {
                        col.isHidden = val["isHidden"];
                    }
                    if (val.hasOwnProperty("label")) {
                        col.label = val["label"];
                    }
                    if (val.hasOwnProperty("size")) {
                        col.size = val["size"];
                    }
                    if (val.hasOwnProperty("dataType")) {
                        col.dataType = val["dataType"];
                    }
                    if (val.hasOwnProperty("type")) {
                        col.type = val["type"];
                    }
                    if (val.hasOwnProperty("align")) {
                        col.align = val["align"];
                    }
                    if (val.hasOwnProperty("dataTable")) {
                        col.dataTable = val["dataTable"];
                    }
                    if (val.hasOwnProperty("dataTableKey")) {
                        col.dataTableKeyColumn = val["dataTableKey"];
                    }
                    else {
                        col.dataTableKeyColumn = "UID";
                    }
                    if (val.hasOwnProperty("dataTableLabel")) {
                        col.dataTableLabelColumn = val["dataTableLabel"];
                    }
                    else {
                        col.dataTableLabelColumn = "Name";
                    }
                    if (val.hasOwnProperty("dataColumn")) {
                        col.dataColumn = val["dataColumn"];
                    }
                    if (this._isHiddenByModule(col.dataColumn)) {
                        col.isHidden = true;
                    }
                    if (val.hasOwnProperty("linkedDataColumn")) {
                        col.linkedDataColumn = val["linkedDataColumn"];
                    }
                    if (val.hasOwnProperty("linkedFilterColumn")) {
                        col.linkedFilterColumn = val["linkedFilterColumn"];
                    }
                    if (val.hasOwnProperty("ctlOptions")) {
                        col.ctlOptions = val["ctlOptions"];
                    }
                    if (val.hasOwnProperty("isEditable")) {
                        col.isEditable = val["isEditable"];
                    }
                    if (val.hasOwnProperty("visibleInInsertMode")) {
                        col.visibleInInsertMode = val["visibleInInsertMode"];
                    }
                    if (val.hasOwnProperty("visibleInEditMode")) {
                        col.visibleInEditMode = val["visibleInEditMode"];
                    }
                    if (val.hasOwnProperty("defaultValue")) {
                        col.defaultValue = val["defaultValue"];
                    }
                    if (val.hasOwnProperty("isMandatory")) {
                        col.isMandatory = val["isMandatory"];
                    }
                    if (val.hasOwnProperty("VisibleOnSize")) {
                        col.VisibleOnSize = val["VisibleOnSize"];
                    }
                    this.parseColumnCustom(val, col);
                }
                applyDefaultSizes(arr) {
                    var totalCols = this._getTotalVisibleColumns(arr);
                    arr.forEach((itm, idx) => {
                        if (itm.size == undefined) {
                            this.defaultSizeFunction(itm, totalCols);
                        }
                    });
                }
                _getTotalVisibleColumns(arr) {
                    var r = 0;
                    arr.forEach((itm, idx) => {
                        if (itm.isHidden) {
                            r = r + 1;
                        }
                    });
                    return r;
                }
                _getModuleProperties_hiddenColumns() {
                    if (moduleProperties) {
                        var hideColsProp = moduleProperties.find(prop => prop['Name'] === 'HideColumns');
                        var propValue = hideColsProp['Value'];
                        return propValue.toLowerCase().replace(/\s/g, '').split(',');
                    }
                    return new Array();
                }
                _isHiddenByModule(column) {
                    var bRet = false;
                    this.ModuleProperties_HiddenColumns.forEach((itm, idx) => {
                        if (itm.toLowerCase() == column.toLowerCase()) {
                            bRet = true;
                        }
                    });
                    return bRet;
                }
            }
            config.cManager = cManager;
            class cControl {
            }
            config.cControl = cControl;
            class cColumGroup {
            }
            config.cColumGroup = cColumGroup;
            class cColumn {
                constructor() {
                    this.isHidden = false;
                    this._type = my.config.type.text;
                    this.align = "left";
                    this.isEditable = false;
                    this.visibleInInsertMode = true;
                    this.visibleInEditMode = true;
                    this.isMandatory = true;
                }
                ;
                get dataType() {
                    return this._dataType;
                }
                set dataType(val) {
                    switch (val) {
                        case "string":
                        case "number":
                        case "boolean":
                        case "datetime":
                        case "date":
                        case "list":
                        case "custom":
                        case "sum":
                            this._dataType = val;
                            break;
                        default:
                            console.error("ERROR! config parsing unsupported dataType:" + val + ' ;value must be my.config.dataType;');
                            break;
                    }
                }
                get type() {
                    return this._type;
                }
                set type(val) {
                    switch (val) {
                        case "text":
                        case "textarea":
                        case "number":
                        case "checkbox":
                        case "datetime":
                        case "autocomplete":
                        case "dropdown":
                        case "label":
                            this._type = val;
                            break;
                        default:
                            console.error("ERROR! config parsing unsupported type:" + val + ' ;value must be "text" | "textarea" | "number" | "checkbox" | "datetime" | "autocomplete" | "dropdown" | "label " ');
                            break;
                    }
                }
            }
            config.cColumn = cColumn;
        })(config = core.config || (core.config = {}));
    })(core = my.core || (my.core = {}));
})(my || (my = {}));
var my;
(function (my) {
    "use strict";
    let data;
    (function (data_5) {
        class LocalDataPackage {
        }
        class MasterSyncPakage {
            constructor() {
                this.UidToSync = [];
                this.UidFailed = [];
            }
        }
        class CacheDataRecord {
        }
        class LocalSyncManager {
            constructor(localDb) {
                this._dcSync = [];
                this._localDb = localDb;
                var schema = new data_5.TableSchemaInfo();
                schema.tableName = LocalSyncManager.MasterTableName;
                schema.tableKey = "URL";
                schema.AutoIncrementKey = false;
                this._localDb.createTableIfNotExist([schema], this.readSaveData.bind(this));
            }
            get HasNoSyncData() {
                return this._dcSync.length > 0;
            }
            addSyncRow(url, dataPakage, lastSyncDate = undefined) {
                var foundElement = this._dcSync.findIndex(x => x.URL == url);
                if (foundElement != -1) {
                    var foundSynIndex = this._dcSync[foundElement].UidToSync.findIndex(x => x == dataPakage.UID);
                    if (foundSynIndex == -1) {
                        this._dcSync[foundElement].UidToSync.push(dataPakage.UID);
                    }
                }
                else {
                    let pakageData = new MasterSyncPakage();
                    pakageData.URL = url;
                    pakageData.TableName_DataToSend = dataPakage.TableName_DataToSend;
                    pakageData.UidToSync.push(dataPakage.UID);
                    if (lastSyncDate) {
                        pakageData.LastSyncDate = lastSyncDate;
                    }
                    foundElement = this._dcSync.push(pakageData) - 1;
                }
                this._localDb.saveData(LocalSyncManager.MasterTableName, this._dcSync[foundElement]);
            }
            addFailedRow(url, dataPakage, lastSyncDate = undefined) {
                var foundElement = this._dcSync.findIndex(x => x.URL == url);
                if (foundElement != -1) {
                    this._dcSync[foundElement].UidFailed.push(dataPakage.UID);
                }
                else {
                    let pakageData = new MasterSyncPakage();
                    pakageData.URL = url;
                    pakageData.TableName_DataToSend = dataPakage.TableName_DataToSend;
                    pakageData.UidFailed.push(dataPakage.UID);
                    if (lastSyncDate) {
                        pakageData.LastSyncDate = lastSyncDate;
                    }
                    foundElement = this._dcSync.push(pakageData) - 1;
                }
                this._localDb.saveData(LocalSyncManager.MasterTableName, this._dcSync[foundElement]);
            }
            removeSyncRow(url) {
                var foundElement = this._dcSync.findIndex(x => x.URL == url);
                if (foundElement != -1) {
                    this._dcSync.splice(foundElement, 1);
                    this._localDb.removeData(LocalSyncManager.MasterTableName, url);
                }
            }
            CountWaitingDataToSync(syncData = undefined) {
                var count = 0;
                this._dcSync.forEach((itm, ind) => {
                    if (syncData) {
                        if (itm.LastSyncDate == undefined
                            || itm.LastSyncDate < syncData) {
                            count = count + itm.UidToSync.length;
                        }
                    }
                    else {
                        count = count + itm.UidToSync.length;
                    }
                });
                return count;
            }
            readSaveData() {
                this._localDb.getData(LocalSyncManager.MasterTableName, this.reloadData.bind(this));
            }
            reloadData(data) {
                data.forEach((itm, idx) => {
                    var tableRecord = itm;
                    this._dcSync.push(tableRecord);
                });
            }
        }
        LocalSyncManager.MasterTableName = "SyncQuery";
        class LocalDataSet {
            constructor(val) {
                this.stack = [];
                this._cacheStorage = "NotInit";
                this._cacheTableName = "CacheData";
                this._expiredInMinutes = 10;
                this.eventNotificationCode = "DataSet";
                this.localDb = data_5.LocalDb.getInstance("SyncDB", this.initSyncManager.bind(this));
                this.ds = val;
            }
            get CacheStorage() {
                return this._cacheStorage;
            }
            initSyncManager() {
                this.localSyncManager = new LocalSyncManager(this.localDb);
                this.loadData();
                this.startBackgroundSyncThread();
            }
            saveData(lstTableNames, data, loadAllData) {
                this.saveDataInCache(lstTableNames, data, loadAllData);
            }
            syncData(OnResponse) {
                if (this._backgroundSyncDateStart == undefined) {
                    this._responseBackgroundSync = OnResponse;
                    this.syncWaitingData();
                }
                else {
                    OnResponse("syn in progress");
                }
                return this.localSyncManager.CountWaitingDataToSync();
            }
            sendData(data, onSuccessHandler) {
                var tableName = data.tableName;
                var dataRow = data.getAsObject();
                if (tableName == "undefined") {
                    tableName = this.ds.primaryTable;
                }
                var tableNameDataToSend = tableName + "_DataToSend";
                var tableNameSendData = tableName + "_SendData";
                var url = this.ds.server.url;
                var addNewRow = false;
                if (!dataRow["UID"]) {
                    addNewRow = true;
                    dataRow["UID"] = my.tools.newGuid();
                    var operationDate = JSON.stringify(new Date())
                        .replace("\"", "").replace("\"", "").replace("Z", "");
                    data.itemsArray.forEach((itm, ind) => {
                        if (!dataRow[itm.Name]) {
                            if (itm.Name == "CreatedOn"
                                || itm.Name == "LastEditOn") {
                                dataRow[itm.Name] = operationDate;
                            }
                            else if (itm.Name == "CreatedBy"
                                || itm.Name == "LastEditBy") {
                                dataRow[itm.Name] = "offline";
                            }
                            else {
                                dataRow[itm.Name] = "undefined";
                            }
                        }
                    });
                }
                if (this._cacheStorage == "Exist") {
                    this.localDb.saveData(this.generateCacheTableName(tableName), dataRow);
                }
                if (this.data != undefined) {
                    var localObservableArray = this.data[tableName];
                    var localDataIndex = localObservableArray.findIndex(x => x["UID"] == dataRow["UID"]);
                    if (localDataIndex != -1) {
                        localObservableArray[localDataIndex] = dataRow;
                        this.data[tableName] = localObservableArray;
                    }
                    else {
                        localObservableArray.push(dataRow);
                        this.data[tableName] = localObservableArray;
                    }
                }
                var lstTable = new Array();
                var schema = new data_5.TableSchemaInfo();
                schema.tableName = tableNameDataToSend;
                schema.tableKey = "UID";
                schema.AutoIncrementKey = false;
                lstTable.push(schema);
                schema = new data_5.TableSchemaInfo();
                schema.tableName = tableNameSendData;
                schema.tableKey = "UID";
                schema.AutoIncrementKey = false;
                lstTable.push(schema);
                this.localDb.createTableIfNotExist(lstTable, function () {
                    var dataPakage = new LocalDataPackage();
                    dataPakage.JSON = JSON.stringify(dataRow);
                    dataPakage.UID = my.tools.newGuid();
                    dataPakage.DateCreated = new Date();
                    dataPakage.TableName_DataToSend = tableNameDataToSend;
                    dataPakage.TableName_SendData = tableNameSendData;
                    if (addNewRow) {
                        dataPakage.SyncType = "Add";
                    }
                    else {
                        dataPakage.SyncType = "Commit";
                    }
                    dataPakage.ServerTableName = tableName;
                    this.localSyncManager.addSyncRow(url, dataPakage);
                    this.localDb.saveData(tableNameDataToSend, dataPakage, onSuccessHandler, this.onErrorHandler.bind(this));
                }.bind(this));
            }
            getData(params = undefined, onCustomSuccess = undefined) {
                if (this.CacheStorage != "Exist") {
                    setTimeout(function waytingToInitLocalCache() {
                        if (this.CacheStorage != "NotInit") {
                            setTimeout(waytingToInitLocalCache.bind(this), 30);
                        }
                        else {
                            if (this.CacheStorage == "Exist") {
                                this.PrepeareData();
                            }
                        }
                    }.bind(this), 30);
                }
                else {
                    this.PrepeareData();
                }
            }
            delData(uid, table, onSuccesshandler) {
                var tableName;
                if (table) {
                    tableName = table;
                }
                else {
                    tableName = this.ds.primaryTable;
                }
                if (this._cacheStorage == "Exist") {
                    this.localDb.removeData(this.generateCacheTableName(tableName), uid);
                }
                var localObservableArray = this.data[tableName];
                var localDataIndex = localObservableArray.findIndex(x => x["UID"] == uid);
                if (localDataIndex != -1) {
                    localObservableArray.splice(localDataIndex, 1);
                    this.data[tableName] = localObservableArray;
                }
                var tableNameDataToSend = tableName + "_DataToSend";
                var tableNameSendData = tableName + "_SendData";
                var lstTable = new Array();
                var schema = new data_5.TableSchemaInfo();
                schema.tableName = tableNameDataToSend;
                schema.tableKey = "UID";
                schema.AutoIncrementKey = false;
                lstTable.push(schema);
                schema = new data_5.TableSchemaInfo();
                schema.tableName = tableNameSendData;
                schema.tableKey = "UID";
                schema.AutoIncrementKey = false;
                lstTable.push(schema);
                var url = this.ds.server.url;
                this.localDb.createTableIfNotExist(lstTable, function () {
                    var dataPakage = new LocalDataPackage();
                    dataPakage.JSON = uid;
                    dataPakage.UID = my.tools.newGuid();
                    dataPakage.DateCreated = new Date();
                    dataPakage.TableName_DataToSend = tableNameDataToSend;
                    dataPakage.TableName_SendData = tableNameSendData;
                    dataPakage.SyncType = "Delete";
                    dataPakage.ServerTableName = tableName;
                    this.localSyncManager.addSyncRow(url, dataPakage);
                    this.localDb.saveData(tableNameDataToSend, dataPakage, onSuccesshandler);
                }.bind(this));
            }
            saveDataInCache(lstTableNames, data, loadAllData) {
                var lstTable = new Array();
                lstTableNames.forEach((tableName, ind) => {
                    if (this.stack.findIndex(x => (x == this.generateCacheTableName(tableName))) == -1) {
                        this.stack.push(this.generateCacheTableName(tableName));
                        var schema = new data_5.TableSchemaInfo();
                        schema.tableName = this.generateCacheTableName(tableName);
                        schema.tableKey = "UID";
                        schema.AutoIncrementKey = false;
                        lstTable.push(schema);
                    }
                });
                if (lstTable.length > 0) {
                    if (loadAllData) {
                        var schema = new data_5.TableSchemaInfo();
                        schema.tableName = this._cacheTableName;
                        schema.tableKey = "URL";
                        schema.AutoIncrementKey = false;
                        lstTable.push(schema);
                        var saveSyncDate = new CacheDataRecord();
                        saveSyncDate.DateSync = new Date();
                        saveSyncDate.URL = this.ds.url;
                        data[schema.tableName] = new Array().push(saveSyncDate);
                    }
                    ;
                    this.localDb.createTableIfNotExist(lstTable, () => {
                        lstTableNames.forEach((tableName, i) => {
                            if (loadAllData) {
                                this.localDb.clearData(this.generateCacheTableName(tableName));
                            }
                            var array = data[tableName];
                            if (array) {
                                array.forEach((itm, i) => {
                                    this.localDb.saveData(this.generateCacheTableName(tableName), itm);
                                });
                            }
                            this.stack.splice(this.stack.findIndex(x => x == this.generateCacheTableName(tableName)), 1);
                        });
                        if (loadAllData) {
                            var saveSyncDate = new CacheDataRecord();
                            saveSyncDate.DateSync = new Date();
                            saveSyncDate.URL = this.ds.url;
                            this.localDb.saveData(this._cacheTableName, saveSyncDate);
                        }
                    });
                }
            }
            onErrorHandler() {
                my.events.global.standard.dispatch(this, this.eventNotificationCode);
            }
            loadData() {
                if (this.localDb.existTable(this._cacheTableName)) {
                    this.localDb.getData(this._cacheTableName, (data) => {
                        var index = data.findIndex(x => x["URL"] == this.ds.url);
                        var cacheDataRecord;
                        if (index != -1) {
                            cacheDataRecord = data[index];
                        }
                        var loadDataFromCache;
                        if (cacheDataRecord) {
                            var milisecondByLastSync = new Date().getTime() - cacheDataRecord.DateSync.getTime();
                            if (milisecondByLastSync / 60000 > this._expiredInMinutes) {
                                loadDataFromCache = false;
                            }
                            else {
                                loadDataFromCache = true;
                            }
                        }
                        else {
                            loadDataFromCache = false;
                        }
                        if (loadDataFromCache
                            || this.localSyncManager.HasNoSyncData) {
                            this.loadDbCacheData((loadData) => {
                                if (loadData) {
                                    this._cacheStorage = "Exist";
                                }
                                else {
                                    console.log("Unexpected situation!!");
                                }
                            });
                        }
                        else {
                            this._cacheStorage = "Expired";
                        }
                    });
                }
                else {
                    this._cacheStorage = "NotExist";
                }
            }
            loadDbCacheData(OnResponse) {
                var allData = new Object();
                var index = -1;
                this.ds.tableNames.forEach((tableName, ind) => {
                    if (this.localDb.existTable(this.generateCacheTableName(tableName))) {
                        this.localDb.getData(this.generateCacheTableName(tableName), (data) => {
                            allData[tableName] = data;
                            index = index + 1;
                            if (index == this.ds.tableNames.length - 1) {
                                this.data = allData;
                                OnResponse(true);
                            }
                        });
                    }
                    else {
                        OnResponse(false);
                    }
                });
            }
            PrepeareData() {
                var showArray = this.data[this.ds.primaryTable];
                showArray = this.FilteringData(showArray);
                showArray = this.SortingData(showArray);
                showArray = this.PagingData(showArray);
                var allData = new Object();
                this.ds.tableNames.forEach((tableName, ind) => {
                    if (tableName != this.ds.primaryTable) {
                        allData[tableName] = this.data[tableName];
                    }
                });
                allData[this.ds.primaryTable] = showArray;
                this.ds.data = allData;
            }
            FilteringData(showArray) {
                var filter = this.ds.filtersForRequest;
                if (filter.length > 0) {
                    var filterArray = [];
                    var hasFilter = false;
                    filter.forEach((itm, ind) => {
                        if (itm.column &&
                            itm.value != "") {
                            hasFilter = true;
                            var splitFilter = itm.column.split(",");
                            splitFilter.forEach((filter, ind) => {
                                var tempFilter = showArray.filter(x => {
                                    if (x[filter] != null) {
                                        return (x[filter] + "").toLocaleLowerCase().indexOf(itm.value.toLocaleLowerCase()) != -1;
                                    }
                                    else {
                                        return false;
                                    }
                                });
                                if (tempFilter.length > 0) {
                                    if (filterArray.length == 0) {
                                        filterArray = tempFilter;
                                    }
                                    else {
                                        filterArray.concat(tempFilter);
                                    }
                                }
                            });
                        }
                    });
                    if (hasFilter) {
                        showArray = filterArray;
                    }
                }
                return showArray;
            }
            SortingData(showArray) {
                var allfilter = this.ds.sortby;
                if (!allfilter) {
                    return showArray;
                }
                var splitFilter = allfilter.split(" ");
                var filterColumn;
                var filterSort = "asc";
                if (splitFilter.length > 0) {
                    filterColumn = splitFilter[0];
                }
                if (splitFilter.length > 1) {
                    filterSort = splitFilter[1];
                }
                showArray = showArray.sort((n1, n2) => {
                    var el1 = n1[filterColumn] + "";
                    var el2 = n2[filterColumn] + "";
                    if (el1 == null) {
                        el1 = "";
                    }
                    if (el2 == null) {
                        el2 = "";
                    }
                    if (filterSort == "asc") {
                        return el1.localeCompare(el2);
                    }
                    else {
                        return el1.localeCompare(el2) * -1;
                    }
                });
                return showArray;
            }
            PagingData(showArray) {
                if (!this.ds.pageSize) {
                    return showArray;
                }
                var elementOnPage = showArray.length - ((this.ds.page) * this.ds.pageSize);
                if (elementOnPage > 0) {
                    elementOnPage = this.ds.pageSize;
                }
                else {
                    elementOnPage = this.ds.pageSize + elementOnPage;
                }
                var pagingArray = showArray.slice(((this.ds.page - 1) * this.ds.pageSize), ((this.ds.page - 1) * this.ds.pageSize) + elementOnPage);
                var scalable = showArray.length / this.ds.pageSize;
                var pCount = Math.trunc(scalable);
                if (showArray.length - (pCount * this.ds.pageSize) > 0) {
                    pCount = pCount + 1;
                }
                pagingArray.forEach((itm, ind) => {
                    itm["pCount"] = pCount;
                    itm["pCurrent"] = this.ds.page;
                    itm["TotalCnt"] = showArray.length;
                });
                return pagingArray;
            }
            generateServerPakage(data, tableName) {
                var jsonTable = {};
                var _arr = [];
                _arr.push(data);
                jsonTable[tableName] = _arr;
                return jsonTable;
            }
            finalizeSync(url, retryRecords, failedRecords) {
                retryRecords.forEach((itm, ind) => {
                    this.localSyncManager.addSyncRow(url.replace("*/Sync/*", ""), itm, this._backgroundSyncDateStart);
                });
                failedRecords.forEach((itm, ind) => {
                    this.localSyncManager.addFailedRow(url.replace("*/Sync/*", ""), itm, this._backgroundSyncDateStart);
                });
                this.localDb.removeData(LocalSyncManager.MasterTableName, url);
                var count = this.localSyncManager.CountWaitingDataToSync(this._backgroundSyncDateStart);
                if (count == 0) {
                    this._backgroundSyncDateStart = undefined;
                    if (this._responseBackgroundSync != undefined) {
                        this._responseBackgroundSync("Waiting to sync: " +
                            this.localSyncManager.CountWaitingDataToSync() + "record");
                    }
                }
            }
            startBackgroundSyncThread() {
                let syncProcess = setTimeout(function syncFunction() {
                    console.log("start local sync data");
                    this.syncWaitingData();
                    syncProcess = setTimeout(syncFunction.bind(this), 60000);
                }.bind(this), 60000);
            }
            syncWaitingData() {
                if (this._backgroundSyncDateStart == undefined) {
                    this._backgroundSyncDateStart = new Date();
                    this.localDb.getData(LocalSyncManager.MasterTableName, this.readSyncData.bind(this));
                }
            }
            readSyncData(data) {
                data.forEach((itm, idx) => {
                    var tableRecord = itm;
                    if (tableRecord.URL.indexOf("*/Sync/*") == -1) {
                        this.localDb.removeData(LocalSyncManager.MasterTableName, tableRecord.URL);
                        this.localSyncManager.removeSyncRow(tableRecord.URL);
                        tableRecord.URL = tableRecord.URL + "*/Sync/*";
                        this.localDb.saveData(LocalSyncManager.MasterTableName, tableRecord);
                    }
                    var failedRecords = new Array();
                    var retryRecords = new Array();
                    var index = -1;
                    this.localDb.getData(tableRecord.TableName_DataToSend, (response) => {
                        var lstRecordNeedSync = response;
                        if (lstRecordNeedSync.length == 0) {
                            this.finalizeSync(tableRecord.URL, retryRecords, failedRecords);
                            return;
                        }
                        lstRecordNeedSync = lstRecordNeedSync.sort((n1, n2) => {
                            let d1 = new Date(n1.DateCreated);
                            let d2 = new Date(n2.DateCreated);
                            let same = d1.getTime() === d2.getTime();
                            if (same) {
                                return 0;
                            }
                            else if (d1 > d2) {
                                return 1;
                            }
                            else {
                                return -1;
                            }
                            ;
                        });
                        lstRecordNeedSync.forEach((itm, ind) => {
                            if (tableRecord.UidToSync.findIndex(x => x == itm.UID) == -1) {
                                return;
                            }
                            console.log("Send data create on: " + itm.DateCreated + ". Data:" + itm.JSON);
                            if (itm.SyncType == "Commit"
                                || itm.SyncType == "Add") {
                                var dts = new my.dts.conn(tableRecord.URL.replace("*/Sync/*", ''));
                                var sendDataObject;
                                sendDataObject = JSON.parse(itm.JSON);
                                Object.keys(sendDataObject).forEach((itm, ind) => {
                                    if (sendDataObject[itm] == "undefined") {
                                        sendDataObject[itm] = undefined;
                                    }
                                });
                                dts.putDataTable(this.generateServerPakage(sendDataObject, itm.ServerTableName), (sender, responce) => {
                                    index = index + 1;
                                    if (responce.result) {
                                        this.localDb.removeData(itm.TableName_DataToSend, itm.UID);
                                        itm.SyncDate = new Date();
                                        this.localDb.saveData(itm.TableName_SendData, itm);
                                    }
                                    else {
                                        itm.LastErrorSync = new Date();
                                        failedRecords.push(itm);
                                    }
                                    if (index == lstRecordNeedSync.length - 1) {
                                        this.finalizeSync(tableRecord.URL, retryRecords, failedRecords);
                                    }
                                }, (sender, responce) => {
                                    index = index + 1;
                                    itm.LastErrorSync = new Date();
                                    retryRecords.push(itm);
                                    if (index == lstRecordNeedSync.length - 1) {
                                        this.finalizeSync(tableRecord.URL, retryRecords, failedRecords);
                                    }
                                });
                            }
                            else if (itm.SyncType == "Delete") {
                                var dts = new my.dts.conn(tableRecord.URL.replace("*/Sync/*", ''));
                                dts.delete(itm.JSON, undefined, (sender, responce) => {
                                    index = index + 1;
                                    if (responce.result) {
                                        this.localDb.removeData(itm.TableName_DataToSend, itm.UID);
                                        itm.SyncDate = new Date();
                                        this.localDb.saveData(itm.TableName_SendData, itm);
                                    }
                                    else {
                                        itm.LastErrorSync = new Date();
                                        failedRecords.push(itm);
                                    }
                                    if (index == lstRecordNeedSync.length - 1) {
                                        this.finalizeSync(tableRecord.URL, retryRecords, failedRecords);
                                    }
                                }, (sender, responce) => {
                                    index = index + 1;
                                    itm.LastErrorSync = new Date();
                                    retryRecords.push(itm);
                                    if (index == lstRecordNeedSync.length - 1) {
                                        this.finalizeSync(tableRecord.URL, retryRecords, failedRecords);
                                    }
                                });
                            }
                        });
                    });
                });
            }
            generateCacheTableName(tableName) {
                return tableName + "_" + this.ds.url;
            }
        }
        data_5.LocalDataSet = LocalDataSet;
        ;
    })(data = my.data || (my.data = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    "use strict";
    let data;
    (function (data_6) {
        class ServerDataSet {
            constructor(val) {
                this.eventNotificationCode = "DataSet";
                this.ds = val;
            }
            get url() {
                return this._url;
            }
            set url(val) {
                if (!this.dts) {
                    this._url = val;
                    this.dts = new my.dts.conn(val);
                }
                else {
                    this.dts.url = val;
                }
            }
            getData(params = undefined, onCustomSuccess = undefined) {
                if (onCustomSuccess) {
                    this.dts.get(onCustomSuccess, this._onErrorGet.bind(this), params);
                }
                else {
                    this.dts.get(this._onSuccessGet.bind(this), this._onErrorGet.bind(this), params);
                }
            }
            _onSuccessGet(sender, responce) {
                if (responce.result) {
                    this._parseServerDataResponce(responce.data);
                }
                else {
                    this._onErrorGet(this, responce.details, responce);
                }
            }
            ;
            _onErrorGet(sender, code, responce) {
                my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
            }
            _parseServerDataResponce(data) {
                var dsObject = {};
                this.ds.tableNames.forEach((itm, idx) => {
                    if (data[itm]) {
                        dsObject[itm] = data[itm];
                    }
                    else {
                        console.log(" can't find table: " + itm + " in the server responce");
                    }
                });
                this.ds.data = dsObject;
            }
            _getDefaultParams() {
                var ret = [];
                var strDataParams = "";
                var obj = {};
                if (this.ds.paramsGetData) {
                    this.ds.paramsGetData.forEach((itm, idx) => {
                        obj[itm.name] = itm.value;
                        ret.push({ [itm.name]: itm.value });
                    });
                }
                if (this.ds.page) {
                    strDataParams = "page=" + this.ds.page;
                }
                if (this.ds.pageSize) {
                    if (strDataParams.length > 0) {
                        strDataParams = strDataParams + "/";
                    }
                    strDataParams = strDataParams + "pageSize=" + this.ds.pageSize;
                }
                if (this.ds.sortby) {
                    if (strDataParams.length > 0) {
                        strDataParams = strDataParams + "/";
                    }
                    strDataParams = strDataParams + "sortby=" + this.ds.sortby;
                }
                if (this.ds.filtersForRequest) {
                    var f = "";
                    this.ds.filtersForRequest.forEach((itm, idx) => {
                        if (idx != 0) {
                            f = f + ";";
                        }
                        if ((itm.column) && (itm.value)) {
                            f = f + itm.column + ":" + itm.value;
                        }
                    });
                    if (strDataParams.length > 0) {
                        strDataParams = strDataParams + "/";
                    }
                    strDataParams = strDataParams + "filterby=" + f;
                }
                strDataParams = my.tools.B64Encode(strDataParams);
                ret.push({ 'dp': strDataParams });
                return ret;
            }
            _parseSendData(row) {
                var ret;
                if (Array.isArray(row)) {
                    console.error("not supporting Arrays at the moment!");
                }
                else {
                    ret = row.getAsJSONReadyObject();
                }
                return ret;
            }
            sendData(dRow, onSuccesshandler, onHTTPError = undefined) {
                var isInsert = true;
                var sendData = this._parseSendData(dRow);
                if (dRow.RowState == "Modified") {
                    isInsert = false;
                }
                if (isInsert) {
                    this._sendDataNew(sendData, onSuccesshandler, (requestData, responce) => {
                        this._sendOffline(dRow, onSuccesshandler, responce);
                    });
                }
                else {
                    this._sendDataUpdate(sendData, onSuccesshandler, (requestData, responce) => {
                        this._sendOffline(dRow, onSuccesshandler, responce);
                    });
                }
            }
            _sendDataNew(sendData, onSuccesshandler, onHTTPError = undefined) {
                this.dts.postDataTable(sendData, (sender, responce) => {
                    if (responce.result) {
                        if (onSuccesshandler) {
                            onSuccesshandler(responce);
                        }
                        this._onSuccessSend(sender, responce);
                    }
                    else {
                        my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
                    }
                }, (sender, responce) => {
                    if (onHTTPError) {
                        onHTTPError(sendData, responce);
                    }
                    this._onErrorSend.bind(this);
                });
            }
            _sendDataUpdate(sendData, onSuccesshandler, onHTTPError = undefined) {
                this.dts.putDataTable(sendData, (sender, responce) => {
                    if (responce.result) {
                        if (onSuccesshandler) {
                            onSuccesshandler(responce);
                        }
                        this._onSuccessSend(sender, responce);
                    }
                    else {
                        my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
                    }
                }, (sender, responce) => {
                    if (onHTTPError) {
                        onHTTPError(sendData, responce);
                    }
                    this._onErrorSend.bind(this);
                });
            }
            _onSuccessSend(sender, responce) {
                my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
            }
            _onErrorSend(sender, responce) {
                my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
            }
            _sendOffline(row, onSuccesshandler, responce) {
                if (this.ds.local) {
                    this.ds.local.sendData(row, onSuccesshandler);
                }
                else {
                    this._onErrorSend(this, responce);
                }
            }
            delData(uid, table, onSuccesshandler) {
                this.dts.delete(uid, table, (sender, responce) => {
                    if (responce.result) {
                        if (onSuccesshandler) {
                            onSuccesshandler();
                        }
                        this._onSuccessDelete.bind(this);
                    }
                    else {
                        my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
                    }
                }, this._onErrorDelete.bind(this));
            }
            _onSuccessDelete(sender, responce) {
                my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
            }
            _onErrorDelete(sender, responce) {
                my.events.global.standard.dispatch(sender, this.eventNotificationCode, responce);
            }
        }
        data_6.ServerDataSet = ServerDataSet;
        ;
    })(data = my.data || (my.data = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    "use strict";
    let data;
    (function (data_7) {
        class TableSchemaInfo {
        }
        data_7.TableSchemaInfo = TableSchemaInfo;
        class LocalDb {
            constructor(DatabaseName, onSuccess = undefined) {
                this._onSuccess = undefined;
                this._processingChangeDBVersion = false;
                this._onSuccess = onSuccess;
                this._databaseName = DatabaseName;
                this.indexedDB = window.indexedDB;
                this.request = indexedDB.open(DatabaseName);
                this.request.onerror = this.OnErrorInitDb.bind(this);
                this.request.onupgradeneeded = function (event) {
                };
                this.request.onsuccess = this.OnSuccessInitDb.bind(this);
            }
            static getInstance(DatabaseName, onSuccess = undefined) {
                if (!LocalDb.instance) {
                    LocalDb.instance = new LocalDb(DatabaseName, onSuccess);
                }
                else {
                    setTimeout(function tick() {
                        if (!LocalDb.instance.db) {
                            setTimeout(tick, 30);
                        }
                        else {
                            onSuccess();
                        }
                    }, 30);
                }
                return LocalDb.instance;
            }
            createTableIfNotExist(createTables, onSuccess = undefined) {
                if (this.db) {
                    setTimeout(function waytingToInitLocalCache() {
                        if (this._processingChangeDBVersion) {
                            setTimeout(waytingToInitLocalCache.bind(this), 30);
                        }
                        else {
                            this._processingChangeDBVersion = true;
                            var lstTableToCreate = new Array();
                            createTables.forEach((element, ind) => {
                                if (!this.db.objectStoreNames.contains(element.tableName)) {
                                    lstTableToCreate.push(element);
                                }
                            });
                            if (lstTableToCreate.length > 0) {
                                var dbVesion = this.db.version;
                                this.db.close();
                                this._onSuccess = onSuccess;
                                dbVesion = dbVesion + 1;
                                this.request = indexedDB.open(this._databaseName, dbVesion);
                                this.request.onerror = this.OnErrorInitDb.bind(this);
                                this.request.onsuccess = this.OnSuccessInitDb.bind(this);
                                this.request.onupgradeneeded = function (event) {
                                    var db = this.result;
                                    lstTableToCreate.forEach((element, ind) => {
                                        if (element.AutoIncrementKey) {
                                            db.createObjectStore(element.tableName, { keyPath: element.tableKey, autoIncrement: true });
                                        }
                                        else {
                                            db.createObjectStore(element.tableName, { keyPath: element.tableKey });
                                        }
                                    });
                                };
                            }
                            else {
                                this._processingChangeDBVersion = false;
                                onSuccess();
                            }
                        }
                    }.bind(this), 30);
                }
            }
            existTable(tableName) {
                if (this.db.objectStoreNames.contains(tableName)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            saveData(tableName, data, onSuccess = undefined, onError = undefined) {
                setTimeout(function waytingToInitLocalCache() {
                    if (this._processingChangeDBVersion) {
                        setTimeout(waytingToInitLocalCache.bind(this), 30);
                    }
                    else {
                        var transaction = this.db.transaction([tableName], "readwrite");
                        var objectStore = transaction.objectStore(tableName);
                        var saveRequest = objectStore.put(data);
                        saveRequest.onsuccess = onSuccess;
                        saveRequest.onerror = onError;
                    }
                }.bind(this), 30);
            }
            getData(tableName, onSuccess = undefined) {
                var transaction = this.db.transaction([tableName], "readonly");
                var objectStore = transaction.objectStore(tableName);
                objectStore.getAll().onsuccess = function (event) {
                    onSuccess(this.result, tableName);
                };
            }
            getDataByKey(tableName, key, onSuccess = undefined) {
                if (this.existTable(tableName)) {
                    var transaction = this.db.transaction([tableName], "readonly");
                    var objectStore = transaction.objectStore(tableName);
                    objectStore.get(key).onsuccess = function (event) {
                        onSuccess(this.result);
                    };
                }
                else {
                    onSuccess(undefined);
                }
            }
            removeData(tableName, key) {
                var transaction = this.db.transaction([tableName], "readwrite");
                var objectStore = transaction.objectStore(tableName);
                objectStore.delete(key);
            }
            clearData(tableName) {
                var transaction = this.db.transaction([tableName], "readwrite");
                var objectStore = transaction.objectStore(tableName);
                objectStore.clear();
            }
            OnSuccessInitDb() {
                this._processingChangeDBVersion = false;
                this.db = this.request.result;
                this._onSuccess();
            }
            OnErrorInitDb() {
                console.log("Error init local DB");
            }
        }
        data_7.LocalDb = LocalDb;
    })(data = my.data || (my.data = {}));
})(my || (my = {}));
var my;
(function (my) {
    let core;
    (function (core) {
        let controls;
        (function (controls) {
            class EventsDataView extends my.core.controls.Events {
                constructor(eventTarget) {
                    super(eventTarget);
                    this.itemClick = new my.core.events.core("itemClick");
                }
            }
            controls.EventsDataView = EventsDataView;
            class DataView extends my.core.controls.coreData {
                constructor(sTemplate = "") {
                    super('div');
                    this.ctlType = "coreDataView";
                    this.readOnly = false;
                    this.disabled = false;
                    this.Template = sTemplate;
                    this.events = new EventsDataView(this);
                }
                set dataRow(val) {
                    this.element.innerHTML = "";
                    this.renderTemplate(val);
                }
                get dsRowUID() {
                    return this._dsRowUID;
                }
                set dsRowUID(val) {
                    this._dsRowUID = val;
                    this.rebind();
                }
                set dsData(val) {
                    if (val == undefined) {
                        console.log("ERROR!: dataset is undefined");
                        return;
                    }
                    val.events.Loaded.subscribe(this, (s, e, d) => {
                        if (this.dsDataTable) {
                            this.data = val.getTable(this.dsDataTable);
                        }
                        else {
                            this.data = val.getTable();
                        }
                    });
                    if (val.data != {}) {
                        if (this.dsDataTable) {
                            this.data = val.getTable(this.dsDataTable);
                        }
                        else {
                            this.data = val.getTable();
                        }
                    }
                }
                ;
                rebind() {
                    this.element.innerHTML = "";
                    if (this.data == undefined) {
                        console.log("data is empty");
                        return;
                    }
                    if (this.dsRowUID) {
                        var d = this.data.findFirst("UID", this.dsRowUID);
                        this.renderTemplate(d);
                    }
                }
                renderTemplate(dataRow) {
                    var str = this.Template.toString();
                    dataRow.itemsArray.forEach((itm, idx) => {
                        var f = "[[" + itm.Name + "]]";
                        var r = "";
                        if (itm.Data.value) {
                            r = itm.Data.value.toString();
                        }
                        str = str.replace(f, r);
                    });
                    this.element.innerHTML = this.element.innerHTML + str;
                }
            }
            controls.DataView = DataView;
        })(controls = core.controls || (core.controls = {}));
    })(core = my.core || (my.core = {}));
    let controls;
    (function (controls) {
        class ctlDataView extends my.core.controls.DataView {
            constructor(sTemplate = "") {
                super(sTemplate);
                this.ctlType = "ctlDataView";
            }
            ;
        }
        controls.ctlDataView = ctlDataView;
        ;
    })(controls = my.controls || (my.controls = {}));
})(my || (my = {}));
var my;
(function (my) {
    let core;
    (function (core) {
        let controls;
        (function (controls) {
            class EventsList extends my.core.controls.Events {
                constructor(eventTarget) {
                    super(eventTarget);
                    this.itemClick = new my.core.events.core("itemClick");
                }
            }
            controls.EventsList = EventsList;
            class List extends my.core.controls.coreData {
                constructor(keyColumn, labelColumn, data = undefined) {
                    super('ul');
                    this.ctlType = "coreList";
                    this.readOnly = false;
                    this.disabled = false;
                    this.items = [];
                    this.keyColumn = keyColumn;
                    this.labelColumn = labelColumn;
                    if (data) {
                        this.data = data;
                    }
                    this.events = new EventsList(this);
                }
                get _value() { return this.selectedItem.itemData[this.keyColumn]; }
                get selectedItem() {
                    return this._selectedItem;
                }
                set selectedItem(val) {
                    if (val == undefined) {
                        this._selectedItem = undefined;
                        return;
                    }
                    if (this._selectedItem) {
                        this._selectedItem.element.classList.remove("selected");
                    }
                    this._selectedItem = val;
                    this._selectedItem.element.classList.add("selected");
                }
                get dsData() {
                    return this._dsData;
                }
                set dsData(val) {
                    this._dsData = val;
                    val.events.Loaded.subscribe(this, (s, e, d) => {
                        if (this.dsDataTable) {
                            this.data = val.getTable(this.dsDataTable);
                        }
                        else {
                            this.data = val.getTable();
                        }
                    });
                }
                ;
            }
            controls.List = List;
            class ListItem extends my.core.controls.core {
                constructor(uid, text) {
                    super('li');
                    this.ctlType = "coreListItem";
                    this.readOnly = false;
                    this.disabled = false;
                    this.uid = uid;
                    this.text = text;
                }
                get _value() {
                    return this.uid;
                }
                set _value(val) {
                    this.uid = val;
                }
                onValueChange(sender, event, data) {
                    this.value = sender.value;
                }
                set text(val) {
                    this.element.innerText = val;
                }
                get text() {
                    return this.element.innerText;
                }
                set itemTemplate(itmTempleate) {
                    if (itmTempleate) {
                        this.element.innerHTML = '';
                        this.element.appendChild(itmTempleate.element);
                    }
                }
                ;
                ;
            }
            controls.ListItem = ListItem;
            ;
        })(controls = core.controls || (core.controls = {}));
    })(core = my.core || (my.core = {}));
    let controls;
    (function (controls) {
        class ctlList extends my.core.controls.List {
            constructor(keyColumn, labelColumn, data = undefined) {
                super(keyColumn, labelColumn, data);
                this.ctlType = "ctlList";
                this.css = new my.css.List(this.element);
            }
            ;
            _createItems() {
                this.items = [];
                this.element.innerHTML = '';
                var self = this;
                var li;
                if (this.title != undefined) {
                    li = new ctlListItem("", this.title);
                    li.element.classList.add("title");
                    self.element.appendChild(li.element);
                }
                if (this.data) {
                    this.data.rows.forEach((item, idx) => {
                        if (item.__bindVisible) {
                            this._addItem(item);
                        }
                    });
                }
                else {
                    console.log('ctlList.createItems: no data');
                }
            }
            ;
            _addItem(dRow) {
                var li;
                var key;
                if (dRow.items[this.labelColumn] == undefined) {
                    console.log("missing data for labelColumn");
                }
                if (dRow.items[this.keyColumn]) {
                    key = dRow.items[this.keyColumn].value;
                }
                li = new ctlListItem(key, dRow.items[this.labelColumn].value);
                if (this.itemTemplate) {
                    li.itemTemplate = this.itemTemplate(self, dRow);
                }
                if (this.itemPostProcesing) {
                    this.itemPostProcesing(li);
                }
                li.events.click.subscribe(this, this.onItemClick.bind(this));
                li.itemData = dRow;
                this.items.push(li);
                this.element.appendChild(li.element);
            }
            filterBy(column, value) {
                this.items.forEach((item, idx) => {
                    if (value == "") {
                        item.visible = true;
                        return;
                    }
                    var row = item.itemData;
                    if (row.itemsArray.findIndex(x => x.Name == column) != -1) {
                        var strFindIn = row.items[column].value + "";
                        if (strFindIn.toLowerCase().includes(value.toLowerCase())) {
                            item.visible = true;
                            console.log("ListItem true");
                        }
                        else {
                            item.visible = false;
                            console.log("ListItem false");
                        }
                    }
                });
            }
            ;
            resetListItemDisplay() {
                this.items.forEach((item, idx) => {
                    item.visible = true;
                });
            }
            onItemClick(sender, e, data) {
                this.selectedItem = sender;
                this.events.itemClick.dispatch(this, sender.itemData);
            }
            ;
            rebind() { this._createItems(); }
            ;
        }
        controls.ctlList = ctlList;
        ;
        class ctlListItem extends my.core.controls.ListItem {
            constructor(uid, text) {
                super(uid, text);
                this.ctlType = "ctlListItem";
                this.css = new my.css.ListItem(this.element);
                this.text = text;
            }
            set itemTemplate(itmTempleate) {
                if (itmTempleate) {
                    this.element.innerHTML = '';
                    this.element.appendChild(itmTempleate.element);
                }
            }
            ;
            ;
        }
        controls.ctlListItem = ctlListItem;
        ;
    })(controls = my.controls || (my.controls = {}));
})(my || (my = {}));
var my;
(function (my) {
    let core;
    (function (core) {
        let controls;
        (function (controls) {
            class DropDown extends my.core.controls.coreData {
                constructor(value) {
                    super('div');
                    this.ctlType = "ctlDropDownCore";
                    this.readOnly = false;
                    this.reset = this._reset;
                    this.defaultText = "Please Select";
                    this._popupMode = false;
                    this.addNone = false;
                    this._keyColumn = "UID";
                    this._labelColumn = "Name";
                    this.items = [];
                    this.autocompleteThreshold = 3;
                    this.elementErrorPH = document.createElement('div');
                    this.element.appendChild(this.elementErrorPH);
                    this.css = new my.css.DropDown(this.element);
                    this.divPopucCtlList = document.createElement('div');
                    this.divTitlePopup = document.createElement('div');
                    this.elPopupLabel = new my.controls.ctlLabel(this.label, "");
                    this.divTitlePopup.appendChild(this.elPopupLabel.element);
                    this.elPopucCloseButton = new my.controls.ctlIcon(this.css.currentTeheme.icons.clear);
                    this.elPopucCloseButton.visible = true;
                    this.elPopucCloseButton.element.classList.add("ico-btn");
                    this.elPopucCloseButton.events.click.subscribe(this, this.onCloseButtonClick.bind(this));
                    this.divTitlePopup.appendChild(this.elPopucCloseButton.element);
                    this.divTitlePopup.classList.add("header");
                    this.divPopucCtlList.appendChild(this.divTitlePopup);
                    this.divPopucCtlList.classList.add("container");
                    this.value = value;
                    this.ctlList = new my.controls.ctlList(this.keyColumn, this.labelColumn);
                    this.ctlList.css = new my.css.DropDownList(this.ctlList.element);
                    this.ctlList.itemPostProcesing = (li) => { li.css = new my.css.DropDownListItem(li.element); };
                    this.ctlList.events.itemClick.subscribe(this, this.onlistItemClick.bind(this));
                    this.divPopucCtlList.hidden = true;
                    this.divPopucCtlList.appendChild(this.ctlList.element);
                    this.element.appendChild(this.divPopucCtlList);
                    this.events.valueValidated.subscribe(this, this._onValueValidated.bind(this));
                    window.addEventListener("resize", this.changeWindowSize.bind(this));
                    this.changeWindowSize();
                }
                get dsData() {
                    return this._dsData;
                }
                set dsData(val) {
                    this._dsData = val;
                    val.events.Loaded.subscribe(this, (s, e, d) => {
                        if (this.dsDataTable) {
                            this.data = val.getTable(this.dsDataTable);
                        }
                        else {
                            this.data = val.getTable();
                        }
                    });
                }
                get disabled() { return this.element.disabled; }
                set disabled(val) {
                    this.element.disabled = val;
                    this.ctlTrigger.disabled = val;
                }
                get keyColumn() {
                    return this._keyColumn;
                }
                set keyColumn(val) {
                    this._keyColumn = val;
                    this.ctlList.keyColumn = val;
                }
                get labelColumn() {
                    return this._labelColumn;
                }
                set labelColumn(val) {
                    this._labelColumn = val;
                    this.ctlList.labelColumn = val;
                }
                get parentDropdown() { return this._parentDropdown; }
                set parentDropdown(val) {
                    if (val) {
                        this._parentDropdown = val;
                        var self = this;
                        this._parentDropdown.events.change.subscribe(this, (s, e, d) => {
                            self.rebind();
                        });
                    }
                }
                get valueText() {
                    var ret = "";
                    if (this.data) {
                        var row = this.data.findFirst(this.keyColumn, this.value.toString());
                        if (row) {
                            ret = row.items[this.labelColumn].value;
                        }
                    }
                    return ret;
                }
                onCloseButtonClick(e) {
                    this.hideList(e);
                }
                _onValueValidated(s, e, d) {
                    if (this.validation.isValid) {
                        this.elementErrorPH.innerHTML = "";
                        this.element.classList.remove("error");
                    }
                    else {
                        var ico = new my.controls.ctlIcon("error");
                        this.elementErrorPH.innerHTML = "";
                        this.elementErrorPH.appendChild(ico.element);
                        ico.tooltip = this.validation.errorText;
                        this.element.classList.add("error");
                    }
                }
                changeWindowSize() {
                    var windowSize = my.tools.getWindowSize(window.innerHeight, window.innerWidth);
                    if (windowSize == "xs") {
                        this._popupMode = true;
                    }
                    else {
                        this._popupMode = false;
                    }
                    if (this.closeEventHandle) {
                        this.hideList(this);
                        this.showList();
                    }
                }
                rebind() {
                    if (this.data == undefined) {
                        return;
                    }
                    if (this._parentDropdown) {
                        if (this._parentDropdown.value) {
                            this.disabled = false;
                            var fi = new my.data.Filter(this.parentFilterColumn, this._parentDropdown.value.toString());
                            this.data.filters.add(fi);
                            this.ctlList.data = this.data;
                        }
                        else {
                            this.disabled = true;
                        }
                    }
                    else {
                        this.ctlList.data = this.data;
                    }
                    var itm;
                    if ((this.value != undefined) && (this.value != "")) {
                        itm = this.data.findFirst(this.keyColumn, String(this.value));
                        if (itm) {
                            this.ctlTrigger.value = itm.items[this.labelColumn].value;
                        }
                        else {
                            console.log("core.DropDown error rebainding: can't find " + this.value + " in the control data!");
                        }
                    }
                    if (this.addNone) {
                        var li = new my.controls.ctlListItem("NULL", "None");
                        this.ctlList.element.prepend(li.element);
                        li.events.click.subscribe(this, (s, e, d) => {
                            this.value = "NULL";
                            this.hideList(e);
                            this.ctlTrigger.value = "None";
                        });
                    }
                    if (this.onAfterRebind) {
                        this.onAfterRebind();
                    }
                }
                onlistItemClick(sender, e, row) {
                    if (this.value != row.items[this.keyColumn].value) {
                        this.value = row.items[this.keyColumn].value;
                        this.events.change.dispatch(this, this.value);
                    }
                    this.hideList(e);
                    this.ctlTrigger.value = row.items[this.labelColumn].value;
                }
                ;
                showList() {
                    if (this.closeEventHandle) {
                        return;
                    }
                    this.ctlList.css.add(this.css.currentTeheme.active);
                    this.elPopupLabel.style.width = this.ctlTrigger.element.clientWidth + "px";
                    if (this.label != undefined) {
                        this.elPopupLabel.value = this.label;
                    }
                    else {
                        this.elPopupLabel.value = this.defaultText;
                    }
                    this.elPopupLabel.visible = this._popupMode;
                    this.elPopucCloseButton.visible = this._popupMode;
                    this.divPopucCtlList.hidden = false;
                    this.alignDropdownListPosition(this.ctlTrigger.element);
                    this.closeEventHandle = this.hideList.bind(this);
                    document.addEventListener('click', this.closeEventHandle, false);
                }
                hideList(e) {
                    if (!this.ctlTrigger.element.contains(e.target)) {
                        this.ctlList.css.remove(this.css.currentTeheme.active);
                        this.divPopucCtlList.hidden = true;
                        document.removeEventListener('click', this.closeEventHandle);
                        this.closeEventHandle = undefined;
                    }
                }
                ;
                alignDropdownListPosition(htmlEl) {
                    var topPos = htmlEl.offsetTop + htmlEl.offsetHeight;
                    if (this.divPopucCtlList.style.position == "") {
                        topPos = topPos - this.divPopucCtlList.clientHeight;
                    }
                    else if (this.ctlTrigger.ctlType == "ctlText") {
                        topPos = htmlEl.offsetTop + htmlEl.offsetHeight;
                    }
                    var clientFormHeight = htmlEl.ownerDocument.body.clientHeight;
                    var trigerElTopPosition = my.tools.getElementPositionOnForm(htmlEl).top;
                    if (trigerElTopPosition + topPos + this.ctlList.element.clientHeight > clientFormHeight) {
                        topPos = -(5 + this.ctlList.element.offsetHeight);
                    }
                    this.divPopucCtlList.style.position = "absolute";
                    this.divPopucCtlList.style.top = (topPos).toString() + 'px';
                    this.divPopucCtlList.style.left = htmlEl.offsetLeft.toString() + 'px';
                    this.ctlList.style.minWidth = htmlEl.offsetWidth.toString() + 'px';
                }
                ;
                _reset() {
                    this._value = undefined;
                    this.ctlTrigger.value = this.defaultText;
                }
            }
            controls.DropDown = DropDown;
            ;
        })(controls = core.controls || (core.controls = {}));
    })(core = my.core || (my.core = {}));
    let controls;
    (function (controls) {
        class ctlDropDown extends my.core.controls.DropDown {
            constructor(value, defaultText = undefined) {
                super(value);
                this.ctlType = "ctlDropDown";
                this.isOptional = false;
                var self = this;
                if (defaultText) {
                    this.defaultText = defaultText;
                }
                this.ctlTrigger = new controls.ctlButton(this.defaultText, (sender, event, data) => {
                    self.showList();
                });
                this.element.appendChild(this.ctlTrigger.element);
                this.ctlList.events.dataChanged.subscribe(this, (s, e, d) => {
                    var el = new my.controls.ctlListItem("", "None");
                    this.ctlList.items.push(el);
                });
            }
            ;
            onAfterRebind() {
                if ((this.value == undefined) && (this.value == "")) {
                    this.ctlTrigger.value = this.defaultText;
                }
            }
        }
        controls.ctlDropDown = ctlDropDown;
        ;
        class ctlAutocomplete extends my.core.controls.DropDown {
            constructor(value) {
                super(value);
                this.ctlType = "ctlAutocomplete";
                var self = this;
                this.ctlTrigger = new controls.ctlText('');
                this.ctlTrigger.events.keyup.subscribe(this, this.onTriggerKeyUp.bind(this));
                this.ctlTrigger.events.focus.subscribe(this, this.onTriggerFocus.bind(this));
                this.ctlTrigger.isTwoWayBinding = false;
                this.ctlTrigger.placeholderText = "type here";
                this.btnClear = new controls.ctlIcon(this.css.currentTeheme.icons.clear);
                this.btnClear.visible = false;
                this.btnClear.element.classList.add("ico-btn");
                this.btnClear.events.click.subscribe(this, this.onClear.bind(this));
                this.element.appendChild(this.ctlTrigger.element);
                this.element.appendChild(this.btnClear.element);
            }
            get maxlength() {
                return this.ctlTrigger.maxlength;
            }
            set maxlength(val) {
                this.ctlTrigger.maxlength = val;
            }
            ;
            onAfterRebind() {
            }
            onTriggerKeyUp(sender, e, data) {
                this.ctlList.filterBy("Name", this.ctlTrigger.value);
                if (this.ctlList.visible === false) {
                    this.showList();
                }
                if (this.ctlTrigger.text.length > 0) {
                    this.btnClear.visible = true;
                }
                else {
                    this.btnClear.visible = false;
                }
            }
            onTriggerFocus(sender, e, data) {
                if (this.ctlList.visible === false) {
                    this.showList();
                }
            }
            onClear(sender, e, data) {
                this.value = undefined;
                this.ctlTrigger.value = "";
                this.ctlTrigger.elementText.focus();
                this.btnClear.visible = false;
                this.ctlList.resetListItemDisplay();
            }
        }
        controls.ctlAutocomplete = ctlAutocomplete;
        ;
    })(controls = my.controls || (my.controls = {}));
})(my || (my = {}));
var my;
(function (my) {
    let controls;
    (function (controls) {
        class ctlTabs extends my.core.controls.List {
            constructor(keyColumn, labelColumn, data) {
                super(keyColumn, labelColumn, data);
                this.ctlType = "ctlTabs";
                this._monitorURL = true;
                this.css = new my.css.Tabs(this.element);
                this.monitorURL = true;
                this.locationHashChanged();
            }
            get monitorURL() {
                return this._monitorURL;
            }
            set monitorURL(val) {
                this._monitorURL = val;
                if (val) {
                    window.onhashchange = this.locationHashChanged.bind(this);
                }
            }
            rebind() {
                this.items = [];
                var self = this;
                this.clearAll();
                var key;
                var type = "link";
                var isSelected = false;
                if (this.data) {
                    this.data.rows.forEach((dRow, idx) => {
                        isSelected = false;
                        if (dRow.items[self.labelColumn] == undefined) {
                            console.log("missing data for labelColumn");
                        }
                        key = undefined;
                        if (dRow.items[self.keyColumn]) {
                            key = dRow.items[self.keyColumn].value;
                        }
                        type = undefined;
                        if (dRow.items["type"]) {
                            type = dRow.items["type"].value;
                        }
                        if (dRow.items["selected"]) {
                            if (dRow.items["selected"].value == 1) {
                                isSelected = true;
                            }
                        }
                        self.addItem(dRow.items[self.labelColumn].value, key, type, isSelected, dRow);
                    });
                }
                else {
                    console.log('ctlTabs.bind: no data');
                }
                var d = document.createElement("div");
                d.id = "shadow";
                this.element.appendChild(d);
                var noneSelested = true;
                this.items.forEach((itm, idx) => {
                    if (itm.isSelected) {
                        noneSelested = false;
                    }
                });
                if (noneSelested) {
                    this.selectedItem = this.items[0];
                }
            }
            _onItemClick(item) {
                this.selectedItem = item;
                this.events.itemClick.dispatch(this, item.itemData);
            }
            clearAll() {
                this.items = [];
                this.element.innerHTML = '';
            }
            addItem(text, link, type, selected = false, data = undefined) {
                var li;
                li = new ctlTabsItem(text, link, type);
                ;
                li.isSelected = selected;
                if (selected) {
                    this.selectedItem = li;
                }
                li.onClick = this._onItemClick.bind(this);
                li.itemData = data;
                this.items.push(li);
                this.element.appendChild(li.element);
            }
            locationHashChanged() {
                var hash = location.hash;
                this.items.forEach((itm, idx) => {
                    if (itm.link.toLowerCase().includes(hash.toLowerCase())) {
                        this.selectedItem = itm;
                    }
                });
            }
        }
        controls.ctlTabs = ctlTabs;
        class ctlTabsItem extends my.core.controls.ListItem {
            constructor(text, link, type) {
                super("", "");
                this.ctlType = "ctlTabsItem";
                this.isSelected = false;
                this.css = new my.css.TabsItem(this.element);
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
                        var lnk = this._addLink("", link);
                        lnk.element.appendChild(this._addIcon(text).element);
                        this.element.appendChild(lnk.element);
                        break;
                    case "text":
                        this.element.appendChild(new controls.ctlSpan(text).element);
                        break;
                    default:
                        this.element.appendChild(this._addLink(text, link).element);
                        break;
                }
            }
            set itemTemplate(itmTempleate) {
                if (itmTempleate) {
                    this.element.innerHTML = '';
                    this.element.appendChild(itmTempleate.element);
                }
            }
            ;
            ;
            _addIcon(text) {
                var ico = new my.controls.ctlIcon(text);
                return ico;
            }
            _addLink(text, link) {
                var ctlLink = new my.controls.ctlLink(text, link);
                ctlLink.events.click.subscribe(this, this.onLinkClick.bind(this));
                return ctlLink;
            }
            onLinkClick(sender, event, data) {
                if (this.onClick) {
                    this.onClick(this);
                }
            }
        }
        controls.ctlTabsItem = ctlTabsItem;
        ;
    })(controls = my.controls || (my.controls = {}));
})(my || (my = {}));
var my;
(function (my) {
    let core;
    (function (core_7) {
        let form;
        (function (form) {
            class core extends my.core.controls.core {
                constructor() {
                    super("div");
                    this.ctlType = "forms.Core";
                    this.readOnly = false;
                    this.reset = this._resetForm;
                    this.disabled = false;
                    this.Groups = [];
                    this._mode = "edit";
                    this.options = new frmOptions();
                    this.css = new my.css.form(this.element);
                }
                get mode() {
                    return this._mode;
                }
                set mode(val) {
                    this._mode = val;
                    if (val == "insert") {
                        this.dataRowUID = "NEW";
                    }
                }
                get dataSet() {
                    return this._dataSet;
                }
                set dataSet(val) {
                    this._dataSet = val;
                    if (val) {
                        this._dataSet.events.Loaded.subscribe(this, this._rebind.bind(this));
                    }
                }
                get dataRow() {
                    if (this._currentDataRowUID != this.dataRowUID) {
                        this._currentDataRow = this._getDataRow();
                        console.log("Form.dataRow().called");
                    }
                    if (this._currentDataRow == undefined) {
                        this._currentDataRow = this._getDataRow();
                    }
                    return this._currentDataRow;
                }
                get DataTableName() {
                    if (this._DataTableName == undefined) {
                        this._DataTableName = this.dataSet.primaryTable;
                    }
                    return this._DataTableName;
                }
                set DataTableName(val) {
                    this._DataTableName = val;
                }
                validate() {
                    var bRet = true;
                    this.Groups.forEach((itm, idx) => {
                        if (!itm.isValid()) {
                            bRet = false;
                        }
                    });
                    if ((bRet) && (this.validation.rules.length > 0)) {
                        this.validation.rules.forEach((itm, idx) => {
                            if (itm.validate(this.Groups) == false) {
                                bRet = false;
                            }
                        });
                    }
                    return bRet;
                }
                _resetForm() {
                    var self = this;
                    self.Groups.forEach(function (block, idx) {
                        block.items.forEach(function (blockItem, idx) {
                            blockItem.itemControl.reset();
                        });
                    });
                }
                _getGroupByName(val) {
                    var ret;
                    this.Groups.forEach((item, idx) => {
                        if ((item.name = val)) {
                            ret = item;
                        }
                    });
                    return ret;
                }
                getFitemByColumn(val) {
                    var ret;
                    this.Groups.forEach((fgrup, idx) => {
                        var fi = fgrup.getFitemByColumn(val);
                        if (fi != undefined) {
                            ret = fi;
                        }
                    });
                    return ret;
                }
                _rebind() {
                    this._updateDataRow();
                    this.rebind();
                }
                _updateDataRow() {
                    this._currentDataRow = undefined;
                }
                _getDataRow() {
                    var ret;
                    var ds = this.dataSet.tables[this.DataTableName];
                    if (ds && this.dataRowUID) {
                        if (this.dataRowUID != "NEW") {
                            ret = ds.findFirst("UID", this.dataRowUID);
                        }
                        else {
                            ret = this.getEmptyFormData();
                        }
                    }
                    else if (ds && this.dataRowUID == undefined) {
                        ret = ds.value[0];
                    }
                    this._currentDataRowUID = this.dataRowUID;
                    return ret;
                }
                getEmptyFormData() {
                    var self = this;
                    var fObj = this._getBlankForm();
                    var dObj = {};
                    var dt = this.dataSet.getTable();
                    if (dt) {
                        dt.columns.forEach((col, idx) => {
                            if (fObj.hasOwnProperty(col.Name) == false) {
                                fObj[col.Name] = undefined;
                            }
                        });
                    }
                    var row = new my.data.DataRow(fObj, this.DataTableName);
                    row.setAdded();
                    return row;
                }
                _getBlankForm() {
                    var aObj = {};
                    this.Groups.forEach((gr, idx) => {
                        gr.items.forEach((itm, idx) => {
                            if (itm.defaultValue) {
                                aObj[itm.dataColumn] = itm.defaultValue;
                            }
                            else if (itm.type == "checkbox") {
                                aObj[itm.dataColumn] = 0;
                            }
                            else {
                                aObj[itm.dataColumn] = null;
                            }
                        });
                    });
                    return aObj;
                }
            }
            form.core = core;
            class frmGroup extends my.core.controls.core {
                constructor(name) {
                    super("div");
                    this.ctlType = "frmGroup";
                    this.readOnly = false;
                    this.disabled = false;
                    this.value = "";
                    this.items = [];
                    this.name = name;
                    this.css = new my.css.formGroup(this.element);
                }
                update() { }
                addItem(item) {
                    this.items.push(item);
                    if (item.isHidden == false) {
                        this.element.appendChild(item.element);
                    }
                }
                isValid() {
                    var bRet = true;
                    this.items.forEach((itm, idx) => {
                        if (itm.type != "label") {
                            if (!itm.isValid) {
                                bRet = false;
                            }
                        }
                    });
                    return bRet;
                }
                getFitemByColumn(val) {
                    var ret;
                    this.items.forEach((item, idx) => {
                        if (item.dataColumn == val) {
                            ret = item;
                        }
                    });
                    return ret;
                }
            }
            form.frmGroup = frmGroup;
            class frmItem extends my.core.controls.core {
                constructor(itemControl, parentForm) {
                    super("div");
                    this.ctlType = "frmItem";
                    this._r = false;
                    this.disabled = false;
                    this.visibleInInsertMode = true;
                    this.visibleInEditMode = true;
                    this._isHidden = false;
                    this._isMandatory = true;
                    this._labelLocation = "top";
                    this.parentForm = parentForm;
                    this.css = new my.css.formItem(this.element);
                    this.ctlPlaceHolder = document.createElement("div");
                    this.ctlPlaceHolder.classList.add("fCtl");
                    this.element.appendChild(this.ctlPlaceHolder);
                    this.ctlValidationErrorPlaceHolder = document.createElement("div");
                    this.element.appendChild(this.ctlValidationErrorPlaceHolder);
                    this.itemControl = itemControl;
                    this._applyOptions();
                }
                get readOnly() {
                    return this._r;
                }
                set readOnly(val) {
                    this._r = val;
                    if (val) {
                        if ((this.itemControl) && (this.itemControl.ctlType != "ctlDivListItem")) {
                            var lblSpan = new my.controls.ctlSpan("");
                            lblSpan.css = new my.css.formControl(lblSpan.element);
                            this.itemControl = lblSpan;
                        }
                    }
                }
                get itemControl() {
                    return this._itemControl;
                }
                set itemControl(val) {
                    this._itemControl = val;
                    if (this._itemControl) {
                        this.ctlPlaceHolder.innerHTML = "";
                        this.ctlPlaceHolder.appendChild(this.itemControl.element);
                    }
                }
                get isHidden() {
                    return this._isHidden;
                }
                set isHidden(val) {
                    this._isHidden = val;
                    if (val) {
                        this.element.style.visibility = "hidden";
                    }
                    else {
                        this.element.style.visibility = "visible";
                    }
                }
                get isMandatory() {
                    return this._isMandatory;
                }
                set isMandatory(val) {
                    this._isMandatory = val;
                    if ((this.itemControl) && (this.itemControl.validation)) {
                        if (val) {
                            this.itemControl.validation.add("required");
                        }
                        else {
                            var i = this.itemControl.validation.getByType("required");
                            this.itemControl.validation.remove(i);
                        }
                    }
                }
                get label() {
                    return this._label._value;
                }
                set label(val) {
                    if (val == undefined) {
                        return;
                    }
                    if (this._label) {
                        this._label.value = val;
                    }
                    else {
                        this._label = new my.controls.ctlLabel(val, this.itemControl.id);
                        this.element.insertBefore(this._label.element, this.ctlPlaceHolder);
                    }
                }
                get labelLocation() {
                    return this._labelLocation;
                }
                set labelLocation(val) {
                    this._labelLocation = val;
                    if (val == "left") {
                        this.element.classList.add("lblLeft");
                    }
                    else {
                        this.element.classList.remove("lblLeft");
                    }
                }
                _applyOptions() {
                    if (this.parentForm.options.labelLocation == "left") {
                        this.labelLocation = "left";
                    }
                    else {
                        this.labelLocation = "top";
                    }
                }
                bind(ds) {
                    var row = this.parentForm.dataRow;
                    if (row.items) {
                        if (row.items.hasOwnProperty(this.dataColumn)) {
                            var observableValue = row.items[this.dataColumn];
                            if (observableValue)
                                this._bindFormControls(observableValue, ds);
                        }
                        else {
                            console.log("Form.Item.Bind: Can't find " + this.dataColumn + " in the datatable.row(0)!");
                        }
                    }
                    else {
                        console.log("this.parentForm.dataRow is undefined");
                    }
                }
                _bindFormControls(ctrlData, ds) {
                    if (this.isHidden) {
                        return;
                    }
                    if ((this.dataType == "list") && (this.readOnly)) {
                        var itm;
                        if (ctrlData.value) {
                            itm = ds.tables[this.dataTable].findFirst("UID", ctrlData.value.toString());
                        }
                        if (itm) {
                            this.itemControl.value = itm["Name"].value;
                        }
                        else {
                        }
                    }
                    else {
                        this.itemControl.value = ctrlData;
                    }
                    if (this.itemControl instanceof my.controls.ctlAutocomplete ||
                        this.itemControl instanceof my.controls.ctlDropDown) {
                        this.itemControl.data = ds.tables[this.dataTable];
                    }
                }
                get isValid() {
                    var bRet = true;
                    if ((this.itemControl) && (this.itemControl.validation)) {
                        bRet = this.itemControl.validation.validate(this.itemControl.value);
                    }
                    return bRet;
                }
                updateValidationStatus(val, errText) {
                    if (val) {
                        this.element.classList.remove("error");
                        this.ctlValidationErrorPlaceHolder.innerHTML = "";
                    }
                    else {
                        this.element.classList.add("error");
                        this._addErrorIcon(errText);
                    }
                }
                _addErrorIcon(errText) {
                    var ico = new my.controls.ctlIcon("error");
                    this.ctlValidationErrorPlaceHolder.innerHTML = "";
                    this.ctlValidationErrorPlaceHolder.appendChild(ico.element);
                    var top = this.itemControl.element.offsetTop + (this.itemControl.element.offsetHeight - ico.element.offsetHeight) / 2;
                    ico.element.style.top = top + "px";
                    ico.tooltip = errText;
                }
            }
            form.frmItem = frmItem;
            class EventsForm extends my.core.controls.Events {
                constructor(eventTarget) {
                    super(eventTarget);
                    this.itemClick = new my.core.events.core("itemClick");
                    this.submitClick = new my.core.events.core("submitClick");
                    this.clearClick = new my.core.events.core("clearClick");
                }
            }
            form.EventsForm = EventsForm;
            class frmOptions {
                constructor() {
                    this.Attributes = [];
                    this.minColWidth = 50;
                    this.OptionalMarkVisible = false;
                    this.RequiredMark = '*';
                    this.RequiredMarkVisible = true;
                }
            }
            form.frmOptions = frmOptions;
            ;
        })(form = core_7.form || (core_7.form = {}));
    })(core = my.core || (my.core = {}));
})(my || (my = {}));
var my;
(function (my) {
    let forms;
    (function (forms) {
        class Config extends my.core.config.cManager {
            constructor(json = undefined) {
                super();
                this.frmGroups = [];
                this.formCfg = new my.forms.FrmCfg();
                this._sizes = {
                    "12_6_3": "s12,m6,l3",
                    "12_6_4": "s12,m6,l4",
                    "12_6_6": "s12,m6,l6",
                    "12_4_4": "s12,m4,l4"
                };
                if (json) {
                    this.JSON = json;
                    this.parseData(json);
                }
            }
            parseData(val) {
                if (val.hasOwnProperty("groups")) {
                    var groups = val.groups;
                    this.frmGroups = [];
                    groups.forEach((item) => {
                        this.frmGroups.push(this._parseGroup(item));
                    }, this);
                    this._applyDefaults();
                    this.parseControl(this.formCfg, val);
                }
                else {
                    console.log("bad form config, no groups definition in config!");
                }
            }
            ;
            _parseGroup(val) {
                var fGroupCfg = new FrmGroupCfg();
                this.parseGroup(val, fGroupCfg);
                if (val.hasOwnProperty("items")) {
                    fGroupCfg.items = this._parseItems(val.items, fGroupCfg);
                }
                return fGroupCfg;
            }
            _parseItems(val, gCfg) {
                var ret = [];
                val.forEach((item, idx) => {
                    var fItem = new FrmItemCfg();
                    if (gCfg.itemSize) {
                        fItem.size = gCfg.itemSize;
                    }
                    this.parseColumn(item, fItem);
                    if (item.hasOwnProperty("linkedDataColumn")) {
                        fItem.linkedDataColumn = item["linkedDataColumn"];
                    }
                    if (item.hasOwnProperty("linkedFilterColumn")) {
                        fItem.linkedFilterColumn = item["linkedFilterColumn"];
                    }
                    ret.push(fItem);
                });
                return ret;
            }
            customParse(val, col) {
            }
            _applyDefaults() {
                this.frmGroups.forEach((fGroup, idx) => {
                    if (fGroup.name.toLowerCase() == "infodates") {
                        this.infoDates(fGroup);
                    }
                    this.applyDefaultSizes(fGroup.items);
                }, this);
            }
            defaultSizeFunction(col, totalCols) {
                var l = totalCols;
                var s = this._sizes["12_6_4"];
                if ((l == 1) || (l == 5) || (l == 8) || (l == 11)) {
                    s = this._sizes["12_6_4"];
                }
                if (l == 2) {
                    s = this._sizes["12_6_6"];
                }
                if ((l == 3) || (l == 6) || (l == 9) || (l == 12)) {
                    s = this._sizes["12_4_4"];
                }
                if ((l == 4) || (l == 7) || (l == 10)) {
                    s = this._sizes["12_6_3"];
                }
                col.size = s;
            }
            infoDates(fGr) {
                fGr.items = [];
                var fItem = new FrmItemCfg();
                fItem.dataColumn = 'CreatedOn';
                fItem.label = 'CreatedOn';
                fItem.dataType = my.config.dataType.datetime;
                fItem.type = my.config.type.label;
                fItem.visibleInInsertMode = false;
                fItem.size = "s12,m3";
                fGr.items.push(fItem);
                var fItemC = new FrmItemCfg();
                fItemC.dataColumn = 'CreatedBy';
                fItemC.label = 'CreatedBy';
                fItemC.dataType = my.config.dataType.string;
                fItemC.type = my.config.type.label;
                fItemC.visibleInInsertMode = false;
                fItemC.size = "s12,m3";
                fGr.items.push(fItemC);
                var fItemED = new FrmItemCfg();
                fItemED.dataColumn = 'LastEditOn';
                fItemED.label = 'LastEditOn';
                fItemED.dataType = my.config.dataType.datetime;
                fItemED.type = my.config.type.label;
                fItemED.visibleInInsertMode = false;
                fItemED.size = "s12,m3";
                fGr.items.push(fItemED);
                var fItemE = new FrmItemCfg();
                fItemE.dataColumn = 'LastEditBy';
                fItemE.label = 'LastEditBy';
                fItemE.dataType = my.config.dataType.string;
                fItemE.type = my.config.type.label;
                fItemE.visibleInInsertMode = false;
                fItemE.size = "s12,m3";
                fGr.items.push(fItemE);
            }
            parseCotrolCustom(val, ctl) {
            }
            parseGroupCustom(val, col) {
            }
            parseColumnCustom(val, col) {
            }
        }
        forms.Config = Config;
        class FrmGroupCfg extends my.core.config.cColumGroup {
            constructor() {
                super();
            }
        }
        forms.FrmGroupCfg = FrmGroupCfg;
        class FrmItemCfg extends my.core.config.cColumn {
            constructor() {
                super();
            }
        }
        forms.FrmItemCfg = FrmItemCfg;
        class FrmCfg extends my.core.config.cControl {
            constructor() {
                super();
            }
        }
        forms.FrmCfg = FrmCfg;
    })(forms = my.forms || (my.forms = {}));
})(my || (my = {}));
var my;
(function (my) {
    let forms;
    (function (forms) {
        class Custom extends my.core.form.core {
            constructor(dataSet) {
                super();
                this.ctlType = "forms.Custom";
                this.Groups = [];
                this.dataSet = dataSet;
                this.items = [];
                var g = new my.forms.fGroup("", this);
                g.items = this.items;
                this.Groups.push(g);
            }
            rebind() {
                var self = this;
                this.items.forEach((itm, idx) => {
                    itm.visible = true;
                    if (self.mode == 'insert') {
                        if (itm.visibleInInsertMode) {
                            itm.visible = true;
                        }
                        else {
                            itm.visible = false;
                        }
                    }
                    else {
                        if (itm.visibleInEditMode) {
                            itm.visible = true;
                        }
                        else {
                            itm.visible = false;
                        }
                    }
                    if (this.readOnly) {
                        itm.readOnly = true;
                    }
                    itm.bind(self.dataSet);
                });
            }
            createControl(label, column, dataType, type) {
                var ctl;
                var lblSpan = new my.controls.ctlSpan("");
                lblSpan.element.classList.add("ronly");
                switch (dataType) {
                    case "number":
                        if ((type == "label") || (this.readOnly)) {
                            ctl = lblSpan;
                        }
                        else {
                            var txtnumb = new my.controls.ctlNumber("");
                            ctl = txtnumb;
                        }
                        break;
                    case "string":
                        if ((type == "label") || (this.readOnly)) {
                            ctl = lblSpan;
                        }
                        else if (type == "textarea") {
                            var txt = new my.controls.ctlTextArea("");
                            ctl = txt;
                        }
                        else {
                            var txta = new my.controls.ctlText("");
                            if (type == "number") {
                                txta.allowedChars = "0123456789.";
                            }
                            ctl = txta;
                        }
                        break;
                    case "list":
                        if ((type == "label") || (this.readOnly)) {
                            ctl = lblSpan;
                        }
                        else if (type == "autocomplete") {
                            var ac = new my.controls.ctlAutocomplete("");
                            ac.ctlTrigger.css = new my.css.formControl(ac.ctlTrigger.element);
                            ctl = ac;
                        }
                        else {
                            var dd = new my.controls.ctlDropDown("");
                            ctl = dd;
                        }
                        break;
                    case "boolean":
                        ctl = new my.controls.ctlCheckBox("", false);
                        if ((type == "label") || (this.readOnly)) {
                            ctl.readOnly = true;
                        }
                        break;
                    case "datetime":
                    case "date":
                        if ((type == "label") || (this.readOnly)) {
                            ctl = lblSpan;
                        }
                        else {
                            var ddate = new my.calendar.calendarDropDown("");
                            ctl = ddate;
                        }
                        break;
                    default:
                        var lblSpan = new my.controls.ctlSpan("");
                        lblSpan.element.classList.add("ronly");
                        ctl = lblSpan;
                }
                var fi = new forms.fItem(ctl, this);
                fi.dataType = dataType;
                fi.label = label;
                fi.dataColumn = column;
                this.items.push(fi);
                return fi;
            }
            validate() {
                return true;
            }
            save(onSucess) {
                if (this.validate()) {
                    this.dataSet.sendData(this.dataRow, () => {
                        onSucess();
                    });
                }
                else {
                }
            }
        }
        forms.Custom = Custom;
        ;
    })(forms = my.forms || (my.forms = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let forms;
    (function (forms) {
        class Standard extends my.core.form.core {
            constructor(dataSet, config = undefined) {
                super();
                this.ctlType = "forms.Standard";
                this.Groups = [];
                this.options = new fOptions();
                this.dataSet = dataSet;
                this.dataSet.events.Loaded.subscribe(this, this.rebind.bind(this));
                this.config = config;
            }
            rebind() {
                var self = this;
                this.Groups.forEach((gr, idx) => {
                    self._rebindItems(gr.items);
                });
            }
            _rebindItems(arrItems) {
                var self = this;
                arrItems.forEach((itm, idx) => {
                    itm.visible = true;
                    if (self.mode == 'insert') {
                        if (itm.visibleInInsertMode) {
                            itm.visible = true;
                        }
                        else {
                            itm.visible = false;
                        }
                    }
                    else {
                        if (itm.visibleInEditMode) {
                            itm.visible = true;
                        }
                        else {
                            itm.visible = false;
                        }
                    }
                    if (this.readOnly) {
                        itm.readOnly = true;
                    }
                    itm.bind(self.dataSet);
                });
            }
            addGroup(group) {
                group.parentForm = this;
                this.Groups.push(group);
                this.element.appendChild(group.element);
            }
            get config() {
                return this._config;
            }
            set config(val) {
                if (val) {
                    this._config = val;
                    this._createFormByConfig();
                }
            }
            _createFormByConfig() {
                var self = this;
                this.config.frmGroups.forEach((item, idx) => {
                    self._createGroupsByConfig(item);
                });
            }
            _createGroupsByConfig(cfgGroup) {
                var fGroup = new my.forms.fGroup(cfgGroup.title, this);
                var self = this;
                cfgGroup.items.forEach((itmCfg) => {
                    if (this.mode == 'insert') {
                        if (itmCfg.visibleInInsertMode) {
                            fGroup.createItemByConfig(itmCfg);
                        }
                    }
                    else {
                        fGroup.createItemByConfig(itmCfg);
                    }
                });
                this.addGroup(fGroup);
            }
            save(onSucess) {
                if (this.validate()) {
                    this.dataSet.sendData(this.dataRow, () => {
                        onSucess();
                    });
                }
                else {
                }
            }
        }
        forms.Standard = Standard;
        ;
        class fGroup extends my.core.form.frmGroup {
            constructor(title, parentForm) {
                super(title);
                this.parentForm = parentForm;
            }
            _applyCtlOptions(ctl, options) {
                if (options == undefined) {
                    return;
                }
                for (var propertyName in options) {
                    if (propertyName in ctl) {
                        ctl[propertyName] = options[propertyName];
                    }
                }
            }
            createItemByConfig(fItemCfg) {
                var ctl;
                switch (fItemCfg.dataType) {
                    case "number":
                        if ((fItemCfg.type == "label") || (this.readOnly)) {
                            var lblSpan = new my.controls.ctlSpan("");
                            lblSpan.element.classList.add("ronly");
                            ctl = lblSpan;
                        }
                        else {
                            var txtnumb = new my.controls.ctlNumber("");
                            ctl = txtnumb;
                        }
                        break;
                    case "string":
                        if ((fItemCfg.type == "label") || (this.readOnly)) {
                            var lblSpan = new my.controls.ctlSpan("");
                            lblSpan.element.classList.add("ronly");
                            ctl = lblSpan;
                        }
                        else if (fItemCfg.type == "textarea") {
                            var txt = new my.controls.ctlTextArea("");
                            ctl = txt;
                        }
                        else {
                            var txta = new my.controls.ctlText("");
                            if (fItemCfg.type == "number") {
                                txta.allowedChars = "0123456789.";
                            }
                            ctl = txta;
                        }
                        break;
                    case "list":
                        if ((fItemCfg.type == "label") || (this.readOnly)) {
                            var lblSpan = new my.controls.ctlSpan("");
                            lblSpan.element.classList.add("ronly");
                            ctl = lblSpan;
                        }
                        else if (fItemCfg.type == "autocomplete") {
                            var ac = new my.controls.ctlAutocomplete("");
                            ac.ctlTrigger.css = new my.css.formControl(ac.ctlTrigger.element);
                            ac.label = fItemCfg.label;
                            ctl = ac;
                        }
                        else {
                            var dd = new my.controls.ctlDropDown("");
                            if (fItemCfg.isMandatory == false) {
                                dd.addNone = true;
                            }
                            dd.label = fItemCfg.label;
                            if (fItemCfg.linkedDataColumn) {
                                var el = this.getFormItem(fItemCfg.linkedDataColumn);
                                if (el) {
                                    dd.parentDropdown = el.itemControl;
                                    dd.parentFilterColumn = fItemCfg.linkedFilterColumn;
                                }
                            }
                            ctl = dd;
                        }
                        break;
                    case "boolean":
                        ctl = new my.controls.ctlCheckBox("", false);
                        if ((fItemCfg.type == "label") || (this.readOnly)) {
                            ctl.readOnly = true;
                        }
                        break;
                    case "datetime":
                    case "date":
                        if ((fItemCfg.type == "label") || (this.readOnly)) {
                            var lblSpan = new my.controls.ctlSpan("");
                            lblSpan.element.classList.add("ronly");
                            ctl = lblSpan;
                        }
                        else {
                            var ddate = new my.calendar.calendarDropDown("");
                            ctl = ddate;
                        }
                        break;
                    default:
                        var lblSpan = new my.controls.ctlSpan("");
                        lblSpan.element.classList.add("ronly");
                        ctl = lblSpan;
                        fItemCfg.type = my.config.type.label;
                }
                this.addFormItem(ctl, fItemCfg);
            }
            ;
            addFormItem(el, cfg) {
                if (cfg.isHidden) {
                    el = undefined;
                }
                this._applyCtlOptions(el, cfg.ctlOptions);
                var fi = new fItem(el, this.parentForm);
                if (cfg.isHidden == false) {
                    fi.label = cfg.label;
                }
                else {
                    fi.validation = undefined;
                }
                fi.type = cfg.type;
                fi.dataColumn = cfg.dataColumn;
                fi.dataType = cfg.dataType;
                fi.dataTable = cfg.dataTable;
                fi.defaultValue = cfg.defaultValue;
                if (this.parentForm.options.itemsize) {
                    fi.css.size = this.parentForm.options.itemsize;
                }
                if (cfg.size) {
                    fi.css.size = cfg.size;
                }
                fi.visibleInInsertMode = cfg.visibleInInsertMode;
                fi.visibleInEditMode = cfg.visibleInEditMode;
                fi.isHidden = cfg.isHidden;
                fi.isMandatory = cfg.isMandatory;
                this.addItem(fi);
            }
            getFormItem(dataColumn) {
                var f;
                this.parentForm.Groups.forEach((itmG, idx) => {
                    itmG.items.forEach((itm, i) => {
                        if (itm.dataColumn == dataColumn) {
                            f = itm;
                        }
                    });
                });
                return f;
            }
        }
        forms.fGroup = fGroup;
        class fItem extends my.core.form.frmItem {
            constructor(ctrl, parent) {
                super(ctrl, parent);
            }
        }
        forms.fItem = fItem;
        class fOptions extends my.core.form.frmOptions {
        }
        forms.fOptions = fOptions;
        ;
    })(forms = my.forms || (my.forms = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let core;
    (function (core) {
        let table;
        (function (table_1) {
            class Options {
                constructor(table) {
                    this.select_SingleRow = true;
                    this.select_MultyRow = false;
                    this.useDblClickAsEdit = true;
                    this.enable_DeleteRowHover = false;
                    this.allow_Edit = true;
                    this.allow_sorting = true;
                    this.showTotals = false;
                    this.table = table;
                }
                set allow_TitleAddNew(val) {
                    if (val) {
                        this.table.tTitle.showAddNew();
                    }
                    else {
                        this.table.tTitle.hideAddNew();
                    }
                }
                set allow_TitleSearch(val) {
                    if (val) {
                        this.table.tTitle.showTitleSearch();
                    }
                    else {
                        this.table.tTitle.hideTitleSearch();
                    }
                }
                set allow_TitleFilter(val) {
                    if (val) {
                        this.table.tTitle.showTitleFilter();
                    }
                    else {
                        this.table.tTitle.hideTitleFilter();
                    }
                }
            }
            table_1.Options = Options;
        })(table = core.table || (core.table = {}));
    })(core = my.core || (my.core = {}));
})(my || (my = {}));
var my;
(function (my) {
    let table;
    (function (table) {
        ;
        ;
    })(table = my.table || (my.table = {}));
    let core;
    (function (core) {
        let table;
        (function (table_2) {
            class Core extends my.core.controls.core {
                constructor() {
                    super("div");
                    this.ctlType = "table.Core";
                    this.readOnly = false;
                    this.disabled = false;
                    this.elementTable = document.createElement('table');
                    this.element.appendChild(this.elementTable);
                    this.initEvents();
                    this.tHead = new my.core.table.THead(this);
                    this.tBody = new my.core.table.TBody(this);
                    this.tFoot = new my.core.table.TFoot(this);
                    this.css = new my.css.Table(this.element);
                    this.options = new my.core.table.Options(this);
                }
                get currentSelectedRow() {
                    return this._currentSelectedRow;
                }
                set currentSelectedRow(val) {
                    if (this._currentSelectedRow) {
                        this._currentSelectedRow.element.classList.remove("selected");
                    }
                    this._currentSelectedRow = val;
                    this._currentSelectedRow.element.classList.add("selected");
                    this.events.rowSelected.dispatch(this, val);
                }
                get plhPagination() {
                    if (this._plhPagination == undefined) {
                        this._plhPagination = document.createElement("div");
                        this.element.appendChild(this._plhPagination);
                    }
                    return this._plhPagination;
                }
                initEvents() {
                    this.events = new my.core.table.Events(this);
                }
            }
            table_2.Core = Core;
            ;
            class Column extends my.core.config.cColumn {
                constructor(label, dataColumn, size) {
                    super();
                    this.visible = true;
                    this.orderBy = false;
                    this.orderType = "ASC";
                    this.isDefault = false;
                    this.label = label;
                    this.size = size;
                    this.dataColumn = dataColumn;
                }
            }
            table_2.Column = Column;
            class Row extends my.core.controls.core {
                constructor(table) {
                    super("tr");
                    this.ctlType = "table.row";
                    this.readOnly = false;
                    this.disabled = false;
                    this.cells = [];
                    this.index = -1;
                    this.table = table;
                    this.events.click.subscribe(this, this._onRowClick.bind(this));
                    this.events.dblclick.subscribe(this, this._onRowDblClick.bind(this));
                    this.events.mouseenter.subscribe(this, this._onRowMouseEnter.bind(this));
                }
                get value() {
                    var ret = {};
                    this.table.columns.forEach((itm, idx) => {
                        ret[itm.dataColumn] = itm.defaultValue;
                    });
                    this.cells.forEach((itm, idx) => {
                        ret[itm.tColumn.dataColumn] = itm.ctl.value;
                    });
                    return ret;
                }
                get uid() {
                    var r;
                    if (this.itemData.items["UID"]) {
                        r = this.itemData.items["UID"].value;
                    }
                    else {
                        console.log("error in Row.get UID");
                    }
                    return r;
                }
                ;
                clear() {
                    this.cells = [];
                    this.element.innerHTML = "";
                }
                addCell(cell) {
                    this.cells.push(cell);
                    this.element.appendChild(cell.element);
                }
                ;
                _onRowClick(row, e, d) {
                    if (row.index > -1) {
                        this.table.events.rowClick.dispatch(this, this.itemData);
                        this.table.currentSelectedRow = this;
                    }
                }
                _onRowDblClick(row, e, d) {
                    if (row.index > -1) {
                        this.table.events.rowDblClick.dispatch(this, this.itemData);
                        this.table.currentSelectedRow = this;
                    }
                }
                _onRowMouseEnter(row, e, d) {
                    if (row.index > -1) {
                        this.table.events.rowMouseEnter.dispatch(this, this.itemData);
                    }
                }
            }
            table_2.Row = Row;
            ;
            class thCell extends my.core.controls.core {
                constructor(row) {
                    super("th");
                    this.ctlType = "table.thCell";
                    this.readOnly = false;
                    this.disabled = false;
                    this.text = "";
                    this.row = row;
                    this.css = new my.css.tCell(this.element);
                }
                get ctl() {
                    return this._ctl;
                }
                set ctl(val) {
                    this._ctl = val;
                    if (val) {
                        this.element.appendChild(val.element);
                    }
                }
                ;
            }
            table_2.thCell = thCell;
            ;
            class tdCell extends my.core.controls.core {
                constructor(col) {
                    super("td");
                    this.ctlType = "table.tdCell";
                    this.readOnly = false;
                    this.disabled = false;
                    this.text = "";
                    this.tColumn = col;
                    this._parseColProperties();
                }
                get ctl() {
                    return this._ctl;
                }
                set ctl(val) {
                    this._ctl = val;
                    if (val) {
                        this.element.appendChild(val.element);
                    }
                }
                get _value() {
                    return this.element.innerText;
                }
                set _value(val) {
                    this.element.innerText = val;
                }
                ;
                _parseColProperties() {
                    if (this.tColumn.align != "left") {
                        this.element.align = this.tColumn.align;
                    }
                }
            }
            table_2.tdCell = tdCell;
            ;
            class THead {
                constructor(table) {
                    this.ctlType = "table.THead";
                    this.rows = [];
                    this.table = table;
                    this.element = table.elementTable.createTHead();
                }
                ;
                clear() {
                    this.rows = [];
                    this.element.innerHTML = "";
                }
                addRow(row) {
                    this.element.appendChild(row.element);
                    this.rows.push(row);
                }
            }
            table_2.THead = THead;
            ;
            class TBody {
                constructor(table) {
                    this.ctlType = "table.TBody";
                    this.rows = [];
                    this.element = table.elementTable.createTBody();
                    this.table = table;
                }
                ;
                clear() {
                    this.rows = [];
                    this.element.innerHTML = "";
                }
                addRow(row) {
                    this.element.appendChild(row.element);
                    this.rows.push(row);
                }
            }
            table_2.TBody = TBody;
            ;
            class TFoot {
                constructor(table) {
                    this.ctlType = "table.TFoot";
                    this.rows = [];
                    this.element = table.elementTable.createTFoot();
                    this.table = table;
                }
                ;
                clear() {
                    this.rows = [];
                    this.element.innerHTML = "";
                }
                addRow(row) {
                    this.element.appendChild(row.element);
                    this.rows.push(row);
                }
            }
            table_2.TFoot = TFoot;
            ;
            class TTitle {
                constructor(table) {
                    this.ctlType = "table.TTitle";
                    this.element = document.createElement('div');
                    this.table = table;
                    this._init();
                    this._initPlaceHolders();
                }
                set text(val) {
                    this.plhText.innerText = val;
                }
                ;
                _createAddNew() {
                    var ico = new my.controls.ctlIcon(my.theme.current.icons.add);
                    ico.element.classList.add("ico-btn");
                    ico.element.classList.add("btn_add");
                    this.plhAddNew.appendChild(ico.element);
                    ico.events.click.subscribe(this, (s, e, d) => {
                        this.table.events.newClick.dispatch(this);
                    });
                }
                showAddNew() {
                    if (this.plhAddNew.hasChildNodes() == false) {
                        this._createAddNew();
                    }
                    this.plhAddNew.style.visibility = "visible";
                }
                hideAddNew() {
                    this.plhAddNew.style.visibility = "hidden";
                }
                showTitleSearch() {
                    this.plhSearch.style.visibility = "visible";
                }
                hideTitleSearch() {
                    this.plhSearch.style.visibility = "hidden";
                }
                showTitleFilter() {
                    this.plhFilter.style.visibility = "visible";
                }
                hideTitleFilter() {
                    this.plhFilter.style.visibility = "hidden";
                }
                createNotify() {
                    if (this.plhNotify.hasChildNodes()) {
                        this.plhNotify.style.visibility = "visible";
                    }
                    else {
                        var i = new my.controls.ctlIcon(my.theme.current.icons.sync);
                        this.plhNotify.appendChild(i.element);
                    }
                }
                hideNotify() {
                    this.plhNotify.style.visibility = "hidden";
                }
                createEdit(subscriber, handler) {
                    var i = new my.controls.ctlIcon(my.theme.current.icons.edit);
                    this.plhEdit.appendChild(i.element);
                    i.events.click.subscribe(subscriber, handler.bind(subscriber));
                }
                createDelete(subscriber, handler) {
                    var i = new my.controls.ctlIcon(my.theme.current.icons.delete);
                    this.plhDelete.appendChild(i.element);
                    i.events.click.subscribe(subscriber, handler.bind(subscriber));
                }
                addCustomControl(ctl) {
                    this.plhCustomCtrl.appendChild(ctl.element);
                }
                removeCustomControl() {
                    this.plhCustomCtrl.innerHTML = "";
                }
                _init() {
                    this.table.element.insertBefore(this.element, this.table.elementTable);
                    this.plhText = document.createElement('span');
                    this.element.classList.add('title');
                    this.element.appendChild(this.plhText);
                }
                _initPlaceHolders() {
                    this.plhAddNew = document.createElement("div");
                    this.plhNotify = document.createElement("div");
                    this.plhEdit = document.createElement("div");
                    this.plhDelete = document.createElement("div");
                    this.plhFilter = document.createElement("div");
                    this.plhSearch = document.createElement("div");
                    this.plhCustomCtrl = document.createElement("div");
                    this.plhAddNew.classList.add("placeholder");
                    this.plhNotify.classList.add("placeholder");
                    this.plhEdit.classList.add("placeholder");
                    this.plhDelete.classList.add("placeholder");
                    this.plhFilter.classList.add("placeholder");
                    this.plhSearch.classList.add("placeholder");
                    this.plhCustomCtrl.classList.add("placeholder");
                    this.element.appendChild(this.plhCustomCtrl);
                    this.element.appendChild(this.plhAddNew);
                    this.element.appendChild(this.plhEdit);
                    this.element.appendChild(this.plhDelete);
                    this.element.appendChild(this.plhNotify);
                    this.element.appendChild(this.plhFilter);
                    this.element.appendChild(this.plhSearch);
                }
            }
            table_2.TTitle = TTitle;
            ;
            class Events extends my.core.controls.Events {
                constructor(eventTarget) {
                    super(eventTarget);
                    this.rowClick = new my.core.events.core("rowClick");
                    this.rowDblClick = new my.core.events.core("rowDblClick");
                    this.rowMouseEnter = new my.core.events.core("rowMouseEnter");
                    this.rowSelected = new my.core.events.core("rowSelected");
                    this.cellClick = new my.core.events.core("cellClick");
                    this.newClick = new my.core.events.core("Table_newClick");
                    this.delClick = new my.core.events.core("Table_delClick");
                    this.editClick = new my.core.events.core("Table_editClick");
                    this.sortClick = new my.core.events.core("sortClick");
                    this.filter = new my.core.events.core("filter");
                    this.dataSorted = new my.core.events.core("dataSorted");
                    this.dataFiltered = new my.core.events.core("dataFiltered");
                }
            }
            table_2.Events = Events;
            ;
        })(table = core.table || (core.table = {}));
        ;
    })(core = my.core || (my.core = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let core;
    (function (core) {
        let table;
        (function (table_3) {
            class Pagination extends my.core.controls.core {
                constructor(table) {
                    super('div');
                    this.ctlType = "table.pager";
                    this.items = [];
                    this.readOnly = false;
                    this.disabled = false;
                    this._totalItems = 0;
                    this._pageCount = 0;
                    this._pageCurrent = 1;
                    this._pageSize = 10;
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
                get pageCount() {
                    return this._pageCount;
                }
                set pageCount(val) {
                    if (val == undefined) {
                        val = 0;
                    }
                    if (val != this.pageCount) {
                        this._pageCount = val;
                        this.update();
                    }
                }
                get pageCurrent() {
                    return this._pageCurrent;
                }
                set pageCurrent(val) {
                    if (val == undefined) {
                        val = 1;
                    }
                    if (val != this._pageCurrent) {
                        this._pageCurrent = val;
                        this.update();
                        this.events.pageChange.dispatch(this, val);
                    }
                }
                set pageCurrentUpdate(val) {
                    if (typeof (val) == "string") {
                        val = parseInt(val);
                    }
                    this._pageCurrent = val;
                }
                get pageSize() {
                    return this._pageSize;
                }
                set pageSize(val) {
                    if (val != this.pageSize) {
                        this._pageSize = val;
                        if (Math.ceil(this._totalItems / val) < this.pageCurrent) {
                            this.pageCurrent = 1;
                        }
                        this.events.pageSizeChange.dispatch(this, val);
                    }
                }
                init(s, e, d) {
                    var tblData = s.getTable();
                    if ((tblData) && (tblData.length > 0)) {
                        var row = tblData.rows[0];
                        this.pageCount = Math.ceil(this.table.dataTable.length / this.pageSize);
                        this.pageCurrent = 1;
                        this._totalItems = this.table.dataTable.length;
                        if (this.pageCount > 1) {
                            this._generateDropDownForItems(this._pageSize.toString());
                        }
                    }
                    else {
                        if (this.pageCurrent > this.pageCount) {
                            this.pageCurrent = 1;
                        }
                    }
                    this.update();
                }
                update() {
                    this.items = [];
                    var data = this._calculate();
                    this.elementUL = document.createElement("ul");
                    this.elementUL.classList.add("my-pagination-pager");
                    if (this.pageCount > 1) {
                        var liElement;
                        data.forEach((itm, idx) => {
                            if (itm.index == -1) {
                                liElement = this._addPagerItemSpacer();
                            }
                            else {
                                liElement = this._addPagerItem(itm);
                            }
                            this.items.push(liElement);
                            this.elementUL.appendChild(liElement);
                        });
                        this.pagerPlaceholder.innerHTML = "";
                        this.pagerPlaceholder.appendChild(this.elementUL);
                    }
                }
                _addPagerItem(data) {
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
                _addPagerItemSpacer() {
                    var rLi = document.createElement("li");
                    rLi.innerText = "...";
                    rLi.classList.add("pspacer");
                    return rLi;
                }
                _updateActive() {
                    this.items.forEach((itm, idx) => {
                        if (itm.innerText == this.pageCurrent.toString()) {
                            itm.classList.add("active");
                        }
                        else {
                            itm.classList.remove("active");
                        }
                    });
                }
                _calculate() {
                    var rArr = [];
                    var empty = new my.core.table.PaginationItem();
                    empty.label = "...";
                    empty.index = -1;
                    if (this.pageCount < 24) {
                        this._generateItems(rArr, 1, this.pageCount);
                    }
                    else {
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
                    return rArr;
                }
                _generateItems(rArr, iFrom, iTo) {
                    for (var i = iFrom; i <= iTo; i++) {
                        var itm = new my.core.table.PaginationItem();
                        itm.index = i;
                        itm.label = i.toString();
                        if (i == this.pageCurrent) {
                            itm.isCurrent = true;
                        }
                        rArr.push(itm);
                    }
                }
                _generateDropDownForItems(val) {
                    var dropDownDSet = new my.data.DataSet('Values');
                    dropDownDSet.data = { Values: [{ UID: '10', Name: '10' }, { UID: '20', Name: '20' }, { UID: '50', Name: '50' }, { UID: '100', Name: '100' }] };
                    this.dropDown = new my.controls.ctlDropDown(val, val);
                    this.dropDown.data = dropDownDSet.getTable('Values');
                    this.dropDown.css.setSizes('xs1', true);
                    this.dropDown.events.change.subscribe(this, (s, e, d) => {
                        this.pageSize = Number(s['value']);
                    });
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
                goTo(val) {
                }
            }
            table_3.Pagination = Pagination;
            class EventsPagination extends my.core.controls.Events {
                constructor(eventTarget) {
                    super(eventTarget);
                    this.pageChange = new my.core.events.core("Pager_pageChange");
                    this.pageSizeChange = new my.core.events.core("Pager_pageSizeChange");
                    this.pageClick = new my.core.events.core("Pager_pageClick");
                    this.firstClick = new my.core.events.core("Pager_firstClick");
                    this.lastClick = new my.core.events.core("Pager_lastClick");
                    this.prevClick = new my.core.events.core("Pager_prevClick");
                    this.nextClick = new my.core.events.core("Pager_nextClick");
                }
            }
            table_3.EventsPagination = EventsPagination;
            ;
            class PaginationItem {
                constructor() {
                    this.index = 0;
                    this.label = "1";
                    this.clickEnabled = true;
                    this.isCurrent = false;
                }
            }
            table_3.PaginationItem = PaginationItem;
        })(table = core.table || (core.table = {}));
        ;
    })(core = my.core || (my.core = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let core;
    (function (core) {
        let table;
        (function (table_4) {
            class Sorting extends my.core.controls.core {
                constructor(table) {
                    super('div');
                    this.ctlType = "table.sorting";
                    this.readOnly = false;
                    this.disabled = false;
                    this.currentOrderByDirection = "ASC";
                    this.table = table;
                    this.events = new my.core.table.EventsSorting(this);
                    var self = this;
                    this.table.tHead.rows[0].cells.forEach((cell, idx) => {
                        cell.events.click.subscribe(self, self._onTHCellClick.bind(self), cell);
                    });
                }
                get currentOrderBy() {
                    if (this._currentOrderBy == undefined) {
                        this._currentOrderBy = this.table.columns[0].dataColumn;
                    }
                    return this._currentOrderBy;
                }
                set currentOrderBy(val) {
                    this.table.tHead.rows[0].cells.forEach((cell, idx) => {
                        if (val == cell.tColumn.dataColumn) {
                            var direction = "";
                            if (this.currentOrderBy.includes(cell.tColumn.dataColumn)) {
                                if (this.currentOrderBy.includes("ASC")) {
                                    direction = "DESC";
                                    this.currentOrderByDirection = "DESC";
                                }
                                if (this.currentOrderBy.includes("DESC")) {
                                    direction = "ASC";
                                    this.currentOrderByDirection = "ASC";
                                }
                                if (this.currentOrderBy == cell.tColumn.dataColumn) {
                                    direction = "ASC";
                                    this.currentOrderByDirection = "ASC";
                                }
                            }
                            else {
                                direction = "ASC";
                                this.currentOrderByDirection = "ASC";
                            }
                            if (direction == "") {
                                val = "";
                            }
                            else {
                                val = val + " ";
                            }
                            this._currentOrderBy = val + direction;
                            this._addSortIcon(cell.element, direction);
                            this.events.OrderByChange.dispatch(this, this._currentOrderBy);
                        }
                    });
                }
                set currentOrderByUpdate(val) {
                    this._currentOrderBy = val;
                }
                _onTHCellClick(cell, e, d) {
                    if (this.table.options.allow_sorting) {
                        this.currentOrderBy = cell.tColumn.dataColumn;
                        this.table.events.sortClick.dispatch(this, cell.tColumn.dataColumn);
                    }
                }
                _addSortIcon(targetCell, direction) {
                    var strIco = "";
                    switch (direction) {
                        case "ASC":
                            strIco = my.theme.current.icons.arrow_sort_up;
                            break;
                        case "DESC":
                            strIco = my.theme.current.icons.arrow_sort_down;
                            break;
                    }
                    if (document.getElementById('sortPlaceholder')) {
                        document.getElementById('sortPlaceholder').remove();
                    }
                    if (strIco != "") {
                        var ico = new my.controls.ctlIcon(strIco);
                        targetCell.appendChild(ico.element);
                        ico.element.id = 'sortPlaceholder';
                    }
                }
            }
            table_4.Sorting = Sorting;
            class EventsSorting extends my.core.controls.Events {
                constructor(eventTarget) {
                    super(eventTarget);
                    this.OrderByChange = new my.core.events.core("Sorting_OrderByChange");
                }
            }
            table_4.EventsSorting = EventsSorting;
            ;
        })(table = core.table || (core.table = {}));
        ;
    })(core = my.core || (my.core = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let table;
    (function (table) {
        class Config extends my.core.config.cManager {
            constructor(json = undefined) {
                super();
                this.tableCfg = new my.table.TableCfg();
                if (json) {
                    this.JSON = json;
                    this.parseData(json);
                }
            }
            parseData(val) {
                if (val.hasOwnProperty("columns")) {
                    this._parseColumns(val.columns);
                }
                this.parseControl(val, this.tableCfg);
                this.applyDefaultSizes(this.columnsCfg);
            }
            _parseColumns(val) {
                this.columnsCfg = [];
                val.forEach((item, idx) => {
                    var tColumn = new my.table.ColumnCfg();
                    if (idx == 0) {
                        tColumn.isDefault = true;
                    }
                    this.parseColumn(item, tColumn);
                    if (item.hasOwnProperty("isDefault")) {
                        tColumn.isDefault = item["isDefault"];
                    }
                    this.columnsCfg.push(tColumn);
                });
            }
            defaultSizeFunction(col, totalCols) {
                if ((col.dataType == "boolean") || (col.dataType == "number")) {
                    col.size = "8%";
                }
                else {
                    col.size = Math.round(100 / totalCols) + "%";
                }
            }
            parseCotrolCustom(val, ctl) {
            }
            parseGroupCustom(val, col) {
            }
            parseColumnCustom(val, col) {
            }
        }
        table.Config = Config;
        class ColumnCfg extends my.core.config.cColumn {
            constructor() {
                super();
            }
        }
        table.ColumnCfg = ColumnCfg;
        class TableCfg extends my.core.config.cControl {
            constructor() {
                super();
            }
        }
        table.TableCfg = TableCfg;
    })(table = my.table || (my.table = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let table;
    (function (table) {
        class Simple extends my.core.table.Core {
            constructor(dataset, cfg = undefined) {
                super();
                this._columns = [];
                this._tableSize = "none";
                this.currentPage = 1;
                this._cfg = cfg;
                if (this._cfg) {
                    this._createColumns(cfg.columnsCfg);
                }
                this.css = new my.css.Table(this.element);
                this.dataSet = dataset;
                this.dataSet.events.Loaded.subscribe(this, this._onDataLoad.bind(this));
            }
            set columns(val) {
                if (val) {
                    this._columns = val;
                    this._addHeadRow();
                }
            }
            ;
            get columns() {
                return this._columns;
            }
            get DataTableName() {
                if (this._DataTableName == undefined) {
                    this.DataTableName = this.dataSet.primaryTable;
                }
                return this._DataTableName;
            }
            set DataTableName(val) {
                this._DataTableName = val;
                this.dataTable = this.dataSet.getTable(this.DataTableName);
            }
            get dataTable() {
                return this._dataTable;
            }
            set dataTable(val) {
                this._dataTable = val;
                this._dataTable.subscribe(this, this._onDataTableChange.bind(this));
            }
            get TableSize() {
                return this._tableSize;
            }
            set TableSize(val) {
                if (this._tableSize != val) {
                    this._tableSize = val;
                    this._updateColumnVisibility();
                }
            }
            _onDataLoad() {
                this.recreateRows();
                my.tools.log("TableSimple._onDataLoad");
            }
            calculateTableSize(height, width) {
                if (this._cfg) {
                    this.TableSize = my.tools.getWindowSize(height, width);
                }
            }
            rebind() {
                this.recreateRows();
                my.tools.log("TableSimple.rebind");
            }
            _onDataTableChange(sender, data) {
                this.recreateRows();
            }
            recreateRows() {
                if (this.DataTableName == undefined) {
                    this.dataTable = this.dataSet.getTable();
                }
                this.tBody.clear();
                if ((this.dataTable) && (this.dataTable.length > 0)) {
                    this.dataTable.value.forEach(this._addBodyRow.bind(this));
                }
            }
            _createColumns(cfgCol) {
                var c = [];
                cfgCol.forEach((cfgItem, idx) => {
                    var col = new my.core.table.Column(cfgItem.label, cfgItem.dataColumn, cfgItem.size);
                    col.ctlOptions = cfgItem.ctlOptions;
                    col.dataTable = cfgItem.dataTable;
                    col.dataTableKeyColumn = cfgItem.dataTableKeyColumn;
                    col.dataTableLabelColumn = cfgItem.dataTableLabelColumn;
                    col.dataType = cfgItem.dataType;
                    col.defaultValue = cfgItem.defaultValue;
                    col.align = cfgItem.align;
                    col.isDefault = cfgItem.isDefault;
                    col.isEditable = cfgItem.isEditable;
                    col.isMandatory = cfgItem.isMandatory;
                    col.size = cfgItem.size;
                    col.type = cfgItem.type;
                    col.visibleInEditMode = cfgItem.visibleInEditMode;
                    col.visibleInInsertMode = cfgItem.visibleInInsertMode;
                    col.VisibleOnSize = cfgItem.VisibleOnSize;
                    col.isHidden = cfgItem.isHidden;
                    c.push(col);
                });
                this.columns = c;
            }
            _updateColumnVisibility() {
                this._updateCellVisibility(this.tHead.rows[0].cells);
                this.tBody.rows.forEach((row, idx) => {
                    this._updateCellVisibility(row.cells);
                });
            }
            _updateCellVisibility(cells) {
                cells.forEach((cell, idx) => {
                    var col = cell.tColumn;
                    var bHidden = false;
                    switch (this.TableSize) {
                        case "lg": {
                            break;
                        }
                        case "md": {
                            if (col.VisibleOnSize == "lg") {
                                bHidden = true;
                            }
                            break;
                        }
                        case "sm": {
                            if (col.VisibleOnSize == "lg"
                                || col.VisibleOnSize == "md") {
                                bHidden = true;
                            }
                            break;
                        }
                        case "xs": {
                            if (col.VisibleOnSize
                                && col.VisibleOnSize != "xs") {
                                bHidden = true;
                            }
                            break;
                        }
                    }
                    col.isHidden = bHidden;
                    cell.element.hidden = bHidden;
                });
            }
            _addHeadRow() {
                var r = new my.core.table.Row(this);
                var th;
                this.columns.forEach((col, i) => {
                    if (col.isHidden == false) {
                        th = new my.core.table.thCell(r);
                        th.tColumn = col;
                        th.css.size = col.size;
                        var sp = document.createElement("span");
                        sp.innerText = col.label;
                        th.element.innerHTML = "";
                        th.element.appendChild(sp);
                        r.addCell(th);
                    }
                });
                this.tHead.clear();
                this.tHead.addRow(r);
            }
            beforeAddBodyRow(row) { }
            ;
            afterAddBodyRow(row) { }
            ;
            _addBodyRow(data, idx) {
                if (data.__page != this.currentPage) {
                    return;
                }
                if (data.__bindVisible == false) {
                    return;
                }
                var r = new my.core.table.Row(this);
                var td;
                var data = data;
                r.itemData = data;
                r.index = idx;
                if (this.beforeAddBodyRow) {
                    this.beforeAddBodyRow(r);
                }
                this.columns.forEach((col, i) => {
                    if (col.isHidden == false) {
                        td = new my.core.table.tdCell(col);
                        if (data.items[col.dataColumn]) {
                            this.addToCell(td, col, data);
                        }
                        else if (col.dataColumn.includes(",")) {
                            this.addToCell(td, col, data);
                        }
                        else if (col.dataColumn == "") {
                        }
                        else {
                            console.log("Column is missing from data:" + col.dataColumn);
                        }
                        if (col.templateBody) {
                            var dd = col.templateBody(col, data);
                        }
                        r.addCell(td);
                    }
                });
                if (this.afterAddBodyRow) {
                    this.afterAddBodyRow(r);
                }
                this.tBody.addRow(r);
            }
            addToCell(cell, col, data) {
                var oCleanValue;
                if (data.items) {
                    oCleanValue = data.items[col.dataColumn];
                }
                if (col.type == "label") {
                    var lbl = new my.controls.ctlSpan(oCleanValue);
                    cell.ctl = lbl;
                    return;
                }
                switch (col.dataType) {
                    case "list":
                        {
                            var dd = new my.controls.ctlAutocomplete(oCleanValue);
                            dd.data = this.dataSet.getTable(col.dataTable);
                            if (col.isEditable) {
                                cell.ctl = dd;
                            }
                            else {
                                cell.value = dd.valueText;
                            }
                            break;
                        }
                    case "datetime":
                        {
                            if (col.dataColumn.toLowerCase() == "createdon") {
                                cell.element.appendChild(this._defaultCreatedOnRender(col, data.items));
                            }
                            else {
                                cell.value = oCleanValue;
                            }
                            break;
                        }
                    case "date":
                        {
                            if (col.dataColumn.toLowerCase() == "createdon") {
                                cell.element.appendChild(this._defaultCreatedOnRender(col, data.items));
                            }
                            else {
                                cell.element.appendChild(this._dateRender(col, data));
                            }
                            break;
                        }
                    case "boolean":
                        {
                            if (col.isEditable) {
                                var ch = new my.controls.ctlCheckBox("", oCleanValue);
                                cell.ctl = ch;
                            }
                            else {
                                cell.value = oCleanValue;
                            }
                            break;
                        }
                    case "string":
                        {
                            if (col.isEditable) {
                                var txt = new my.controls.ctlText(oCleanValue);
                                txt.align = cell.tColumn.align;
                                cell.ctl = txt;
                            }
                            else {
                                cell.value = oCleanValue;
                            }
                            break;
                        }
                    case "number":
                        {
                            if (col.isEditable) {
                                var tNum = new my.controls.ctlNumber(oCleanValue);
                                tNum.allowedChars = "1234567890,";
                                tNum.align = cell.tColumn.align;
                                cell.ctl = tNum;
                            }
                            else {
                                cell.value = oCleanValue;
                            }
                            break;
                        }
                    case "custom": {
                        if (this.customControlHandler != undefined) {
                            cell.element.appendChild(this.customControlHandler(data).element);
                        }
                        break;
                    }
                    case "sum": {
                        break;
                    }
                    default:
                        {
                            cell.value = oCleanValue;
                        }
                }
                if (col.isEditable) {
                    cell.element.classList.add("editable");
                }
            }
            _defaultCreatedOnRender(col, data) {
                var val = data[col.dataColumn].value;
                val = val.split("T")[0];
                var span = new my.controls.ctlSpan(val);
                return span.element;
            }
            _dateRender(col, data) {
                var val = data[col.dataColumn].value;
                if (val) {
                    val = val.split("T")[0];
                    val = val.split(" ")[0];
                }
                var span = new my.controls.ctlSpan(val);
                return span.element;
            }
            deleteRow(s, e, row) {
                var msg = "You are about to delete: ";
                var m = new my.controls.modal.popConfirm(msg, (result) => {
                    if (result) {
                        this.dataSet.delData(row.uid, row.table["DataTableName"], () => {
                            this.dataSet.getData();
                        });
                    }
                    else {
                    }
                });
                m.show();
            }
        }
        table.Simple = Simple;
        ;
    })(table = my.table || (my.table = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let table;
    (function (table) {
        class Standard extends table.Simple {
            constructor(dataset, cfg) {
                super(dataset, cfg);
                this.ctlType = "table_Standard";
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
                    this._applyConfig(cfg);
                }
            }
            set title(val) {
                this.tTitle.text = val;
            }
            get urlParams() {
                return this._urlParams;
            }
            set urlParams(val) {
                this._urlParams = val;
            }
            initEvents() {
                this.events = new my.table.Events(this);
                this.events.rowClick.subscribe(this, this._addEditClick.bind(this));
                this.events.rowDblClick.subscribe(this, this._addEditClick.bind(this));
                this.events.screenLoad.subscribe(this, this._addLoadEvent.bind(this));
                this.events.screenShow.subscribe(this, this._addShowEvent.bind(this));
                window.addEventListener("resize", this._tableChangeSize.bind(this));
            }
            _addEditClick(s, e, data) {
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
            _tableChangeSize() {
                this.calculateTableSize(window.innerHeight, window.innerWidth);
            }
            _addLoadEvent(s, e, data) {
                this.calculateTableSize(this.tBody.element.clientHeight, this.tBody.element.clientWidth);
            }
            _addShowEvent(s, e, data) {
                this.calculateTableSize(this.tBody.element.clientHeight, this.tBody.element.clientWidth);
            }
            _applyConfig(cfg) {
                this._applyTableCfg(cfg);
            }
            _applyTableCfg(cfg) {
                if (cfg.tableCfg.title) {
                    this.title = cfg.tableCfg.title;
                }
                if (cfg.tableCfg.size) {
                    this.css.size = cfg.tableCfg.size;
                }
                if (cfg.tableCfg.options) {
                    this.applyTableOptionsCfg(cfg.tableCfg.options);
                }
            }
            applyTableOptionsCfg(options) {
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
            rebind() {
                this.dataSet.getData();
            }
            _onRowMouseEnter(row, e, d) {
                if (this.options.enable_DeleteRowHover) {
                    this._createDeleteRowButton(row);
                }
            }
            _createDeleteRowButton(row) {
                if (document.getElementById('rowdel')) {
                    document.getElementById('rowdel').remove();
                }
                var i = new my.controls.ctlIcon(my.theme.current.icons.delete);
                i.element.classList.add("row-btn");
                i.element.classList.add("color-red");
                i.element.id = "rowdel";
                row.element.lastChild.appendChild(i.element);
                i.events.click.subscribe(this, this.deleteRow.bind(this), row);
            }
            _onFilterChange(s, e, d) {
                var bindVisible = this.dataTable.filterBy(this.filtering.currentSearchBy);
                this.pagination.pageCount = Math.ceil(bindVisible / this.pagination.pageSize);
            }
            _onPaginationPageSizeChange(s, e, d) {
                this._onFilterChange(s, e, d);
            }
            _onPaginationPageChange(s, e, d) {
                this.currentPage = this.pagination.pageCurrent;
                this.recreateRows();
            }
            _onSortingOrderByChange(s, e, d) {
                if (this.options.allow_sorting) {
                    var val = this.sorting.currentOrderBy.split(" ");
                    this.dataTable.orderBy(val[0], this.sorting.currentOrderByDirection);
                }
            }
            updateURL() {
            }
        }
        table.Standard = Standard;
        ;
        class Events extends my.core.table.Events {
            constructor(eventTarget) {
                super(eventTarget);
                this.screenLoad = new my.core.events.core("screenLoad");
                this.screenShow = new my.core.events.core("screenShow");
                my.events.global.navigation.subscribe(this, "SCREEN.LOAD", (s, e, d) => {
                    this.screenLoad.dispatch(this);
                });
                my.events.global.navigation.subscribe(this, "SCREEN.SHOW", (s, e, d) => {
                    this.screenShow.dispatch(this);
                });
            }
        }
        table.Events = Events;
        ;
    })(table = my.table || (my.table = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let core;
    (function (core) {
        let table;
        (function (table_5) {
            class Filtering {
                constructor(table) {
                    this.isClientFiltering = false;
                    this.table = table;
                    this._addTitleSearch();
                    this.events = new my.core.table.EventsFiltering();
                }
                _addTitleSearch() {
                    var ico = new my.controls.ctlIcon(my.theme.current.icons.search);
                    ico.events.click.subscribe(this, this._onSearch.bind(this));
                    ico.element.classList.add("ico-btn");
                    this._txtSearchBy = new my.controls.ctlText("");
                    this._txtSearchBy.element.classList.add("search");
                    this._txtSearchBy.events.change.subscribe(this, this._onSearch.bind(this));
                    this._txtSearchBy.setIcon(ico);
                    this.table.tTitle.plhSearch.appendChild(this._txtSearchBy.element);
                }
                _onSearch(s, e, d) {
                    var searchColumns = "";
                    this.table.columns.forEach((itm, idx) => {
                        if (itm.dataType == "string") {
                            searchColumns = searchColumns + "," + itm.dataColumn;
                        }
                    });
                    if (searchColumns.length > 0) {
                        var sVal = this._txtSearchBy.value.toString();
                        sVal = sVal.replace(",", "");
                        sVal = sVal.replace(";", "");
                        sVal = sVal.replace("=", "");
                        this.currentSearchBy = sVal;
                        this.events.FilterByChange.dispatch(this, sVal);
                    }
                    else {
                        console.log("Filtering:Search: missing columns of type string to search in");
                    }
                }
            }
            table_5.Filtering = Filtering;
            class EventsFiltering extends my.core.events.core {
                constructor() {
                    super("TableFilteringEvents");
                    this.FilterByChange = new my.core.events.core("Filtering_FilterByChange");
                }
            }
            table_5.EventsFiltering = EventsFiltering;
            ;
        })(table = core.table || (core.table = {}));
        ;
    })(core = my.core || (my.core = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let table;
    (function (table_6) {
        class FixedHeader {
            constructor(table) {
                this.isHidden = true;
                this.table = table;
                this.element = document.createElement("div");
                this.element.classList.add("fixed");
                this.table.element.appendChild(this.element);
                var isFirstScrol = true;
                var tablePosTop = 0;
                var tableTitleHeight = 0;
                var tableHeadHeight = 0;
                var startScroll = 0;
                window.onscroll = (e) => {
                    if (isFirstScrol) {
                        isFirstScrol = false;
                        tablePosTop = this.element.getBoundingClientRect().top;
                        tableTitleHeight = this.table.tTitle.element.getBoundingClientRect().height;
                        startScroll = tablePosTop - tableTitleHeight;
                    }
                    this._showhide(startScroll);
                };
            }
            _showhide(startScroll) {
                var rec = this.table.element.getBoundingClientRect();
                if ((this.isHidden) && (rec.top < startScroll)) {
                    this.isHidden = false;
                    this._showFixedHeader(rec);
                }
                if ((this.isHidden == false) && (rec.top > startScroll)) {
                    this.isHidden = true;
                    this._hideFixedHeader();
                }
            }
            _showFixedHeader(rec) {
                var clnT = this.table.tTitle.element.cloneNode(true);
                var clnH = this.table.tHead.element.cloneNode(true);
                var elt = document.createElement("table");
                elt.appendChild(clnH);
                var arr = this.table.tHead.element.getElementsByTagName("th");
                for (var index = 0; index < arr.length; index++) {
                    const pleft = arr[index].offsetWidth;
                    clnH.getElementsByTagName("th")[index].style.width = pleft + "px";
                }
                this.element.appendChild(clnT);
                this.element.appendChild(elt);
            }
            _hideFixedHeader() {
                this.element.innerHTML = "";
            }
        }
        table_6.FixedHeader = FixedHeader;
        ;
    })(table = my.table || (my.table = {}));
    ;
})(my || (my = {}));
;
var my;
(function (my) {
    let table;
    (function (table) {
        class InlineEdit extends table.Simple {
            constructor(dataset, cfg) {
                super(dataset, cfg);
                this.ctlType = "table_InlineEdit";
                this.optionsInlineEdit = new my.core.table.optionsInlineEdit();
                this.frmInsert = new my.forms.Custom(dataset);
                this.frmInsert.mode = "insert";
                this._initEvents();
                this._addHeadRowInsert();
                delete this.tTitle;
                this.element.classList.remove("table");
                this.element.classList.add("table-inline-edit");
            }
            _initEvents() {
            }
            _addHeadRowInsert() {
                this.insertRow = new my.core.table.Row(this);
                this.insertRow.element.classList.add("row-header-insert");
                var td;
                this.columns.forEach((col, i) => {
                    var el = this.addToForm(col, undefined);
                    if (col.isHidden == false) {
                        col.isEditable = true;
                        td = new my.core.table.tdCell(col);
                        if (col.visibleInInsertMode) {
                            td.appendControl(el);
                        }
                        this.insertRow.addCell(td);
                    }
                });
                this.frmInsert.rebind();
                var btnSave = new my.controls.ctlIconButton(my.theme.current.icons.new, (s, e, d) => {
                    this.frmInsert.DataTableName = this.DataTableName;
                    this.frmInsert.save(() => {
                        this.frmInsert.reset();
                        this.dataSet.getData();
                    });
                });
                btnSave.element.classList.add("color-green");
                btnSave.element.classList.add("btn_add");
                var t = document.createElement("td");
                t.appendChild(btnSave.element);
                this.insertRow.element.appendChild(t);
                this.tHead.addRow(this.insertRow);
                var rEmpty = new my.core.table.Row(this);
                rEmpty.element.classList.add("row-header-empty");
                rEmpty.element.innerHTML = `<td colspan="${this.columns.length - 1}"> </td>`;
                this.tHead.addRow(rEmpty);
            }
            addToForm(col, data) {
                var oCleanValue;
                if (data) {
                    oCleanValue = data[col.dataColumn];
                }
                var e = this.frmInsert.createControl(undefined, col.dataColumn, col.dataType, col.type);
                e.defaultValue = col.defaultValue;
                if (col.dataTable) {
                    e.dataTable = col.dataTable;
                }
                return e;
            }
            afterAddBodyRow(row) {
                var i = new my.controls.ctlIcon(my.theme.current.icons.delete);
                i.element.classList.add("row-btn");
                i.element.classList.add("color-red");
                i.element.id = "rowdel";
                i.events.click.subscribe(this, this.deleteRow.bind(this), row);
                var t = document.createElement("td");
                t.appendChild(i.element);
                t.width = "1px";
                row.element.appendChild(t);
            }
        }
        table.InlineEdit = InlineEdit;
        ;
    })(table = my.table || (my.table = {}));
    let core;
    (function (core) {
        let table;
        (function (table) {
            class optionsInlineEdit {
                constructor() {
                    this.mode = "inline";
                    this.positionOfNewElement = "top";
                }
            }
            table.optionsInlineEdit = optionsInlineEdit;
        })(table = core.table || (core.table = {}));
    })(core = my.core || (my.core = {}));
})(my || (my = {}));
var my;
(function (my) {
    let table;
    (function (table_7) {
        class Totals {
            constructor(table) {
                this._columns = [];
                this._table = table;
                var self = this;
                this._table.dataSet.events.Modified.subscribe(this, this._calculateTotals.bind(this));
                this._table.dataSet.events.Loaded.subscribe(this, this._calculateTotals.bind(this));
            }
            get JSON() {
                return this._JSON;
            }
            set JSON(val) {
                this._parseData(val);
            }
            _createTotalRow() {
                var r = document.createElement("tr");
                this._columns.forEach((itm, idx) => {
                    this._table.tFoot.element.appendChild(this._createTotalItem(itm));
                });
            }
            _createTotalItem(itm) {
                var ret = document.createElement("td");
                var spanp = new my.controls.ctlSpan(itm.prefix);
                var spanv = new my.controls.ctlSpan("");
                spanv.value = itm.total;
                ret.appendChild(spanp.element);
                ret.appendChild(spanv.element);
                return ret;
            }
            _calculateTotals() {
                if (this._table.options.showTotals == false) {
                    return;
                }
                var tblData = this._table.dataSet.getTable().value;
                this._columns.forEach((itm, idx) => {
                    itm._total = 0;
                });
                tblData.forEach((row, idx) => {
                    this._table.columns.forEach((col, idx) => {
                        this._calculateItemTotal(col, row);
                    });
                });
                this._columns.forEach((itm, idx) => {
                    itm.total.value = itm._total;
                });
            }
            _calculateItemTotal(col, row) {
                var rowValues = row.getAsObject();
                this._columns.forEach((itm, idx) => {
                    if (itm.dataColumn == col.dataColumn) {
                        if ((col.dataType == "number") || (col.dataType == "decimal")) {
                            itm._total = itm._total + (+rowValues[col.dataColumn]);
                        }
                        else {
                            itm._total = itm._total + 1;
                        }
                    }
                });
            }
            _parseData(val) {
                if (!val.hasOwnProperty("columns")) {
                    return;
                }
                var arr = val["columns"];
                arr.forEach((item, idx) => {
                    var tColumn = new my.table.TotalColumnConfig();
                    if (item.hasOwnProperty("colspan")) {
                        tColumn.colspan = item["colspan"];
                    }
                    if (item.hasOwnProperty("dataColumn")) {
                        tColumn.dataColumn = item["dataColumn"];
                    }
                    if (item.hasOwnProperty("prefix")) {
                        tColumn.prefix = item["prefix"];
                    }
                    this._columns.push(tColumn);
                });
                this._table.options.showTotals = true;
                this._createTotalRow();
            }
        }
        table_7.Totals = Totals;
        class TotalColumnConfig {
            constructor() {
                this.colspan = 1;
                this._total = 0;
                this.total = new my.data.binding.Observable("");
            }
        }
        table_7.TotalColumnConfig = TotalColumnConfig;
    })(table = my.table || (my.table = {}));
    ;
})(my || (my = {}));
;
//# sourceMappingURL=myLib.js.map