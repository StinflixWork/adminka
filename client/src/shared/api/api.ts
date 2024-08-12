import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5100',
		prepareHeaders: headers => {
			headers.set('Accept', 'application/json')
			const accessToken = localStorage.getItem('token')
			if (accessToken) {
				headers.set('Authorization', `Bearer ${accessToken}`)
			}

			return headers
		},
		credentials: 'include'
	}),
	endpoints: () => ({})
})
