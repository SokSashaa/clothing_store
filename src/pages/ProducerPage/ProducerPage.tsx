import React, {FC} from 'react';
import Wrapper from '../../components/Wrapper/Wrapper';
import {Outlet} from 'react-router-dom';
import MenuInProducerPage from '../../components/MenuInProducerPage/MenuInProducerPage';

const ProducerPage: FC = () => {
	return (
		<div style={{minHeight: '550px'}}>
			<MenuInProducerPage />
			<Outlet />
		</div>
	);
};
export default ProducerPage;
