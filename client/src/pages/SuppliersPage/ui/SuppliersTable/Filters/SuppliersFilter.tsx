import { useState } from 'react'

import { Table } from '@tanstack/react-table'
import { Button, Checkbox, Dropdown } from 'antd'

import { FilterItem } from '@pages/SuppliersPage/ui/SuppliersTable/Filters/FilterItem'

interface SuppliersFilterProps {
	table: Table<any>
}

export const SuppliersFilter = ({ table }: SuppliersFilterProps) => {
	const [dropdownShow, setDropdownShow] = useState(false)

	const items = [
		{
			key: 'all',
			label: (
				<Checkbox
					checked={table.getIsAllColumnsVisible()}
					onChange={table.getToggleAllColumnsVisibilityHandler()}
				>
					All
				</Checkbox>
			)
		},
		...table.getAllLeafColumns().map(column => ({
			key: column.id,
			label: (
				<Checkbox
					key={column.id}
					checked={column.getIsVisible()}
					onChange={column.getToggleVisibilityHandler()}
				>
					{column.id}
				</Checkbox>
			)
		}))
	]

	const dropdownHandler = (_open: boolean, info: { source: 'trigger' | 'menu' }) => {
		if (info.source === 'trigger') {
			setDropdownShow(!dropdownShow)
		}
	}

	return (
		<div className='mb-2 flex gap-x-4'>
			<div>
				<Dropdown
					menu={{ items }}
					trigger={['click']}
					arrow
					open={dropdownShow}
					onOpenChange={dropdownHandler}
				>
					<Button type='primary' onClick={() => setDropdownShow(!dropdownShow)}>
						Toggle
					</Button>
				</Dropdown>
			</div>
			<div className='flex items-center gap-x-2'>
				{table
					.getHeaderGroups()
					.map(headerGroup =>
						headerGroup.headers.map(
							header =>
								header.column.getCanFilter() && (
									<FilterItem key={header.column.id} column={header.column} />
								)
						)
					)}
			</div>
		</div>
	)
}
