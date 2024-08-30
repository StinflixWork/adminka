import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import cl from 'classnames'

import { useAppSelector } from '@shared/libs/hooks/storeHooks.ts'

import { IMenu } from '../../consts/menu.data.ts'
import styles from './NavItem.module.scss'

interface SidebarItemProps {
	item: IMenu
}

export const SidebarItem = ({ item }: SidebarItemProps) => {
	const { langKey, link } = item
	const { t } = useTranslation()
	const { isCollapsed } = useAppSelector(state => state.sidebar)

	const label = t(`menu.${langKey}`)

	return (
		<NavLink to={link} className={({ isActive }) => cl(styles.item, isActive && styles.active)}>
			<item.icon />
			{!isCollapsed && <span>{label}</span>}
		</NavLink>
	)
}
