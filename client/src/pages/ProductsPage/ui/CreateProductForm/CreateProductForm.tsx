import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { Button } from 'antd'

import { ModalProduct } from '@widgets/ModalProduct'

import { useCreateProductMutation } from '@entities/Product'
import { ProductResource } from '@entities/Product/api/types.ts'

import { ErrorApiResponse } from '@shared/types/common.ts'

export const CreateProductForm = () => {
	const [createProduct, { isSuccess, data, error, isError }] = useCreateProductMutation()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { t } = useTranslation()

	const handleModalOpen = () => setIsModalOpen(true)
	const handleModalClose = () => setIsModalOpen(false)
	const onSubmit = async (data: ProductResource) => await createProduct(data)

	useEffect(() => {
		if (isSuccess) {
			toast.success(data.message)
		}

		if (isError) {
			const serverError = error as ErrorApiResponse
			toast.error(serverError.data.message || 'Помилка при створені')
		}
	}, [isSuccess, isError])

	return (
		<div className='flex justify-end'>
			<ModalProduct
				handleSubmitValues={onSubmit}
				isOpen={isModalOpen}
				handleClose={handleModalClose}
				labelButton={t('forms.createProduct.submitBtn')}
			/>
			<Button type='primary' onClick={handleModalOpen}>
				{t('buttons.modalCreateProduct')}
			</Button>
		</div>
	)
}
