const usersService = require('../service/users.service')

class UserController {

    async getUsers(req, res, next) {
        try {
            const role = req.query.role
            const users = await usersService.getAllUsers(role)
            res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req, res,next) {
        try {
            const id_user = req.query.id_user
            await usersService.deleteUser(Number(id_user))
            res.status(201).json(Number(id_user))
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()