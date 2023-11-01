const db = require('../../db')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const userService = require('../service/users.service')
const mailService = require('../../mail/service/mail.service')
const ApiError = require('../../exceptions/api-error')
const UserDto = require('../dto/user.dto')
const tokenService = require('../../token/service/token.service')

class AuthService {

    async isRegistred(login, email='') {
        let candidate
        if (email) {
            candidate = await db.query(`SELECT * FROM "User" WHERE login='${login}' OR email='${email}'`)
        } else {
            candidate = await db.query(`SELECT * FROM "User" WHERE login='${login}'`)
        }
        if (candidate.rowCount === 0) return false
        return candidate.rows[0]
    }

    async registration(name, surname, login, password, email = '', user_role='', birthdate = '') {
        const isReg = await this.isRegistred(login, email)
        if (isReg) throw ApiError.BadRequestError('Пользователь с таким логином или email уже зарегистрирован')
        const hashPassword = await bcrypt.hash(password, 5)
        const activateLink = uuid.v4()
        const str = `SELECT * from public."createUserFunc"(
            '${name}',
            '${surname}',
            '${login}', 
            '${hashPassword}',
            '${email ? email: ''}',
            '${email ? activateLink: ''}',
            'Admin',
            ${birthdate ? `'${birthdate}'` : null}
        )`
        // '${user_role ? user_role : 'Client'}',
        const newUser = await db.query(str)
        const userDto = new UserDto(newUser.rows[0])
        const tokens = tokenService.generateTokens({...userDto}) 
        await tokenService.saveToken(userDto.id_user, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
        // if (email) {
        //     await mailService.sendActivationMail(email, activateLink)
        // }
    }

    async login(login, password) {
        const user = await this.isRegistred(login)
        if (!user) throw ApiError.BadRequestError('Пользователь с таким логином не зарегистрирован')
        const isPasswordEquals = await bcrypt.compare(password, user.password)
        if (!isPasswordEquals) throw ApiError.BadRequestError('Неверный пароль')
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id_user, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.deleteToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnAuthorizedError()
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.isExistTokenByToken(refreshToken)
        if (!tokenFromDB | !userData) throw ApiError.UnAuthorizedError()
        const user = await userService.getUserById(userData.id_user)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id_user, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

    
}

module.exports = new AuthService()