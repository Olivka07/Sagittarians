const {Router} = require('express')
const authMiddleware = require('../middlewares/auth-middleware')
const authClientMiddleware = require('../middlewares/auth-client-middleware')
const basketController = require('../basket/controller/basket.controller.js')

const router = Router()

// Запрос на добавление корзины как заказ
// /api/basket
router.post('/basket', authClientMiddleware, basketController.createOrder)

module.exports = router