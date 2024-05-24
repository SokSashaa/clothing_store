import axios from "../utils/axios";
import {Params} from "react-router-dom";

export const getAllProductsByIDCategory = async (category_id: string) => {
    return (await axios.get(`/product/category/${category_id}`)).data
}

export const getProductById = async (product_id: string) =>
{
    return (await axios.get(`/product/${product_id}`)).data
}

export const getSrcOnImgProduct = 'http://localhost:3001/uploads/products/'