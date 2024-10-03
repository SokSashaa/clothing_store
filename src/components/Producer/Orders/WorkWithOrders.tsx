import React, {FC} from 'react';
import {notification, Table, TableColumnsType} from 'antd';
import {orderDto, statusOrderEnum, statusOrderWithNamesAndColors} from '../../../api/dto/orders.dto';
import {useMutation, useQuery} from 'react-query';
import {getOrdersMyCompany, queryKeyGetOrdersMyCompany} from '../../../api/order';
import dayjs from 'dayjs';
import './WorkWithOrders.scss';
import ExpandedRowRenderProduct from '../../Tables/ExpandedRowRenderProduct';
import * as Api from '../../../api';
import {ModalDangerInFunc} from '../../../ui-kit/ModalDanger/ModalDanger';
import {Helmet} from 'react-helmet';
import SelectStatusOrder from '../SelectStatusOrder/SelectStatusOrder';

const WorkWithOrders: FC = () => {
	const {data} = useQuery(queryKeyGetOrdersMyCompany, getOrdersMyCompany);

	const cancelOrder = useMutation((id_order: string) => {
		return Api.orders.orderUpdate({id_order: id_order, status: statusOrderEnum.cancel});
	});

	const columns: TableColumnsType<orderDto> = [
		{
			title: 'Номер заказа',
			dataIndex: 'id_order',
			key: 'id_order',
			onFilter: (value, record) => record.status === value,
		},
		Table.EXPAND_COLUMN,
		{
			title: 'Продукты',
			dataIndex: 'id_order',
			key: 'id_order',
			render: () => <p>Раскройте список</p>,
		},
		{title: 'Сумма заказа, Р', dataIndex: 'sum_order', key: 'sum_order'},
		{
			title: 'Статус заказа',
			dataIndex: 'status',
			key: 'status',
			render: (_, record) => (
				<SelectStatusOrder
					onChangeOnCancel={() =>
						ModalDangerInFunc(
							'Отменить заказ?',
							`Вы уверены, что хотите отменить заказ номер ${record.id_order}?`,
							() => cancelOrder.mutate(record.id_order)
						)
					}
					id_order={record.id_order}
					status={record.status}
				/>
			),
			filters: statusOrderWithNamesAndColors.map((item) => {
				return {text: item.name, value: item.status};
			}),
			onFilter: (value, record) => record.status === value,
		},
		{
			title: 'Дата заказа',
			dataIndex: 'date',
			key: 'date',
			render: (_, record) => <p>{dayjs(record.date).format('DD-MM-YYYY HH:mm')}</p>,
		},
		{
			title: 'Клиент',
			key: 'client',
			dataIndex: 'client',
			render: (_, record) => <p>{record.client.email}</p>,
		},
	];

	return (
		<div>
			<Helmet>
				<title>История заказов компании - СпецОдежда</title>
				<meta name={'description'} content={'Страница истории заказов компании СпецОдежда.ру'} />
			</Helmet>
			<h1>История заказов вашей компании</h1>

			<Table
				columns={columns}
				dataSource={data}
				expandable={{
					expandedRowRender: (record) => <ExpandedRowRenderProduct data={record.order_item} />,
					expandRowByClick: true,
				}}
				rowKey={'id_order'}
			/>
		</div>
	);
};
export default WorkWithOrders;
