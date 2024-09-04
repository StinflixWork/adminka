import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Input } from 'antd'
import { Mail, RectangleEllipsis } from 'lucide-react'

import { formState } from '@pages/AuthPage/constants/formState.ts'

import { setUser, useRegistrationMutation } from '@entities/Admin'

import { useAppDispatch } from '@shared/libs/hooks/storeHooks.ts'
import { LocalStorageService } from '@shared/services/localStorage.service.ts'

export const RegisterForm = () => {
	const [formValue, setFormValue] = useState(formState)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const [registration, { data, isSuccess, isError, error }] = useRegistrationMutation()

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
		if (isSuccess) {
			toast.success(t('toasts.auth.registerSuccess'))
			dispatch(setUser({ user: data.user, isAuth: true }))
			LocalStorageService.setAccessToken(data.accessToken)
			navigate('/dashboard')
		}

		if (isError) {
			toast.error((error as any)?.data?.message)
		}
	}, [isSuccess, isError])

	return (
		<div className='flex-auto flex flex-col gap-y-3'>
			<h2 className='text-center text-3xl font-semibold mb-10 dark:text-white'>
				{t('forms.authRegister.label')}
			</h2>
			<div className='flex flex-col gap-y-3'>
				<Input
					size='large'
					placeholder={t('forms.authRegister.email')}
					prefix={<Mail />}
					name='email'
					value={formValue.email}
					onChange={handleChange}
				/>
				<Input.Password
					size='large'
					placeholder={t('forms.authRegister.password')}
					prefix={<RectangleEllipsis />}
					name='password'
					value={formValue.password}
					onChange={handleChange}
				/>
			</div>
			<div className='self-center'>
				<Button type='primary' size='large' onClick={handleRegister}>
					{t('forms.authRegister.button')}
				</Button>
			</div>
		</div>
	)
}
