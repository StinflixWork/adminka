import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button } from 'antd'

export const NotFountPage = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()

	return (
		<section className='w-full h-full grid place-items-center'>
			<div className='flex flex-col items-center gap-y-5 text-gray-700 dark:text-neutral-50'>
				<h2 className='text-3xl font-bold opacity-40 dark:opacity-90'>{t('notFoundPage.title')}</h2>
				<Button onClick={() => navigate('/', { replace: true })}>{t('notFoundPage.button')}</Button>
			</div>
		</section>
	)
}
