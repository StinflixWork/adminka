import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { Trash2 } from 'lucide-react'

import { useDeleteProductMutation } from '@entities/Product'

export const ActionDelete = ({ id }: { id: string }) => {
	const [deleteProduct, { data, isSuccess, isError }] = useDeleteProductMutation()
	const handleDelete = async () => await deleteProduct(id)

	useEffect(() => {
		if (isSuccess) {
			toast.success(data.message || 'Товар успішно видалено')
		}

		if (isError) {
			toast.error('Сталася помилка при видалені товару')
		}
	}, [isSuccess])

	return (
		<button onClick={handleDelete}>
			<Trash2 className='text-gray-400 hover:fill-gray-400 transition-colors' />
		</button>
	)
}
