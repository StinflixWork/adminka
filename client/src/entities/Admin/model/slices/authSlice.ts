import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AuthSchema } from '../types/adminSchema.ts'

const initialState: AuthSchema = {
	user: null,
	isAuth: false
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<AuthSchema>) => {
			state.user = action.payload.user
			state.isAuth = action.payload.isAuth
		},
		removeUser: state => {
			state.user = null
			state.isAuth = false
		}
	}
})

export const { setUser, removeUser } = authSlice.actions
export default authSlice.reducer
