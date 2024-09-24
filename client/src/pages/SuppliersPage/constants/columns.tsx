import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from 'antd'

import { Status } from '@shared/ui/Status'

import { ISuppliers } from './suppliersData.ts'

export const columns: ColumnDef<ISuppliers>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				{...{
					checked: table.getIsAllRowsSelected(),
					indeterminate: table.getIsSomeRowsSelected(),
					onChange: table.getToggleAllRowsSelectedHandler()
				}}
			/>
		),
		cell: ({ row }) => (
			<div className='px-1'>
				<Checkbox
					{...{
						checked: row.getIsSelected(),
						disabled: !row.getCanSelect(),
						indeterminate: row.getIsSomeSelected(),
						onChange: row.getToggleSelectedHandler()
					}}
				/>
			</div>
		),
		enableSorting: false
	},
	{
		header: 'Supplier',
		accessorKey: 'fullName'
	},
	{
		header: 'Category',
		accessorKey: 'productCategory'
	},
	{
		header: 'Quantity',
		accessorKey: 'quantityProducts'
	},
	{
		header: 'Status',
		accessorKey: 'deliveryStatus',
		cell: ({ row }) => {
			// спробувати винести в окремий компонент і там змінювати колір в залежності від статусу
			return <Status text={row.original.deliveryStatus} />
		}
	},
	{
		header: 'Tools',
		accessorKey: 'tools',
		cell: () => <div>Edit</div>,
		enableSorting: false
	}
]
