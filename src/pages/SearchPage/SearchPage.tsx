import React, {FC} from 'react';
import BlockItemsProductInCategory from '../../components/Category/BlockItemsProductsInCategory/BlockItemsProductInCategory';
import {Helmet} from 'react-helmet';

const SearchPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Результаты поиска = СпецОдежда</title>
			</Helmet>
			<BlockItemsProductInCategory />
		</>
	);
};
export default SearchPage;
