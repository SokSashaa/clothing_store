import {Roles} from "./auth.dto";

export type userDTO = {
    id: string,
    email: string,
    firstname: string,
    lastname: string,
    // password:string,
    date_reg: Date,
    date_birthday: Date
    role: Roles
}

export const initialUserDto: userDTO = {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    date_reg: new Date(),
    date_birthday: new Date(),
    role: Roles.default,
}
export const initialArrayUserDto: userDTO[] = [{
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    date_reg: new Date(),
    date_birthday: new Date(),
    role: Roles.default,
}]