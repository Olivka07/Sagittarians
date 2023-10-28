const basketService = require('../service/basket.service.js')
class BasketController {
    async createOrder(req, res, next) {
        try {
            const {basket, date} = req.body
            const {refreshToken} = req.cookies
            const productsId = await basketService.createOrder(basket, refreshToken, date)
            if (!productsId) {
                res.status(200).json({
                    message: 'Отмена заказа. У вас уже есть заказ, который нужно забрать',
                    productsId: [-10]
                })
            }
            else if (productsId.length>0) {
                res.status(200).json({
                    message: 'Отмена заказа. В магазине не осталось нужного вам количества продуктов. Посмотрите в каталоге',
                    productsId: productsId
                })
            } else {
                res.status(201).json({
                    message: 'Заказ оформлен!',
                    productsId: productsId
                })
            }
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new BasketController()