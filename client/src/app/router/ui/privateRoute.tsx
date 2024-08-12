import { Navigate, Outlet } from 'react-router-dom'

import { selectAuth } from '@entities/Admin'

import { useAppSelector } from '@shared/libs/hooks/storeHooks.ts'

export const PrivateRoute = () => {
	const { isAuth } = useAppSelector(selectAuth)

	return isAuth ? <Outlet /> : <Navigate to='/auth' />
}
