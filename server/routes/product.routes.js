const {Router} = require('express')
const authMiddleware = require('../middlewares/auth-middleware')
const authAdminMiddleware = require('../middlewares/auth-admin-middleware')
const productsController = require('../products/controller/products.controller.js')

const router = Router()



// Эндпоинт для получения одного продукта
// /api/products
router.get('/products/:id', productsController.getProductById)

// Эндпоинт для получения всех продуктов
// /api/products
router.get('/products', productsController.getProducts)

// Эндпоинт для добавления нового товара
// /api/products
router.post('/products', authAdminMiddleware, productsController.addNewProduct)

// Эндпоинт для удаления товара из каталога
// /api/products
router.delete('/products', authAdminMiddleware, productsController.deleteProductFromCatalog)

// Эндпоинт для изменения товара в каталоге
// /api/products
router.put('/products', authAdminMiddleware, productsController.updateProductInCatalog)

module.exports = router