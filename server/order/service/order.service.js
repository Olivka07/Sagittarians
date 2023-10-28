const db = require('../../db.js')
const ApiError = require('../../exceptions/api-error')
const tokenService = require('../../token/service/token.service')

class OrderService {
    async getOrders (refreshToken) {
        if (!refreshToken) throw ApiError.UnAuthorizedError()
        const userData = tokenService.validateRefreshToken(refreshToken)
        if (!userData) throw ApiError.UnAuthorizedError() // userData.id_user
        const candidate = await db.query(`
            SELECT id_order, date_take_order, isgiven, price_order
            FROM "Order"
            where id_user = ${userData.id_user}
            ORDER BY date_take_order desc
        `)
        return candidate.rows.map((el) => {
            return {
                ...el,
                date_take_order: el.date_take_order.toLocaleString('tr-TR')
            }
        })
    }

    async deleteOrder(id_order, active) {
        if (active==='cancel') {
            const rowsIds = await db.query(`
                SELECT id_product,weight from "Cart"
                WHERE id_order = ${id_order}
            `) 
            for (let i = 0; i < rowsIds.rows.length; i++) {
                const id_product = rowsIds.rows[i].id_product
                const weight = rowsIds.rows[i].weight
                if (id_product !== null) {
                    await db.query(`
                        UPDATE "Product"
                        SET count_product = ${weight} + count_product
                        WHERE id_product = ${id_product}
                    `)
                }
            } 
        }
        await db.query(`
            DELETE FROM "Order"
            WHERE id_order=${id_order}
        `)
        return id_order
    }

    async getOrderById(id_order) {
        const order = await db.query(`
            SELECT title_product, price, weight, name_type
            FROM "Cart"
            WHERE id_order = ${id_order}
        `)
        const orderMeta = await db.query(`
            select id_order, date_take_order, isgiven, price_order
            from "Order"
            where id_order = ${id_order}
        `)
        return {order:order.rows, orderMeta: {
            ...orderMeta.rows[0], date_take_order: orderMeta.rows[0].date_take_order.toLocaleString('tr-TR')
        }}
    }
}

module.exports = new OrderService()