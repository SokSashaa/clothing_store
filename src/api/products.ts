import axios from "../utils/axios";
import {ProductDTO} from "./dto/product.dto";

export const getAllProductsByIDCategory = async (category_id: string):Promise<ProductDTO[]> => {
    return (await axios.get(`/product/category/${category_id}`)).data
}

export const getProductById = async (product_id: string):Promise<ProductDTO> => {
    return (await axios.get(`/product/${product_id}`)).data
}

export const findTenProductByPartName = async (partName:string):Promise<ProductDTO[]> =>{
    return (await axios.get(`/product/search/${partName}`)).data
}

export const findAllProductByPartName = async (partName:string):Promise<ProductDTO[]> =>{
    return (await axios.get(`/product/searchAll/${partName}`)).data
}

export const getSrcOnImgProduct = 'http://localhost:3001/uploads/products/'