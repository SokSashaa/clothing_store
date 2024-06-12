import {FC} from 'react';
import React from 'react';
import MenuInAdminPage from '../../components/Admin/MenuInAdminPage/MenuInAdminPage';
import {Outlet} from 'react-router-dom';
import css from './AdminPage.module.scss';

const AdminPage: FC = () => {
	return (
		<div className={css.root}>
			<MenuInAdminPage />
			<Outlet />
		</div>
	);
};
export default AdminPage;
