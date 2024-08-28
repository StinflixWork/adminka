import { createSlice } from '@reduxjs/toolkit'

import { SidebarSchema } from '../types/sidebarSchema.ts'

const initialState: SidebarSchema = {
	isCollapsed: false
}

const sidebarSlice = createSlice({
	name: 'Sidebar',
	initialState,
	reducers: {
		toggleCollapsed: state => {
			state.isCollapsed = !state.isCollapsed
		}
	}
})

export const { toggleCollapsed } = sidebarSlice.actions
export default sidebarSlice.reducer
