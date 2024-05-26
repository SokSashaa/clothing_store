import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as Api from "../../../api";
import ItemProductInPageCategory from "../ItemProductInPageCategory/ItemProductInPageCategory";
import './BlockItemsProductsInCategory.scss'
import {ProductDTO} from "../../../api/dto/product.dto";

const BlockItemsProductInCategory: FC = () => {
    const {id,name} = useParams()
    const [products, setProducts] = useState<ProductDTO[]>([])
    useEffect(() => {
        if (id) Api.products.getAllProductsByIDCategory(id).then(setProducts)
        if (name) Api.products.findAllProductByPartName(name).then(setProducts)
    }, []);
    return (
        <div className={'block_items_products_in_category'}>
            {
                products.map((item) =>
                    <ItemProductInPageCategory
                        key={item.product_id}
                        itemProduct={item}/>)
            }
        </div>
    )
}
export default BlockItemsProductInCategory