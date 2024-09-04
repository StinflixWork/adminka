import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Input } from 'antd'
import { Mail, RectangleEllipsis } from 'lucide-react'

import { formState } from '@pages/AuthPage/constants/formState.ts'

import { setUser, useLoginMutation } from '@entities/Admin'

import { useAppDispatch } from '@shared/libs/hooks/storeHooks.ts'
import { LocalStorageService } from '@shared/services/localStorage.service.ts'

export const LoginForm = () => {
	const [formValue, setFormValue] = useState(formState)
	const { t } = useTranslation()
	const [login, { data, isSuccess, isError, error }] = useLoginMutation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormValue({ ...formValue, [name]: value })
	}

	const handleLogin = async () => {
		if (formValue.email && formValue.password) {
			await login(formValue)
		} else {
			toast.error(t('toasts.auth.validationError'))
		}
	}

	useEffect(() => {
		if (isSuccess) {
			toast.success(t('toasts.auth.loginSuccess'))
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
				{t('forms.authLogin.label')}
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
				<Button type='primary' size='large' onClick={handleLogin}>
					{t('forms.authLogin.button')}
				</Button>
			</div>
		</div>
	)
}
