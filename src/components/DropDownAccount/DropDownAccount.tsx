import React, {FC} from 'react';
import type {MenuProps} from 'antd';
import {Dropdown} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {StarOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {Cookies} from 'react-cookie';
import {deleteUser} from '../../store/reducers/userSlice';
import {Roles} from '../../api/dto/auth.dto';
import {persistor} from '../../store/store';
import {routesMap} from '../../utils/routesMap';

type DropDownAccountProps = {
	children: React.ReactNode;
};
const cookies = new Cookies();

const DropDownAccount: FC<DropDownAccountProps> = ({children}) => {
	// const dispatch = useAppDispatch();
	const userRedux = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const logOutAccount = async () => {
		cookies.remove('_token');
		// dispatch(deleteUser());
		await persistor.purge();
		navigate(0);
	};

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <Link to={routesMap.account}>Личные данные</Link>,
		},
		{
			key: '2',
			label: <Link to={routesMap.history}>История заказов</Link>,
		},
		userRedux?.role === Roles.admin
			? {
					key: '3',
					label: <Link to={routesMap.admin.page}>Админка</Link>,
				}
			: null,
		userRedux?.role === Roles.producer
			? {
					key: '4',
					label: <Link to={routesMap.myCompany.page}>Моя компания</Link>,
				}
			: null,
		{
			key: '5',
			label: <p>Выход</p>,
			onClick: logOutAccount,
		},
	];

	return (
		<>
			<Dropdown menu={{items}}>{children}</Dropdown>
		</>
	);
};

export default DropDownAccount;
