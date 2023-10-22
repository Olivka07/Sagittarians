const productsService = require('../service/products.service')

class ProductsController {
    async getProducts(req, res, next) {
        try {
            if (req.query.filters) {
                const products = await productsService.getProducts(req.query.title, req.query.filters.split('_'))
                res.status(200).json(products)
            } else {
                res.status(200).json([])
            }
        } catch (e) {
            next(e)
        }
    }

    async addNewProduct(req, res, next) {
        try {
            const params = req.body
            const candidate = await productsService.addNewProduct(params)
            res.status(201).json(candidate)
        } catch(e) {
            next(e)
        }
    }

    async deleteProductFromCatalog(req, res, next) {
        try {
            const id_product = Number(req.query.id_product)
            await productsService.deleteProductFromCatalog(id_product)
            res.status(200).json(id_product)
        } catch(e) {
            next(e)
        }
    }

    async updateProductInCatalog(req, res, next) {
        try {
            const params = req.body
            const candidate = await productsService.updateProductInCatalog(params)
            res.status(201).json(candidate)
        } catch(e) {
            next(e)
        }
    }

    async getProductById(req, res, next) {
        try {
            const id = Number(req.params.id)
            const candidate = await productsService.getProductById(id)
            res.status(200).json(candidate)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductsController()