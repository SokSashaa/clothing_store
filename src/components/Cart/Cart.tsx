import {FC, useState} from "react";
import './Cart.scss'
import cart from "../../images/shopcart.svg";

const Cart: FC = () => {
    const [countInCart, setCountInCart] = useState<number>(2)
    return (
        <div className={'blockWrapperIconInHeader'}>
            <div className={'cartInHeader'}>
                <img className={'imgInHeader'} src={cart} alt={'Корзина'}/>
                {countInCart > 0 && <p>{countInCart}</p>}
            </div>
            <p>Корзина</p>
        </div>

    )
}
export default Cart