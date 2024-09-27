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
		<table>
			<thead>
				{getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id} className='bg-neutral-300'>
						{headerGroup.headers.map(header => (
							<th key={header.id} colSpan={header.colSpan} className='text-center px-4 py-2'>
								{header.isPlaceholder ? null : (
									<div
										className={cn(
											header.column.getCanSort() && 'cursor-pointer select-none',
											'flex items-center justify-center gap-x-2'
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
					<tr key={row.id} className='bg-neutral-200'>
						{row.getVisibleCells().map(cell => (
							<td
								key={cell.id}
								className='text-center px-4 py-2 border border-solid border-gray-700'
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
