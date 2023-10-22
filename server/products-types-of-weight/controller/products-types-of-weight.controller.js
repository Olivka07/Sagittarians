const productsTypesOfWeightService = require('../service/products-types-of-weight.service.js')
class ProductsTypesOfWeightController {
    async getTypesOfWeightProducts(req, res, next) {
        try {
            const typesOfWeightProducts = await productsTypesOfWeightService.getTypesOfWeightProducts()
            res.status(200).json(typesOfWeightProducts)
        } catch(e) {
            next(e)
        }
    }

    async updateTypesOfWeightProducts(req, res, next) {
        try {
            const {updateTypes} = req.body
            const typesOfWeightProducts = await productsTypesOfWeightService.updateTypesOfWeightProducts(updateTypes)
            res.status(201).json(typesOfWeightProducts)
        } catch (e) {
            next(e)
        }
    }

    async addTypesOfWeightProducts(req, res, next) {
        try {
            const {addTypes} = req.body
            const typesOfWeightProducts = await productsTypesOfWeightService.addTypesOfWeightProducts(addTypes)
            res.status(201).json(typesOfWeightProducts)
        } catch (e) {
            next(e)
        }
    }

    async deleteTypesOfWeightProducts(req, res, next) {
        try {
            const deleteTypesIds = req.query.delete_ids
            const typesOfWeightProducts = await productsTypesOfWeightService.deleteTypesOfWeightProducts(deleteTypesIds.split('_'))
            res.status(201).json(typesOfWeightProducts)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductsTypesOfWeightController()