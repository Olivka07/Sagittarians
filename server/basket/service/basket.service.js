const db = require('../../db.js')
const ApiError = require('../../exceptions/api-error')
const tokenService = require('../../token/service/token.service')

class BasketService {
    async createOrder(basket, refreshToken, date) {
        if (!refreshToken) throw ApiError.UnAuthorizedError()
        const userData = tokenService.validateRefreshToken(refreshToken)
        if (!userData) throw ApiError.UnAuthorizedError()
        const ordersInProceccesRows = await db.query(`
            SELECT * FROM "Order"
            WHERE id_user=${userData.id_user} AND isgiven=${false}
        `)
        if (ordersInProceccesRows.rows.length>0) {
            return false
        }

        const sortBasket = basket.sort((a,b) => a.id_product-b.id_product)
        const strQuery = sortBasket.reduce((str, el, index) => {
            if (index!==sortBasket.length-1)
                return str+=`${el.id_product}, `
            return str+=`${el.id_product}`
        }, '')
        const candidate = await db.query(`
            SELECT *
            FROM "Product"
            WHERE id_product in (${strQuery})
            ORDER BY id_product asc
        `)
        const warningProducts = []
        for (let i = 0; i<candidate.rows.length; i++) {
            const itemDb = candidate.rows[i]
            const item = sortBasket[i]
            if (itemDb.count_product<item.weight) {
                warningProducts.push(itemDb.id_product)
            }
        }
        if (warningProducts.length>0) {
            return warningProducts
        }
        for (let i = 0; i<candidate.rows.length; i++) {
            const itemDb = candidate.rows[i]
            const item = sortBasket[i]
            await db.query(`
                UPDATE "Product"
                SET count_product = ${itemDb.count_product-item.weight}
                WHERE id_product = ${itemDb.id_product}
            `)
        }
        const row = await db.query(`
                SELECT * from public."makeOrderFn" (
                ${userData.id_user}, 
                '${date}', 
                ${sortBasket.reduce((sum, el) => {
                    return sum+=el.price
                }, 0)}
            )
        `)
        const id_order = row.rows[0].makeOrderFn
        for (let i = 0; i < sortBasket.length; i++) {
            const item = sortBasket[i]
            await db.query(`
                CALL "addCart"(
                    '${item.title_product}', 
                    ${id_order}, 
                    ${item.price}, 
                    ${item.weight},
                    '${item.name_type}',
                    ${item.id_product}
                )
            `)
        }
        return []
    }
}

module.exports = new BasketService()