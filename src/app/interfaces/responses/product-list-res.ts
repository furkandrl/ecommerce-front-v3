import { CategoryRes } from "./category-res";
import { ProductRes } from "./product-res";

export interface ProductListRes {
    category:CategoryRes;
    products:ProductRes[];
}
