import axios from 'axios';
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import {loginReducer} from "../features/login/login-slice.ts";



export const store = configureStore({
	reducer: {
		login: loginReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddlware) => getDefaultMiddlware({
		thunk: {
			extraArgument: {
				client: axios,
			},
		},
		serializableCheck: false,
	})
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()