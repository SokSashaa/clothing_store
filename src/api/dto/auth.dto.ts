export type LoginFormDto = {
    email: string,
    password: string
}

export type TokenResponseDTO = {
    user:RegisterFormDTO,
    token: string
}

export type RegisterFormDTO = LoginFormDto & {
    email:string,
    firstname:string,
    lastname:string,
    password:string,
    date_reg:Date,
    date_birthday:Date,
    role:Roles
}
export type RegisterFormDTOInForm = LoginFormDto & {
    email:string,
    firstname:string,
    lastname:string,
    password:string,
    pass:string,
    date_reg:Date,
    date_birthday:Date,
    agreement:boolean
}

export enum Roles {
    default,
    producer,
    admin
}

export type RegisterResponseDTO = RegisterFormDTO
