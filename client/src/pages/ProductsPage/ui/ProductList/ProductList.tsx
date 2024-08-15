import { useGetListProductsQuery } from '@entities/Product'

import { Loader } from '@shared/ui/Loader'

import { ProductListItem } from './ProductListItem'

export const ProductList = () => {
	const { data, isLoading } = useGetListProductsQuery()

	return (
		<div className='h-full flex flex-wrap gap-4'>
			{isLoading ? (
				<div className='w-full h-full grid place-items-center'>
					<Loader />
				</div>
			) : (
				data?.map(product => <ProductListItem key={product._id} product={product} />)
			)}
		</div>
	)
}
