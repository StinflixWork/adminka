module.exports = class ApiError extends Error {
    statusCode;
    errors;

    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Користувач не авторизован')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}
