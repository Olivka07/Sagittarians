const {Router} = require('express')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/auth-admin-middleware.js')
const sellersAdminMiddleware = require('../middlewares/auth-admin-seller-middleware')
const usersController = require('../user/controller/users.controller')

const router = Router()

// /api/users
router.get(
    '/users',
    adminMiddleware,
    usersController.getUsers
)

// /api/sellers
router.get(
    '/sellers',
    sellersAdminMiddleware,
    usersController.getSellers
)

// /api/users
router.delete(
    '/users',
    adminMiddleware,
    usersController.deleteUser
)

module.exports = router