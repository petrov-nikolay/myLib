
namespace my {

    export namespace table {



        export class FixedHeader {

            table: my.table.iTable;
            element: HTMLElement;
            isHidden: boolean = true;

            constructor(table: my.table.iTable) {
                this.table = table;
                this.element = document.createElement("div");
                this.element.classList.add("fixed");
                this.table.element.appendChild(this.element);



                var isFirstScrol: boolean = true;


                var tablePosTop: number = 0;
                var tableTitleHeight: number = 0;
                var tableHeadHeight: number = 0;
                var startScroll: number = 0;


                window.onscroll = (e) => {
                    if (isFirstScrol) {
                        isFirstScrol = false;
                        //init variables here
                        //earlier the table is not ready and positioned
                        tablePosTop = this.element.getBoundingClientRect().top; // gts the position of the fixed container as set by the CSS 
                        tableTitleHeight = this.table.tTitle.element.getBoundingClientRect().height;
                        //tableHeadHeight = this.table.tHead.element.getBoundingClientRect().height;
                        startScroll = tablePosTop - tableTitleHeight; //  (tableTitleHeight + tableHeadHeight);
                    }



                    //console.log(rec);

                    this._showhide(startScroll)

                }


            }


            private _showhide(startScroll: number) {
                //where is the table positioned now
                var rec: ClientRect = this.table.element.getBoundingClientRect();


                if ((this.isHidden) && (rec.top < startScroll)) {
                    this.isHidden = false;
                    this._showFixedHeader(rec);
                    //console.log("show at position:" + rec.top);
                }
                if ((this.isHidden == false) && (rec.top > startScroll)) {
                    this.isHidden = true;
                    this._hideFixedHeader();
                    //console.log("hide at position:" + rec.top);
                }
            }


            private _showFixedHeader(rec: ClientRect) {
                //clone tilte and header
                var clnT = <HTMLElement>this.table.tTitle.element.cloneNode(true);
                var clnH = <HTMLElement>this.table.tHead.element.cloneNode(true);

                var elt: HTMLElement = document.createElement("table");

                //cln.style.width = rec.width + "px";
                elt.appendChild(clnH);
                //var offset = 0; //this.element.offsetLeft;
                var arr = this.table.tHead.element.getElementsByTagName("th")
                for (var index = 0; index < arr.length; index++) {
                    const pleft = arr[index].offsetWidth;
                    clnH.getElementsByTagName("th")[index].style.width = pleft + "px";
                }


                this.element.appendChild(clnT);
                this.element.appendChild(elt);

            }


            private _hideFixedHeader() {
                this.element.innerHTML = "";
            }


        }; // end class FixedHeader



    }; //end namespace table

}; //end namespace my