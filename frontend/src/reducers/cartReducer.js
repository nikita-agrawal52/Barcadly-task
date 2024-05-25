
import { createReducer } from "@reduxjs/toolkit";
import { ADD_TO_CART, REMOVE_CART_ITEM } from '../constants/cartConstants';
const initialState = {
    cartItems: []
};

export const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ADD_TO_CART, (state, action) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            };
        })
        .addCase(REMOVE_CART_ITEM, (state, action) => {
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),

            }
        })
        .addDefaultCase((state, action) => {
            return state;
        });
});