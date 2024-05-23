import axios from "../utils/axios";
import {ProductDTO} from "./dto/product.dto";

export const getAllProductsByIDCategory = async (category_id: string) => {
    return (await axios.get(`/product/category/${category_id}`)).data
}

export const getSrcOnImgProduct = 'http://localhost:3001/uploads/products/'