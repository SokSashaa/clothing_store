import {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import BlockItemsProductInCategory
    from "../../components/Category/BlockItemsProductsInCategory/BlockItemsProductInCategory";

const SearchPage:FC = ()=>{
    return (
        <Wrapper>
            <h1>Результаты поиска</h1>
            <BlockItemsProductInCategory/>
        </Wrapper>
    )
}
export default SearchPage