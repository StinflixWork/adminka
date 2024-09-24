import { Table } from '@tanstack/react-table'

import { TBody } from './Body'
import { THead } from './Head'

interface BasicTableProps<T> {
	table: Table<T>
}

export const BaseTable = <TData,>({ table }: BasicTableProps<TData>) => {
	return (
		<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
			<THead<TData> headerGroups={table.getHeaderGroups()} />
			<TBody<TData> rowModel={table.getRowModel()} />
		</table>
	)
}
