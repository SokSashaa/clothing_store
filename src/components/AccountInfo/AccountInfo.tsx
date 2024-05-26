import React, {FC} from "react";
import {useAppSelector} from "../../hooks/redux";
import './accountInfo.scss'
import FormAccountInfo from "./FormAccountInfo/FormAccountInfo";
import MenuInAccount from "./MenuInAccount/MenuInAccount";

const AccountInfo: FC = () => {

    return (
        <div className={'wrapperAccountInfo'}>
            <MenuInAccount/>
            <div style={{flexDirection:'column'}}>
                <h1>Личный аккаунт</h1>

                <FormAccountInfo/>
            </div>

        </div>
    )
}
export default AccountInfo