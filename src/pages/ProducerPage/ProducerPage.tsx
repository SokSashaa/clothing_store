import React, {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import {Outlet} from "react-router-dom";
import MenuInProducerPage from "../../components/MenuInProducerPage/MenuInProducerPage";

const ProducerPage: FC = () => {
	return (
		<>
			<MenuInProducerPage />
			<Outlet />
		</>
	);
};
export default ProducerPage;
