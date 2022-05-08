import { Asset, Symbol } from "proton-tsc";

export const MONTHLY_DURATION:number=2592000000;
export const YEARLY_DURATION:number=30758400000;
export const LIFETIME_DURATION:number=30758400000000;

export const MONTHLY_PRICE:number=2592000000;
export const YEARLY_PRICE:number=30758400000;
export const LIFETIME_PRICE:number=30758400000000;


export const MONTHLY_LICENSE:string="monthly";
export const YEARLY_LICENSE="yearly";
export const LIFETIME_LICENSE="lifetime";

export const PRICING_PLAN = {

    MONTHLY:{
        price:new Asset(10,new Symbol('XUSDC',6)),
        duration:2592000000,
        memo:'monthly'
    },
    YEARLY:{
        price:new Asset(100,new Symbol('XUSDC',6)),
        duration:30758400000,
        memo:'yearly'
    },
    LIFETIME:{
        price:new Asset(150,new Symbol('XUSDC',6)),
        duration:30758400000000,
        memo:'lifetime'
    },


}
