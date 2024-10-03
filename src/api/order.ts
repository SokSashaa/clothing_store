import axios from '../utils/axios';
import {orderDto, orderDtoForReq, orderDtoOmitID, updateOrderDto} from './dto/orders.dto';

export const queryKeyGetReceiveOrdersByUser = '/orders/receive';
export const getReceiveOrdersByUser = async (): Promise<orderDto[]> => {
	return (await axios.get(queryKeyGetReceiveOrdersByUser)).data;
};

export const createOrder = async (data: orderDtoForReq) => {
	return (await axios.post('/orders', data)).data;
};

export const queryKeyGetOrderByID = (id: string) => `/orders/${id}`;
export const getOrderByID = async (id: string): Promise<orderDto> => {
	return (await axios.get(queryKeyGetOrderByID(id))).data;
};

export const queryKeyGetOrderByUserID = (id: string) => `/orders/user/${id}`;
export const getOrderByUserID = async (id_user: string): Promise<orderDto[]> => {
	return (await axios.get(queryKeyGetOrderByUserID(id_user))).data;
};

export const queryKeyGetOrderByUser = '/orders';
export const getOrdersByUser = async (): Promise<orderDto[]> => {
	return (await axios.get(queryKeyGetOrderByUser)).data;
};

export const orderUpdate = async (data: updateOrderDto) => {
	return (await axios.put('/orders', data)).data;
};

export const removeOrder = async (id_order: string) => {
	return await axios.delete(`/orders/${id_order}`);
};

export const queryKeyGetOrdersMyCompany = '/orders/company';
export const getOrdersMyCompany = async (): Promise<orderDto[]> => {
	return (await axios.get('/orders/company')).data;
};
