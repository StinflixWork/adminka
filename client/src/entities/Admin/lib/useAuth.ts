import { useEffect, useState } from 'react'

import { selectAuth, setUser, useRefreshQuery } from '@entities/Admin'

import { useAppDispatch, useAppSelector } from '@shared/libs/hooks/storeHooks.ts'
import { LocalStorageService } from '@shared/services/localStorage.service.ts'

export const useAuth = () => {
	const { data: refreshData, isSuccess, isLoading } = useRefreshQuery()
	const dispatch = useAppDispatch()
	const { isAuth } = useAppSelector(selectAuth)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = LocalStorageService.getAccessToken()
		if (token) {
			if (isSuccess) {
				LocalStorageService.setAccessToken(refreshData.accessToken)
				dispatch(setUser({ user: refreshData.user, isAuth: true }))
				setLoading(false)
			}
		} else {
			setLoading(false)
		}
	}, [refreshData, isSuccess, dispatch])

	useEffect(() => {
		if (!isLoading && !LocalStorageService.getAccessToken()) {
			setLoading(false)
		}
	}, [isLoading])

	return { isAuth, loading, isLoading }
}
