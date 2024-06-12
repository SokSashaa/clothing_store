import axios from "../utils/axios";
// import axios from "axios";
import {categoryDto} from "./dto/category.dto";


export const getAllCategory = async (): Promise<categoryDto[]> => {
    return (await axios.get('/category')).data
}

export const searchCategoryByPartName = async (name: string): Promise<categoryDto[]> => {
    return (await axios.get(`/category/search/${name}`)).data
}

export const deleteCategory = async (data: categoryDto) => {
    return (await axios.delete('/category', {data: data})).data
}

type dataCreateCategory = {
    category_name: string,
    category_img_name?: {
        file: {
            originFileObj: File,
        }

    }
}
type updateDataCreateCategory = {
    category_id: string,
    category_name: string,
    category_img_name?: {
        file: {
            originFileObj: File,
        }

    }
}

export const createCategory = async (data: dataCreateCategory) => {

    const formData = new FormData();
    if (data.category_img_name) {
        formData.append("category_img_name", data.category_img_name.file.originFileObj);
    }
    formData.append('category_name', data.category_name);

    const config = {
        headers: {"Content-Type": "multipart/form-data"},
    };

    return (await axios.post("/category", formData, config)).data;

}

export const updateCategory = async (data: updateDataCreateCategory) => {

    const formData = new FormData();
    if (data.category_img_name?.file.originFileObj) {
        console.log(data.category_img_name?.file.originFileObj)
        formData.append("category_img_name", data.category_img_name.file.originFileObj);
    }
    formData.append('category_name', data.category_name);
    formData.append('category_id', data.category_id);
    const config = {
        headers: {"Content-Type": "multipart/form-data"},
    };

    return (await axios.put("/category", formData, config)).data;

}


export const getSrcOnImgCategory = 'http://localhost:3001/uploads/categories/'