import React, {FC, useState} from 'react';
import css from './FormUpdateUser.module.scss';
import {Button, Col, DatePicker, Form, Input, notification, Row, Select} from 'antd';
import {Roles} from '../../../api/dto/auth.dto';
import * as Api from '../../../api';
import {userDTO} from '../../../api/dto/user.dto';
import dayjs from 'dayjs';

type FormUpdateUserProps = {
	user: userDTO;
	closeModal: () => void;
};

const FormUpdateUser: FC<FormUpdateUserProps> = ({user, closeModal}) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const handleUpdate = (values: any) => {
		setLoading(true);
		const user_new = {...values, id: user.id, date_reg: user.date_reg};
		Api.userApi
			.updateUser(user_new)
			.then(() => {
				notification.success({
					message: 'Успешно!',
					duration: 2,
				});
			})
			.finally(() => {
				setLoading(false);
				closeModal();
			})
			.catch((error) =>
				notification.error({
					message: error.response.data.message,
					duration: 2,
				})
			);
	};

	return (
		<Form
			className={css.root}
			form={form}
			initialValues={{
				email: user.email,
				firstname: user.firstname,
				lastname: user.lastname,
				role: user.role,
				date_birthday: dayjs(user.date_birthday),
			}}
			onFinish={(values) => handleUpdate(values)}
			layout={'vertical'}
		>
			<div className={css.itemsForm}>
				<div>
					<Form.Item name={'email'} label={'Email'}>
						<Input placeholder={'Email'} />
					</Form.Item>
					<Form.Item name={'lastname'} label={'Фамилия'}>
						<Input placeholder={'Фамилия'} />
					</Form.Item>
					<Form.Item name={'firstname'} label={'Имя'}>
						<Input placeholder={'Имя '} />
					</Form.Item>
				</div>
				<div>
					<Form.Item name={'date_birthday'} label={'Дата регистрации'}>
						<DatePicker format={'DD-MM-YYYY'} />
					</Form.Item>

					<Form.Item name={'role'} label={'Роль'}>
						<Select>
							<Select.Option value={Roles.default}>Пользователь</Select.Option>
							<Select.Option value={Roles.producer}>Продавец</Select.Option>
							<Select.Option value={Roles.admin}>Администратор</Select.Option>
						</Select>
					</Form.Item>
				</div>
			</div>
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
export default FormUpdateUser;
