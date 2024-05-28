import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "../../store";
import {Nullable} from "../../types";

export interface LoginSliceInitialState {
	isLoggedIn: boolean;
	email: Nullable<string>;
	password: Nullable<string>;
}

const initialState: LoginSliceInitialState = {
	isLoggedIn: false,
	email: null,
	password: null,
}

const loginSlice = createSlice({
	name: '@@login',
	initialState,
	reducers: {
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload
		},
		setEmail: (state, action) => {
			state.email = action.payload
		},
		setPassword: (state, action) => {
			state.password = action.payload
		}
	},
})

export const { setIsLoggedIn, setEmail, setPassword } = loginSlice.actions
export const loginReducer = loginSlice.reducer;

// selectors
export const selectIsLogin = (state: RootState) => state.login.isLoggedIn
export const selectEmail = (state: RootState) => state.login.email
export const selectPassword = (state: RootState) => state.login.password

