import React, {FC, useState} from "react";
import {userDTO} from "../../api/dto/user.dto";
import css from './ItemUser.module.scss'
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import * as Api from '../../api'
import {notification} from "antd";
import ModalUpdateUser from "../ModalUpdateUser/ModalUpdateUser";
import {ModalDanger} from "../../ui-kit/ModalDanger/ModalDanger";

type ItemUserProps = {
    user: userDTO
}

const ItemUser: FC<ItemUserProps> = ({user}) => {
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const deleteUser = () => {
        Api.userApi.deleteUser(user.id).catch(() => {
            notification.error({
                message: 'Ошибка!',
                description: 'Ошибка при удалении',
                duration: 2
            })
        })
    }

    const showModelDelete = ModalDanger('Удалить пользователя?',
        `Вы уверены, что хотите удалить пользователя ${user.email}?`,
        deleteUser)


    return (
        <div className={css.root}>
            <div>
                <p>{user.email}</p>
                <p className={css.firstname}>{user.firstname} {user.lastname}</p>
            </div>

            <div className={css.icons}>
                <EditOutlined onClick={() => {
                    setOpenModalUpdate(true);
                }}/>
                <DeleteOutlined onClick={showModelDelete}/>
            </div>
            <ModalUpdateUser user={user} isOpenModal={openModalUpdate} setOpen={setOpenModalUpdate}/>
        </div>
    )
}

export default ItemUser