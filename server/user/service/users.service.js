const db = require('../../db')

class UsersService {
    async getUserById(id_user) {
        const candidate = await db.query(`SELECT * FROM "User" WHERE id_user=${id_user}`)
        if (candidate.rowCount === 0) return false
        return candidate.rows[0]
    }

    async getAllUsers() {
        const users = await db.query(`SELECT * FROM "User"`)
        return users.rows
    }
}

module.exports = new UsersService()