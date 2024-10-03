import React, {FC} from 'react';
import {Menu, MenuProps} from 'antd';
import {Link} from 'react-router-dom';
import {routesMap} from '../../../utils/routesMap';

const MenuInAdminPage: FC = () => {
	type MenuItem = Required<MenuProps>['items'][number];

	const items: MenuItem[] = [
		{
			key: 'editUser',
			label: <Link to={routesMap.admin.page + '/' + routesMap.admin.editUser}>Редактирование пользователей</Link>,
		},
		{
			key: 'company',
			label: <Link to={routesMap.admin.page + '/' + routesMap.admin.company}>Меню компаний</Link>,
		},
		{
			key: 'category',
			label: <Link to={routesMap.admin.page + '/' + routesMap.admin.editCategory}>Категории</Link>,
		},
		{
			key: 'orders',
			label: <Link to={routesMap.admin.page + '/' + routesMap.admin.orders}>Заказы</Link>,
		},
	];
	return <Menu mode="horizontal" items={items} />;
};
export default MenuInAdminPage;
