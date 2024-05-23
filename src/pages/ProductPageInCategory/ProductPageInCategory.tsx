import {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import BlockItemsProductInCategory from "../../components/BlockItemsProductsInCategory/BlockItemsProductInCategory";
import MenuProductsInCategory from "../../components/MenuProductsInCategory/MenuProductsInCategory";
import './ProductPageInCategory.scss'

const ProductPageInCategory: FC = () => {

    return (
        <Wrapper>
            <div className={'wrapper_product_page_category'}>
                <MenuProductsInCategory/>
                <BlockItemsProductInCategory/>
            </div>

        </Wrapper>
    )
}
export default ProductPageInCategory