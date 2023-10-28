const {validationResult} = require('express-validator')
const ApiError = require('../../exceptions/api-error')
const authService = require('../service/auth.service')

class AuthController {
    
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return next(ApiError.BadRequestError('Ошибка валидации', errors.array()))
            const {name, surname, login, password, email, user_role, birthdate} = req.body
            const userData = await authService.registration(name, surname, login, password, email, user_role, birthdate)
            if (!birthdate) {
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true, secure: true})
            }
            res.status(201).json(userData)
        } catch (e) {
            next(e)
        }
    }
    async login(req, res, next) {
        try {
            const {login, password} = req.body
            const userData = await authService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true, secure: true})
            res.status(200).json(userData)
        } catch (e) {
            next(e)
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200).json(token)
        } catch (e) {
            next(e)
        }
    }

    // Для linkactivated
    // async activate(req, res, next) {
    //     try {

    //     } catch (e) {

    //     }
    // }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true, secure: true})
            res.status(200).json(userData)
        } catch (e) {
            next(e)
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await authService.getAllUsers()
            return res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new AuthController()