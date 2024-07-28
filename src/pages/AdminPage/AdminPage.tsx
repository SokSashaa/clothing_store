import {FC} from 'react';
import React from 'react';
import MenuInAdminPage from '../../components/Admin/MenuInAdminPage/MenuInAdminPage';
import {Outlet} from 'react-router-dom';
import css from './AdminPage.module.scss';
import {Helmet} from 'react-helmet';

const AdminPage: FC = () => {
	return (
		<div className={css.root}>
			<Helmet>
				<title>Админка - СпецОдежда</title>
				<meta name={'description'} content={'Страница для управления сайтом'} />
			</Helmet>
			<MenuInAdminPage />
			<Outlet />
		</div>
	);
};
export default AdminPage;
