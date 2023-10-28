const {Router} = require('express')
const timetableController = require('../timetable/controller/timetable.controller.js')
const authAdminSellerMiddleware = require('../middlewares/auth-admin-seller-middleware.js')

const router = Router()

// Запрос на получение расписания на месяц года
// /api/timetable
router.get('/timetable', authAdminSellerMiddleware, timetableController.getTimetable)

// Запрос на добавление раписания на месяц года
// /api/timetable
router.post('/timetable', authAdminSellerMiddleware, timetableController.getTimetable)

module.exports = router