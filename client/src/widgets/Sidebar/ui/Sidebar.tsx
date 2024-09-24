import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button } from 'antd'
import cn from 'classnames'
import { m } from 'framer-motion'
import { LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

import { toggleCollapsed } from '@widgets/Sidebar/model'

import { useAppDispatch, useAppSelector } from '@shared/libs/hooks/storeHooks.ts'

import { MENU } from '../consts/menu.data.ts'
import { SidebarItem } from './SidebarItem/SidebarItem.tsx'

export const Sidebar = () => {
	const { isCollapsed } = useAppSelector(state => state.sidebar)
	const dispatch = useAppDispatch()
	const navigation = useNavigate()
	const { t } = useTranslation()

	const toggleSidebar = () => dispatch(toggleCollapsed())
	const handleLogout = () => navigation('/logout')

	return (
		<m.aside
			className='fixed top-4 left-4 bottom-4 pb-6 z-10 w-56 rounded-lg flex flex-col
			shadow-lg bg-white dark:bg-gray-400 whitespace-nowrap overflow-hidden'
			animate={{ width: isCollapsed ? 60 : 224 }}
			transition={{ type: 'spring', stiffness: 300, damping: 23 }}
		>
			<button
				onClick={toggleSidebar}
				className={cn(
					'p-2 bg-transparent opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100',
					!isCollapsed ? 'self-end' : 'self-center'
				)}
			>
				{isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
			</button>
			<nav className='flex-auto flex flex-col gap-y-3'>
				{MENU.map(item => (
					<SidebarItem key={item.link} item={item} />
				))}
			</nav>
			<div className='flex flex-col items-center justify-center gap-y-2'>
				<Button
					danger
					icon={<LogOut size={18} />}
					iconPosition='end'
					onClick={handleLogout}
					type={isCollapsed ? 'text' : 'default'}
				>
					{isCollapsed || t('buttons.logout')}
				</Button>
			</div>
		</m.aside>
	)
}
