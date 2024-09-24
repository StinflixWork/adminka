import { ChartColumnBig, ClipboardList, LayoutDashboard, LucideIcon, Truck } from 'lucide-react'

export interface IMenu {
	link: string
	icon: LucideIcon
	langKey: string
}

export const MENU: IMenu[] = [
	{
		link: '/dashboard',
		icon: LayoutDashboard,
		langKey: 'dashboard'
	},
	{
		link: '/products',
		icon: ClipboardList,
		langKey: 'products'
	},
	{
		link: '/suppliers',
		icon: Truck,
		langKey: 'suppliers'
	},
	{
		link: '/analytics',
		icon: ChartColumnBig,
		langKey: 'analytics'
	}
]
