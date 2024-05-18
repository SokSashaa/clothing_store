import {FC, useState} from "react";
import ModalLogIn from "./ModalLogIn";
import Cart from "../Cart/Cart";
import account from '../../images/account.svg'

const MainModalLogIn:FC = ()=>{
    const [openLogin, setOpenLogin] = useState<boolean>(false)
    return (
        <div className={'wrapperIconsInHeader'}>
            <div className={'blockWrapperIconInHeader'} onClick={() => setOpenLogin(true)}>
                <img className={'imgInHeader'} src={account} alt={'Аккаунт'}/>
                <p>Вход</p>
            </div>
            <ModalLogIn openLogin={openLogin} setOpenLogin={setOpenLogin}/>
            <Cart/>
        </div>
    )
}

export default MainModalLogIn