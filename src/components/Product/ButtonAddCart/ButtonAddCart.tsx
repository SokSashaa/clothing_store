import {FC} from 'react';
import './ButtonAddCart.scss';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {minusCountProduct, plusCountProduct} from '../../../store/reducers/cartSlice';
import React from 'react';

type ButtonAddCartProps = {
	id: string;
};
const ButtonAddCart: FC<ButtonAddCartProps> = ({id}) => {
	const cartRedux = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();
	if (!cartRedux) {
		return null;
	}
	const index = cartRedux.findIndex((item) => item.id_product.product_id === id);
	return (
		<div className={'buttonAddCount'}>
			<button onClick={() => dispatch(minusCountProduct(id))}>-</button>
			{cartRedux[index].count_product}
			<button onClick={() => dispatch(plusCountProduct(id))}>+</button>
		</div>
	);
};
export default ButtonAddCart;
