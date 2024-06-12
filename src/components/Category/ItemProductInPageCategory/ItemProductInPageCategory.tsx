import {FC} from 'react';
import css from './ItemProductInPageCategory.module.scss';
import {getSrcOnImgProduct} from '../../../api/products';
import {ProductDTO} from '../../../api/dto/product.dto';
import React from 'react';
import cn from 'classnames';
import {calculatePriceAfterDiscount, formatPrice} from '../../../utils/formatPrice';
import {RevealText} from '../../../ui-kit/RevealText/RevealText';
import {Button} from '../../../ui-kit/Button/Button';
import {ImageViewer} from '../../../ui-kit/ImageViewer/ImageViewer';

type ItemProductInPageCategoryProps = {
	itemProduct: ProductDTO;
};

const ItemProductInPageCategory: FC<ItemProductInPageCategoryProps> = ({itemProduct}) => {
	return (
		<a>
			<div className={cn(css.root, css.defaultView)}>
				{itemProduct.product_discount > 0 && (
					<div className={css.discountPercent}>{(itemProduct.product_discount * 100).toFixed(0)}%</div>
				)}
				<div className={css.photoWrap}>
					<ImageViewer
						images={itemProduct.product_image
							.split(',')
							.filter((item) => item !== '')
							.map((item, index) => (
								<img
									className={css.photoImg}
									key={index}
									src={`${getSrcOnImgProduct + item}`}
									alt={'Лого товара'}
								/>
							))}
					/>
				</div>
				<div className={css.priceWrap}>
					<div className={cn(css.price, itemProduct.product_discount > 0 && css.discountedPrice)}>
						{formatPrice(
							calculatePriceAfterDiscount(itemProduct.product_price, itemProduct.product_discount)
						)}
					</div>
					{itemProduct.product_discount > 0 && (
						<div className={css.oldPrice}>{formatPrice(itemProduct.product_price)}</div>
					)}
				</div>
				<div className={css.article}>Артикул: {itemProduct.article}</div>

				<RevealText className={css.nameWrap} lines={1} direction={'top'}>
					<div className={css.name}>{itemProduct.product_name}</div>
				</RevealText>

				<div className={css.addToCartBtnWrap}>
					<Button
						className={css.addToCartBtn}
						styleType={'blue'}
						onClick={() => window.location.assign(`/product/${itemProduct.product_id}`)}
					>
						Посмотреть подробнее
					</Button>
				</div>
			</div>
		</a>
	);
};
export default ItemProductInPageCategory;
