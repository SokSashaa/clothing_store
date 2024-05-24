import React, {FC, useState} from "react";
import './MainHeader.scss'
import account from '../../../images/account.svg'
import logo from '../../../images/logo.svg'
import Cart from "../../Cart/Cart";
import SearchCatalog from "../../SearchCatalog/SearchCatalog";
import ModalLogIn from "../../ModalLogIn/ModalLogIn";
import {useAppSelector} from "../../../hooks/redux";
import MainModalLogIn from "../../ModalLogIn/MainModalLogIn";
import MainDropDownAccount from "../../DropDownAccount/MainDropDownAccount";
import {Link, NavLink} from "react-router-dom";


const MainHeader: FC = () => {
    const [openLogin, setOpenLogin] = useState<boolean>(false)
    const userRedux = useAppSelector(state=>state.user)
    return (
        <div className={'mainHeader'}>
           <Link to={'/'}><img className={'logoInHeader'} src={logo} alt={'Логотип'}/></Link>
            <SearchCatalog/>

            {userRedux.email===''? <MainModalLogIn/> : <MainDropDownAccount/>}
        </div>
    )
}

export default MainHeader
