const {Router} = require('express')
const authMiddleware = require('../middlewares/auth-middleware')
const authAdminMiddleware = require('../middlewares/auth-admin-middleware')
const productsTypesController = require('../products-types/controller/products-types.controller.js')

const router = Router()


// Эндпоинт для получения типа продукта
// /api/types-products
router.get('/types-products', productsTypesController.getTypesProducts)

// Эндпоинт для обновления типа продукта
// /api/types-products
router.put('/types-products', authAdminMiddleware, productsTypesController.updateTypesProducts)

// Эндпоинт для создания типа продукта
// /api/types-products
router.post('/types-products', authAdminMiddleware, productsTypesController.addTypesProducts)

// Эндпоинт для удаления типа продукта
// /api/types-products
router.delete('/types-products', authAdminMiddleware, productsTypesController.deleteTypesProducts)

module.exports = router