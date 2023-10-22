const db = require('../../db.js')

class ProductsService {
    async getProducts(title, filters) {
        let queryFilters = `
            WHERE (${filters.map((el) => `type_product = '${el}' or`).join(' ').slice(0, -2)+ ')'}
        `
        let query = `
            SELECT id_product, title_product, path_image_product, price_product, name_type, type_product, count_product
            FROM "Product" LEFT JOIN "TypeOfWeight" 
            ON "Product".id_type = "TypeOfWeight".id_type
            LEFT JOIN "TypeProduct"
            ON "Product".id_type_product = "TypeProduct".id_type_product
            ${queryFilters}
            ${title!=='undefined'? `and (lower(title_product) LIKE lower('%${title}%'))`: ''}
        `
        const candidate = await db.query(query)
        return candidate.rows.map((el) => {
            return {
                ...el,
                price_product: Number(el.price_product),
                count_product: Number(el.count_product)
            }
        })
    }


    async addNewProduct(params) {
        const candidate = await db.query(`
            SELECT * FROM "addProduct" (
                '${params.title_product}', 
                '${params.name_type}', 
                ${params.price_product}, 
                ${params.count_product}, 
                '${params.type_product}', 
                '${params.path_image_product}'
            )
        `)
        return {
            ...candidate.rows[0],
            price_product: Number(candidate.rows[0].price_product),
            count_product: Number(candidate.rows[0].count_product)
        }
    }

    async deleteProductFromCatalog(id_product) {
        await db.query(`
            DELETE FROM "Product" WHERE id_product = ${id_product}
        `)
    }

    async updateProductInCatalog(params) {
        const candidate = await db.query(`
            SELECT * FROM "updateProduct" (
                ${params.id_product},
                '${params.title_product}', 
                '${params.name_type}', 
                ${params.price_product}, 
                ${params.count_product}, 
                '${params.type_product}', 
                '${params.path_image_product}'
            )
        `)
        return {
            ...candidate.rows[0],
            price_product: Number(candidate.rows[0].price_product),
            count_product: Number(candidate.rows[0].count_product)
        }
    }

    async getProductById(id) {
        const candidate = await db.query(`
            SELECT id_product, title_product, path_image_product, price_product, name_type, type_product, count_product
            FROM "Product" LEFT JOIN "TypeOfWeight" 
            ON "Product".id_type = "TypeOfWeight".id_type
            LEFT JOIN "TypeProduct"
            ON "Product".id_type_product = "TypeProduct".id_type_product
            WHERE id_product = ${id}
        `)
        return {
            ...candidate.rows[0],
            price_product: Number(candidate.rows[0].price_product),
            count_product: Number(candidate.rows[0].count_product)
        }
    }
}

module.exports = new ProductsService()