import {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import {Menu, MenuProps} from "antd";
import React from "react";
import MenuInAdminPage from "../../components/Admin/MenuInAdminPage/MenuInAdminPage";
import {Outlet} from "react-router-dom";
import axios from "../../utils/axios";


const AdminPage:FC = ()=>{
    axios.get('/user/getAllUsers').then((values) => console.log(values))
    return (
        <Wrapper>
            <MenuInAdminPage/>
            <Outlet/>
        </Wrapper>
    )
}
export default AdminPage