import React, {FC, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as Api from "../../../api";
import ItemProductInPageCategory from "../ItemProductInPageCategory/ItemProductInPageCategory";
import {ProductDTO} from "../../../api/dto/product.dto";
import {AppraiseFilters} from './AppraiseFilters/AppraiseFilters';
import css from './BlockItemsProductsInCategory.module.scss';
import {PageTitle} from '../../../ui-kit/PageTitle/PageTitle';
import {SidebarLayout} from './SidebarLayout/SidebarLayout';


const mockProducts: ProductDTO[] = [
    {
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0.2,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,fdfsoiuzjf91283kd,fdfsoiuzjf91283kd,fdfsoiuzjf91283kd,fdfsoiuzjf91283kd,fdfsoiuzjf91283kd,fdfsoiuzjf91283kd,fdfsoiuzjf91283kd,f dfsoiuzjf91283kd,fdfsoiuzjf91283kd,fdfsoiuzjf91283kd,fdfsoiuzjf91283kd,f dfsoiuzjf91283kd,fdfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },{
        article: "3213",
        product_description: "hello",
        product_id: "321321",
        product_image: "",
        product_name: "hey",
        product_discount:0,
        product_price:185
    },
    {
        article: "3214243",
        product_description: "fgpidosjaz",
        product_id: "321321",
        product_image: "",
        product_name: "hrfeh",
        product_discount:0,
        product_price:80
    },
    {
        article: "3666213",
        product_description: "ropidisofpdks.,123",
        product_id: "321321",
        product_image: "",
        product_name: "dfsoiuzjf91283kd,f",
        product_discount:0,
        product_price:11
    },
]

const BlockItemsProductInCategory: FC = () => {
    const {id,name} = useParams()
    const [products, setProducts] = useState<ProductDTO[]>(mockProducts)

    useEffect(() => {
        if (id) Api.products.getAllProductsByIDCategory(id).then(setProducts)
        if (name) Api.products.findAllProductByPartName(name).then(setProducts)
    }, [id, name]);
    
    
    const handleApplyFilter = useCallback((fromTo: [number, number]) => {
        setProducts(mockProducts.filter(item => {
            return item.product_price - item.product_price * item.product_discount >= Math.min(fromTo[0], fromTo[1]) && item.product_price - item.product_price * item.product_discount <= Math.max(fromTo[0], fromTo[1])
        }))
    }, []);
    return (
            <div className={css.wrapper}>
                <SidebarLayout afterMenuSlot={<AppraiseFilters products={mockProducts} handleApplyFilter={handleApplyFilter}/>} offsetTop={100}>
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