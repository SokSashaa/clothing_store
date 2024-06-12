import React, {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import {Outlet} from "react-router-dom";
import MenuInProducerPage from "../../components/MenuInProducerPage/MenuInProducerPage";

const ProducerPage: FC = () => {
    return (
        <Wrapper>
            <div style={{minHeight:'300px'}}>
                <MenuInProducerPage/>
                <Outlet/>
            </div>

        </Wrapper>
    )
}
export default ProducerPage