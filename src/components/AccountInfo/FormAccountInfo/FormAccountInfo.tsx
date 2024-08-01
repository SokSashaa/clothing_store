import React, {FC} from 'react';
import {Button, DatePicker, Form, Input, notification} from 'antd';
import {useAppSelector} from '../../../hooks/redux';
import dayjs from 'dayjs';
import {updateUserForm} from '../../../api/dto/user.dto';
import * as Api from '../../../api';

const FormAccountInfo: FC = () => {
	const userRedux = useAppSelector((state) => state.user);

	const onSubmit = (data: updateUserForm) => {
		if (userRedux) {
			const newUser = {...userRedux, ...data};
			Api.userApi
				.updateUser(newUser)
				.then(() => {
					notification.success({
						message: 'Успешно!',
					});
				})
				.catch(() => {
					notification.error({
						message: 'Ошибка!',
					});
				});
		}
	};
	return (
		<Form
			name="accountSetting"
			className={'info_account'}
			layout={'vertical'}
			// wrapperCol={{
			// 	span: 30,
			// }}
			style={{width: '250px'}}
			initialValues={{
				...userRedux,
				date_birthday: dayjs(userRedux?.date_birthday),
			}}
			onFinish={onSubmit}
		>
			<Form.Item label={'E-mail'} name={'email'}>
				<Input placeholder={'E-mail'} />
			</Form.Item>
			<Form.Item label={'Имя'} name={'firstname'}>
				<Input placeholder={'Имя'} />
			</Form.Item>
			<Form.Item label={'Фамилия'} name={'lastname'}>
				<Input placeholder={'Фамилия'} />
			</Form.Item>
			<Form.Item
				style={{textAlign: 'left'}}
				name="date_birthday"
				label="Дата рождения"
				rules={[{type: 'object' as const, required: true, message: 'Please select time!'}]}
			>
				<DatePicker format={'DD-MM-YYYY'} />
			</Form.Item>

			<Form.Item>
				<Button danger htmlType="submit">
					Сохранить
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormAccountInfo;
