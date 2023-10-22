const db = require('../../db.js')

class ProductsTypesOfWeightService {
    async getTypesOfWeightProducts() {
        const candidate = await db.query(`
            SELECT *
            FROM "TypeOfWeight"
            ORDER BY id_type asc
        `)
        return candidate.rows
    }

    async updateTypesOfWeightProducts(params) {
        for (let i = 0; i<params.length; i++) {
            await db.query(`
                UPDATE "TypeOfWeight"
                SET name_type = '${params[i].name_type}'
                WHERE id_type = ${params[i].id_type}
            `)
        }
        const candidate = await db.query(`
            SELECT *
            FROM "TypeOfWeight"
            ORDER BY id_type asc
        `)
        return candidate.rows
    }

    async addTypesOfWeightProducts(params) {
        for (let i = 0; i<params.length; i++) {
            await db.query(`
                INSERT INTO "TypeOfWeight"
                (name_type) VALUES  ('${params[i].name_type}')
            `)
        }
        const candidate = await db.query(`
            SELECT *
            FROM "TypeOfWeight"
            ORDER BY id_type asc
        `)
        return candidate.rows
    }

    async deleteTypesOfWeightProducts(params) {
        for (let i = 0; i<params.length; i++) {
            await db.query(`
                DELETE FROM "TypeOfWeight"
                WHERE id_type= ${Number(params[i])}
            `)
        }
        const candidate = await db.query(`
            SELECT *
            FROM "TypeOfWeight"
            ORDER BY id_type asc
        `)
        return candidate.rows
    }
}

module.exports = new ProductsTypesOfWeightService()