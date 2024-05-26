import {FC} from "react";
import './ArrayFindItemsProducts.scss'
import {ProductDTO} from "../../api/dto/product.dto";
import FindItemProduct from "./FindItemProduct/FindItemProduct";

type arrayFindItemsProductsProps = {
    arrayProducts: ProductDTO[]
}

const ArrayFindItemsProducts: FC<arrayFindItemsProductsProps> = ({arrayProducts}) => {
    return (
        <ul className={'wrapper_find_list_products'}>
            {arrayProducts.map((item) => <FindItemProduct key={item.product_id} product={item}/>)}
        </ul>
    )
}
export default ArrayFindItemsProducts