import { apiInstance } from "../base"
import { ROLES } from "../users/models"
import { IOneOrder, IOrder, ParamsForDeleteOrder } from "./models"

const BASE_URL = '/orders'

export const getOrdersApi = (): Promise<IOrder[]> => {
    const role = localStorage.getItem('role')
    const refreshToken = localStorage.getItem('refresh_token')
    return apiInstance.get(`${BASE_URL}${role === ROLES.SELLER || role === ROLES.ADMIN ? 
        `forseller?refresh_token=${refreshToken}`:
        `?refresh_token=${refreshToken}`}
        `)
}

export const getOrderByIdApi = (
    id_order: number
): Promise<IOneOrder> => {
    const role = localStorage.getItem('role')
    return apiInstance.get(`${BASE_URL}${role === ROLES.SELLER || role === ROLES.ADMIN ? 'forseller': ''}/${id_order}`)
}

export const deleteOrdersApi = (params: ParamsForDeleteOrder): Promise<number> => {
    return apiInstance.delete(`${BASE_URL}?id_order=${params.id_order}&active=${params.active}`)
}

export const giveOrderApi = (id_order: number): Promise<IOrder> => {
    return apiInstance.put(`${BASE_URL}`,{id_order: id_order})
}

export const cancelOrderApi = (
    id_order: number, 
    reason: Array<string | {id_product: number, title_product: string}>
): Promise<IOneOrder> => {
    return apiInstance.put(`${BASE_URL}forseller`,{id_order: id_order, reason: reason})
}