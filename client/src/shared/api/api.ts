import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { LocalStorageService } from '@shared/services/localStorage.service.ts'

import { GET_ADMINS, GET_PRODUCTS } from './tags.ts'

export const api = createApi({
	reducerPath: 'api',
	tagTypes: [GET_ADMINS, GET_PRODUCTS],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5100',
		prepareHeaders: headers => {
			headers.set('Accept', 'application/json')
			const accessToken = LocalStorageService.getAccessToken()
			if (accessToken) {
				headers.set('Authorization', `Bearer ${accessToken}`)
			}

			return headers
		},
		credentials: 'include'
	}),
	endpoints: () => ({})
})
