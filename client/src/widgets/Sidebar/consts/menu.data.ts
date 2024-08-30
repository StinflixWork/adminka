import { ChartColumnBig, ClipboardList, LucideIcon, Truck } from 'lucide-react'

export interface IMenu {
	link: string
	icon: LucideIcon
	langKey: string
}

export const MENU: IMenu[] = [
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
