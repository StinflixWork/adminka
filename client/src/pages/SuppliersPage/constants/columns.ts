import { ColumnDef } from '@tanstack/react-table'

import { ProductResponse } from '@entities/Product/api/types.ts'

export const columns: ColumnDef<ProductResponse>[] = [
	{
		header: 'Title',
		accessorKey: 'title'
	},
	{
		header: 'Description',
		accessorKey: 'description'
	},
	{
		header: 'Price',
		accessorKey: 'price'
	},
	{
		header: 'Favourite',
		accessorFn: row => `${row.isFavourite ? 'Да' : 'Нет'}`
	}
]
