import confirm from "antd/es/modal/confirm";
import {ExclamationCircleFilled} from "@ant-design/icons";
import React from "react";

export const ModalDanger = (title: string, content: string, funcOK:Function) => {
    return ()=>confirm({
        title: title,
        icon: <ExclamationCircleFilled/>,
        content: content,
        cancelText: 'Нет',
        okText: 'Да',
        okType: 'danger',
        okCancel: true,
        onOk() {
            funcOK()
        },
    })
}

//title: 'Удалить пользователя?',
// content: `Вы уверены, что хотите удалить пользователя ${user.email}?`,