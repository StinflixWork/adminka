import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { columns } from '@pages/SuppliersPage/constants/columns.ts'

import { ProductResponse } from '@entities/Product/api/types.ts'

import styles from './SuppliersTable.module.scss'

const fallbackData: any[] = []

export const SuppliersTable = ({ data }: { data: ProductResponse[] | undefined }) => {
	const table = useReactTable({
		columns,
		data: data ?? fallbackData,
		getCoreRowModel: getCoreRowModel()
	})

	return (
		<table className={styles.table}>
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<th key={header.id}>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map(row => (
					<tr key={row.id}>
						{row.getVisibleCells().map(cell => (
							<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
