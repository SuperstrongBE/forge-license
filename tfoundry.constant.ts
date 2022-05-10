import { Asset, Symbol } from "proton-tsc";

export const ALLOWED_SYMBOL: Symbol = new Symbol('XPR', 4);

export const MONTHLY_DURATION: number  = 2592000000;
export const YEARLY_DURATION: number   = 30758400000;
export const LIFETIME_DURATION: number = 30758400000000;

export const MONTHLY_PRICE: Asset  = new Asset(100000, new Symbol('XPR', 4));
export const YEARLY_PRICE: Asset   = new Asset(1000000, new Symbol('XPR', 4));
export const LIFETIME_PRICE: Asset = new Asset(1500000, new Symbol('XPR', 4));

export const MONTHLY_LICENSE: string = "monthly";
export const YEARLY_LICENSE          = "yearly";
export const LIFETIME_LICENSE        = "lifetime";

