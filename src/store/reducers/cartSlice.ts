import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cartDto} from '../../api/dto/cart.dto';

const initialStateCartSlice: cartDto[] = [];
export const cartSlice = createSlice({
	name: 'cart',
	initialState: initialStateCartSlice,
	reducers: {
		addArrayProductsInCart(state, action: PayloadAction<cartDto[]>) {
			state.push(...action.payload);
		},
		addProductInCart(state, action: PayloadAction<cartDto>) {
			state.push(action.payload);
		},
		removeProductFromCart(state, action: PayloadAction<string>) {
			return state.filter((item) => item.id_product.product_id !== action.payload);
		},
		clearProductsFromCart(state) {
			state.splice(0, state.length);
		},
		minusCountProduct(state, action: PayloadAction<string>) {
			const index = state.findIndex((item) => item.id_product.product_id === action.payload);
			state[index].count_product === 1 ? state.splice(index, 1) : state[index].count_product--;
		},
		plusCountProduct(state, action: PayloadAction<string>) {
			const index = state.findIndex((item) => item.id_product.product_id === action.payload);
			state[index].count_product++;
		},
	},
});

export const {
	addProductInCart,
	removeProductFromCart,
	clearProductsFromCart,
	minusCountProduct,
	plusCountProduct,
	addArrayProductsInCart,
} = cartSlice.actions;
export default cartSlice.reducer;
