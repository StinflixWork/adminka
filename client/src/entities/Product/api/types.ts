export interface ProductResource {
	title: string
	description: string
	price: number
	image: string
}

export interface ProductResponse extends ProductResource {
	_id: string
}
