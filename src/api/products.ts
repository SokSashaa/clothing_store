import axios from "../utils/axios";
import {ProductDTO, ProductWithCategoryDTO} from "./dto/product.dto";
import {categoryDto} from "./dto/category.dto";
import {userDTO} from "./dto/user.dto";

type dataCreateProduct = {
    article: string,
    category_id: string,
    product_description: string
    product_discount: number,
    product_name: string,
    product_price: number
    product_image: {
        fileList: itemFileList[],
    }
}
type itemFileList = {
    name: string,
    originFileObj: File
}
export const getAllProductsByIDCategory = async (category_id: string): Promise<ProductDTO[]> => {
    return (await axios.get(`/product/category/${category_id}`)).data
}

export const getProductById = async (product_id: string): Promise<ProductDTO> => {
    return (await axios.get(`/product/${product_id}`)).data
}

export const findTenProductByPartName = async (partName: string): Promise<ProductDTO[]> => {
    return (await axios.get(`/product/search/${partName}`)).data
}

export const findAllProductByPartName = async (partName: string): Promise<ProductDTO[]> => {
    return (await axios.get(`/product/searchAll/${partName}`)).data
}

export const findProductsByCompany = async (id: string): Promise<ProductWithCategoryDTO[]> => {
    return (await axios.get(`/product/search/company/${id}`)).data
}

export const deleteProduct = async (data: ProductWithCategoryDTO) => {
    return (await axios.delete('/product/delete', {data: data})).data
}

export const updateProduct = async (data: categoryDto) => {
    return (await axios.put('/product/update', data)).data
}

export const createProduct = async (data: dataCreateProduct, user: userDTO) => {
    const company = (await axios.get(`/company/user/${user.id}`)).data


    const formData = new FormData();
    if (data.product_image.fileList.length > 0) {
        data.product_image.fileList.forEach((item, index) =>
            formData.append("product_image", data.product_image?.fileList[index].originFileObj)
        )
    }
    formData.append('article', data.article);
    formData.append('product_id', '');
    formData.append('category_id', data.category_id);
    formData.append('product_discount', data.product_discount.toString());
    formData.append('product_description', data.product_description);
    formData.append('product_name', data.product_name);
    formData.append('product_price', data.product_price.toString());
    formData.append("company_id",company.id)

    const config = {
        headers: {"Content-Type": "multipart/form-data"},
    };

    return (await axios.post("/product/create", formData, config)).data;

}

export const getSrcOnImgProduct = 'http://localhost:3001/uploads/products/'