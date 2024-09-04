import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Input } from 'antd'
import { Mail, RectangleEllipsis } from 'lucide-react'

import { setUser, useLoginMutation, useRegistrationMutation } from '@entities/Admin'
import { IAuthForm } from '@entities/Admin/api/types.ts'

import BoatImage from '@shared/assets/images/boat.jpg'
import { useAppDispatch } from '@shared/libs/hooks/storeHooks.ts'
import { LocalStorageService } from '@shared/services/localStorage.service.ts'

const initialState: IAuthForm = {
	email: '',
	password: ''
}

export const AuthPage = () => {
	const [formValue, setFormValue] = useState(initialState)
	const [showRegister, setShowRegister] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	const [
		login,
		{ data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError }
	] = useLoginMutation()

	const [
		registration,
		{
			data: registrationData,
			isSuccess: isRegistrationSuccess,
			isError: isRegistrationError,
			error: registrationError
		}
	] = useRegistrationMutation()

	const handleLogin = async () => {
		if (formValue.email && formValue.password) {
			await login(formValue)
		} else {
			toast.error(t('toasts.auth.validationError'))
		}
	}

	const handleRegister = async () => {
		if (formValue.email && formValue.password) {
			await registration(formValue)
		} else {
			toast.error(t('toasts.auth.validationError'))
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormValue({ ...formValue, [name]: value })
	}

	useEffect(() => {
		if (isLoginSuccess) {
			toast.success(t('toasts.auth.loginSuccess'))
			dispatch(setUser({ user: loginData.user, isAuth: true }))
			LocalStorageService.setAccessToken(loginData.accessToken)
			navigate('/dashboard')
		}

		if (isRegistrationSuccess) {
			toast.success(t('toasts.auth.registerSuccess'))
			dispatch(setUser({ user: registrationData.user, isAuth: true }))
			LocalStorageService.setAccessToken(registrationData.accessToken)
			navigate('/dashboard')
		}
	}, [isLoginSuccess, isRegistrationSuccess])

	useEffect(() => {
		if (isRegistrationError || isLoginError) {
			toast.error((registrationError as any)?.data?.message || (loginError as any)?.data?.message)
		}
	}, [isLoginError, isRegistrationError])

	return (
		<section className='flex bg-white dark:bg-dark rounded-xl shadow-xl'>
			<div className='h-screen flex-auto'>
				<img src={BoatImage} alt='Boat' className='w-full h-full object-cover object-center' />
			</div>
			<div className='flex flex-col w-[450px] px-5 py-8'>
				<div className='flex-auto flex flex-col gap-y-3'>
					<h2 className='text-center text-3xl font-semibold mb-10 dark:text-white'>
						{!showRegister ? t('forms.authLogin.label') : t('forms.authRegister.label')}
					</h2>
					<div className='flex flex-col gap-y-3'>
						<Input
							size='large'
							placeholder={t('forms.authLogin.email')}
							prefix={<Mail />}
							name='email'
							value={formValue.email}
							onChange={handleChange}
						/>
						<Input.Password
							size='large'
							placeholder={t('forms.authLogin.password')}
							prefix={<RectangleEllipsis />}
							name='password'
							value={formValue.password}
							onChange={handleChange}
						/>
					</div>
					<div className='self-center'>
						{!showRegister ? (
							<Button type='primary' size='large' onClick={handleLogin}>
								{t('forms.authLogin.button')}
							</Button>
						) : (
							<Button type='primary' size='large' onClick={handleRegister}>
								{t('forms.authRegister.button')}
							</Button>
						)}
					</div>
				</div>
				<div className='text-center'>
					<h5 className='inline-flex gap-x-2 font-semibold mt-3 dark:text-white'>
						{!showRegister ? t('forms.authLogin.text') : t('forms.authRegister.text')}
						<span
							onClick={() => setShowRegister(!showRegister)}
							className='font-normal cursor-pointer text-blue-600 hover:underline'
						>
							{!showRegister ? t('forms.authLogin.link') : t('forms.authRegister.link')}
						</span>
					</h5>
				</div>
			</div>
		</section>
	)
}
