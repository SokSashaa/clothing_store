import {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import {Cookies} from "react-cookie";
import AccountInfo from "../../components/AccountInfo/AccountInfo";
import React from "react";

const cookies = new Cookies()
const AccountPage: FC = () => {

    return (
        <Wrapper>
            <AccountInfo/>
        </Wrapper>
    )


}
export default AccountPage