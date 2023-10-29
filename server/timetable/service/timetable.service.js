const db = require('../../db.js')

class TimetableService {
    async getTimetable(date_timetable) {
        const rows = await db.query(`
            SELECT day as date, start_time as "timeStart", end_time as "timeEnd", name, surname, "User".id_user, login,
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
        return Object.fromEntries(map.entries())
    }

    async saveTimetable(date_timetable, mapsWithSellers) {
        const id_timetableRows = await db.query(`
            select id_timetable 
            from "Timetable"
            where date_timetable = '${date_timetable}'
        `)
        let id_timetable = id_timetableRows.rows[0]? id_timetableRows.rows[0] : null
        if (!id_timetable) {
            id_timetable = await db.query(`
                INSERT INTO "Timetable" (date_timetable) values ('${date_timetable}')
                returning id_timetable
            `)
        } else {
            id_timetable = id_timetable.id_timetable
        }
        
        const masNewSellers = mapsWithSellers.masNewSellers
        const masUpdateSellers = mapsWithSellers.masUpdateSellers
        const masDeleteSellers = mapsWithSellers.masDeleteSellers
        if (masNewSellers.size !==0) {
            for (let key of Object.keys(masNewSellers)) {
                const sellers = masNewSellers[key]
                for (let i = 0; i < sellers.length; i++) {
                    const str = `
                        INSERT INTO "SellersInTimetable"
                        (id_timetable, id_user, day, 
                        start_time, end_time)
                        VALUES (${id_timetable}, ${sellers[i].id_user}, ${Number(key)}, 
                        '${sellers[i].timeStart? sellers[i].timeStart : 'Пусто'}',
                        '${sellers[i].timeEnd? sellers[i].timeEnd : 'Пусто'}')
                    `
                    await db.query(str)
                }
            }
        }
        if (masUpdateSellers.size !==0) {
            for (let key of Object.keys(masUpdateSellers)) {
                const sellers = masUpdateSellers[key]
                for (let i = 0; i < sellers.length; i++) {
                    const str = `
                        UPDATE "SellersInTimetable" SET
                        start_time = ${sellers[i].timeStart? `'${sellers[i].timeStart}'` : 'Пусто'},
                        end_time = ${sellers[i].timeEnd? `'${sellers[i].timeEnd}'` : 'Пусто'}
                        WHERE id_timetable = ${id_timetable} AND id_user = ${sellers[i].id_user} AND
                        day = ${Number(key)}
                    `
                    await db.query(str)
                }
            }
        }

        if (masDeleteSellers.size !== 0) {
            for (let key of Object.keys(masDeleteSellers)) {
                const sellers = masDeleteSellers[key]
                for (let i = 0; i < sellers.length; i++) {
                    await db.query(`
                        DELETE FROM "SellersInTimetable"
                        WHERE id_timetable = ${id_timetable} AND id_user = ${sellers[i].id_user} AND
                        day = ${Number(key)}
                    `)
                }
            }
        }
        const objMap = await this.getTimetable(date_timetable)
        return objMap
    }
}

module.exports = new TimetableService()