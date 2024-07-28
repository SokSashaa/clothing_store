import React, {FC} from 'react';
import Carousel from '../../components/Carousel/Carousel';
import BlockCategories from '../../components/Category/BlockCategories/BlockCategories';
import {Helmet} from 'react-helmet';

const MainPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Главная - СпецОдежда</title>
				<meta name={'description'} content={'Главная страница СпецОдежда.ру'} />
			</Helmet>
			<Carousel />
			<BlockCategories isPopularCategories />
		</>
	);
};
export default MainPage;
