import { useTranslation } from 'react-i18next'

import { selectAuth } from '@entities/Admin'

import { useAppSelector } from '@shared/libs/hooks/storeHooks.ts'

export const DashboardPage = () => {
	const { user } = useAppSelector(selectAuth)
	const { t } = useTranslation()

	return (
		<section className='h-full grid place-items-center'>
			<div className='flex flex-col px-5 py-8 rounded-xl w-[450px] h-[380px] shadow-xl border border-solid border-gray-100 dark:bg-neutral-800 dark:border-gray-800'>
				<div className='flex-auto flex flex-col gap-y-3 text-center text-gray-800 dark:text-neutral-300'>
					<h1 className='text-3xl font-semibold'>{t('Welcome to Dashboard')}</h1>
					<h3 className='text-xl'>Email: {user?.email}</h3>
				</div>
			</div>
		</section>
	)
}
