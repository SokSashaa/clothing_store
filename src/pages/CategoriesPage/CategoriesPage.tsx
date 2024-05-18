import {FC, useState} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import BlockCategories from "../../components/BlockCategories/BlockCategories";


const CategoriesPage:FC = ()=>{


    return (
        <Wrapper>
            <BlockCategories isPopularCategories={false}/>
        </Wrapper>
    )
}
export default CategoriesPage