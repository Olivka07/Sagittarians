const {Router} = require('express')
const authMiddleware = require('../middlewares/auth-middleware')
const authClientMiddleware = require('../middlewares/auth-client-middleware')
const orderController = require('../order/controller/order.controller.js')

const router = Router()


// Запрос на получение одного заказа по id
// /api/orders/:id_order
router.get('/orders/:id_order', authClientMiddleware, orderController.getOrderById)

// Запрос на получение всех заказов пользователем
// /api/orders
router.get('/orders', authClientMiddleware, orderController.getOrders)

// Запрос на получение всех заказов пользователем
// /api/orders
router.delete('/orders', authClientMiddleware, orderController.deleteOrder)

module.exports = router