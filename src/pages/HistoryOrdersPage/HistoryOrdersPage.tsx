import React, {FC} from 'react';
import {Helmet} from 'react-helmet';
import {Table, TableColumnsType} from 'antd';
import {useQuery} from 'react-query';
import {getOrdersByUser, queryKeyGetOrderByUser} from '../../api/order';
import {orderDto, statusOrderWithNamesAndColors} from '../../api/dto/orders.dto';
import {ProductDTO} from '../../api/dto/product.dto';
import TagsOrders from './TagsOrders/TagsOrders';
import css from './HistoryOrdersPage.module.scss';
import dayjs from 'dayjs';

const HistoryOrdersPage: FC = () => {
	const {data} = useQuery(queryKeyGetOrderByUser, getOrdersByUser);

	const expandedRowRender = (data: ProductDTO[]) => {
		const columns: TableColumnsType<ProductDTO> = [
			{title: 'Артикул', dataIndex: 'article', key: 'article'},
			{title: 'Название', dataIndex: 'product_name', key: 'product_name'},
			{title: 'Цена', dataIndex: 'product_price', key: 'product_price'},
			{title: 'Скидка', dataIndex: 'product_discount', key: 'product_discount'},
		];

		return <Table columns={columns} dataSource={data} pagination={false} />;
	};

	const columns: TableColumnsType<orderDto> = [
		{title: 'Номер заказа', dataIndex: 'id_order', key: 'id_order'},
		Table.EXPAND_COLUMN,
		{
			title: 'Продукты',
			dataIndex: 'id_order',
			key: 'id_order',
			render: () => <p className={css.hoverText}>Раскройте список</p>,
		},
		{title: 'Сумма заказа, Р', dataIndex: 'sum_order', key: 'sum_order'},
		{
			title: 'Статус заказа',
			dataIndex: 'status',
			key: 'status',
			render: (_, {status}) => <TagsOrders status={status} />,
			filters: statusOrderWithNamesAndColors.map((item) => {
				return {text: item.name, value: item.status};
			}),
			onFilter: (value, record) => record.status === value,
		},
		{
			title: 'Дата заказа',
			dataIndex: 'date',
			key: 'date',
			render: (_, record) => <p>{dayjs(record.date).format('DD-MM-YYYY HH:MM')}</p>,
		},
	];

	return (
		<div>
			<Helmet>
				<title>История заказов - СпецОдежда</title>
				<meta name={'description'} content={'Страница истории заказов клиента СпецОдежда.ру'} />
			</Helmet>
			<h1>История заказов</h1>

			<Table
				columns={columns}
				dataSource={data}
				expandable={{
					expandedRowRender: (record) => expandedRowRender(record.products),
					expandRowByClick: true,
				}}
				rowKey={'id_order'}
			/>
		</div>
	);
};

export default HistoryOrdersPage;
