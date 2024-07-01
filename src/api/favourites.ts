import axios from '../utils/axios';
import {ProductDTO} from './dto/product.dto';

export const createFavourite = async (product: ProductDTO) => {
	return (await axios.post('/favourites', product)).data;
};

export const deleteFavourite = async (product: ProductDTO) => {
	return (await axios.delete('/favourites', {data: product})).data;
};

export const getAllFavouritesByID = async () => {
	return (await axios.get('/favourites')).data;
};
