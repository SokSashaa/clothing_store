import {ProductDTO} from './product.dto';
import {userDTO} from './user.dto';

export type orderDto = {
	id_order: string;
	products: ProductDTO[];
	status: statusOrderEnum;
	sum_order: number;
	client: userDTO;
	date: Date;
};

export enum statusOrderEnum {
	waiting,
	adopted,
	sent,
	receive,
	cancel,
}

export const statusOrderWithNamesAndColors: {name: string; status: statusOrderEnum; color: string}[] = [
	{name: 'Ожидание', status: statusOrderEnum.waiting, color: 'default'},
	{name: 'Принят', status: statusOrderEnum.adopted, color: 'default'},
	{name: 'Отправлен', status: statusOrderEnum.sent, color: 'processing'},
	{name: 'Получен', status: statusOrderEnum.receive, color: 'success'},
	{name: 'Отменен', status: statusOrderEnum.cancel, color: 'error'},
];

export type orderDtoOmitID = Omit<orderDto, 'id_order'>;
