import { createEffect, createEvent, createStore, sample } from "effector";
import { timetableApi } from "shared/api/timetable";
import { ICeil, IMapsWithSellers, IObjFromMap, ISellerDto } from "shared/api/timetable/models";
import { daysInMonth } from "widgets/seller-for-admin/lib";


const changeCeilsHandler = (state: ICeil[], payload: Map<number,ISellerDto[]>):ICeil[] => {
    // const obj = Object.fromEntries(payload.entries())
    // const map = new Map()
    // for (let key of Object.keys(obj)) {
    //     map.set(Number(key), )
    // }
    if (payload.size > 0) {
        const mas: ICeil[] = state!.map((el) => {
            if (el.date && payload.get(el.date)) {
                return {
                    ...el,
                    sellers: [...payload.get(el.date) as ISellerDto[]]
                }
            } else {
                return el
            }
        })
        return mas
    } else {
        return state
    }
}

const createCeilsHandler = (payload: Date | null) => {
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
}

const fromObjToMap = (mapObjDateSellers: IObjFromMap) => {
    const map = new Map()
    for (let key of Object.keys(mapObjDateSellers)) {
        map.set(Number(key), mapObjDateSellers[key])
    }
    return map
}

export const changeCeils = createEvent<Array<ICeil>>()
export const createCeils = createEvent<Date | null>()
export const clearCeils = createEvent<Date | null>()

export const fetchTimetableFx = createEffect('fetch timetable from server', {
    handler: async(date_timetable: string) => {
        try {
            const mapObjDateSellers = await timetableApi.getTimetable(date_timetable)
            const mapDateSellers = fromObjToMap(mapObjDateSellers)
            return mapDateSellers
        } catch(e) {
            throw e
        }
    }
})

export const fetchSaveTimetableFx = createEffect('fetch save timetable in db', {
    handler: async(params:{date_timetable: string, mapsWithSellers: IMapsWithSellers}) => {
        try {
            const mapObjDateSellers = await timetableApi.saveTimetable(params.mapsWithSellers, params.date_timetable)
            const mapDateSellers = fromObjToMap(mapObjDateSellers)
            return mapDateSellers
        } catch(e) {
            throw e
        }
    }
})


export const $ceilsFromDb = createStore<Array<ICeil> | null>(null)
    .on(createCeils, (_, payload) => {
        return createCeilsHandler(payload)
    })
    // .on(fetchSaveTimetableFx.doneData, (state, payload) => {
    //     return changeCeilsHandler(state!, payload)
    // })
    .on(fetchTimetableFx.doneData, (state, payload) => {
        console.log(state)
        return changeCeilsHandler(state!, payload)
    })
    .on(fetchSaveTimetableFx.doneData, (state, payload) => {
        return changeCeilsHandler(state!, payload)
    })

export const $ceils = createStore<Array<ICeil> | null>(null)
    .on(fetchTimetableFx.doneData, (state, payload) => {
        console.log(state)
        return changeCeilsHandler(state!, payload)
    })
    .on(fetchSaveTimetableFx.doneData, (state, payload) => {
        return changeCeilsHandler(state!, payload)
    })
    .on(changeCeils, (_, payload) => {
        return payload
    })
    .on(createCeils, (_, payload) => {
        return createCeilsHandler(payload)
    })
    .on(clearCeils, (_, payload) => {
        return createCeilsHandler(payload)
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

sample({
    clock: fetchSaveTimetableFx.doneData,
    source: $date_timetable,
    fn: (date_timetable, sellers) => {
        return changeCeilsHandler(createCeilsHandler(date_timetable), sellers)
    },
    target: $ceilsFromDb
})

export const $loading = createStore(false)
    .on(fetchSaveTimetableFx, () => true)
    .on(fetchSaveTimetableFx.doneData, () => false)
    .on(fetchSaveTimetableFx.failData, () => false)
    .on(fetchTimetableFx, () => true)
    .on(fetchTimetableFx.doneData, () => false)
    .on(fetchTimetableFx.failData, () => false)