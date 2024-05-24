import {FC} from "react";
import './ButtonAddCart.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {minusCountProduct, plusCountProduct} from "../../../store/reducers/cartSlice";

type ButtonAddCartProps = {
    id: string
}
const ButtonAddCart: FC<ButtonAddCartProps> = ({id}) => {
    const cartRedux = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const index = cartRedux.findIndex((item)=>item.item.product_id===id)
    return (
        <div className={'buttonAddCount'}>
            <button onClick={()=>dispatch(minusCountProduct(id))}>-</button>
            {cartRedux[index].count}
            <button onClick={()=>dispatch(plusCountProduct(id))}>+</button>
        </div>
    )
}
export default ButtonAddCart