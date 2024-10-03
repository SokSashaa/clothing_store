import React, {FC} from 'react';
import {Menu, MenuProps} from 'antd';
import {Link} from 'react-router-dom';
import {routesMap} from '../../utils/routesMap';

const MenuInProducerPage: FC = () => {
	type MenuItem = Required<MenuProps>['items'][number];

	const items: MenuItem[] = [
		{
			key: 'crud',
			label: <Link to={routesMap.myCompany.products}>Меню продуктов</Link>,
		},
		{
			key: 'orders',
			label: <Link to={routesMap.myCompany.orders}>Заказы</Link>,
		},
	];
	return <Menu mode="horizontal" items={items} />;
};
export default MenuInProducerPage;
