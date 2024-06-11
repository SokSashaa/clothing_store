import React, {FC, useState} from "react";
import {Button} from "antd";
import css from './EditCompany.module.scss'
import ModalCreateCompany from "../../ModalCreateCompany/ModalCreateCompany";

const EditCompany: FC = () => {
    const [openModalCreate,setOpenModalCreate] = useState(false)
    return (
        <div className={css.root}>
            <Button type={"primary"} className={css.buttonAdd} onClick={()=>setOpenModalCreate(true)}>Создать</Button>
            <ModalCreateCompany isOpenModal={openModalCreate} setOpen={setOpenModalCreate}/>
        </div>
    )
}
export default EditCompany