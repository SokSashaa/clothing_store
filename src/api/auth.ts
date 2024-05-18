import axios from "../utils/axios";
import {LoginFormDto, RegisterFormDTO, TokenResponseDTO} from "./dto/auth.dto";

export const login = async (values: LoginFormDto): Promise<TokenResponseDTO> => {
    return (await axios.post('/auth/login', values)).data
}

export const register = async (values: RegisterFormDTO): Promise<TokenResponseDTO> => {
    return (await axios.post('/auth/register', values)).data
}