import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductDTO} from '../../api/dto/product.dto';

export type itemCart = {
	item: ProductDTO;
	count: number;
};

const initialStateCartSlice: itemCart[] = [];
export const cartSlice = createSlice({
	name: 'cart',
	initialState: initialStateCartSlice,
	reducers: {
		addProductInCart(state, action: PayloadAction<itemCart>) {
			state.push(action.payload);
		},
		removeProductFromCart(state, action: PayloadAction<string>) {
			return state.filter((item) => item.item.product_id !== action.payload);
		},
		clearProductsFromCart(state) {
			state.splice(0, state.length);
		},
		minusCountProduct(state, action: PayloadAction<string>) {
			const index = state.findIndex((item) => item.item.product_id === action.payload);
			state[index].count === 1 ? state.splice(index, 1) : state[index].count--;
		},
		plusCountProduct(state, action: PayloadAction<string>) {
			const index = state.findIndex((item) => item.item.product_id === action.payload);
			state[index].count++;
		},
	},
});

export const {addProductInCart, removeProductFromCart, clearProductsFromCart, minusCountProduct, plusCountProduct} =
	cartSlice.actions;
export default cartSlice.reducer;
