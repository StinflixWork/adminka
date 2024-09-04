import { ProductResponse } from '@entities/Product/api/types.ts'

import { ActionDelete } from './ActionDelete'
import { ActionEdit } from './ActionEdit'
import { ActionFavourite } from './ActionFavourite'

interface ProductProps {
	product: ProductResponse
}

export const ProductListItem = ({ product }: ProductProps) => {
	return (
		<article className='w-[350px] h-[480px] rounded-xl overflow-hidden flex flex-col gap-y-3 shadow-xl bg-white dark:bg-neutral-900'>
			<div className='w-full max-h-[180px] h-full'>
				<img src={product.image} alt='Product' className='w-full h-full object-cover' />
			</div>
			<div className='flex-auto flex flex-col px-4 pb-8'>
				<div className='flex-auto text-dark dark:text-neutral-300'>
					<h2 className='text-2xl font-semibold'>{product.title}</h2>
					<p className='text-xl text-ellipsis line-clamp-4 mt-2'>{product.description}</p>
					<p className='text-green-600 font-medium mt-3'>{product.price}$</p>
				</div>
				<div className='flex items-center justify-around mt-5 border-t border-solid border-gray-200 pt-4'>
					<ActionEdit product={product} />
					<ActionFavourite id={product._id} isFavourite={product.isFavourite} />
					<ActionDelete id={product._id} />
				</div>
			</div>
		</article>
	)
}
