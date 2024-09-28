import { SortDirection, Table, flexRender } from '@tanstack/react-table'
import cn from 'classnames'
import { ArrowUpDown } from 'lucide-react'

import { sortDirection } from './constants/sortDirection.tsx'

interface BaseTableProps<T> {
	table: Table<T>
}

export const BaseTable = <TData,>({ table }: BaseTableProps<TData>) => {
	const { getHeaderGroups, getRowModel } = table

	return (
		<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
			<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
				{getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<th key={header.id} colSpan={header.colSpan} className='px-6 py-3'>
								{header.isPlaceholder ? null : (
									<div
										className={cn(
											header.column.getCanSort() && 'cursor-pointer select-none',
											'flex items-center gap-x-2'
										)}
										onClick={header.column.getToggleSortingHandler()}
									>
										{flexRender(header.column.columnDef.header, header.getContext())}
										{(sortDirection[header.column.getIsSorted() as SortDirection] ??
										header.column.getCanSort()) ? (
											<ArrowUpDown size={20} />
										) : null}
									</div>
								)}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{getRowModel().rows.map(row => (
					<tr
						key={row.id}
						className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
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
	)
}
