const db = require('../../db.js')

class ProductsTypesService {
    async getTypesProducts() {
        const candidate = await db.query(`
            SELECT *
            FROM "TypeProduct"
            ORDER BY id_type_product asc
        `)
        return candidate.rows
    }

    async updateTypesProducts(params) {
        for (let i = 0; i<params.length; i++) {
            await db.query(`
                UPDATE "TypeProduct"
                SET type_product = '${params[i].type_product}'
                WHERE id_type_product = ${params[i].id_type_product}
            `)
        }
        const candidate = await db.query(`
            SELECT *
            FROM "TypeProduct"
            ORDER BY id_type_product asc
        `)
        return candidate.rows
    }

    async addTypesProducts(params) {
        for (let i = 0; i<params.length; i++) {
            await db.query(`
                INSERT INTO "TypeProduct"
                (type_product) VALUES  ('${params[i].type_product}')
            `)
        }
        const candidate = await db.query(`
            SELECT *
            FROM "TypeProduct"
            ORDER BY id_type_product asc
        `)
        return candidate.rows
    }

    async deleteTypesProducts(params) {
        for (let i = 0; i<params.length; i++) {
            await db.query(`
                DELETE FROM "TypeProduct"
                WHERE id_type_product= ${Number(params[i])}
            `)
        }
        const candidate = await db.query(`
            SELECT *
            FROM "TypeProduct"
            ORDER BY id_type_product asc
        `)
        return candidate.rows
    }
}

module.exports = new ProductsTypesService()