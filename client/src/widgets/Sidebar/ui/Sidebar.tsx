import { LogoutButton } from '@features/LogoutButton'

import { Logo } from '@shared/ui/Logo'

import { menu } from '../consts/menu.tsx'
import { SidebarItem } from './SidebarItem/SidebarItem.tsx'

export const Sidebar = () => {
	return (
		<aside className='basis-1/6 bg-white flex flex-col shadow-medium dark:bg-neutral-900'>
			<div className='h-[80px] px-2 py-4'>
				<Logo />
			</div>
			<div className='px-2 py-4 flex-auto'>
				<nav className='flex flex-col gap-y-3'>
					{menu.map(item => (
						<SidebarItem key={item.id} label={item.label} href={item.href} icon={item.icon} />
					))}
				</nav>
			</div>
			<div className='px-2 py-4 flex flex-col items-center justify-center gap-y-2'>
				<LogoutButton />
			</div>
		</aside>
	)
}
