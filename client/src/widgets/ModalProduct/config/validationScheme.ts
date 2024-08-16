import { z } from 'zod'

export const productValidationScheme = z
	.object({
		title: z.string().min(4, 'Рядок повинен містити не менше 4 символів').trim(),
		description: z
			.string()
			.min(10, 'Рядок повинен містити не менше 10 символів')
			.max(500, 'Максимум символів 500')
			.trim(),
		price: z.number().positive('Число повинно бути більше 0'),
		image: z.string().url('Неправильний URL')
	})
	.required()
