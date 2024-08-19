import { IoLogOutOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import { Button } from 'antd'

import { removeUser, useLogoutMutation } from '@entities/Admin'

import { useAppDispatch } from '@shared/libs/hooks/storeHooks.ts'
import { LocalStorageService } from '@shared/services/localStorage.service.ts'

export const LogoutButton = () => {
	const [logout] = useLogoutMutation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleLogout = async () => {
		await logout()
		dispatch(removeUser())
		LocalStorageService.clearAccessToken()
		navigate('/auth')
	}

	return (
		<Button
			size='large'
			type='primary'
			danger
			icon={<IoLogOutOutline size={24} />}
			onClick={handleLogout}
			iconPosition='end'
		>
			Вийти з акаунту
		</Button>
	)
}
