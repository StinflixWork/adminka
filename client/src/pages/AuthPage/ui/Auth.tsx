import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import BoatImage from '@shared/assets/images/boat.jpg'

import { LoginForm } from './loginForm'
import { RegisterForm } from './registerForm'

export const AuthPage = () => {
	const [showRegister, setShowRegister] = useState(false)
	const { t } = useTranslation()

	return (
		<section className='flex bg-white dark:bg-dark rounded-xl shadow-xl'>
			<div className='h-screen flex-auto'>
				<img src={BoatImage} alt='Boat' className='w-full h-full object-cover object-center' />
			</div>
			<div className='flex flex-col w-[450px] px-5 py-8'>
				{showRegister ? <RegisterForm /> : <LoginForm />}
				<div className='text-center'>
					<h5 className='inline-flex gap-x-2 font-semibold mt-3 dark:text-white'>
						{!showRegister ? t('forms.authLogin.text') : t('forms.authRegister.text')}
						<button
							onClick={() => setShowRegister(!showRegister)}
							className='font-normal cursor-pointer text-blue-600 hover:underline'
						>
							{!showRegister ? t('forms.authLogin.link') : t('forms.authRegister.link')}
						</button>
					</h5>
				</div>
			</div>
		</section>
	)
}
