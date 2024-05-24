import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductDTO} from "../../api/dto/product.dto";

const initialStateCartSlice: ProductDTO[] = []
export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialStateCartSlice,
    reducers: {
        addProductInCart(state, action: PayloadAction<ProductDTO>) {
            state.push(action.payload)
        },
        removeProductFromCart(state, action: PayloadAction<string>) {
            return state.filter((item) => item.product_id !== action.payload)
        }
    }
})

export const {addProductInCart, removeProductFromCart} = cartSlice.actions
export default cartSlice.reducer