import React, {FC} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Breadcrumb} from 'antd';

const Breadcrumbs: FC = () => {
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter((x) => x);

	const items = pathnames.slice(0, -1).map((item, index) => {
		return {title: <Link to={`/${item}`}>{item}</Link>};
	});

	if (pathnames.length > 0) items.unshift({title: <Link to={'/'}>Главная</Link>});

	return <Breadcrumb items={items} />;
};
export default Breadcrumbs;
