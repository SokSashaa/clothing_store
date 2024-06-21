import React, {FC, useState} from 'react';
import {Button, Col, Form, Input, InputNumber, notification, Row, Upload, UploadFile} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import SelectCategory from '../../../ui-kit/SelectCategory/SelectCategory';
import {PlusOutlined} from '@ant-design/icons';
import * as Api from '../../../api';
import {ProductWithCategoryDTO} from '../../../api/dto/product.dto';

type FormUpdateProductProps = {
	product: ProductWithCategoryDTO;
	closeModal: () => void;
};
const FormUpdateProduct: FC<FormUpdateProductProps> = ({product, closeModal}) => {
	const [form] = Form.useForm();
	const [valueCategory, setValueCategory] = useState('');
	const [fileList, setFileList] = React.useState<UploadFile[]>([]);

	const handleUpdate = (values: any) => {
		if (!Number.isInteger(values.category)) {
			const product_new = {
				product_description: values.product_description,
				product_discount: values.product_discount,
				product_name: values.product_name,
				product_price: values.product_price,
				product_image: values.product_image,
				article: values.article,
				category_id: values.category.category_id,
				product_id: product.product_id,
			};
			console.log('int', product_new);
			Api.products
				.updateProductWithImages(product_new)
				.then(() => {
					notification.success({
						message: 'Успешно!',
						duration: 2,
					});
					closeModal();
				})
				.catch((error) =>
					notification.error({
						message: error.response.data.message,
						duration: 2,
					})
				);
		} else {
			const product_new = {
				product_description: values.product_description,
				product_discount: values.product_discount,
				product_name: values.product_name,
				product_price: values.product_price,
				product_image: values.product_image,
				article: values.article,
				category_id: values.category,
				product_id: product.product_id,
			};
			console.log(product_new);
			Api.products
				.updateProductWithImages(product_new)
				.then(() => {
					notification.success({
						message: 'Успешно!',
						duration: 2,
					});
					closeModal();
				})
				.catch((error) =>
					notification.error({
						message: error.response.data.message,
						duration: 2,
					})
				);
		}
	};

	return (
		<Form
			form={form}
			initialValues={{...product, product_image: undefined}}
			onFinish={(values) => handleUpdate(values)}
			layout={'vertical'}
		>
			<Form.Item name={'article'} label={'Артикул'}>
				<Input placeholder={'Артикул'} />
			</Form.Item>
			<Form.Item name={'product_name'} label={'Название'}>
				<Input placeholder={'Название'} />
			</Form.Item>
			<Form.Item name={'product_description'} label={'Описание'}>
				<TextArea placeholder={'Описание'} />
			</Form.Item>
			<Form.Item name={'product_price'} label={'Цена'}>
				<InputNumber placeholder={'Цена'} />
			</Form.Item>
			<Form.Item name={'product_discount'} label={'Скидка (0-1)'}>
				<InputNumber min={0} max={1} step={0.1} placeholder={'Скидка'} />
			</Form.Item>
			<Form.Item name={'category'} label={'Категория'}>
				<SelectCategory placeholder={'Выберите категорию'} value={valueCategory} onChange={setValueCategory} />
			</Form.Item>
			<Form.Item name={'product_image'} label="Изображение">
				<Upload
					maxCount={5}
					action="/upload.do"
					listType="picture-card"
					fileList={fileList}
					onChange={({fileList}) => setFileList(fileList)}
				>
					<button style={{border: 0, background: 'none'}} type="button">
						<PlusOutlined />
						<div style={{marginTop: 8}}>Upload</div>
					</button>
				</Upload>
			</Form.Item>
			<Row gutter={10} justify={'end'}>
				<Col>
					<Button onClick={closeModal}>Отмена</Button>
				</Col>
				<Col>
					<Button type="primary" htmlType={'submit'}>
						Обновить
					</Button>
				</Col>
			</Row>
		</Form>
	);
};
export default FormUpdateProduct;
