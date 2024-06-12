import React, {FC} from "react";
import {Menu, MenuProps} from "antd";
import {Link} from "react-router-dom";

const MenuInProducerPage:FC = ()=>{
    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        {
            key: 'crud',
            label: (<Link to={'/myCompany/products'}>Меню продуктов</Link>)
        },
    ];
    return (
        <Menu  mode="horizontal" items={items}/>
    )
}
export default MenuInProducerPage