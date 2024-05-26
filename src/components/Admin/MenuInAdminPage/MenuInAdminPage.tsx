import React, {FC} from "react";
import {Menu, MenuProps} from "antd";
import {Link} from "react-router-dom";

const MenuInAdminPage:FC = ()=>{
    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        {
            key: 'editAccess',
            label: (<Link to={'/admin/editAccess'}>Редактирование прав пользователя</Link>)
        },
    ];
    return (
        <Menu  mode="horizontal" items={items} />
    )
}
export default MenuInAdminPage