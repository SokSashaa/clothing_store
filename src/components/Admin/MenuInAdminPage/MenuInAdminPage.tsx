import React, {FC} from "react";
import {Menu, MenuProps} from "antd";
import {Link} from "react-router-dom";

const MenuInAdminPage:FC = ()=>{
    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        {
            key: 'editUser',
            label: (<Link to={'/admin/editUser'}>Редактирование пользователей</Link>)
        },
    ];
    return (
        <Menu  mode="horizontal" items={items} />
    )
}
export default MenuInAdminPage