import { apiInstance } from "../base"
import { ICeil, IMapsWithSellers, IObjFromMap, ISellerDto } from "./models"

const BASE_URL = '/timetable'

export const getTimetable = async(
    date_timetable: string
):Promise<IObjFromMap> => {
    return apiInstance.get(`${BASE_URL}?date_timetable=${date_timetable}`)
}

export const saveTimetable = async(
    mapsWithSellers: IMapsWithSellers,
    date_timetable: string
): Promise<IObjFromMap> => {
    return apiInstance.post(`${BASE_URL}`, {mapsWithSellers, date_timetable})
}