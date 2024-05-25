
import { createReducer } from "@reduxjs/toolkit";
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS
} from '../constants/userConstants';
const initialState = {
    user: {},
    loading: false,
    isAuthenticated: false,

    error: null,
};
export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(LOGIN_REQUEST, (state, action) => {
            return {
                loading: true,
                isAuthenticated: false,
            };
        })
        .addCase(REGISTER_USER_REQUEST, (state, action) => {
            return {
                loading: true,
                isAuthenticated: false,
            };
        })
        .addCase(LOAD_USER_REQUEST, (state, action) => {
            return {
                loading: true,
                isAuthenticated: false,
            };
        })
        .addCase(LOGIN_SUCCESS, (state, action) => {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,

            };
        })
        .addCase(REGISTER_USER_SUCCESS, (state, action) => {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,

            };
        })
        .addCase(LOAD_USER_SUCCESS, (state, action) => {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,

            };
        })
        .addCase(LOGIN_FAIL, (state, action) => {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        })
        .addCase(REGISTER_USER_FAIL, (state, action) => {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        })
        .addCase(LOAD_USER_FAIL, (state, action) => {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
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