import { api } from '@shared/api/api.ts'

import { AuthResponse, IAuthForm } from './types'

const adminApi = api.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<AuthResponse, IAuthForm>({
			query: formValue => ({
				url: 'api/login',
				method: 'POST',
				body: formValue
			})
		}),
		registration: build.mutation<AuthResponse, IAuthForm>({
			query: formValue => ({
				url: 'api/registration',
				method: 'POST',
				body: formValue
			})
		}),
		logout: build.mutation<AuthResponse, void>({
			query: () => ({
				url: 'api/logout',
				method: 'POST'
			})
		}),
		refresh: build.query<AuthResponse, void>({
			query: () => 'api/refresh'
		})
	})
})

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation, useRefreshQuery } =
	adminApi
