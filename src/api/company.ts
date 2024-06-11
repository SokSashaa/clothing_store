import {companyDto} from "./dto/company.dto";
import axios from "../utils/axios";

export const createCompany = async (data: companyDto) => {
    return (await axios.post('/company', data)).data
}