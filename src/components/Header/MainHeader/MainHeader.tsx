import React, {FC} from "react";
import './MainHeader.scss'
import logo from '../../../images/logo.svg'
import SearchCatalog from "../../SearchCatalog/SearchCatalog";
import {useAppSelector} from "../../../hooks/redux";
import MainModalLogIn from "../../ModalLogIn/MainModalLogIn";
import MainDropDownAccount from "../../DropDownAccount/MainDropDownAccount";
import {Link} from "react-router-dom";


const MainHeader: FC = () => {
	const userRedux = useAppSelector(state => state.user)
	if (!userRedux) return null;
	return (
		<div className={'mainHeader'}>
			<Link to={'/'}><img className={'logoInHeader'} src={logo} alt={'Логотип'}/></Link>
			<SearchCatalog/>
			
			{userRedux.email === '' ? <MainModalLogIn/> : <MainDropDownAccount/>}
		</div>
	)
}

export default MainHeader
