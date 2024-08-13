import { RootRouter } from '@app/router'

import { BasicLayout } from '@widgets/Layouts'
import { MainLayout } from '@widgets/Layouts/MainLayout'

import { useAuth } from '@entities/Admin/lib/useAuth.ts'

import { Loader } from '@shared/ui/Loader'

export const App = () => {
	const { loading, isLoading, isAuth } = useAuth()

	if (loading || isLoading) {
		return (
			<div className='h-full grid place-items-center bg-primary-bg'>
				<Loader />
			</div>
		)
	}

	if (!isAuth) {
		return (
			<BasicLayout>
				<RootRouter />
			</BasicLayout>
		)
	}

	return (
		<MainLayout>
			<RootRouter />
		</MainLayout>
	)
}
