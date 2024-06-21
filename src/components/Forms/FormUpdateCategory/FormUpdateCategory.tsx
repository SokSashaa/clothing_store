import React, {FC} from 'react';
import {Button, Col, Form, Input, notification, Row, Upload, UploadFile} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import * as Api from '../../../api';
import {categoryDto} from '../../../api/dto/category.dto';

type FormUpdateCategoryProps = {
	category: categoryDto;
	closeModal: () => void;
};

const FormUpdateCategory: FC<FormUpdateCategoryProps> = ({category, closeModal}) => {
	const [form] = Form.useForm();
	const [fileList, setFileList] = React.useState<UploadFile[]>([]);

	const handleUpdate = (values: any) => {
		const res = {...values, category_id: category.category_id};
		Api.category
			.updateCategory(res)
			.then(() => {
				notification.success({
					message: 'Успешно',
					duration: 2,
				});
				form.resetFields();
				closeModal();
			})
			.finally(() => {})
			.catch((error) =>
				notification.error({
					message: error.response.data.message,
					duration: 2,
				})
			);
	};
	return (
		<Form
			form={form}
			initialValues={{
				category_name: category.category_name,
			}}
			onFinish={(values) => handleUpdate(values)}
			layout={'vertical'}
		>
			<Form.Item name={'category_name'} label={'Название'}>
				<Input placeholder={'Название'} />
			</Form.Item>
			<Form.Item name={'category_img_name'} label="Изображение">
				<Upload
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
export default FormUpdateCategory;
