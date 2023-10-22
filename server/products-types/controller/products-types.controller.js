const productsTypesService = require('../service/products-types.service.js')
class ProductsTypesController {
    async getTypesProducts(req, res, next) {
        try {
            const typesProducts = await productsTypesService.getTypesProducts()
            res.status(200).json(typesProducts)
        } catch(e) {
            next(e)
        }
    }

    async updateTypesProducts(req, res, next) {
        try {
            const {updateTypes} = req.body
            const typesProducts = await productsTypesService.updateTypesProducts(updateTypes)
            res.status(201).json(typesProducts)
        } catch (e) {
            next(e)
        }
    }

    async addTypesProducts(req, res, next) {
        try {
            const {addTypes} = req.body
            const typesProducts = await productsTypesService.addTypesProducts(addTypes)
            res.status(201).json(typesProducts)
        } catch (e) {
            next(e)
        }
    }

    async deleteTypesProducts(req, res, next) {
        try {
            const deleteTypesIds = req.query.delete_ids
            const typesProducts = await productsTypesService.deleteTypesProducts(deleteTypesIds.split('_'))
            res.status(201).json(typesProducts)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductsTypesController()