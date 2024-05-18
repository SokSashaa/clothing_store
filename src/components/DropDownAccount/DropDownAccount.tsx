import React, {FC} from "react";
import type {MenuProps} from 'antd';
import {Dropdown} from 'antd'
import {Link} from "react-router-dom";
import {StarOutlined} from '@ant-design/icons'
import {useAppDispatch} from "../../hooks/redux";
import {Cookies} from "react-cookie";
import {deleteUser} from "../../store/reducers/userSlice";

type DropDownAccountProps = {
    children: React.ReactNode
}
const cookies = new Cookies()

const DropDownAccount: FC<DropDownAccountProps> = ({children}) => {
    const dispatch = useAppDispatch()
    const logOutAccount = ()=> {
        cookies.remove('_token')
        dispatch(deleteUser())
        // window.location.reload()
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to={'/account'}>Личные данные</Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to={'/favorites'}><StarOutlined/>Избранное</Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link to={'/favorites'}>История заказов</Link>
            ),
        },
        // {
        //     key: '4',
        //     label: (
        //         <Link to={'/favorites'}>История заказов</Link>
        //     ),
        // },
        {
            key: '5',
            label: (
                <p>Выход</p>
            ),
            onClick:logOutAccount,
        },

    ];


    return (
        <>
            <Dropdown menu={{items}}>
                {children}
            </Dropdown>
        </>
    )
}

export default DropDownAccount