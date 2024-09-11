import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { columns } from '@pages/SuppliersPage/constants/columns.ts'

import { ProductResponse } from '@entities/Product/api/types.ts'

const fallbackData: any[] = []

export const SuppliersTable = ({ data }: { data: ProductResponse[] | undefined }) => {
	const table = useReactTable({
		columns,
		data: data ?? fallbackData,
		getCoreRowModel: getCoreRowModel()
	})

	return (
		<div className='relative overflow-x-auto shadow-md rounded-lg'>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} className='px-6 py-3'>
									{flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr
							key={row.id}
							className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
						>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id} className='px-6 py-4'>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
