import { useState } from 'react'

import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

import { BaseTable } from '@shared/ui/Table/BaseTable.tsx'

import { columns } from '../../constants/columns.tsx'
import { ISuppliers, SUPPLIERS_DATA } from '../../constants/suppliersData.ts'

const fallbackData: any[] = []

export const SuppliersTable = () => {
	const [rowSelection, setRowSelection] = useState({})
	const table = useReactTable({
		columns,
		data: SUPPLIERS_DATA ?? fallbackData,
		state: {
			rowSelection
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 5
			}
		}
	})

	return (
		<div className='relative overflow-x-auto shadow-md rounded-lg'>
			<BaseTable<ISuppliers> table={table} />
			<div className='px-5 py-1.5 flex items-center gap-x-8'>
				<button onClick={() => table.resetPagination()}>
					<RotateCcw size={18} />
				</button>
				<select
					value={table.getState().pagination.pageSize}
					onChange={e => table.setPageSize(Number(e.target.value))}
				>
					{[5, 10, 15, 20].map(pageSize => (
						<option value={pageSize} key={pageSize}>
							{pageSize}
						</option>
					))}
				</select>
				<div className='flex items-center gap-x-5'>
					<div className='flex items-center'>
						<button onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
							<ChevronFirst />
						</button>
						<button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
							<ChevronLeft />
						</button>
					</div>
					<span>
						{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
					</span>
					<div className='flex items-center'>
						<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
							<ChevronRight />
						</button>
						<button onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
							<ChevronLast />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
