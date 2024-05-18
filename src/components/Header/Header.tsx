import {FC} from "react";
import './Header.scss'
import MiniHeader from "./MiniHeader/MiniHeader";
import MainHeader from "./MainHeader/MainHeader";




const Header: FC = () => {



    return (
        <header className={'wrapper_header'}>
            <MiniHeader/>
            <MainHeader/>
        </header>
    )
}

export default Header