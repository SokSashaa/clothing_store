import React, {FC, useState} from "react";
import {getSrcOnImgCategory} from "../../../../api/category";
import css from './ItemEditCategory.module.scss'
import {categoryDto} from "../../../../api/dto/category.dto";
import {Button, notification} from "antd";
import ModalUpdateCategory from "../../../ModalUpdateCategory/ModalUpdateCategory";
import {ModalDanger} from "../../../../ui-kit/ModalDanger/ModalDanger";
import * as Api from "../../../../api";

type ItemEditCategoryProps = {
    category: categoryDto
}
const ItemEditCategory: FC<ItemEditCategoryProps> = ({category}) => {
    const [openModal, setOpenModal] = useState(false);

    const deleteCategory = () => {
        Api.category.deleteCategory(category).then(() => {
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

    const showModalDelete = ModalDanger('Удалить категорию?',
        `Вы уверены, что хотите удалить категорию ${category.category_name}?`,
        deleteCategory)

    return (
        <div className={css.wrapperItemCategory}>
            <h3>{category.category_name}</h3>
            <img src={`${getSrcOnImgCategory}${category.category_img_name}`} alt={category.category_name}/>
            <div className={css.buttons}>
                <Button type={"primary"} onClick={() => setOpenModal(true)}>Изменить</Button>
                <Button danger onClick={showModalDelete}>Удалить</Button>
            </div>
            <ModalUpdateCategory category={category} isOpenModal={openModal} setOpen={setOpenModal}/>
        </div>

    )
}
export default ItemEditCategory