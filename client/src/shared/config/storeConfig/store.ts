import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import sidebarReducer from '@widgets/Sidebar/model/slices/sidebarSlice.ts'

import authReducer from '@entities/Admin/model/slices/authSlice.ts'

import { api } from '@shared/api/api.ts'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		sidebar: sidebarReducer,
		[api.reducerPath]: api.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
