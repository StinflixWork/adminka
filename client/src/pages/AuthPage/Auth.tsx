import { ChangeEvent, useEffect, useState } from 'react'
import { MdMailOutline } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Input } from 'antd'

import { setUser, useLoginMutation, useRegistrationMutation } from '@entities/Admin'
import { IAuthForm } from '@entities/Admin/api/types.ts'

import BoatImage from '@shared/assets/images/boat.jpg'
import { useAppDispatch } from '@shared/libs/hooks/storeHooks.ts'

const initialState: IAuthForm = {
	email: '',
	password: ''
}

export const AuthPage = () => {
	const [formValue, setFormValue] = useState(initialState)
	const [showRegister, setShowRegister] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

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
			toast.error('Please complete all fields')
		}
	}

	const handleRegister = async () => {
		if (formValue.email && formValue.password) {
			await registration(formValue)
		} else {
			toast.error('Please complete all fields')
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormValue({ ...formValue, [name]: value })
	}

	useEffect(() => {
		if (isLoginSuccess) {
			toast.success('Login successfully')
			dispatch(setUser({ user: loginData.user, isAuth: true }))
			localStorage.setItem('token', loginData.accessToken)
			navigate('/dashboard')
		}

		if (isRegistrationSuccess) {
			toast.success('Registration successfully')
			dispatch(setUser({ user: registrationData.user, isAuth: true }))
			localStorage.setItem('token', registrationData.accessToken)
			navigate('/dashboard')
		}
	}, [isLoginSuccess, isRegistrationSuccess])

	useEffect(() => {
		if (isRegistrationError || isLoginError) {
			toast.error((registrationError as any)?.data?.message || (loginError as any)?.data?.message)
		}
	}, [isLoginError, isRegistrationError])

	return (
		<div className='flex bg-white rounded-xl shadow-xl'>
			<div className='h-screen flex-auto'>
				<img src={BoatImage} alt='Boat' className='w-full h-full object-cover object-center' />
			</div>
			<div className='flex flex-col w-[450px] px-5 py-8'>
				<div className='flex-auto flex flex-col gap-y-3'>
					<h2 className='text-center text-3xl font-semibold mb-10'>
						{!showRegister ? 'Login' : 'Register'}
					</h2>
					<div className='flex flex-col gap-y-3'>
						<Input
							size='large'
							placeholder='Email'
							prefix={<MdMailOutline size={24} />}
							name='email'
							value={formValue.email}
							onChange={handleChange}
						/>
						<Input.Password
							size='large'
							placeholder='Password'
							prefix={<RiLockPasswordLine size={24} />}
							name='password'
							value={formValue.password}
							onChange={handleChange}
						/>
					</div>
					<div className='self-center'>
						{!showRegister ? (
							<Button type='primary' size='large' onClick={handleLogin}>
								Login
							</Button>
						) : (
							<Button type='primary' size='large' onClick={handleRegister}>
								Register
							</Button>
						)}
					</div>
				</div>
				<div className='text-center'>
					<h5 className='inline-flex gap-x-2 font-semibold mt-3'>
						{!showRegister ? "Don't have an account?" : 'Already have an account?'}
						<span
							onClick={() => setShowRegister(!showRegister)}
							className='font-normal cursor-pointer text-blue-600 hover:underline'
						>
							{!showRegister ? 'Sign Up' : 'Sign In'}
						</span>
					</h5>
				</div>
			</div>
		</div>
	)
}
