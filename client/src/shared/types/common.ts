export interface ErrorApiResponse {
	data: {
		message: string
		errors?: string[]
	}
	status: number
}
