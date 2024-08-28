import { ChartColumnBig, ClipboardList, LucideIcon, Truck } from 'lucide-react'

export interface IMenu {
	label: string
	link: string
	icon: LucideIcon
}

export const MENU: IMenu[] = [
	{
		label: 'Продукти',
		link: '/products',
		icon: ClipboardList
	},
	{
		label: 'Постачальники',
		link: '/suppliers',
		icon: Truck
	},
	{
		label: 'Аналітика',
		link: '/analytics',
		icon: ChartColumnBig
	}
]
