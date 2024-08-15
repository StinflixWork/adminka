import { PropsWithChildren } from 'react'

import { Sidebar } from '@widgets/Sidebar'

export const MainLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='h-screen flex bg-secondary-bg'>
			<Sidebar />
			<main className='flex-auto p-8'>{children}</main>
		</div>
	)
}
