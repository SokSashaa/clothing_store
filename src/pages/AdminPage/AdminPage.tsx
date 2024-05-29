import {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import {Menu, MenuProps} from "antd";
import React from "react";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Редактирование прав пользователей',
        key: 'mail',
    },
    {
        label: 'Navigation Two',
        key: 'app',
    },
    {
        key: 'alipay',
        label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Navigation Four - Link
            </a>
        ),
    },
];
const AdminPage:FC = ()=>{
    return (
        <Wrapper>
            <Menu  mode="horizontal" items={items} />;
        </Wrapper>
    )
}
export default AdminPage