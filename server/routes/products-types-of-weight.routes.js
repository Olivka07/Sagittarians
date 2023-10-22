const {Router} = require('express')
const authMiddleware = require('../middlewares/auth-middleware')
const authAdminMiddleware = require('../middlewares/auth-admin-middleware')
const productsTypesOfWeightController = require('../products-types-of-weight/controller/products-types-of-weight.controller.js')

const router = Router()


// Эндпоинт для получения всех типов измерения продуктов
// /api/types-of-weight
router.get('/types-of-weight', authAdminMiddleware, productsTypesOfWeightController.getTypesOfWeightProducts)

// Эндпоинт для обновления типа размерности продукта
// /api/types-of-weight
router.put('/types-of-weight', authAdminMiddleware, productsTypesOfWeightController.updateTypesOfWeightProducts)

// Эндпоинт для создания типа размерности продукта
// /api/types-of-weight
router.post('/types-of-weight', authAdminMiddleware, productsTypesOfWeightController.addTypesOfWeightProducts)

// Эндпоинт для удаления типа размерности продукта
// /api/types-of-weight
router.delete('/types-of-weight', authAdminMiddleware, productsTypesOfWeightController.deleteTypesOfWeightProducts)

module.exports = router