import { useState } from 'react'

import { Column } from '@tanstack/react-table'
import { Input, Select, Slider } from 'antd'

export const FilterItem = ({ column }: { column: Column<any, unknown> }) => {
	const columnFilterValue = column.getFilterValue()
	const { filterVariant } = column.columnDef.meta ?? {}

	if (filterVariant === 'select') {
		return (
			<div>
				<Select
					onChange={value => column.setFilterValue(value)}
					value={columnFilterValue?.toString() || 'All status'}
					options={[
						{ value: '', label: 'All status' },
						{ value: 'processed', label: 'processed' },
						{ value: 'ordered', label: 'ordered' },
						{ value: 'cancelled', label: 'cancelled' }
					]}
					style={{ width: 120 }}
				/>
			</div>
		)
	}

	if (filterVariant === 'text') {
		const { Search } = Input
		console.log(columnFilterValue)
		return (
			<div>
				<Search placeholder='Search product...' onSearch={value => column.setFilterValue(value)} />
			</div>
		)
	}

	const [quantityRange, setQuantityRange] = useState<number[]>([0, 450])
	if (filterVariant === 'range') {
		return (
			<div>
				<Slider
					range
					min={1}
					max={450}
					style={{ width: 200 }}
					onChange={value => setQuantityRange(value)}
					value={quantityRange}
					onChangeComplete={value => column.setFilterValue(value)}
				/>
			</div>
		)
	}
}
