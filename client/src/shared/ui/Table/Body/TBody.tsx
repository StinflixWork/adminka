import { RowModel, flexRender } from '@tanstack/react-table'

interface TableBodyProps<T> {
	rowModel: RowModel<T>
}

export const TBody = <TData,>({ rowModel }: TableBodyProps<TData>) => {
	return (
		<tbody>
			{rowModel.rows.map(row => (
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
	)
}
