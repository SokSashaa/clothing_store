import React, {FC} from "react";
import {ProductWithCategoryDTO} from "../../../api/dto/product.dto";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ModalDanger} from "../../../ui-kit/ModalDanger/ModalDanger";
import * as Api from '../../../api'
import {notification} from "antd";

type DeleteOutlinedCustomProps = {
    product: ProductWithCategoryDTO
}

const DeleteOutlinedCustom: FC<DeleteOutlinedCustomProps> = ({product}) => {
    const deleteProduct = () => {
        Api.products.deleteProduct(product)
            .then(() => {
                notification.success({
                    message: 'Успешно!',
                    duration: 2
                })
            }).catch((error) => {
            notification.error({
                message: 'Ошибка!',
                description: error.response.data.message,
                duration: 2
            })
        })
    }

    const showModelDelete = ModalDanger('Удалить продукт?',
        `Вы уверены, что хотите удалить продукт ${product.product_name}?`,
        deleteProduct)


    return (
        <DeleteOutlined onClick={showModelDelete}/>
    )
}
export default DeleteOutlinedCustom
