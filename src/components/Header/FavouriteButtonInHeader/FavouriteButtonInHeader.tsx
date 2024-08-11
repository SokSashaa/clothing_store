import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {routesMap} from '../../../utils/routesMap';
import css from './FavouriteButtonInHeader.module.scss';
import favourite from '../../../images/favourite.svg';
import {useAppSelector} from '../../../hooks/redux';

const FavouriteButtonInHeader: FC = () => {
	const favouriteCount = useAppSelector((state) => state.favourites);
	return (
		<Link to={routesMap.favourites}>
			<div className={css.favouriteInHeader}>
				<img className={css.imgInHeader} src={favourite} alt={'Избранное'} />
				{favouriteCount && favouriteCount.length > 0 && <p>{favouriteCount.length}</p>}
			</div>
			<p>Избранное</p>
		</Link>
	);
};
export default FavouriteButtonInHeader;
