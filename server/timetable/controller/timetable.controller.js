const timetableService = require('../service/timetable.service.js')
class TimetableController {
    async getTimetable(req, res, next) {
        try {
            const date_timetable = req.query.date_timetable
            const objMapDateSellers = await timetableService.getTimetable(date_timetable)
            res.status(200).json(objMapDateSellers)
        } catch(e) {
            next(e)
        }
    }

    async saveTimetable(req, res, next) {
        try {
            const {date_timetable, mapsWithSellers} = req.body
            // console.log(mapsWithSellers.masNewSellers['1'])
            const objMapDateSellers = await timetableService.saveTimetable(date_timetable, mapsWithSellers)
            res.status(201).json(objMapDateSellers)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new TimetableController()