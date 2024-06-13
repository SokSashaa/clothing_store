import React from 'react';
import {FC} from 'react';
import {ProductDTO} from '../../../api/dto/product.dto';
import './FindItemProduct.scss';
import {Link} from 'react-router-dom';
import css from '../../Product/ProductItemWrapper/ProductItemWrapper.module.scss';
import {RevealText} from '../../../ui-kit/RevealText/RevealText';

type findItemProductProps = {
	product: ProductDTO;
	setShowPodskazki: React.Dispatch<React.SetStateAction<boolean>>;
};
const FindItemProduct: FC<findItemProductProps> = ({product, setShowPodskazki}) => {
	return (
		<Link to={`/product/${product.product_id}`} onClick={() => setShowPodskazki(false)}>
			<div className={'wrapper_find_item_product'}>
				<p>{product.product_name}</p>
				<RevealText className={css.nameWrap} lines={1} direction={'bottom'}>
					<p className={css.descripption}>{product.product_description}</p>
				</RevealText>
				{/*<p id={'find_product_description'}>{product.product_description}</p>*/}
			</div>
		</Link>
	);
};
export default FindItemProduct;
