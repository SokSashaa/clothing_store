import React, {FC} from "react";
import type {MenuProps} from 'antd';
import {Dropdown} from 'antd'
import {Link, useNavigate} from "react-router-dom";
import {StarOutlined} from '@ant-design/icons'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Cookies} from "react-cookie";
import {deleteUser} from "../../store/reducers/userSlice";
import {Roles} from "../../api/dto/auth.dto";

type DropDownAccountProps = {
    children: React.ReactNode
}
const cookies = new Cookies()

const DropDownAccount: FC<DropDownAccountProps> = ({children}) => {
    const dispatch = useAppDispatch()
    const userRedux = useAppSelector(state => state.user)
    const navigate = useNavigate()
    const logOutAccount = () => {
        cookies.remove('_token')
        dispatch(deleteUser())
        navigate(0)
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
        userRedux?.role === Roles.admin ? {
            key: '4',
            label: (
                <Link to={'/admin'}>Админка</Link>
            ),
        } : null,
        userRedux?.role === Roles.producer ? {
            key: '5',
            label: (
                <Link to={'/myCompany'}>Моя компания</Link>
            )
        } : null,
        {
            key: '6',
            label: (
                <p>Выход</p>
            ),
            onClick: logOutAccount,
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