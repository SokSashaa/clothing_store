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
            <div className={'info_product_item_category'}>
                <p id={'article_product_item_category'}>{itemProduct.article}</p>
                <p id={'name_product_item_category'}>{itemProduct.product_name}</p>
                <div className={'prices_product'}>
                    {
                        itemProduct.product_discount>0?
                            <><p id={'discount_product_item_category'}>{itemProduct.product_price*itemProduct.product_discount}Р</p>
                            <p id={'price_product_item_category'} className={'discount_price_product'}>{itemProduct.product_price}Р</p></>:
                            <p id={'price_product_item_category'}>{itemProduct.product_price}Р</p>
                    }
                </div>

                <button>Подробнее</button>
            </div>
        </div>
    )
}
export default ItemProductInPageCategory