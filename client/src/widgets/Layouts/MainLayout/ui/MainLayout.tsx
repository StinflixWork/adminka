import { PropsWithChildren } from 'react'

import cn from 'classnames'

import { Sidebar } from '@widgets/Sidebar'

import { useAppSelector } from '@shared/libs/hooks/storeHooks.ts'

export const MainLayout = ({ children }: PropsWithChildren) => {
	const { isCollapsed } = useAppSelector(state => state.sidebar)

	return (
		<div className='h-screen flex bg-neutral-50'>
			<Sidebar />
			<main
				className={cn(
					'flex-auto py-8 pr-8 bg-neutral-100 dark:bg-neutral-950 relative transition-all duration-300',
					!isCollapsed ? 'pl-72' : 'pl-24'
				)}
			>
				{children}
			</main>
		</div>
	)
}
