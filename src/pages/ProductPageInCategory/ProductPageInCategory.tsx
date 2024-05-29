import {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import BlockItemsProductInCategory from "../../components/Category/BlockItemsProductsInCategory/BlockItemsProductInCategory";
import MenuProductsInCategory from "../../components/MenuProductsInCategory/MenuProductsInCategory";
import './ProductPageInCategory.scss'
import React from "react";

const ProductPageInCategory: FC = () => {

    return (
        <Wrapper>
                <BlockItemsProductInCategory/>
        </Wrapper>
    )
}
export default ProductPageInCategory