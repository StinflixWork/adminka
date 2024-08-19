export class LocalStorageService {
	static setAccessToken(token: string) {
		localStorage.setItem('token', token)
	}
	static getAccessToken() {
		return localStorage.getItem('token')
	}
	static clearAccessToken() {
		localStorage.removeItem('token')
	}
}
