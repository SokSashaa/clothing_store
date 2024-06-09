import axios from "../utils/axios";
// import axios from "axios";
import {categoryDto} from "./dto/category.dto";

export const getAllCategory = async ():Promise<categoryDto[]> => {
    return (await axios.get('/category')).data
}

export const getSrcOnImgCategory = 'http://localhost:3001/uploads/categories/'