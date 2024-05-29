import {FC} from "react";
import DropDownAccount from "./DropDownAccount";
import account from "../../images/account.svg";
import Cart from "../Cart/Cart";
import React from "react";

const MainDropDownAccount:FC = ()=>{
    return (
        <DropDownAccount>
            <div className={'wrapperIconsInHeader'}>
                <div className={'blockWrapperIconInHeader'}>
                    <img className={'imgInHeader'} src={account} alt={'Аккаунт'}/>
                    <p>Аккаунт</p>
                </div>
                <Cart/>
            </div>
        </DropDownAccount>
    )
}

export default MainDropDownAccount