import { createEffect, createEvent, createStore, sample } from "effector";
import { ICeil, ISellerDto } from "entities/users/ui/seller-in-timetable/model/model";
import { timetableApi } from "shared/api/timetable";
import { daysInMonth } from "widgets/seller-for-admin/lib";


export const changeCeils = createEvent<Array<ICeil>>()
export const createCeils = createEvent<Date | null>()
export const fetchTimetableFx = createEffect('fetch timetable from server', {
    handler: async(date_timetable: string) => {
        try {
            const mapDateSellers = await timetableApi.getTimetable(date_timetable)
            return mapDateSellers
        } catch(e) {
            throw e
        }
    }
})

export const $ceils = createStore<Array<ICeil> | null>(null)
    .on(fetchTimetableFx.doneData, (state, payload) => {
        if (Object.values(payload).length > 0) {
            const mas: ICeil[] = state!.map((el) => {
                if (el.date && payload.get(el.date)) {
                    return {
                        ...el,
                        sellers: payload.get(el.date) as ISellerDto[]
                    }
                } else {
                    return el
                }
            })
            return mas
        } else {
            return state
        }
        
    })
    .on(changeCeils, (_, payload) => {
        return payload
    })
    .on(createCeils, (_, payload) => {
        if (payload) {
            let i = 1
            let key = false
            const dayOfWeek = payload.getDay() === 0 ? 6: payload.getDay()-1
            const maxDays = daysInMonth(payload)
            const mas = new Array(42).fill('').map((el, index) => {
                if (index === dayOfWeek) {
                    key = true
                    return {
                        id: index,
                        sellers: [],
                        date: i++
                    }
                } else if (key && i<=maxDays) {
                    return {
                        id: index,
                        sellers: [],
                        date: i++
                    }
                } else {
                    return {
                        id: index, 
                        sellers: []
                    }
                }
            })
            if (mas[35].date) 
                return mas
            else {
                const splMas = mas.slice(0, 35)
                return splMas
            }
        }
        return new Array(42).fill('').map((el, index) => ({id: index, sellers: []}))
    })

export const changeCurrentCeil = createEvent<ICeil | null>()

export const $currentCeil = createStore<ICeil | null>(null)
    .on(changeCurrentCeil, (_, payload) => {
        return payload
    })


export const changeCurrentSeller = createEvent<ISellerDto | null>()

export const $currentSeller = createStore<ISellerDto | null>(null)
    .on(changeCurrentSeller, (_, payload) => {
        return payload
    })


export const changeDateTimetable = createEvent<Date>()

export const $date_timetable = createStore<Date | null>(null)
    .on(changeDateTimetable, (_, payload) => {
        return payload
    })

sample({
    clock: $date_timetable,
    target: createCeils
})