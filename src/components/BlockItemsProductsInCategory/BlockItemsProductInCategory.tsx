import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {initialProductDTO, ProductDTO} from "../../api/dto/product.dto";
import * as Api from "../../api";
import ItemProductInPageCategory from "../ItemProductInPageCategory/ItemProductInPageCategory";
import './BlockItemsProductsInCategory.scss'

const BlockItemsProductInCategory: FC = () => {
    const {id} = useParams()
    const [products, setProducts] = useState<ProductDTO[]>(initialProductDTO)
    useEffect(() => {
        if (id) Api.products.getAllProductsByIDCategory(id).then(setProducts)
    }, []);
    return (
        <div className={'block_items_products_in_category'}>
            {
                products.map((item) =>
                    <ItemProductInPageCategory
                        itemProduct={item}/>)
            }
        </div>
    )
}
export default BlockItemsProductInCategory