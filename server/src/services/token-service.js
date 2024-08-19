import jwt from "jsonwebtoken"
import TokenModel from "../models/token-model.js"

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "1d"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"});

        return {
            accessToken,
            refreshToken
        };
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = TokenModel.findOne({user: userId})
        if (tokenData.refreshToken) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        return await TokenModel.create({user: userId, refreshToken})
    }

    async removeToken(refreshToken) {
        return TokenModel.deleteOne({refreshToken});
    }

    async findToken(refreshToken) {
        return TokenModel.findOne({refreshToken});
    }
}

export default new TokenService()
