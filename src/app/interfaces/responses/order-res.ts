import { EntryRes } from "./entry-res";

export interface OrderRes {
    pk:string;

    entries:EntryRes[];

    totalPriceOfProducts:number;

    totalPrice:number;

    orderStatus:string;

    shippingTrackingLink:string;

    createdAt:string;

    showDeatils:boolean;
}
