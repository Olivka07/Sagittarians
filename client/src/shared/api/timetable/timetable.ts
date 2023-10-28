import { ICeil, ISellerDto } from "entities/users/ui/seller-in-timetable/model/model"
import { apiInstance } from "../base"

const BASE_URL = '/timetable'

export const getTimetable = async(
    date_timetable: string
):Promise<Map<number, ISellerDto[]>> => {
    return apiInstance.get(`${BASE_URL}?date_timetable=${date_timetable}`)
}

export const saveTimetable = async(
    ceils: ICeil[]
): Promise<Map<number, ISellerDto[]>> => {
    return apiInstance.post(`${BASE_URL}`, ceils)
}