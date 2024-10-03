import React, {FC} from 'react';
import {Order_itemDto} from '../../api/dto/order_item.dto';
import {Table, TableColumnsType} from 'antd';
import {Link} from 'react-router-dom';

type ExpandedRowRenderProductProps = {
	data: Order_itemDto[];
};

const ExpandedRowRenderProduct: FC<ExpandedRowRenderProductProps> = ({data}) => {
	const columns: TableColumnsType<Order_itemDto> = [
		{
			title: 'Артикул',
			dataIndex: ['product', 'article'],
			key: 'article',
			render: (_, record) => <Link to={`/product/${record.product.product_id}`}>{record.product.article}</Link>,
		},
		{
			title: 'Название',
			dataIndex: ['product', 'product_name'],
			key: 'product_name',
		},
		{
			title: 'Количество',
			dataIndex: 'product_count',
			key: 'product_count',
		},
		{
			title: 'Цена',
			dataIndex: 'product_price',
			key: 'product_price',
		},
		{
			title: 'Скидка',
			dataIndex: 'product_discount',
			key: 'product_discount',
		},
	];
	return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default ExpandedRowRenderProduct;
