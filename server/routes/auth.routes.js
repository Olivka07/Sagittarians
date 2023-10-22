const {Router} = require('express')
const authMiddleware = require('../middlewares/auth-middleware')
const AuthController = require('../user/controller/auth.controller')

const router = Router()



// api/auth/registration
router.post('/registration', AuthController.registration)
// api/auth/login
router.post('/login', AuthController.login)
// api/auth/logout
router.post('/logout', AuthController.logout)
// api/auth/activate/:link
// router.get('/activate/:link', CORS, UserController.activate)
// api/auth/refresh
router.get('/refresh', AuthController.refresh)

// router.post('/registration', CORS, UserController.registration)


module.exports = router