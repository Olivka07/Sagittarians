const orderService = require('../service/order.service.js')
class OrderController {
    async getOrders(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const orders = await orderService.getOrders(refreshToken)
            res.status(200).json(orders)
        } catch(e) {
            next(e)
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const id_order = req.query.id_order
            const active = req.query.active
            const id = await orderService.deleteOrder(Number(id_order), active)
            res.status(201).json(id)
        } catch(e) {
            next(e)
        }
    }

    async getOrderById(req, res,next) {
        try {
            const id_order = Number(req.params.id_order)
            const {order, orderMeta} = await orderService.getOrderById(id_order)
            res.status(200).json({order, orderMeta})
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new OrderController()