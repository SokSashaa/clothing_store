import React, {FC, memo} from 'react';
import ItemCategory from '../ItemCategory/ItemCategory';
import './BlockCategories.scss';
import {useQuery} from 'react-query';
import * as Api from '../../../api';

type blockCategoriesProps = {
	isPopularCategories: boolean;
};

const BlockCategories: FC<blockCategoriesProps> = memo(({isPopularCategories}) => {
	// const [arrayCat, setArrayCar] = useState<categoryDto[]>(initCategory);
	const {data} = useQuery('getAllCategories', Api.category.getAllCategory);
	// useEffect(() => {
	// 	getAllCategory().then(setArrayCar);
	// }, []);

	return (
		<div className={'wrapperBlockCategories'}>
			<h2 id={'titleCategories'}>{isPopularCategories ? 'Популярные категории' : 'Категории'}</h2>
			<div className={'categories'}>
				{data?.map((item) => (
					<ItemCategory
						key={item.category_id}
						id={item.category_id}
						category_name={item.category_name}
						category_img_name={item.category_img_name}
					/>
				))}
			</div>
		</div>
	);
});
export default BlockCategories;
