import React, {FC, useState} from "react";
import {ModalDanger} from "../../ui-kit/ModalDanger/ModalDanger";
import * as Api from "../../api";
import {notification} from "antd";
import {companyDto} from "../../api/dto/company.dto";
import css from './ItemCompany.module.scss'
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import ModalUpdateCompany from "../ModalUpdateCompany/ModalUpdateCompany";

type ItemCompanyProps = {
    company: companyDto,
}

const ItemCompany: FC<ItemCompanyProps> = ({company}) => {

    const [openModalUpdate, setOpenModalUpdate] = useState(false)

    const deleteCompany = () => {
        Api.company.deleteCompany(company).then(() => {
            notification.success({
                message: 'Успешно!'
            })
        }).catch((error) => {
            notification.error({
                message: 'Ошибка!',
                description: error.response.data.message,
                duration: 2
            })
        })
    }

    const showModalDelete = ModalDanger('Удалить компанию?',
        `Вы уверены, что хотите удалить компанию ${company.name}?`,
        deleteCompany)

    return (
        <div className={css.root}>
            <div>
                <p>{company.name}</p>
                <p className={css.firstname}>ИНН <span>{company.inn}</span>, ОГРН <span>{company.ogrn}</span></p>
            </div>
            <div className={css.icons}>
                <EditOutlined onClick={() => {
                    setOpenModalUpdate(true);
                }}/>
                <DeleteOutlined onClick={showModalDelete}/>
            </div>
            <ModalUpdateCompany company={company} isOpenModal={openModalUpdate} setOpen={setOpenModalUpdate}/>
        </div>
    )
}
export default ItemCompany