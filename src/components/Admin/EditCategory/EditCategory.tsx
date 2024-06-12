import React, {FC, useEffect, useState} from "react";
import css from './EditCategory.module.scss'
import {Button, Input, Modal} from "antd";
import {useModalState} from "../../../hooks/useModalState";
import CreateCategoryForm from "../../CreateCategoryForm/CreateCategoryForm";
import * as Api from '../../../api'
import {categoryDto, initCategory} from "../../../api/dto/category.dto";
import ItemEditCategory from "./ItemEditCategory/ItemEditCategory";
import SearchCategory from "./SearchCategory/SearchCategory";
const EditCategory:FC = ()=>{
    const [isModalOpen, openModal, closeModal] = useModalState(false);
    // const [categories,setCategories] = useState<categoryDto[]>(initCategory)
    // useEffect(() => {
    //     Api.category.getAllCategory().then((value)=>setCategories(value))
    // }, []);
    return (
        <div className={css.root}>
            <Button type={"primary"} className={css.buttonAdd} onClick={openModal}>Создать</Button>
            <Modal
                open={isModalOpen}
                title="Создание категории"
                onCancel={closeModal}
                destroyOnClose
                footer={null}
            >
                <CreateCategoryForm closeModal={closeModal}/>
            </Modal>
            <SearchCategory/>
            {/*<div className={css.items}>*/}
            {/*    {categories.map(item=> <ItemEditCategory category={item}/>)}*/}
            {/*</div>*/}
        </div>
    )
}
export default EditCategory