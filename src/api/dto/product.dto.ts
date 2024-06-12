export type ProductDTO = {
    product_id: string,
    article: string,
    product_name: string,
    product_description: string,
    product_image: string,
    product_price:number,
    product_discount:number
    category: string,
    company_id: string
}

export type ProductWithCategoryDTO = {
    product_id: string,
    article: string,
    product_name: string,
    product_description: string,
    product_image: string,
    product_price:number,
    product_discount:number
    category: {
        category_id:string,
        category_name:string,
        category_img_name:string,
    },
    company_id: string
}

export const initialProductDTOArray: ProductDTO[] = [{
    article: "",
    product_description: "",
    product_id: "",
    product_image: "",
    product_name: "",
    product_discount:0,
    product_price:0,
    category:"",
    company_id:""
},]



export const initialProductDTO: ProductDTO = {
    article: "",
    product_description: "",
    product_id: "",
    product_image: "",
    product_name: "",
    product_discount:0,
    product_price:0,
    category:"",
    company_id:""
}
