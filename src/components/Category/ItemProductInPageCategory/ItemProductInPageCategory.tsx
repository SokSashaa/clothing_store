import {FC} from "react";
import css from './ItemProductInPageCategory.module.scss'
import {getSrcOnImgProduct} from "../../../api/products";
import {ProductDTO} from "../../../api/dto/product.dto";
import React from "react";
import cn from 'classnames';
import {formatPrice} from '../../../utils/formatPrice';
import {RevealText} from '../../../ui-kit/RevealText/RevealText';
import {Button} from '../../../ui-kit/Button/Button';

type ItemProductInPageCategoryProps = {
    itemProduct:ProductDTO
}

const ItemProductInPageCategory:FC<ItemProductInPageCategoryProps> = ({itemProduct})=>{
    return (
        <a href={`/product/${itemProduct.product_id}`}>
            <div className={cn(css.root, css.defaultView)}>
                {itemProduct.product_discount > 0 && (
                    <div className={css.discountPercent}>
                        {(itemProduct.product_discount * 100).toFixed(0)}%
                    </div>
                )}
                <div className={css.photoWrap}>
                    {itemProduct.product_image !== '' ?
                        <img className={css.photoImg} src={`${getSrcOnImgProduct + itemProduct.product_image}`}
                             alt={'Лого товара'}/>
                        : <div className={cn(css.noPhoto, css.img)}/>
                    }
                </div>
                <div className={css.priceWrap}>
                    <div
                        className={css.price}>{formatPrice(itemProduct.product_price - itemProduct.product_price * itemProduct.product_discount)}</div>
                    {itemProduct.product_discount > 0 && (
                        <div className={css.oldPrice}>{formatPrice(itemProduct.product_price)}</div>
                    )}
                </div>
                <div className={css.article}>Артикул: {itemProduct.article}</div>
                
                <RevealText className={css.nameWrap} lines={1} direction={'top'}>
                    <div className={css.name}>{itemProduct.product_name}</div>
                </RevealText>
                
                <div className={css.addToCartBtnWrap}>
                    <Button
                        className={css.addToCartBtn}
                        styleType={'blue'}
                    >
                        Посмотреть подробнее
                    </Button>
                </div>
            </div>
        </a>
    )
}
export default ItemProductInPageCategory