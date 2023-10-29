const {Router} = require('express')
const authMiddleware = require('../middlewares/auth-middleware')
const authAdminSellerMiddleware = require('../middlewares/auth-admin-seller-middleware')
const authClientMiddleware = require('../middlewares/auth-client-middleware')
const orderController = require('../order/controller/order.controller.js')

const router = Router()


// Запрос на получение одного заказа по id
// /api/orders/:id_order
router.get('/orders/:id_order', authClientMiddleware, orderController.getOrderById)

// Запрос на получение всех заказов пользователем
// /api/orders
router.get('/orders', authClientMiddleware, orderController.getOrders)

// Запрос на получение всех заказов продавцом и администратором
// /api/ordersforseller
router.get('/ordersforseller', authAdminSellerMiddleware, orderController.getOrdersForSellersAndAdmin)

// Запрос на отмену заказа с указанием причины для продавцов и администратора
// /api/ordersforseller
router.put('/ordersforseller', authAdminSellerMiddleware, orderController.setReasonOrderForSellersAndAdmin)

// Запрос на получение одного заказа по id
// /api/orders/:id_order
router.get('/ordersforseller/:id_order', authAdminSellerMiddleware, orderController.getOrderForSellerById)

// Запрос на обновление статуса заказа
// /api/orders
router.put('/orders', authAdminSellerMiddleware, orderController.giveOrder)

// Запрос на получение всех заказов пользователем
// /api/orders
router.delete('/orders', authClientMiddleware, orderController.deleteOrder)

module.exports = router