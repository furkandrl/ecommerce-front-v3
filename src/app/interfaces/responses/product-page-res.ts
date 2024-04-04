import { CategoryRes } from "./category-res";
import { PageableRes } from "./pageable-res";
import { ProductListRes } from "./product-list-res";

export interface ProductPageRes {
    category:CategoryRes;
    products:PageableRes<ProductListRes>;
}
