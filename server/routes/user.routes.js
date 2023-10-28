const {Router} = require('express')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/auth-admin-middleware.js')
const usersController = require('../user/controller/users.controller')

const router = Router()

// /api/users
router.get(
    '/users',
    adminMiddleware,
    usersController.getUsers
)

// /api/users
router.delete(
    '/users',
    adminMiddleware,
    usersController.deleteUser
)

module.exports = router