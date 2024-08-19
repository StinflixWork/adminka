import bcrypt from 'bcrypt'
import * as uuid from 'uuid'

import UserModel from '../models/user-model.js'

import { ApiError } from '../exceptions/api-error.js'
import { getTokens } from '../utils/get-tokens.js'

import MailService from './mail-service.js'
import TokenService from './token-service.js'


class UserService {
	async registration(email, password) {
		const candidate = await UserModel.findOne({ email })
		if (candidate) {
			throw ApiError.BadRequest('Користувач з такою поштовою адресою вже існує.')
		}

		const hashedPassword = await bcrypt.hash(password, 5)
		const activationLink = uuid.v4()


		const user = await UserModel.create({ email, password: hashedPassword, activationLink })
		await MailService.sendMailActivation(email, `${process.env.API_URL}api/activate/${activationLink}`)

		return getTokens(user)
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email })
		if (!user) {
			throw ApiError.BadRequest('Користувача з таким email не знайдено')
		}

		const isPassEquals = await bcrypt.compare(password, user.password)
		if (!isPassEquals) {
			throw ApiError.BadRequest('Невірний пароль')
		}

		return getTokens(user)
	}

	async logout(refreshToken) {
		return await TokenService.removeToken(refreshToken)
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({ activationLink })

		if (!user) {
			throw ApiError.BadRequest('Некоректне посилання активації')
		}

		user.isActivated = true
		user.save()
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}

		const userData = TokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await TokenService.findToken(refreshToken)

		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}

		const user = await UserModel.findById(userData.id)
		return getTokens(user)
	}

	async getAllUsers() {
		const users = await UserModel.find({})
		return users
	}
}

export default new UserService()
