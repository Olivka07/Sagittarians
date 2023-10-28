const db = require('../../db.js')

class TimetableService {
    async getTimetable(date_timetable) {
        const rows = await db.query(`
            SELECT day as date, start_time as timeStart, end_time as timeEnd, name, surname, "User".id_user, login,
                        password, email, linkactivated,
                        user_role, birthdate
            from "Timetable"
            left join "SellersInTimetable"
            on "Timetable".id_timetable = "SellersInTimetable".id_timetable
            left join "User"
            on "SellersInTimetable".id_user = "User".id_user
            where date_timetable = '${date_timetable}'
        `)
        const map = new Map()
        if (rows.rows.length>0) {
            for (let i = 0; i < rows.rows.length; i++) {
                const ceil = rows.rows[i]
                const sellers = map.get(ceil.date)
                if (sellers) {
                    map.set(ceil.date, [{
                        id_user: ceil.id_user,
                        name: ceil.name,
                        surname: ceil.surname,
                        email: ceil.email,
                        login: ceil.login,
                        password: ceil.password,
                        linkactivated: ceil.linkactivated,
                        user_role: ceil.user_role,
                        birthdate: ceil.birthdate,
                        timeStart: ceil.timeStart,
                        timeEnd: ceil.timeEnd,
                    }, ...sellers])
                } else {
                    map.set(ceil.date, [{
                        id_user: ceil.id_user,
                        name: ceil.name,
                        surname: ceil.surname,
                        email: ceil.email,
                        login: ceil.login,
                        password: ceil.password,
                        linkactivated: ceil.linkactivated,
                        user_role: ceil.user_role,
                        birthdate: ceil.birthdate,
                        timeStart: ceil.timeStart,
                        timeEnd: ceil.timeEnd,
                    }])
                }
            }
        }
        return map
    }

    async saveTimetable() {
    }
}

module.exports = new TimetableService()