const bcrypt = require('bcrypt');
const uuid = require('uuid');

const UserModel = require('../models/user-model');

const ApiError = require('../exceptions/api-error');
const getTokens = require('../utils/get-tokens')

const mailService = require('./mail-service');
const tokenService = require('./token-service');


class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с таким почтовым адресом уже существует.')
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const activationLink = uuid.v4();


        const user = await UserModel.create({email, password: hashedPassword, activationLink})
        await mailService.sendMailActivation(email, `${process.env.API_URL}api/activate/${activationLink}`)

        return getTokens(user)
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
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
        return await tokenService.removeToken(refreshToken);
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})

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

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)
        return getTokens(user)
    }

    async getAllUsers() {
        return await UserModel.find({})
    }
}

module.exports = new UserService();
