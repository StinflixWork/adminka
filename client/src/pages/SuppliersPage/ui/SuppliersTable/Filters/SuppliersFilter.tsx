import { useState } from 'react'

import { Row, Table } from '@tanstack/react-table'
import { Button, Checkbox, Dropdown } from 'antd'

import { ISuppliers } from '@pages/SuppliersPage/constants/suppliersData.ts'
import { FilterItem } from '@pages/SuppliersPage/ui/SuppliersTable/Filters/FilterItem'

interface SuppliersFilterProps {
	table: Table<any>
	suppliers: ISuppliers[]
	setSuppliers: (newSuppliers: ISuppliers[]) => void
}

export const SuppliersFilter = ({ table, suppliers, setSuppliers }: SuppliersFilterProps) => {
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

	// temp feature that will be changed to a server feature with endpoints
	const deleteRowHandler = () => {
		const selectedRows = table.getSelectedRowModel().rows
		const selectedRowIds = new Set(selectedRows.map((row: Row<ISuppliers>) => row.original.id))
		const newSuppliers = suppliers.filter(item => !selectedRowIds.has(item.id))

		setSuppliers(newSuppliers)
		table.resetRowSelection()
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
			<div>
				<Button
					type='primary'
					onClick={deleteRowHandler}
					disabled={!table.getSelectedRowModel().rows.length}
				>
					Delete row
				</Button>
			</div>
		</div>
	)
}
