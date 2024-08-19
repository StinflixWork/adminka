import { UserDTO } from "../dtos/user-dto.js"
import TokenService from "../services/token-service.js"

export const getTokens = async (user) => {
    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({...userDto})

    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
}

