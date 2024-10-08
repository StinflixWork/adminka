import { ApiError } from '../exceptions/api-error.js'

export const errorMiddleware = async (err, req, res, next) => {
    console.log('@error middleware', err)

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({message: err.message, errors: err.errors});
    }

    return res.status(500).json({message: 'Непердбачувана помилка'});
}
