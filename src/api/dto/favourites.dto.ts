import {ProductDTO} from './product.dto';
import {userDTO} from './user.dto';

export type favouritesDTO = {
	favourite_id: string;
	product: ProductDTO;
	user: userDTO;
};

export type favouritesDTOOmitUser = Omit<favouritesDTO, 'user'>;
