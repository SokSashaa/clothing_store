import React, {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import {Outlet} from "react-router-dom";
import MenuInProducerPage from "../../components/MenuInProducerPage/MenuInProducerPage";

const ProducerPage: FC = () => {
    return (
        <Wrapper>
            <MenuInProducerPage/>
            <Outlet/>
        </Wrapper>
    )
}
export default ProducerPage