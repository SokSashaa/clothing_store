import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import MenuInProducerPage from '../../components/MenuInProducerPage/MenuInProducerPage';
import {Helmet} from 'react-helmet';

const ProducerPage: FC = () => {
	return (
		<div style={{minHeight: '550px'}}>
			<Helmet>
				<title>Управление компанией - СпецОдежда</title>
				<meta name={'description'} content={'Управление компанией пользователя'} />
			</Helmet>
			<MenuInProducerPage />
			<Outlet />
		</div>
	);
};
export default ProducerPage;
