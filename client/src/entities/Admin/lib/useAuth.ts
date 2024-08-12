import { useEffect, useState } from 'react'

import { selectAuth, setUser, useRefreshQuery } from '@entities/Admin'

import { useAppDispatch, useAppSelector } from '@shared/libs/hooks/storeHooks.ts'

export const useAuth = () => {
	const { data: refreshData, isSuccess, isLoading } = useRefreshQuery()
	const dispatch = useAppDispatch()
	const { isAuth } = useAppSelector(selectAuth)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			if (isSuccess) {
				localStorage.setItem('token', refreshData.accessToken)
				dispatch(setUser({ user: refreshData.user, isAuth: true }))
				setLoading(false)
			}
		} else {
			setLoading(false)
		}
	}, [refreshData, isSuccess, dispatch])

	useEffect(() => {
		if (!isLoading && !localStorage.getItem('token')) {
			setLoading(false)
		}
	}, [isLoading])

	return { isAuth, loading, isLoading }
}
