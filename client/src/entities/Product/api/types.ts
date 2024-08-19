export interface ProductResource {
	title: string
	description: string
	price: number
	image: string
	isFavourite?: boolean
}

export interface ProductResponse extends ProductResource {
	_id: string
}
