import { AddressRes } from "./address-res";
import { CartRes } from "./cart-res";

export interface CheckoutRes {
    cart:CartRes;
    addresses:AddressRes[];
}
