import { PropsWithChildren } from 'react'

import { Sidebar } from '@widgets/Sidebar'

export const MainLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='h-screen flex bg-neutral-50'>
			<Sidebar />
			<main className='flex-auto p-8 dark:bg-neutral-950 relative transition-colors duration-300'>
				{children}
			</main>
		</div>
	)
}
