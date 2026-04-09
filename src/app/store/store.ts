import {configureStore} from "@reduxjs/toolkit";
import {discountApi} from "@entities/discount/discountApi.ts";
import {setupListeners} from "@reduxjs/toolkit/query";


export const store = configureStore({
	reducer: {
		[discountApi.reducerPath]: discountApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(discountApi.middleware),
})

setupListeners(store.dispatch)