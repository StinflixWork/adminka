import { UserResource } from '../../api/types.ts'

export interface AuthSchema {
	user: UserResource | null
	isAuth: boolean
}
