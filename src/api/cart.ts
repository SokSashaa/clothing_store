import {cartDto} from './dto/cart.dto';
import axios from '../utils/axios';

export const createProductInCart = async (data: cartDto): Promise<cartDto> => {
	return (await axios.post('/cart', data)).data;
};

export const updateProductInCart = async (data: cartDto) => {
	return (await axios.put('/cart', data)).data;
};

export const deleteProductInCart = async (data: cartDto) => {
	return (await axios.delete('/cart', {data: data})).data;
};

export const getUserCart = async (): Promise<cartDto[]> => {
	return (await axios.get('/cart/user')).data;
};
