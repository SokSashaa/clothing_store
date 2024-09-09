import React, {useState} from 'react';
import css from './CartPage.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {Checkbox, Empty, notification, Table, TablePaginationConfig} from 'antd';
import {PageTitle} from '../../ui-kit/PageTitle/PageTitle';
import {usePagination} from '../../hooks/usePagination';
import {ColumnProps} from 'antd/es/table';
import {minusCountProduct, plusCountProduct, removeProductFromCart} from '../../store/reducers/cartSlice';
import {ImageViewer} from '../../ui-kit/ImageViewer/ImageViewer';
import {getSrcOnImgProduct} from '../../api/products';
import cn from 'classnames';
import {calculatePriceAfterDiscount, formatPrice} from '../../utils/formatPrice';
import {RevealText} from '../../ui-kit/RevealText/RevealText';
import {sum, sumBy} from 'lodash';
import {Button} from '../../ui-kit/Button/Button';
import {confirmation} from '../../ui-kit/Confirmation/confirmation';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Helmet} from 'react-helmet';
import {cartDto} from '../../api/dto/cart.dto';
import * as Api from '../../api';
import {ProductDTO} from '../../api/dto/product.dto';
import {useMutation} from 'react-query';

const defaultPagination: TablePaginationConfig & {
	skip: number;
	top: number;
} = {
	skip: 0,
	top: 20,
	showSizeChanger: true,
	position: ['topRight', 'bottomRight'],
};

