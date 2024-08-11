import {companyDto, companyUpdateDTO, getAllCompaniesNameType} from './dto/company.dto';
import axios from '../utils/axios';

export const createCompany = async (data: companyDto) => {
	return (await axios.post('/company', data)).data;
};

export const findCompanyByINN = async (inn: string): Promise<companyDto[]> => {
	return (await axios.get(`/company/${inn}`)).data;
};

export const deleteCompany = async (data: companyDto) => {
	return (await axios.delete('/company', {data: data})).data;
};

export const updateCompany = async (data: companyUpdateDTO) => {
	return (await axios.put('/company', data)).data;
};

export const getAllCompaniesName = async (): Promise<getAllCompaniesNameType[]> => {
	return (await axios.get('/company/all')).data;
};
