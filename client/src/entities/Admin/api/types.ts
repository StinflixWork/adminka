export interface AuthResponse {
	accessToken: string
	refreshToken: string
	user: UserResource
}

export interface UserResource {
	id: string
	email: string
	isActivated: boolean
}

export interface IAuthForm {
	email: string
	password: string
}
