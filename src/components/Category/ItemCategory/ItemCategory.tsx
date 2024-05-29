import {FC} from "react";
import './ItemCategory.scss'
import {getSrcOnImgCategory} from "../../../api/category";
import {Link} from "react-router-dom";
import React from "react";

type ItemCategoryProps = {
    category_name: string,
    category_img_name: string,
    id: string,
}
const ItemCategory: FC<ItemCategoryProps> = ({category_name, category_img_name, id}) => {
    return (
        <Link to={`/categories/${id}`}>
            <div className={'wrapperItemCategory'}>
                <h3>{category_name}</h3>
                <img src={`${getSrcOnImgCategory}${category_img_name}`} alt={category_name}/>
            </div>
        </Link>

    )
}
export default ItemCategory