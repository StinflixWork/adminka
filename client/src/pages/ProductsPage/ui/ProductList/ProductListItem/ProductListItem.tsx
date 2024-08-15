import { MdDelete, MdModeEdit } from 'react-icons/md'

import { ProductResource } from '@entities/Product/api/types.ts'

interface ProductProps {
	product: ProductResource
}

export const ProductListItem = ({ product }: ProductProps) => {
	const { title, description, price, image } = product

	return (
		<article className='w-[350px] h-[480px] rounded overflow-hidden flex flex-col gap-y-3 shadow-xl'>
			<div className='w-full max-h-[180px] h-full'>
				<img src={image} alt='Product' className='w-full h-full object-cover' />
			</div>
			<div className='flex-auto flex flex-col px-4 pb-8'>
				<div className='flex-auto'>
					<h2 className='text-2xl font-semibold'>{title}</h2>
					<p className='text-xl text-ellipsis line-clamp-4 mt-2'>{description}</p>
					<p className='text-green-600 font-medium mt-3'>{price}$</p>
				</div>
				<div className='flex items-center justify-around mt-5 border-t border-solid border-gray-200 pt-4'>
					<MdModeEdit size={26} className='fill-gray-400' />
					<MdDelete size={26} className='fill-gray-400' />
				</div>
			</div>
		</article>
	)
}
