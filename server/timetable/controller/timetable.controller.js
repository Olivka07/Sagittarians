const timetableService = require('../service/timetable.service.js')
class TimetableController {
    async getTimetable(req, res, next) {
        try {
            const date_timetable = req.query.date_timetable
            const mapDateSellers = await timetableService.getTimetable(date_timetable)
            res.status(200).json(mapDateSellers)
        } catch(e) {
            next(e)
        }
    }

    async saveTimetable(req, res, next) {
        try {
            // const ceils = req.
            const date_timetable = req.query.date_timetable
            const mapDateSellers = await timetableService.getTimetable(date_timetable)
            res.status(200).json(mapDateSellers)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new TimetableController()