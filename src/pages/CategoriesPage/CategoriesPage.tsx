import React, {FC} from 'react';
import BlockCategories from '../../components/Category/BlockCategories/BlockCategories';
import {Helmet} from 'react-helmet';

const CategoriesPage: FC = () => {
	return (
		<>
			<Helmet>
				<title>Категории - СпецОдежда</title>
				<meta name={'description'} content={'Категории сайта СпецОдежда'} />
			</Helmet>
			<BlockCategories isPopularCategories={false} />
		</>
	);
};
export default CategoriesPage;
