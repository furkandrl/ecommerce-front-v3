import { EntryRes } from "./entry-res";

export interface CartRes {
    entries:EntryRes[];

    totalPriceOfProducts:number;

    numberOfProducts:number;
}
