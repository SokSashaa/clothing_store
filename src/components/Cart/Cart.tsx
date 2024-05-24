import {FC, useState} from "react";
import './Cart.scss'
import cart from "../../images/shopcart.svg";
import {useAppSelector} from "../../hooks/redux";

const Cart: FC = () => {
    const countInCart = useAppSelector(state => state.cart)
    // const [countInCart, setCountInCart] = useState<number>(2)
    return (
        <div className={'blockWrapperIconInHeader'}>
            <div className={'cartInHeader'}>
                <img className={'imgInHeader'} src={cart} alt={'Корзина'}/>
                {countInCart.length > 0 && <p>{countInCart.length}</p>}
            </div>
            <p>Корзина</p>
        </div>

    )
}
export default Cart