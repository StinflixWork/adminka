import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, InputNumber, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import { ProductResource } from '@entities/Product/api/types.ts'

import { productValidationScheme } from '../config/validationScheme.ts'

interface ModalProductProps {
	initialValues?: ProductResource
	handleSubmitValues: (product: ProductResource) => void
	handleClose: () => void
	isOpen: boolean
	labelBtn: string
}

export const ModalProduct = (props: ModalProductProps) => {
	const { initialValues, handleSubmitValues, isOpen, handleClose, labelBtn } = props

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ProductResource>({
		resolver: zodResolver(productValidationScheme),
		defaultValues: initialValues || { title: '', description: '', price: 0, image: '' }
	})

	const handleModalClose = () => {
		handleClose()
		reset()
	}

	const onSubmit: SubmitHandler<ProductResource> = data => {
		handleSubmitValues(data)
		handleClose()
		reset()
	}

	return (
		<Modal open={isOpen} onCancel={handleModalClose} footer={null} style={{ top: 50 }}>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col '>
				<h2 className='text-xl mb-5'>Створити новий продукт</h2>
				<div className='flex flex-col gap-y-3'>
					<div className='flex flex-col gap-y-1'>
						<span>Назва товару</span>
						<Controller
							name='title'
							control={control}
							render={({ field }) => <Input type='text' {...field} />}
						/>
						<p>{errors.title?.message}</p>
					</div>
					<div className='flex flex-col gap-y-1'>
						<span>Опис</span>
						<Controller
							name='description'
							control={control}
							render={({ field }) => <TextArea rows={4} maxLength={500} {...field} />}
						/>
						<p>{errors.description?.message}</p>
					</div>
					<div className='flex flex-col gap-y-1'>
						<span>Ціна</span>
						<Controller
							name='price'
							control={control}
							render={({ field }) => (
								<InputNumber<number>
									defaultValue={0}
									formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									parser={value => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
									{...field}
								/>
							)}
						/>
						<p>{errors.price?.message}</p>
					</div>
					<div className='flex flex-col gap-y-1'>
						<span>Посилання на фото</span>
						<Controller
							name='image'
							control={control}
							render={({ field }) => <Input type='text' {...field} />}
						/>
						<p>{errors.image?.message}</p>
					</div>
				</div>
				<Button type='primary' className='mt-5 self-center' htmlType='submit'>
					{labelBtn}
				</Button>
			</form>
		</Modal>
	)
}