export const CartPage = () => {
	const cart = useAppSelector((state) => state.cart);
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const [selectedItems, setSelectedItems] = useState<cartDto[] | undefined>(cart);
	const {pagination, tableProps: paginationTableProps} = usePagination(cart?.length || 0, defaultPagination);

	const mutate = useMutation(() => {
		if (selectedItems) {
			return Api.orders
				.createOrder({
					products: selectedItems?.map((item) => {
						return {product_id: item.id_product, count: item.count_product};
					}),
					sum_order: sum(
						selectedItems?.map(
							(item) =>
								item.count_product *
								calculatePriceAfterDiscount(
									item.id_product.product_price,
									item.id_product.product_discount
								)
						)
					),
				})
				.then(() => {
					selectedItems.map((item) => {
						dispatch(removeProductFromCart(item.id_product.product_id));
						setSelectedItems(
							selectedItems?.filter(
								(fltering) => item.id_product.product_id !== fltering.id_product.product_id
							)
						);
					});
					notification.success({
						message: 'Заказ успешно оформлен',
					});
				})
				.catch((err) => console.log(err));
		}
		return new Promise(() => {});
	});

	if (cart === undefined) {
		return <h1>Корзина пуста</h1>;
	}

	const handlePlusCountProduct = (value: number, product: ProductDTO) => {
		if (user?.email !== '') {
			Api.cart.updateProductInCart({
				id_product: product,
				count_product: value + 1,
			});
		}
		dispatch(plusCountProduct(product.product_id));
	};

	const handleMinusCountProduct = (value: number, product: ProductDTO) => {
		if (user?.email !== '') {
			Api.cart.updateProductInCart({
				id_product: product,
				count_product: value - 1,
			});
		}

		dispatch(minusCountProduct(product.product_id));
	};

	const deleteProductInCart = (product: ProductDTO) => {
		if (user?.email !== '') {
			Api.cart.deleteProductInCart({id_product: product, count_product: 0});
		}
	};

	const columns: ColumnProps<cartDto>[] = [
		{
			title: 'Выбор',
			width: 50,
			align: 'center',
			render: (_, record) => {
				const isChecked =
					selectedItems!.find((item) => item.id_product.product_id === record.id_product.product_id) !==
					undefined;
				return (
					<Checkbox
						checked={isChecked}
						onChange={() => {
							setSelectedItems(
								isChecked
									? selectedItems!.filter(
											(item) => item.id_product.product_id !== record.id_product.product_id
										)
									: [...selectedItems!, record]
							);
						}}
					/>
				);
			},
		},
		{
			title: 'Изображения',
			width: 300,
			render: (_, record) => (
				<ImageViewer
					images={record.id_product.product_image
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
			),
		},
		{
			title: 'Название',
			render: (_, record) => record.id_product.product_name,
		},
		{
			title: 'Цена',
			width: 180,
			render: (_, record) => (
				<div className={css.priceWrap}>
					<div className={cn(css.price, record.id_product.product_discount > 0 && css.discountedPrice)}>
						{formatPrice(
							calculatePriceAfterDiscount(
								record.id_product.product_price,
								record.id_product.product_discount
							)
						)}
					</div>
					{record.id_product.product_discount > 0 && (
						<div className={css.oldPrice}>{formatPrice(record.id_product.product_price)}</div>
					)}
				</div>
			),
		},
		{
			dataIndex: 'count_product',
			title: 'Количество',
			width: 150,
			render: (value, record) => (
				<>
					<Button
						size={'small'}
						styleType={'secondary'}
						onClick={() => {
							const currentCount = selectedItems?.filter(
								(item) => item.id_product.product_id === record.id_product.product_id
							)[0].count_product;
							if (currentCount === undefined) return;
							if (currentCount > 1) {
								handleMinusCountProduct(value, record.id_product);
								// dispatch(minusCountProduct(record.id_product.product_id));
								setSelectedItems(
									selectedItems?.map((item) => {
										let count = item.count_product;
										if (item.id_product.product_id === record.id_product.product_id) {
											count = currentCount - 1;
										}
										return {
											id_product: item.id_product,
											count_product: count,
										};
									})
								);
							} else {
								deleteProductInCart(record.id_product);
								dispatch(removeProductFromCart(record.id_product.product_id));
								setSelectedItems(
									selectedItems?.filter(
										(item) => item.id_product.product_id !== record.id_product.product_id
									)
								);
							}
						}}
					>
						<MinusOutlined />
					</Button>
					<span className={css.numberOfItems}>{value}</span>
					<Button
						size={'small'}
						styleType={'secondary'}
						onClick={() => {
							handlePlusCountProduct(value, record.id_product);
							// dispatch(plusCountProduct(record.id_product.product_id));
							setSelectedItems(
								selectedItems?.map((item) => {
									let count = item.count_product;
									if (item.id_product.product_id === record.id_product.product_id) {
										count = item.count_product + 1;
									}
									return {
										id_product: item.id_product,
										count_product: count,
									};
								})
							);
						}}
					>
						<PlusOutlined />
					</Button>
				</>
			),
		},
		{
			title: 'Описание',
			width: 200,
			render: (_, record) => (
				<RevealText className={css.nameWrap} lines={3} direction={'bottom'}>
					<div className={css.name}>{record.id_product.product_description}</div>
				</RevealText>
			),
		},
	];

	return (
		<div className={css.main}>
			<Helmet>
				<title>Корзина - СпецОдежда</title>
				<meta name={'description'} content={'Корзина пользователя'} />
			</Helmet>
			<PageTitle className={css.title}>
				<h1>Корзина</h1>
			</PageTitle>
			<div className={css.wrapper}>
				<Table
					dataSource={cart}
					showSorterTooltip={false}
					locale={{emptyText: <Empty description={'Корзина пуста'} />}}
					rowKey={'product_id'}
					bordered
					pagination={{
						...defaultPagination,
						...paginationTableProps.pagination,
					}}
					columns={columns}
					scroll={{x: 'max-content'}}
					className={css.table}
				/>

				<div className={css.sumBlock}>
					<div className={css.top}>
						<p className={css.countItems}>
							<span className={css.firstText}>Итого позиций:</span>{' '}
							<span className={css.secondText}>{selectedItems?.length ?? 0}</span>
						</p>
						<p className={css.countPieces}>
							<span className={css.firstText}>Итого товаров:</span>{' '}
							<span className={css.secondText}>{sumBy(selectedItems, 'count_product')}</span>
						</p>
					</div>
					<div className={css.bottom}>
						<p className={css.finalPrice}>
							<span className={css.priceText}>Итого:</span>
							<span className={css.priceNumber}>
								{formatPrice(
									sum(
										selectedItems?.map(
											(item) =>
												item.count_product *
												calculatePriceAfterDiscount(
													item.id_product.product_price,
													item.id_product.product_discount
												)
										)
									)
								)}
							</span>
						</p>
						<Button
							disabled={selectedItems?.length === 0}
							size={'large'}
							className={css.button}
							onClick={() =>
								confirmation({
									message: `Вы уверены что хотите оформить заказ на сумму ${formatPrice(
										sum(
											selectedItems?.map(
												(item) =>
													item.count_product *
													calculatePriceAfterDiscount(
														item.id_product.product_price,
														item.id_product.product_discount
													)
											)
										)
									)}?`,
									onOk: () => mutate.mutate(),
									onCancel: () => {
										notification.error({
											message: `Не оформлен заказ`,
										});
									},
								})
							}
						>
							Оформить заказ
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
