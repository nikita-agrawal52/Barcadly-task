
import { createReducer } from "@reduxjs/toolkit"
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST
} from '../constants/productConstants';
const initialState = {
    product: {},
};
export const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ALL_PRODUCT_REQUEST, (state, action) => {
            return {
                loading: true,
                products: []
            };


        })
        .addCase(ALL_PRODUCT_SUCCESS, (state, action) => {
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            };


        })
        .addCase(ALL_PRODUCT_FAIL, (state, action) => {
            return {
                loading: false,
                error: action.payload,
            };


        })
        .addCase(CLEAR_ERRORS, (state, action) => {
            return {
                ...state,
                error: null,
            };


        })
        .addDefaultCase((state, action) => {
            return state;
        })

});
export const productDetailsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(PRODUCT_DETAILS_REQUEST, (state, action) => {
            return {
                loading: true,
                ...state
            };


        })
        .addCase(PRODUCT_DETAILS_SUCCESS, (state, action) => {
            return {
                loading: false,
                product: action.payload,

            };


        })
        .addCase(PRODUCT_DETAILS_FAIL, (state, action) => {
            return {
                loading: false,
                error: action.payload,
            };


        })
        .addCase(CLEAR_ERRORS, (state, action) => {
            return {
                ...state,
                error: null,
            };


        })
        .addDefaultCase((state, action) => {
            return state;
        })

});