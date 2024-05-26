import {LoginFormDto, TokenResponseDTO} from "./dto/auth.dto";
import axios from "../utils/axios";

export const getAllUsers = async (): Promise<any> => {
    return (await axios.get('/user/getAllUsers')).data
}