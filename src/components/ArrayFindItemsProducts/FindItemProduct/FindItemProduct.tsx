import React from "react";
import {FC} from "react";
import {ProductDTO} from "../../../api/dto/product.dto";
import './FindItemProduct.scss'

type findItemProductProps = {
    product:ProductDTO
}
const FindItemProduct:FC<findItemProductProps> = ({product})=>{
    return (
        <div className={'wrapper_find_item_product'}>
            <p>{product.product_name}</p>
            <p id={'find_product_description'}>{product.product_description}</p>
        </div>
    )
}
export default FindItemProduct