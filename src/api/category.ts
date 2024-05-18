import axios from "../utils/axios";
// import axios from "axios";
import {categoryDTO} from "./dto/categoryDTO";

export const getAllCategory = async ():Promise<categoryDTO[]> => {
    return (await axios.get('/category')).data
}

export const getSrcOnImg = 'http://localhost:3001/uploads/categories/'