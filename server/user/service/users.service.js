const db = require('../../db')

class UsersService {
    async getUserById(id_user) {
        const candidate = await db.query(`SELECT * FROM "User" WHERE id_user=${id_user}`)
        if (candidate.rowCount === 0) return false
        return candidate.rows[0]
    }

    async getAllUsers(role) {
        if (role) {
            const users = await db.query(`SELECT * FROM "User" where user_role = '${role}'`)
            return users.rows.map((el) => {
                return {
                    ...el,
                    birthdate: el.birthdate ? el.birthdate.toLocaleString('tr-TR').split(' ')[0] : null
                }
            })
        }
    }

    async deleteUser(id_user) {
        await db.query(`
            DELETE FROM "User" 
            WHERE id_user = ${id_user}
        `)
        return id_user
    }
}

module.exports = new UsersService()