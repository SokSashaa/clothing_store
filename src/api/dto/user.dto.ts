import {Roles} from "./auth.dto";

export type userDTO = {
    email:string,
    firstname:string,
    lastname:string,
    // password:string,
    date_reg:Date,
    date_birthday:Date
    role:Roles
}