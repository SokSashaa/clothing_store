import {FC, useEffect, useState} from "react";
import './ProductItemWrapper.scss'
import {getSrcOnImgProduct} from "../../../api/products";
import * as Api from '../../../api'
import {useParams} from "react-router-dom";
import {initialProductDTO, ProductDTO} from "../../../api/dto/product.dto";


const ProductItemWrapper: FC = () => {
    const [product, setProduct] = useState<ProductDTO>(initialProductDTO)
    const {id} = useParams()
    useEffect(() => {
        id && Api.products.getProductById(id).then(setProduct)
    }, []);

    return (
        <div className={'product_item_wrapper'}>
            <img src={`${getSrcOnImgProduct}${product.product_image}`} alt={'Лого товара'}/>
        </div>
    )
}
export default ProductItemWrapper