import { Navigate, Route, Routes } from 'react-router-dom'

import { PrivateRoute } from '@app/router'

import { AuthPage } from '@pages/AuthPage'
import { DashboardPage } from '@pages/DashboardPage'

import { useAuth } from '@entities/Admin/lib/useAuth.ts'

import { Loader } from '@shared/ui/Loader'

export const App = () => {
	const { loading, isLoading } = useAuth()

	if (loading || isLoading) {
		return <Loader />
	}

	return (
		<div className='h-screen grid place-items-center bg-gray-300'>
			<Routes>
				<Route path='/' element={<Navigate to='/dashboard' replace />} />
				<Route path='/auth' element={<AuthPage />} />
				<Route element={<PrivateRoute />}>
					<Route path='/dashboard' element={<DashboardPage />} />
				</Route>
			</Routes>
		</div>
	)
}
