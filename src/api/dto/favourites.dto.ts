import {ProductDTO} from './product.dto';
import {userDTO} from './user.dto';

export type favourites = {
	favourite_id: string;
	product: ProductDTO;
	user: userDTO;
};