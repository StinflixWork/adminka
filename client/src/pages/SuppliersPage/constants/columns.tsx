import { ColumnDef } from '@tanstack/react-table'

import { ISuppliers } from './suppliersData.ts'

export const columns: ColumnDef<ISuppliers>[] = [
	{
		header: 'Supplier',
		accessorKey: 'supplier',
		cell: props => props.getValue(),
		enableColumnFilter: false
	},
	{
		header: 'Product',
		accessorKey: 'product',
		cell: props => props.getValue(),
		meta: {
			filterVariant: 'text'
		}
	},
	{
		header: 'Quantity of product',
		accessorKey: 'quantity',
		cell: props => props.getValue(),
		meta: {
			filterVariant: 'range'
		}
	},
	{
		header: 'Price',
		accessorKey: 'price',
		cell: props => props.getValue(),
		enableColumnFilter: false
	},
	{
		header: 'Status',
		accessorKey: 'status',
		cell: props => props.getValue(),
		meta: {
			filterVariant: 'select'
		},
		enableSorting: false
	}
]

export const PAGE_SIZE = [5, 10, 15, 20]
