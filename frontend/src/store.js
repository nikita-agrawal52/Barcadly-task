



import { configureStore } from '@reduxjs/toolkit';

import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems")) : [],
    }
};

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        user: userReducer,
        cart: cartReducer
    },
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;



// 
