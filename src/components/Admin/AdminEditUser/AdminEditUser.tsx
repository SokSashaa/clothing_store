import React, {FC, useEffect, useState} from "react";
import useDebounce from "../../../hooks/useDebounce";
import css from './AdminEditUser.module.scss'
import * as Api from '../../../api'
import {userDTO} from "../../../api/dto/user.dto";
import {Spin} from "antd";
import ItemUser from "../../ItemUser/ItemUser";


const AdminEditUser: FC = () => {

    const [loading, setLoading] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [users, setUsers] = useState<userDTO[]>([])
    const valueInputDebounce = useDebounce<string>(valueInput)

    useEffect(() => {
        if (valueInputDebounce !== '') Api.userApi.findUserByEmail(valueInputDebounce)
            .then((value) => setUsers(value))
            .finally(() => setLoading(false));
        else {
            setUsers([]);
            setLoading(false);
        }

    }, [valueInputDebounce]);
    return (
        <div className={css.root}>
            <p>Введите почту пользователя</p>
            <input placeholder={'Введите почту пользователя'} onChange={(e) => {
                setValueInput(e.target.value);
                setLoading(true);
            }}/>
            {loading ? <Spin size={'large'}/> : <div className={css.arrayItems}>
                {users.map((item) => <ItemUser key={item.id} user={item}/>)}
            </div>}

        </div>
    )
}
export default AdminEditUser