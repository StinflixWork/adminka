import { FaClipboardList } from 'react-icons/fa'
import { FaPeopleCarryBox } from 'react-icons/fa6'
import { SiGoogleanalytics } from 'react-icons/si'

export const menu = [
	{
		id: 1,
		label: 'Продукти',
		href: '/products',
		icon: <FaClipboardList />
	},
	{
		id: 2,
		label: 'Постачальники',
		href: '/suppliers',
		icon: <FaPeopleCarryBox />
	},
	{
		id: 3,
		label: 'Аналітика',
		href: '/analytics',
		icon: <SiGoogleanalytics />
	}
]
