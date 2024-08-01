import React, {FC} from 'react';
import {Button, Form, Input, notification} from 'antd';
import * as Api from '../../../api';

type changePasswordFormType = {
	password: string;
	pass: string;
};

const ChangePasswordForm: FC = () => {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	const onSubmit = (value: changePasswordFormType) => {
		Api.userApi
			.changePasswordUser({password: value.password})
			.then(() => {
				notification.success({message: 'Успех!'});
			})
			.catch(() => {
				notification.error({message: 'Ошибка'});
			});
	};

	return (
		<div>
			<Form
				name="changePassword"
				// className={'info_account'}
				layout={'vertical'}
				// wrapperCol={{
				// 	span: 30,
				// }}
				onFinish={onSubmit}
				style={{width: '250px'}}
			>
				<Form.Item
					label="Пароль"
					name="password"
					rules={[
						{
							required: true,
							message: 'Укажите пароль',
						},
						{
							min: 8,
							validator: (_, value) => {
								return regex.test(value)
									? Promise.resolve()
									: Promise.reject(
											new Error(
												'Пароль не соответствует формату. Строчные и прописные буквы. Цифры. Символы'
											)
										);
							},
						},
					]}
				>
					<Input.Password placeholder={'Пароль'} />
				</Form.Item>
				<Form.Item
					label="Подтвердите пароль"
					name="pass"
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: 'Подтвердите пароль',
						},
						({getFieldValue}) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Пароли не совпадают'));
							},
						}),
					]}
				>
					<Input.Password placeholder={'Пароль'} />
				</Form.Item>
				<Form.Item>
					<Button danger htmlType="submit">
						Сохранить
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ChangePasswordForm;
