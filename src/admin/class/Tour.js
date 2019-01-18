
class Lenghts {
    constructor() {
        this.byDay  = "";
        this.byHour = "";
    }
}
class Price {
    constructor() {
        this.amount = "";
        this.discountAmount = "";
        this.currency = "dollar";
        this.type  = "";
        this.unit  = "";
    }
}

"use strict";
class Tour { 
    constructor() {
        this.id="";
        this.boughts="";
        this.description="";

        this.lenghts = new Lenghts();
        // ={
        //     byDay   : ""
        //     ,byHour : ""
        // }
        this.price = new Price();
        // = {
        //     amount :""
        //     ,discountAmount : ""
        //     ,currency : ""
        //     ,type : ""
        //     ,unit : ""
        // }
        this.name ="";
        this.type='';
        
        this.currency='dollar';
        this.price_type='';
    }
}
export default Tour;
//exports.Tour = Tour;