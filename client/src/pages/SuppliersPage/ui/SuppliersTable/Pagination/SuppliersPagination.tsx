import { Table } from '@tanstack/react-table'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'

import { PAGE_SIZE } from '@pages/SuppliersPage/constants/columns.tsx'

interface SuppliersPaginationProps {
	table: Table<any>
}

export const SuppliersPagination = ({ table }: SuppliersPaginationProps) => {
	return (
		<div className='flex items-center gap-x-6'>
			<div className='flex items-center gap-x-2'>
				<div>
					<button disabled={!table.getCanPreviousPage()} onClick={() => table.firstPage()}>
						<ChevronFirst />
					</button>
					<button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
						<ChevronLeft />
					</button>
				</div>
				<span>{`${table.getState().pagination.pageIndex + 1} / ${table.getPageCount()}`}</span>
				<div>
					<button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
						<ChevronRight />
					</button>
					<button disabled={!table.getCanNextPage()} onClick={() => table.lastPage()}>
						<ChevronLast />
					</button>
				</div>
			</div>
			<select
				value={table.getState().pagination.pageSize}
				onChange={e => {
					table.setPageSize(Number(e.target.value))
				}}
			>
				{PAGE_SIZE.map(pageSize => (
					<option key={pageSize} value={pageSize}>
						{pageSize}
					</option>
				))}
			</select>
		</div>
	)
}
