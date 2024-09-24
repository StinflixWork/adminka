import { HeaderGroup, flexRender } from '@tanstack/react-table'
import cn from 'classnames'
import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react'

interface TableHeadProps<T> {
	headerGroups: HeaderGroup<T>[]
}

export const THead = <TData,>({ headerGroups }: TableHeadProps<TData>) => {
	return (
		<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
			{headerGroups.map(headerGroup => (
				<tr key={headerGroup.id}>
					{headerGroup.headers.map(header => (
						<th key={header.id} className='px-6 py-3'>
							{header.isPlaceholder ? null : (
								<div
									className={cn(
										header.column.getCanSort() ? 'cursor-pointer select-none' : '',
										'inline-flex items-center gap-x-2'
									)}
									onClick={header.column.getToggleSortingHandler()}
								>
									{flexRender(header.column.columnDef.header, header.getContext())}
									{{
										asc: <ArrowUpNarrowWide size={18} />,
										desc: <ArrowDownWideNarrow size={18} />
									}[header.column.getIsSorted() as string] ?? <ArrowDownUp size={18} />}
								</div>
							)}
						</th>
					))}
				</tr>
			))}
		</thead>
	)
}
