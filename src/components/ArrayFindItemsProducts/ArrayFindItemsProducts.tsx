import {FC} from 'react';
import './ArrayFindItemsProducts.scss';
import {ProductDTO} from '../../api/dto/product.dto';
import FindItemProduct from './FindItemProduct/FindItemProduct';
import React from 'react';

type arrayFindItemsProductsProps = {
	arrayProducts: ProductDTO[];
	setShowPodskazki: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArrayFindItemsProducts: FC<arrayFindItemsProductsProps> = ({arrayProducts, setShowPodskazki}) => {
	return (
		<ul className={'wrapper_find_list_products'}>
			{arrayProducts.map((item) => (
				<FindItemProduct key={item.product_id} product={item} setShowPodskazki={setShowPodskazki} />
			))}
		</ul>
	);
};
export default ArrayFindItemsProducts;
