const ApiError = require("../exceptions/api-error")
const tokenService = require("../token/service/token.service")

module.exports = function (req,res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) return next(ApiError.UnAuthorizedError())
        const accessToken = authHeader.split(' ')[1]
        if (!accessToken) return next(ApiError.UnAuthorizedError())
        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData | (userData && userData.user_role !== 'Admin')) return next(ApiError.UnAuthorizedError())
        res.user = userData
        next()
    } catch (error) {
        return next(ApiError.UnAuthorizedError())
    }
}