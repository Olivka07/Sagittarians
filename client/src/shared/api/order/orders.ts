import { apiInstance } from "../base"
import { IOneOrder, IOrder, ParamsForDeleteOrder } from "./models"

const BASE_URL = '/orders'

export const getOrdersApi = (): Promise<IOrder[]> => {
    return apiInstance.get(`${BASE_URL}`)
}

export const getOrderByIdApi = (
    id_order: number
): Promise<IOneOrder> => {
    return apiInstance.get(`${BASE_URL}/${id_order}`)
}

export const deleteOrdersApi = (params: ParamsForDeleteOrder): Promise<number> => {
    return apiInstance.delete(`${BASE_URL}?id_order=${params.id_order}&active=${params.active}`)
}