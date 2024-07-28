import React, {useState} from 'react';
import css from './CartPage.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {Checkbox, Empty, notification, Table, TablePaginationConfig} from 'antd';
import {PageTitle} from '../../ui-kit/PageTitle/PageTitle';
import {usePagination} from '../../hooks/usePagination';
import {ColumnProps} from 'antd/es/table';
import {itemCart, minusCountProduct, plusCountProduct, removeProductFromCart} from '../../store/reducers/cartSlice';
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
	const dispatch = useAppDispatch();
	const [selectedItems, setSelectedItems] = useState<itemCart[] | undefined>(cart);
	const {pagination, tableProps: paginationTableProps} = usePagination(cart?.length || 0, defaultPagination);

	if (cart === undefined) {
		return <h1>Корзина пуста</h1>;
	}

	const columns: ColumnProps<itemCart>[] = [
		{
			title: 'Выбор',
			width: 50,
			align: 'center',
			render: (_, record) => {
				const isChecked =
					selectedItems!.find((item) => item.item.product_id === record.item.product_id) !== undefined;
				return (
					<Checkbox
						checked={isChecked}
						onChange={() => {
							setSelectedItems(
								isChecked
									? selectedItems!.filter((item) => item.item.product_id !== record.item.product_id)
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
					images={record.item.product_image
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
			render: (_, record) => record.item.product_name,
		},
		{
			title: 'Цена',
			width: 180,
			render: (_, record) => (
				<div className={css.priceWrap}>
					<div className={cn(css.price, record.item.product_discount > 0 && css.discountedPrice)}>
						{formatPrice(
							calculatePriceAfterDiscount(record.item.product_price, record.item.product_discount)
						)}
					</div>
					{record.item.product_discount > 0 && (
						<div className={css.oldPrice}>{formatPrice(record.item.product_price)}</div>
					)}
				</div>
			),
		},
		{
			dataIndex: 'count',
			title: 'Количество',
			width: 150,
			render: (value, record) => (
				<>
					<Button
						size={'small'}
						styleType={'secondary'}
						onClick={() => {
							const currentCount = selectedItems?.filter(
								(item) => item.item.product_id === record.item.product_id
							)[0].count;
							if (currentCount === undefined) return;
							if (currentCount > 1) {
								dispatch(minusCountProduct(record.item.product_id));
								setSelectedItems(
									selectedItems?.map((item) => {
										let count = item.count;
										if (item.item.product_id === record.item.product_id) {
											count = currentCount - 1;
										}
										return {
											item: item.item,
											count: count,
										};
									})
								);
							} else {
								dispatch(removeProductFromCart(record.item.product_id));
								setSelectedItems(
									selectedItems?.filter((item) => item.item.product_id !== record.item.product_id)
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
							dispatch(plusCountProduct(record.item.product_id));
							setSelectedItems(
								selectedItems?.map((item) => {
									let count = item.count;
									if (item.item.product_id === record.item.product_id) {
										count = item.count + 1;
									}
									return {
										item: item.item,
										count: count,
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
					<div className={css.name}>{record.item.product_description}</div>
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
							<span className={css.secondText}>{sumBy(selectedItems, 'count')}</span>
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
												item.count *
												calculatePriceAfterDiscount(
													item.item.product_price,
													item.item.product_discount
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
													item.count *
													calculatePriceAfterDiscount(
														item.item.product_price,
														item.item.product_discount
													)
											)
										)
									)}?`,
									onOk: () => {
										selectedItems?.map((item) => {
											dispatch(removeProductFromCart(item.item.product_id));
											setSelectedItems(
												selectedItems?.filter(
													(fltering) => item.item.product_id !== fltering.item.product_id
												)
											);
										});
										notification.success({
											message: 'Заказ успешно оформлен',
										});
									},
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
