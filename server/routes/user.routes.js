const {Router} = require('express')
const authMiddleware = require('../middlewares/auth-middleware')
const usersController = require('../user/controller/users.controller')

const router = Router()

// /api/users
router.get(
    '/users',
    authMiddleware,
    usersController.getUsers
)

module.exports = router