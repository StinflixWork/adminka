import { useEffect, useState } from 'react'
import { _ } from 'react-hook-form/dist/__typetest__/__fixtures__'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { toast } from 'react-toastify'

import { ModalProduct } from '@widgets/ModalProduct'

import {
	useDeleteProductMutation,
	useEditProductMutation,
	useToggleFavouritesMutation
} from '@entities/Product'
import { ProductResource, ProductResponse } from '@entities/Product/api/types.ts'

interface ProductProps {
	product: ProductResponse
}

export const ProductListItem = ({ product }: ProductProps) => {
	const { title, description, price, image, _id, isFavourite } = product
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [deleteProduct, { data, isSuccess, isError }] = useDeleteProductMutation()
	const [toggleFavourites] = useToggleFavouritesMutation()
	const [editProduct] = useEditProductMutation()

	const handleModalClose = () => setIsModalOpen(false)
	const handleModalOpen = () => setIsModalOpen(true)
	const handleDelete = async () => await deleteProduct(_id)
	const handleFavourites = async () => await toggleFavourites(_id)

	const handleEdit = async (data: ProductResource) => {
		setIsModalOpen(true)
		await editProduct({ id: _id, product: data })
	}

	useEffect(() => {
		if (isSuccess) {
			toast.success(data.message || 'Товар успішно видалено')
		}

		if (isError) {
			toast.error('Сталася помилка при видалені товару')
		}
	}, [isSuccess])

	return (
		<article className='w-[350px] h-[480px] rounded-xl overflow-hidden flex flex-col gap-y-3 shadow-xl bg-white dark:bg-neutral-900'>
			<ModalProduct
				handleSubmitValues={handleEdit}
				handleClose={handleModalClose}
				isOpen={isModalOpen}
				initialValues={product}
				labelBtn='Оновити'
			/>
			<div className='w-full max-h-[180px] h-full'>
				<img src={image} alt='Product' className='w-full h-full object-cover' />
			</div>
			<div className='flex-auto flex flex-col px-4 pb-8'>
				<div className='flex-auto text-dark dark:text-neutral-300'>
					<h2 className='text-2xl font-semibold'>{title}</h2>
					<p className='text-xl text-ellipsis line-clamp-4 mt-2'>{description}</p>
					<p className='text-green-600 font-medium mt-3'>{price}$</p>
				</div>
				<div className='flex items-center justify-around mt-5 border-t border-solid border-gray-200 pt-4'>
					<button onClick={handleModalOpen}>
						<MdModeEdit size={26} className='fill-gray-400 hover:fill-gray-300 transition-colors' />
					</button>
					<button onClick={handleFavourites}>
						{isFavourite ? (
							<FaStar size={26} className='fill-gray-400 hover:fill-gray-300 transition-colors' />
						) : (
							<FaRegStar
								size={26}
								className='fill-gray-400 hover:fill-gray-300 transition-colors'
							/>
						)}
					</button>
					<button onClick={handleDelete}>
						<MdDelete size={26} className='fill-gray-400 hover:fill-gray-300 transition-colors' />
					</button>
				</div>
			</div>
		</article>
	)
}
