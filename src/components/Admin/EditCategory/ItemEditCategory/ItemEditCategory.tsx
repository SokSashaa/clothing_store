import {FC} from "react";
import {getSrcOnImgCategory} from "../../../../api/category";
import {Link} from "react-router-dom";
import React from "react";
import css from './ItemEditCategory.module.scss'
import {categoryDto} from "../../../../api/dto/category.dto";
import {Button} from "antd";

type ItemEditCategoryProps = {
    category:categoryDto
}
const ItemEditCategory: FC<ItemEditCategoryProps> = ({category}) => {
    return (
        <Link to={`/categories/${category.category_id}`}>
            <div className={css.wrapperItemCategory}>
                <h3>{category.category_name}</h3>
                <img src={`${getSrcOnImgCategory}${category.category_img_name}`} alt={category.category_name}/>
                <Button type={"primary"}>Изменить</Button>
            </div>
        </Link>

    )
}
export default ItemEditCategory