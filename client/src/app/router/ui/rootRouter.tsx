import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthPage } from '@pages/AuthPage'
import { DashboardPage } from '@pages/DashboardPage'
import { LogoutPage } from '@pages/LogoutPage'
import { NotFountPage } from '@pages/NotFoundPage'
import { ProductsPage } from '@pages/ProductsPage'
import { SuppliersPage } from '@pages/SuppliersPage'

import { PrivateRoute } from './privateRoute.tsx'

export const RootRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/dashboard' replace />} />
			<Route path='/auth' element={<AuthPage />} />
			<Route path='/logout' element={<LogoutPage />} />
			<Route element={<PrivateRoute />}>
				<Route path='/dashboard' element={<DashboardPage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/suppliers' element={<SuppliersPage />} />
			</Route>
			<Route path='*' element={<NotFountPage />} />
		</Routes>
	)
}
