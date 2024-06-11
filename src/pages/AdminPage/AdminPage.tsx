import {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import React from "react";
import MenuInAdminPage from "../../components/Admin/MenuInAdminPage/MenuInAdminPage";
import {Outlet} from "react-router-dom";
import css from './AdminPage.module.scss'


const AdminPage:FC = ()=>{
    return (
        <Wrapper>
            <div className={css.root}>
                <MenuInAdminPage/>
                <Outlet/>
            </div>
        </Wrapper>
    )
}
export default AdminPage