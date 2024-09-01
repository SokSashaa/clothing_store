import axios from '../utils/axios';
import {orderDto, orderDtoOmitID} from './dto/orders.dto';

export const getReceiveOrdersByUser = async (): Promise<orderDto[]> => {
	return (await axios.get('/orders/receive')).data;
};

export const createOrder = async (data: orderDtoOmitID) => {
	return (await axios.post('/orders', data)).data;
};

export const getOrderByID = async (id: string): Promise<orderDto> => {
	return (await axios.get(`/orders/${id}`)).data;
};

export const getOrderByUserID = async (id_user: string): Promise<orderDto[]> => {
	return (await axios.get(`/orders/user/${id_user}`)).data;
};

export const getOrdersByUser = async (): Promise<orderDto[]> => {
	return (await axios.get('/orders')).data;
};

export const orderUpdate = async (data: orderDto) => {
	return (await axios.put('/orders', data)).data;
};

export const removeOrder = async (id_order: string) => {
	return await axios.delete(`/orders/${id_order}`);
};
