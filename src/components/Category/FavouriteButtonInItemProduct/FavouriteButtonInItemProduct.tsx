import React, {FC, useCallback, useEffect, useState} from 'react';
import FavouriteButton from '../../../ui-kit/FavouriteButton/FavouriteButton';
import * as Api from '../../../api';
import {ProductDTO} from '../../../api/dto/product.dto';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {addFavouriteInState, deleteFavouriteProductFromState} from '../../../store/reducers/favouritesSlice';

type FavouriteButtonInItemProductProps = {
	itemProduct: ProductDTO;
};
const FavouriteButtonInItemProduct: FC<FavouriteButtonInItemProductProps> = ({itemProduct}) => {
	const [statusButton, setStatusButton] = useState(false);
	const favourites = useAppSelector((state) => state.favourites);
	const dispatch = useAppDispatch();

	const favouriteActive = useCallback(() => {
		Api.favourites.createFavourite(itemProduct).then((value) => dispatch(addFavouriteInState(value)));
	}, [itemProduct]);

	const favouriteNoActive = useCallback(() => {
		Api.favourites.deleteFavourite(itemProduct).then(() => dispatch(deleteFavouriteProductFromState(itemProduct)));
	}, [itemProduct]);

	useEffect(() => {
		if (favourites) {
			if (favourites.find((value) => value.product.product_id === itemProduct.product_id)) {
				setStatusButton(true);
			}
		}
	}, []);

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
