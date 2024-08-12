import { useNavigate } from 'react-router-dom'

import { Button } from 'antd'

import { removeUser, selectAuth, useLogoutMutation } from '@entities/Admin'

import { useAppDispatch, useAppSelector } from '@shared/libs/hooks/storeHooks.ts'

export const DashboardPage = () => {
	const [logout] = useLogoutMutation()
	const { user } = useAppSelector(selectAuth)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleLogout = async () => {
		await logout()
		dispatch(removeUser())
		localStorage.removeItem('token')
		navigate('/auth')
	}

	return (
		<div className='flex flex-col bg-white px-5 py-8 rounded-xl w-[450px] h-[380px]'>
			<div className='flex-auto flex flex-col gap-y-3 text-center'>
				<h1 className='text-3xl font-semibold'>Welcome to Dashboard</h1>
				<h3 className='text-xl'>Email: {user?.email}</h3>
			</div>
			<div className='flex justify-center'>
				<Button type='primary' danger onClick={handleLogout}>
					Logout
				</Button>
			</div>
		</div>
	)
}
