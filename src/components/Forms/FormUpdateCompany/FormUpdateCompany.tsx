import React, {FC} from 'react';
import {Button, Col, Form, Input, notification, Row} from 'antd';
import * as Api from '../../../api';
import {companyDto, companyUpdateDTO} from '../../../api/dto/company.dto';

type formUpdateCompany = {
	name: string;
	email: string;
	inn: string;
	ogrn: string;
	address: string;
};

type FormUpdateCompanyProps = {
	company: companyDto;
	closeModal: () => void;
};

const FormUpdateCompany: FC<FormUpdateCompanyProps> = ({company, closeModal}) => {
	const [form] = Form.useForm();

	const handleUpdate = async (values: formUpdateCompany) => {
		const {id} = (await Api.userApi.findUserByEmail(values.email))[0];
		if (id) {
			const company_new: companyUpdateDTO = {
				user_id: id,
				name: values.name,
				inn: values.inn,
				ogrn: values.ogrn,
				address: values.address,
				id: company.id,
			};
			Api.company
				.updateCompany(company_new)
				.then(() => {
					notification.success({
						message: 'Успешно!',
						duration: 2,
					});
				})
				.finally(() => closeModal())
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
			initialValues={{
				...company,
				email: company.user_id.email,
			}}
			layout={'vertical'}
			onFinish={(values) => handleUpdate(values)}
		>
			<Form.Item name={'name'} label={'Название'}>
				<Input placeholder={'Название'} />
			</Form.Item>
			<Form.Item name={'inn'} label={'ИНН'}>
				<Input placeholder={'ИНН'} />
			</Form.Item>
			<Form.Item name={'ogrn'} label={'ОГРН'}>
				<Input placeholder={'ОГРН '} />
			</Form.Item>
			<Form.Item name={'address'} label={'Адрес'}>
				<Input placeholder={'Адрес'} />
			</Form.Item>
			<Form.Item name={'email'} label={'Почта пользователя'}>
				<Input placeholder={'Почта пользователя'} />
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
export default FormUpdateCompany;
