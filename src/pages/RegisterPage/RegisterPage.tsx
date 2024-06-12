import {FC} from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import {useAppSelector} from '../../hooks/redux';
import React from 'react';

const RegisterPage: FC = () => {
	const user = useAppSelector((state) => state.user);
	return user?.email === '' ? <RegisterForm /> : <h1>Вы уже зарегистрированы</h1>;
};
export default RegisterPage;
