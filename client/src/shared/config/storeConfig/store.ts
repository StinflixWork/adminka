import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import authReducer from '@entities/Admin/model/slices/authSlice.ts'

import { api } from '@shared/api/api.ts'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[api.reducerPath]: api.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
