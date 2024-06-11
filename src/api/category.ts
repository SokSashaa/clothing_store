import axios from "../utils/axios";
// import axios from "axios";
import {categoryDto} from "./dto/category.dto";


export const getAllCategory = async (): Promise<categoryDto[]> => {
    return (await axios.get('/category')).data
}

type dataCreateCategory = {
    category_name: string,
    category_img_name: {
        file: {
            originFileObj: File,
        }

    }
}


export const createCategory = async (data: dataCreateCategory) => {

    const formData = new FormData();
    formData.append("category_img_name", data.category_img_name.file.originFileObj);
    formData.append('category_name', data.category_name);

    const config = {
        headers: {"Content-Type": "multipart/form-data"},
    };

    return (await axios.post("/category", formData, config)).data;

}


export const getSrcOnImgCategory = 'http://localhost:3001/uploads/categories/'