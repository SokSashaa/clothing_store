import {FC} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import BlockItemsProductInCategory
    from "../../components/Category/BlockItemsProductsInCategory/BlockItemsProductInCategory";
import React from "react";

const SearchPage:FC = ()=>{
    return (
        <Wrapper>
            <BlockItemsProductInCategory/>
        </Wrapper>
    )
}
export default SearchPage