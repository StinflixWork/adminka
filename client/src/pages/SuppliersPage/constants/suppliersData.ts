import { getRandomSuppliers } from '../lib/getRandomSuppliers.ts'

export interface ISuppliers {
	id: number
	supplier: string
	product: string
	quantity: number
	price: number
	status: TypeOrderStatus
}

type TypeOrderStatus = 'processed' | 'cancelled' | 'ordered'

// fake data
export const SUPPLIERS_DATA: ISuppliers[] = getRandomSuppliers(1000)
