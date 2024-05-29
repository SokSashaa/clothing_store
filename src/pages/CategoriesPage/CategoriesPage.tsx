import {FC, useState} from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import BlockCategories from "../../components/Category/BlockCategories/BlockCategories";
import {Outlet} from "react-router-dom";
import React from "react";


const CategoriesPage:FC = ()=>{


    return (
        <Wrapper>
            <BlockCategories isPopularCategories={false}/>
        </Wrapper>
    )
}
export default CategoriesPage