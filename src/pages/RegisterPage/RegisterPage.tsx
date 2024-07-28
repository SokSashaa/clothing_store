import {FC} from 'react';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import {useAppSelector} from '../../hooks/redux';
import React from 'react';
import {Helmet} from 'react-helmet';

const RegisterPage: FC = () => {
	const user = useAppSelector((state) => state.user);
	return (
		<>
			<Helmet>
				<title>Регистрация - СпецОдежда</title>
				<meta name={'description'} content={'Регистрация на сайте СпецОдежда.ру'} />
			</Helmet>
			{user?.email === '' ? <RegisterForm /> : <h1>Вы уже зарегистрированы</h1>}
		</>
	);
};
export default RegisterPage;
