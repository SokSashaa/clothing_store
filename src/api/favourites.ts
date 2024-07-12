import axios from '../utils/axios';
import {ProductDTO} from './dto/product.dto';
import {favouritesDTOOmitUser} from './dto/favourites.dto';

export const createFavourite = async (product: ProductDTO): Promise<favouritesDTOOmitUser> => {
	return (await axios.post('/favourites', {product: product})).data;
};

export const deleteFavourite = async (product: ProductDTO) => {
	return (await axios.delete('/favourites', {data: {product: product}})).data;
};

export const getAllFavouritesByID = async (): Promise<favouritesDTOOmitUser[]> => {
	return (await axios.get('/favourites')).data;
};
