import { useState } from 'react'

import {
	ColumnFiltersState,
	ColumnOrderState,
	RowData,
	RowSelectionState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'

import { columns } from '@pages/SuppliersPage/constants/columns.tsx'
import { ISuppliers, SUPPLIERS_DATA } from '@pages/SuppliersPage/constants/suppliersData.ts'
import { SuppliersFilter } from '@pages/SuppliersPage/ui/SuppliersTable/Filters'
import { SuppliersPagination } from '@pages/SuppliersPage/ui/SuppliersTable/Pagination'

import { BaseTable } from '@shared/ui/Table'

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
		filterVariant?: 'text' | 'range' | 'select'
	}
}

export const SuppliersTable = () => {
	const [suppliers, setSuppliers] = useState(() => SUPPLIERS_DATA)
	const [columnVisibility, setColumnVisibility] = useState({})
	const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

	const table = useReactTable({
		data: suppliers ?? [],
		columns,
		state: {
			columnVisibility,
			columnOrder,
			columnFilters,
			rowSelection
		},
		onColumnVisibilityChange: setColumnVisibility,
		onColumnOrderChange: setColumnOrder,
		onColumnFiltersChange: setColumnFilters,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel()
	})

	return (
		<div className='flex flex-col gap-y-2'>
			<SuppliersFilter table={table} suppliers={suppliers} setSuppliers={setSuppliers} />
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<BaseTable<ISuppliers> table={table} />
			</div>
			<SuppliersPagination table={table} />
		</div>
	)
}
