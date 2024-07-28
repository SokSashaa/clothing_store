import React, {FC} from 'react';
import BlockItemsProductInCategory from '../../components/Category/BlockItemsProductsInCategory/BlockItemsProductInCategory';
import './ProductPageInCategory.scss';
import {Helmet} from 'react-helmet';

const ProductPageInCategory: FC = () => {
	return (
		<>
			<Helmet>
				<title>Продукты по категории - СпецОдежда</title>
				<meta name={'description'} content={'Продукты по определенной категории'} />
			</Helmet>
			<BlockItemsProductInCategory />
		</>
	);
};
export default ProductPageInCategory;
