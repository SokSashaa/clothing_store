import React, {FC} from 'react';
import {useAppSelector} from '../../hooks/redux';
import ItemProductInPageCategory from '../../components/Category/ItemProductInPageCategory/ItemProductInPageCategory';
import {PageTitle} from '../../ui-kit/PageTitle/PageTitle';
import css from './FavouritesPage.module.scss';

const FavouritesPage: FC = () => {
	const favourites = useAppSelector((state) => state.favourites);

	return (
		<div className={css.root}>
			<PageTitle size={'default'}>Избранное</PageTitle>
			<div className={css.items}>
				{favourites ? favourites.map((item) => <ItemProductInPageCategory itemProduct={item.product} />) : null}
			</div>
		</div>
	);
};
export default FavouritesPage;
