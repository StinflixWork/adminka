import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import cl from 'classnames'

import styles from './NavItem.module.scss'

interface SidebarItemProps {
	label: string
	href: string
	icon?: ReactNode
}

export const SidebarItem = (props: SidebarItemProps) => {
	const { label, href, icon } = props

	return (
		<NavLink to={href} className={({ isActive }) => cl(styles.item, isActive && styles.active)}>
			{icon}
			<span>{label}</span>
		</NavLink>
	)
}
