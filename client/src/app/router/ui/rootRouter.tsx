import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthPage } from '@pages/AuthPage'
import { DashboardPage } from '@pages/DashboardPage'
import { NotFountPage } from '@pages/NotFoundPage'
import { ProductsPage } from '@pages/ProductsPage'

import { PrivateRoute } from './privateRoute.tsx'

export const RootRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/dashboard' replace />} />
			<Route path='/auth' element={<AuthPage />} />
			<Route element={<PrivateRoute />}>
				<Route path='/dashboard' element={<DashboardPage />} />
				<Route path='/products' element={<ProductsPage />} />
			</Route>
			<Route path='*' element={<NotFountPage />} />
		</Routes>
	)
}
