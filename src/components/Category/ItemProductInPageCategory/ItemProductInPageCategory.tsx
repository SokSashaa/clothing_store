import React, {FC} from 'react';
import css from './ItemProductInPageCategory.module.scss';
import {getSrcOnImgProduct} from '../../../api/products';
import {ProductDTO} from '../../../api/dto/product.dto';
import cn from 'classnames';
import {calculatePriceAfterDiscount, formatPrice} from '../../../utils/formatPrice';
import {RevealText} from '../../../ui-kit/RevealText/RevealText';
import {Button} from '../../../ui-kit/Button/Button';
import {ImageViewer} from '../../../ui-kit/ImageViewer/ImageViewer';
import {addProductInCart, minusCountProduct, plusCountProduct} from '../../../store/reducers/cartSlice';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import * as Api from '../../../api';
import FavouriteButtonInItemProduct from '../../FavouriteButtonInItemProduct/FavouriteButtonInItemProduct';

type ItemProductInPageCategoryProps = {
	itemProduct: ProductDTO;
};

const ItemProductInPageCategory: FC<ItemProductInPageCategoryProps> = ({itemProduct}) => {
	const dispatch = useAppDispatch();
	const cart = useAppSelector((state) => state.cart);
	const user = useAppSelector((state) => state.user);
	const index = cart?.findIndex((item) => item.id_product.product_id === itemProduct.product_id);
	const handleAddToCart = () => {
		dispatch(addProductInCart({id_product: itemProduct, count_product: 1}));

		if (user?.email !== '') {
			Api.cart.createProductInCart({
				id_product: itemProduct,
				count_product: 1,
			});
		}
	};

	return (
		<a>
			<div className={cn(css.root, css.defaultView)}>
				{itemProduct.product_discount > 0 && (
					<div className={css.discountPercent}>{(itemProduct.product_discount * 100).toFixed(0)}%</div>
				)}
				<FavouriteButtonInItemProduct itemProduct={itemProduct} />
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
					{index === -1 ? (
						<Button className={css.addToCartBtn} onClick={handleAddToCart} styleType={'blue'}>
							Добавить в корзину
						</Button>
					) : (
						<div className={css.cartControls}>
							<Button
								size={'small'}
								styleType={'secondary'}
								onClick={() => dispatch(minusCountProduct(itemProduct.product_id))}
							>
								<MinusOutlined />
							</Button>
							{cart && index !== undefined ? cart[index].count_product : 0}
							<Button
								size={'small'}
								styleType={'secondary'}
								onClick={() => dispatch(plusCountProduct(itemProduct.product_id))}
							>
								<PlusOutlined />
							</Button>
						</div>
					)}
				</div>
			</div>
		</a>
	);
};
export default ItemProductInPageCategory;
