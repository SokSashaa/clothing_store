import {FC, useState} from 'react';
import css from './Cart.module.scss';
import cart from '../../images/shopcart.svg';
import {useAppSelector} from '../../hooks/redux';
import React from 'react';
import {Link} from 'react-router-dom';
import {routesMap} from '../../utils/routesMap';

const Cart: FC = () => {
	const countInCart = useAppSelector((state) => state.cart);
	// const [countInCart, setCountInCart] = useState<number>(2)

	return (
		<Link to={routesMap.cart} className={css.blockWrapperIconInHeader}>
			<div className={css.cartInHeader}>
				<img className={css.imgInHeader} src={cart} alt={'Корзина'} />
				{countInCart && countInCart.length > 0 && <p>{countInCart.length}</p>}
			</div>
			<p>Корзина</p>
		</Link>
	);
};
export default Cart;
