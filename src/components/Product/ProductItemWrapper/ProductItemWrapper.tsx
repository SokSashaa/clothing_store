import React, {FC, useEffect, useState} from 'react';
import css from './ProductItemWrapper.module.scss';
import {getSrcOnImgProduct} from '../../../api/products';
import * as Api from '../../../api';
import {useParams} from 'react-router-dom';
import {initialProductDTO, ProductDTO} from '../../../api/dto/product.dto';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {addProductInCart, minusCountProduct, plusCountProduct} from '../../../store/reducers/cartSlice';
import {ImageViewer} from '../../../ui-kit/ImageViewer/ImageViewer';
import {formatPrice} from '../../../utils/formatPrice';
import cn from 'classnames';
import {RevealText} from '../../../ui-kit/RevealText/RevealText';
import {Button} from '../../../ui-kit/Button/Button';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import FavouriteButtonInItemProduct from '../../FavouriteButtonInItemProduct/FavouriteButtonInItemProduct';
import {Helmet} from 'react-helmet';

const ProductItemWrapper: FC = () => {
	const [product, setProduct] = useState<ProductDTO>(initialProductDTO);
	const {id} = useParams();
	useEffect(() => {
		id && Api.products.getProductById(id).then(setProduct);
	}, [id]);

	const cart = useAppSelector((state) => state.cart);
	const user = useAppSelector((state) => state.user);
	const index = cart?.findIndex((item) => item.id_product.product_id === product.product_id);
	const dispatch = useAppDispatch();

	const handleAddToCart = () => {
		dispatch(addProductInCart({id_product: product, count_product: 1}));

		if (user?.email !== '') {
			Api.cart.createProductInCart({
				id_product: product,
				count_product: 1,
			});
		}
	};

	const handlePlusCountProduct = () => {
		if (user?.email !== '') {
			Api.cart.updateProductInCart({
				id_product: product,
				count_product: cart && index !== undefined ? cart[index].count_product + 1 : 1,
			});
		}
		dispatch(plusCountProduct(product.product_id));
	};

	const handleMinusCountProduct = () => {
		if (user?.email !== '') {
			if (cart && index !== undefined && cart[index].count_product === 1) {
				Api.cart.deleteProductInCart({id_product: product, count_product: 0});
			} else {
				Api.cart.updateProductInCart({
					id_product: product,
					count_product: cart && index !== undefined ? cart[index].count_product - 1 : 1,
				});
			}
		}

		dispatch(minusCountProduct(product.product_id));
	};

	return (
		<div className={css.product_item_wrapper}>
			<Helmet>
				<title>{product.product_name} - СпецОдежда</title>
				<meta name={'description'} content={product.product_name + '. ' + product.product_description} />
			</Helmet>
			<ImageViewer
				images={product.product_image
					.split(',')
					.filter((item) => item !== '')
					.map((item, index) => {
						return (
							<img
								className={css.photoImg}
								key={index}
								src={`${getSrcOnImgProduct + item}`}
								alt={'Лого товара'}
							/>
						);
					})}
			/>
			<div className={css.info}>
				<div className={css.top}>
					<h1>{product.product_name}</h1>

					<RevealText className={css.nameWrap} lines={6} direction={'bottom'}>
						<p className={css.descripption}>{product.product_description}</p>
					</RevealText>
				</div>

				<div className={css.bottom}>
					<div className={css.priceWrap}>
						<div className={cn(css.price, product.product_discount > 0 && css.discountedPrice)}>
							{formatPrice(product.product_price - product.product_price * product.product_discount)}
						</div>
						{product.product_discount > 0 && (
							<div className={css.oldPrice}>{formatPrice(product.product_price)}</div>
						)}
					</div>

					{index === -1 ? (
						<Button size={'large'} onClick={handleAddToCart} styleType={'secondary'}>
							Добавить в корзину
						</Button>
					) : (
						<div className={css.cartControls}>
							<Button size={'large'} styleType={'secondary'} onClick={() => handleMinusCountProduct()}>
								<MinusOutlined />
							</Button>
							{cart && index !== undefined ? cart[index].count_product : 0}
							<Button size={'large'} styleType={'secondary'} onClick={() => handlePlusCountProduct()}>
								<PlusOutlined />
							</Button>
						</div>
					)}
				</div>
			</div>
			<FavouriteButtonInItemProduct itemProduct={product} />
		</div>
	);
};
export default ProductItemWrapper;
