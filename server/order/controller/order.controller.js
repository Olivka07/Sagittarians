const orderService = require('../service/order.service.js')
class OrderController {
    async getOrders(req, res, next) {
        try {
            // const {refreshToken} = req.cookies
            const refreshToken = req.params.refresh_token
            const orders = await orderService.getOrders(refreshToken)
            res.status(200).json(orders)
        } catch(e) {
            next(e)
        }
    }

    async getOrdersForSellersAndAdmin(req, res, next) {
        try {
            // const {refreshToken} = req.cookies
            const refreshToken = req.params.refresh_token
            const orders = await orderService.getOrdersForSellersAndAdmin(refreshToken)
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

    async getOrderForSellerById(req, res,next) {
        try {
            const id_order = Number(req.params.id_order)
            const {order, orderMeta} = await orderService.getOrderForSellerById(id_order)
            res.status(200).json({order, orderMeta})
        } catch(e) {
            next(e)
        }
    }

    async giveOrder(req, res, next) {
        try {
            const {id_order} = req.body
            const order = await orderService.giveOrder(id_order)
            res.status(201).json(order)
        } catch(e) {
            next(e)
        }
    }

    async setReasonOrderForSellersAndAdmin(req, res, next) {
        try {
            const {id_order, reason} = req.body
            const {order, orderMeta} = await orderService.setReasonOrderForSellersAndAdmin(id_order, reason)
            res.status(201).json({order, orderMeta})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new OrderController()