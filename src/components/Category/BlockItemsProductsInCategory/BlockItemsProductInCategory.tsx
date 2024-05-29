import React, {FC, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as Api from "../../../api";
import ItemProductInPageCategory from "../ItemProductInPageCategory/ItemProductInPageCategory";
import {ProductDTO} from "../../../api/dto/product.dto";
import {AppraiseFilters} from './AppraiseFilters/AppraiseFilters';
import css from './BlockItemsProductsInCategory.module.scss';
import {PageTitle} from '../../../ui-kit/PageTitle/PageTitle';
import {SidebarLayout} from './SidebarLayout/SidebarLayout';


const BlockItemsProductInCategory: FC = () => {
    
    const [initialProducts, setInitialProducts] = useState<ProductDTO[]>([]);
    const {id,name} = useParams()
    const [products, setProducts] = useState(initialProducts)

    useEffect(() => {
        if (id) Api.products.getAllProductsByIDCategory(id).then((value) => {setProducts(value); setInitialProducts(value)})
        if (name) Api.products.findAllProductByPartName(name).then(setProducts)
    }, [id, name]);
    
    
    const handleApplyFilter = useCallback((fromTo: [number, number]) => {
        setProducts(initialProducts.filter(item => {
            return item.product_price - item.product_price * item.product_discount >= Math.min(fromTo[0], fromTo[1]) && item.product_price - item.product_price * item.product_discount <= Math.max(fromTo[0], fromTo[1])
        }))
    }, []);
    return (
            <div className={css.wrapper}>
                <SidebarLayout afterMenuSlot={<AppraiseFilters products={initialProducts} handleApplyFilter={handleApplyFilter}/>} offsetTop={100}>
                    <div className={css.allItems}>
                        <PageTitle className={css.title}>
                                <span className={css.titleBrand}>
                                    Результаты поиска по {name ? 'запросу' : id ? 'категории' : ''} <span className={css.titleArticle}>{name || id}</span>
                                </span>
                        </PageTitle>
                        <div className={css.block_items_products_in_category}>
                            {
                                products.map((item) =>
                                    <ItemProductInPageCategory
                                        key={item.product_id}
                                        itemProduct={item}/>)
                            }
                        </div>
                    </div>
                </SidebarLayout>
            </div>
    )
}
export default BlockItemsProductInCategory