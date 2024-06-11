export type companyDto = {
    id?:string,
    name:string,
    inn:string,
    ogrn:string,
    address:string,
    user_id:{
        id:string,
        email:string
    }
}

export type companyUpdateDTO = {
    id?:string,
    name:string,
    inn:string,
    ogrn:string,
    address:string,
    user_id:string
}