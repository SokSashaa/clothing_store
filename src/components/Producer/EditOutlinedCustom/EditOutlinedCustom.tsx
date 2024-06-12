import React, {FC, useState} from "react";
import {ProductWithCategoryDTO} from "../../../api/dto/product.dto";
import {EditOutlined} from "@ant-design/icons";
import ModalUpdateProduct from "../../ModalUpdateProduct/ModalUpdateProduct";

type EditOutlinedCustomProps = {
    product: ProductWithCategoryDTO
}
const EditOutlinedCustom: FC<EditOutlinedCustomProps> = ({product}) => {
    const [openModalUpdate, setOpenModalUpdate] = useState(false)

    return (
        <>
            <EditOutlined onClick={() => setOpenModalUpdate(true)}/>
            <ModalUpdateProduct product={product} isOpenModal={openModalUpdate} setOpen={setOpenModalUpdate}/>
        </>
    )
}
export default EditOutlinedCustom
