import {ProductDTO} from './product.dto';
import {userDTO} from './user.dto';

export type orderDto = {
	id_order: string;
	products: ProductDTO;
	status: statusOrderEnum;
	sum_order: number;
	client: userDTO;
};

export enum statusOrderEnum {
	waiting,
	adopted,
	sent,
	receive,
	cancel,
}

export type orderDtoOmitID = Omit<orderDto, 'id_order'>;
