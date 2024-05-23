import {FC} from "react";
import './ItemProductInPageCategory.scss'
import {getSrcOnImgProduct} from "../../api/products";
import {ProductDTO} from "../../api/dto/product.dto";

type ItemProductInPageCategoryProps = {
    itemProduct:ProductDTO
}

const ItemProductInPageCategory:FC<ItemProductInPageCategoryProps> = ({itemProduct})=>{
    return (
        <div className={'wrapper_item_product_in_category'}>
            <img id={'img_product_item_category'} src={`${getSrcOnImgProduct + itemProduct.product_image}`} alt={'Лого товара'}/>
            <div>
                <p id={'article_product_item_category'}>{itemProduct.article}</p>
                <p id={'name_product_item_category'}>{itemProduct.product_name}</p>
                <p>{itemProduct.product_price}Р</p>
            </div>
        </div>
    )
}
export default ItemProductInPageCategory