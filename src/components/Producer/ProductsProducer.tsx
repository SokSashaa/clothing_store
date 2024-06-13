import React, {FC, useEffect, useState} from 'react';
import {Button, GetProp, Modal, Space, Table, TablePaginationConfig, TableProps} from 'antd';
import * as Api from '../../api';
import {useAppSelector} from '../../hooks/redux';
import {ProductWithCategoryDTO} from '../../api/dto/product.dto';
import css from './ProductsProducer.module.scss';
import DeleteOutlinedCustom from './DeleteOutlinedCustom/DeleteOutlinedCustom';
import EditOutlinedCustom from './EditOutlinedCustom/EditOutlinedCustom';
import CreateCategoryForm from '../CreateCategoryForm/CreateCategoryForm';
import {useModalState} from '../../hooks/useModalState';
import CreateProductForm from '../CreateProductForm/CreateProductForm';
import {Link} from 'react-router-dom';

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const ProductsProducer: FC = () => {
	const [isModalOpen, openModal, closeModal] = useModalState(false);
	const [dataSource, setDataSource] = useState<ProductWithCategoryDTO[]>([]);
	const [loading, setLoading] = useState(false);

	const user = useAppSelector((state) => state.user);

	useEffect(() => {
		if (user) {
			setLoading(true);
			Api.products
				.findProductsByCompany(user.id)
				.then((values) => setDataSource(values))
				.then(() => setLoading(false));
		}
	}, []);

	const columns: TableProps<ProductWithCategoryDTO>['columns'] = [
		{
			title: 'Артикул',
			dataIndex: 'article',
			key: 'article',
			render: (_, record) => <Link to={`/product/${record.product_id}`}>{record.article}</Link>,
		},
		{
			title: 'Name',
			dataIndex: 'product_name',
			key: 'product_name',
		},
		{
			title: 'Описание',
			dataIndex: 'product_description',
			key: 'product_description',
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
		{
			title: 'Категория',
			dataIndex: 'category',
			key: 'category',
			render: (category) => <p>{category.category_name}</p>,
		},
		{
			title: 'Действие',
			dataIndex: 'action',
			key: 'action',
			render: (_, record) => (
				<Space size="large">
					<EditOutlinedCustom product={record} />
					<DeleteOutlinedCustom product={record} />
				</Space>
			),
		},
	];

	return (
		<div className={css.root}>
			<Button type={'primary'} onClick={openModal}>
				Создать
			</Button>
			<Modal open={isModalOpen} title="Создание продукта" onCancel={closeModal} destroyOnClose footer={null}>
				<CreateProductForm closeModal={closeModal} />
			</Modal>
			<Table
				columns={columns}
				loading={loading}
				pagination={{position: ['topRight', 'bottomCenter'], pageSize: 10}}
				dataSource={dataSource}
			/>
		</div>
	);
};
export default ProductsProducer;
