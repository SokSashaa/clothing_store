import axios from '../utils/axios';
import {userDTO} from './dto/user.dto';

export const getAllUsers = async (): Promise<any> => {
	return (await axios.get('/user/getAllUsers')).data;
};

export const findUserByEmail = async (email: string): Promise<userDTO[]> => {
	return (await axios.get(`/user/getUserEmail/${email}`)).data;
};

export const deleteUser = async (user: string) => {
	return (await axios.delete(`/user/remove/${user}`, {data: user})).data;
};

export const updateUser = async (user: userDTO) => {
	return (await axios.put('/user/update', user)).data;
};

export const changePasswordUser = async (password: {password: string}) => {
	return (await axios.put('/user/changePassword', password)).data;
};
