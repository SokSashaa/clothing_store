import {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import {Menu, MenuProps} from "antd";
import React from "react";
import MenuInAdminPage from "../../components/Admin/MenuInAdminPage/MenuInAdminPage";
import {Outlet} from "react-router-dom";
import axios from "../../utils/axios";


const AdminPage:FC = ()=>{
    return (
        <Wrapper>
            <MenuInAdminPage/>
            <Outlet/>
        </Wrapper>
    )
}
export default AdminPage