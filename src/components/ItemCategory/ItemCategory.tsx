import {FC} from "react";
import './ItemCategory.scss'
import {getSrcOnImg} from "../../api/category";

type ItemCategoryProps = {
    category_name:string,
    category_img_name:string,
}
const ItemCategory: FC<ItemCategoryProps> = ({category_name,category_img_name}) => {
    return (
        <div className={'wrapperItemCategory'}>
            <h3>{category_name}</h3>
            <img src={`${getSrcOnImg}${category_img_name}`} alt={category_name}/>
        </div>
    )
}
export default ItemCategory