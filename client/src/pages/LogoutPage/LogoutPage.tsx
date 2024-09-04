import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { removeUser, useLogoutMutation } from '@entities/Admin'

import { useAppDispatch } from '@shared/libs/hooks/storeHooks.ts'
import { LocalStorageService } from '@shared/services/localStorage.service.ts'

export const LogoutPage = () => {
	const [logout] = useLogoutMutation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleLogout = async () => {
		await logout()
		dispatch(removeUser())
		LocalStorageService.clearAccessToken()
	}

	useEffect(() => {
		handleLogout()
			.then(() => navigate('/auth'))
			.catch(e => console.error(e))
	}, [])

	return <></>
}
