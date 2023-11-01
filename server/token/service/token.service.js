const jwt = require('jsonwebtoken')
const config = require('config')
const db = require('../../db')
require('dotenv').config()


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken, 
            refreshToken
        }
    }

    async isExistToken(id_user) {
        const candidate = await db.query(`SELECT COUNT(*) FROM "Token" where id_user=${id_user}`)
        if (Number(candidate.rows[0].count) === 0) return false
        return true
    }

    async isExistTokenByToken(token) {
        const candidate = await db.query(`SELECT * FROM "Token" where "refreshToken"='${token}'`)
        if (candidate.rowCount === 0) return false
        return candidate.rows[0]
    }

    async saveToken(id_user, refreshToken) {
        const isExist = await this.isExistToken(id_user)
        if (isExist) {
            let str = `UPDATE "Token" set "refreshToken"='${refreshToken}' where id_user = ${id_user} returning *`
            return await db.query(str)
        }
        let str = `INSERT INTO "Token" (id_user, "refreshToken") VALUES (${id_user}, '${refreshToken}') returning *`
        return await db.query(str)
    }

    async deleteToken(refreshToken) {   
        return await db.query(`DELETE FROM "Token" WHERE "refreshToken"='${refreshToken}' returning *`)
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch(e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch(e) {
            return null
        }
    }
}

module.exports = new TokenService()