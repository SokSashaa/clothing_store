import React, {FC, useCallback, useEffect, useState} from 'react';
import FavouriteButton from '../../ui-kit/FavouriteButton/FavouriteButton';
import * as Api from '../../api';
import {ProductDTO} from '../../api/dto/product.dto';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
	addFavouriteInState,
	addProductInState,
	deleteFavouriteProductFromState,
} from '../../store/reducers/favouritesSlice';

type FavouriteButtonInItemProductProps = {
	itemProduct: ProductDTO;
};
const FavouriteButtonInItemProduct: FC<FavouriteButtonInItemProductProps> = ({itemProduct}) => {
	const [statusButton, setStatusButton] = useState(false);
	const favourites = useAppSelector((state) => state.favourites);
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const favouriteActive = useCallback(() => {
		if (user?.email !== '') {
			Api.favourites.createFavourite(itemProduct).then((value) => dispatch(addFavouriteInState(value)));
		} else dispatch(addProductInState(itemProduct));
	}, [itemProduct]);

	const favouriteNoActive = useCallback(() => {
		if (user?.email !== '') {
			Api.favourites
				.deleteFavourite(itemProduct)
				.then(() => dispatch(deleteFavouriteProductFromState(itemProduct)));
		} else dispatch(deleteFavouriteProductFromState(itemProduct));
	}, [itemProduct]);

	useEffect(() => {
		if (favourites) {
			if (
				favourites.find((value) => {
					return value.product.product_id === itemProduct.product_id;
				})
			) {
				setStatusButton(true);
			}
		}
	}, [itemProduct]);

	return (
		<>
			<FavouriteButton
				funcActive={favouriteActive}
				funcNoActive={favouriteNoActive}
				initialValue={statusButton}
				setInitialValue={setStatusButton}
				type={statusButton ? 'active' : 'default'}
			/>
		</>
	);
};

export default FavouriteButtonInItemProduct;
