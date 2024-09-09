import {ProductDTO} from './product.dto';

export type Order_itemDto = {
	id_order_item: number;
	id_order: number;
	product_count: number;
	product_price: number;
	product_discount: number;
	product: ProductDTO;
};
