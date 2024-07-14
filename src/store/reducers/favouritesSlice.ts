import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductDTO} from '../../api/dto/product.dto';
import {favouritesDTOOmitUser} from '../../api/dto/favourites.dto';

const initialStateFavouriteSlice: favouritesDTOOmitUser[] = [];

export const favouritesSlice = createSlice({
	name: 'favourite',
	initialState: initialStateFavouriteSlice,
	reducers: {
		addFavouriteInState(state, action: PayloadAction<favouritesDTOOmitUser>) {
			state.push(action.payload);
		},
		deleteFavouriteFromState(state, action: PayloadAction<favouritesDTOOmitUser>) {
			return state.filter((item) => item.favourite_id !== action.payload.favourite_id);
		},
		deleteFavouriteProductFromState(state, action: PayloadAction<ProductDTO>) {
			return state.filter((item) => item.product.product_id !== action.payload.product_id);
		},
		clearFavourites(state) {
			state.splice(0, state.length);
		},
		saveFavouriteArray(state, action: PayloadAction<favouritesDTOOmitUser[]>) {
			state.push(...action.payload);
		},
		addProductInState(state, action: PayloadAction<ProductDTO>) {
			state.push({favourite_id: '', product: action.payload});
		},
	},
});

export const {
	addFavouriteInState,
	deleteFavouriteFromState,
	clearFavourites,
	deleteFavouriteProductFromState,
	saveFavouriteArray,
	addProductInState,
} = favouritesSlice.actions;
export default favouritesSlice.reducer;
