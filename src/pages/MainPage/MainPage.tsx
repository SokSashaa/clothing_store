import React, {FC} from 'react';
import Carousel from '../../components/Carousel/Carousel';
import BlockCategories from '../../components/Category/BlockCategories/BlockCategories';

const MainPage: FC = () => {
	return (
		<>
			<Carousel />
			<BlockCategories isPopularCategories />
		</>
	);
};
export default MainPage;
