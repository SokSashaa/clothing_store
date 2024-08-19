import React, {FC} from 'react';
import {LoginFormDto} from '../../../api/dto/auth.dto';
import {Button, Checkbox, Form, Input, notification} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../../hooks/redux';
import * as Api from '../../../api';
import {addUser} from '../../../store/reducers/userSlice';
import {Cookies} from 'react-cookie';
import {saveFavouriteNewArray} from '../../../store/reducers/favouritesSlice';
import {persistor} from '../../../store/store';
import {addArrayProductsInCart, addProductInCart} from '../../../store/reducers/cartSlice';

const cookie = new Cookies();

type LogInFormProps = {
	closeModal: () => void;
};
const LogInForm: FC<LogInFormProps> = ({closeModal}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onSubmit = async (values: LoginFormDto) => {
		try {
			await persistor.purge();
			const {token, user} = await Api.auth.login(values);
			dispatch(addUser(user));
			notification.success({
				message: 'Успешно',
				duration: 2,
			});

			cookie.set('_token', token, {path: '/'});

			const favourites = await Api.favourites.getAllFavouritesByID();
			dispatch(saveFavouriteNewArray(favourites));

			const productsInCart = await Api.cart.getUserCart();
			dispatch(addArrayProductsInCart(productsInCart));

			navigate(0);
		} catch (err) {
			notification.error({
				message: err.toString(),
				duration: 2,
			});
		}
	};
	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{remember: true}}
			onFinish={(values: LoginFormDto) => {
				onSubmit(values);
			}}
		>
			<Form.Item name="email" rules={[{required: true, message: 'Пожалуйста,введите email'}]}>
				<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
			</Form.Item>
			<Form.Item name="password" rules={[{required: true, message: 'Пожалуйста, введите пароль'}]}>
				<Input.Password
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Password"
				/>
			</Form.Item>
			<Form.Item>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<a className="login-form-forgot" href="">
					Forgot password
				</a>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
					Log in
				</Button>
				Or{' '}
				<Link to={'/register'} onClick={closeModal}>
					register now!
				</Link>
			</Form.Item>
		</Form>
	);
};
export default LogInForm;
