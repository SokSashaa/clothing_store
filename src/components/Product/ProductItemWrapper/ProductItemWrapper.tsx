import {FC, useEffect, useState} from "react";
import './ProductItemWrapper.scss'
import {getSrcOnImgProduct} from "../../../api/products";
import * as Api from '../../../api'
import {useParams} from "react-router-dom";
import {initialProductDTO, ProductDTO} from "../../../api/dto/product.dto";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {addProductInCart} from "../../../store/reducers/cartSlice";
import ButtonAddCart from "../ButtonAddCart/ButtonAddCart";


const ProductItemWrapper: FC = () => {
    const [product, setProduct] = useState<ProductDTO>(initialProductDTO)
    const {id} = useParams()
    useEffect(() => {
        id && Api.products.getProductById(id).then(setProduct)
    }, []);

    const cart = useAppSelector(state => state.cart)
    const index = cart.findIndex((item) => item.item.product_id === product.product_id)
    const dispatch = useAppDispatch();

    const onClick_addInCart = () => {
        dispatch(addProductInCart({item: product, count: 1}))
    }

    return (
        <div className={'product_item_wrapper'}>
            <img id={'logo_product_item'} src={`${getSrcOnImgProduct}${product.product_image}`} alt={'Лого товара'}/>
            <div className={'info_product_item'}>
                <h1>{product.product_name}</h1>
                <p>Артикул: {product.article}</p>
                <p>{product.product_description}</p>
                {
                    index === -1 ? <button onClick={onClick_addInCart}>Добавить в корзину</button> : <ButtonAddCart id={product.product_id}/>
                }
            </div>

        </div>
    )
}
export default ProductItemWrapper