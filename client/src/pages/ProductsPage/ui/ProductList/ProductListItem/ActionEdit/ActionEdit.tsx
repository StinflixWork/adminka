import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Pencil } from 'lucide-react'

import { ModalProduct } from '@widgets/ModalProduct'

import { useEditProductMutation } from '@entities/Product'
import { ProductResource, ProductResponse } from '@entities/Product/api/types.ts'

interface ActionEditProps {
	product: ProductResponse
}

export const ActionEdit = ({ product }: ActionEditProps) => {
	const { t } = useTranslation()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editProduct] = useEditProductMutation()

	const handleModalClose = () => setIsModalOpen(false)
	const handleModalOpen = () => setIsModalOpen(true)
	const handleEdit = async (data: ProductResource) => {
		setIsModalOpen(true)
		await editProduct({ id: product._id, product: data })
	}

	return (
		<>
			<ModalProduct
				handleSubmitValues={handleEdit}
				handleClose={handleModalClose}
				isOpen={isModalOpen}
				initialValues={product}
				labelButton={t('buttons.modalEditProduct')}
			/>
			<button onClick={handleModalOpen}>
				<Pencil className='text-gray-400 hover:fill-gray-400 transition-colors' />
			</button>
		</>
	)
}
