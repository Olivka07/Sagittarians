const usersService = require('../service/users.service')

class UserController {

    async getUsers(req, res, next) {
        try {
            const users = await usersService.getAllUsers()
            return res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()