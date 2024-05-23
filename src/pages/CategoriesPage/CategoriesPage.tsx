import {FC, useState} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import BlockCategories from "../../components/BlockCategories/BlockCategories";
import {Outlet} from "react-router-dom";


const CategoriesPage:FC = ()=>{


    return (
        <Wrapper>
            <BlockCategories isPopularCategories={false}/>
        </Wrapper>
    )
}
export default CategoriesPage