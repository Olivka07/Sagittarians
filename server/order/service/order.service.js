const db = require('../../db.js')
const ApiError = require('../../exceptions/api-error')
const tokenService = require('../../token/service/token.service')

class OrderService {
    async getOrders (refreshToken) {
        if (!refreshToken) throw ApiError.UnAuthorizedError()
        const userData = tokenService.validateRefreshToken(refreshToken)
        if (!userData) throw ApiError.UnAuthorizedError() // userData.id_user
        const candidate = await db.query(`
            SELECT id_order, date_take_order, isgiven, price_order, reason
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

    async getOrdersForSellersAndAdmin (refreshToken) {
        if (!refreshToken) throw ApiError.UnAuthorizedError()
        const userData = tokenService.validateRefreshToken(refreshToken)
        if (!userData) throw ApiError.UnAuthorizedError() // userData.id_user
        const dateNow = new Date(Date.now()) // Сегодняшняя дата
        const dateLast = new Date(Date.now()-86400000*3) // Дата 3 дня назад
        const strDelete = `
            DELETE FROM "Order"
            WHERE date_take_order <='${dateLast.toLocaleDateString('tr-TR')}'
        `
        await db.query(strDelete)
        const str = `
            select id_order, date_take_order, isgiven, price_order, reason, surname, name
            from "Order"
            left join "User" on "User".id_user="Order".id_user
            ORDER BY date_take_order asc
        `
        const candidate = await db.query(str)
        return candidate.rows.map((el) => {
            return {
                ...el,
                date_take_order: el.date_take_order.toLocaleString('tr-TR')
            }
        })
    }

    async deleteOrder(id_order, active, meta = null) {
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
        if (meta) return 
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
            select id_order, date_take_order, isgiven, price_order, reason
            from "Order"
            where id_order = ${id_order}
        `)
        return {order:order.rows, orderMeta: {
            ...orderMeta.rows[0], date_take_order: orderMeta.rows[0].date_take_order.toLocaleString('tr-TR')
        }}
    }

    async getOrderForSellerById(id_order) {
        const order = await db.query(`
            SELECT title_product, price, weight, name_type, id_product
            FROM "Cart"
            WHERE id_order = ${id_order}
        `)
        const orderMeta = await db.query(`
            select id_order, date_take_order, isgiven, price_order, reason, surname, name
            from "Order"
            left join "User" on "User".id_user="Order".id_user
            where id_order = ${id_order}
        `)
        return {order:order.rows, orderMeta: {
            ...orderMeta.rows[0], date_take_order: orderMeta.rows[0].date_take_order.toLocaleString('tr-TR')
        }}
    }

    async giveOrder(id_order) {
        await db.query(`
            UPDATE "Order"
            SET isgiven=${true}
            WHERE id_order = ${id_order}
        `)
        const order = await db.query(`
            select id_order, date_take_order, isgiven, price_order, reason, surname, name
            from "Order"
            left join "User" on "User".id_user="Order".id_user
            where id_order = ${id_order}
        `)
        return {
            ...order.rows[0],
            date_take_order: order.rows[0].date_take_order.toLocaleString('tr-TR')
        }
    }

    async setReasonOrderForSellersAndAdmin(id_order, reason) {
        const reasonStr = reason.reduce((str, el) => {
            if (typeof el === 'string') {
                return str+= `"${el}", `
            } else {
                return str+= `"${el.title_product}", `
            }
        }, `${!reason.length>1? 'Закончился продукт ': 'Закончились: '}`)
        await db.query(`
            UPDATE "Order" SET reason = '${reasonStr.slice(0, reasonStr.length-2)}'
            where id_order = ${id_order}
        `)
        const paramsObject = reason.filter((el) => {
            if (typeof el !== 'string')
                return el
        })
        await this.deleteOrder(id_order, 'cancel', 'without_delete_order')
        for (let i = 0; i < paramsObject.length; i++) {
            const id_product = paramsObject[i].id_product
            if (id_product !== null) {
                await db.query(`
                    UPDATE "Product"
                    SET count_product = 0
                    WHERE id_product = ${id_product}
                `)
            }
        } 
        return await this.getOrderForSellerById(id_order)
    }
}

module.exports = new OrderService()