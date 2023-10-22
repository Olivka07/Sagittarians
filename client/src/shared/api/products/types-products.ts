import { apiInstance } from "../base"
import { IAddTypesProduct, IDeleteTypesProduct, IUpdateTypesProduct, TypeProduct } from "./models"

const BASE_URL = '/types-products'

export const getTypesProducts = ():Promise<TypeProduct[]> => {
    return apiInstance.get<TypeProduct[]>(`${BASE_URL}`)
}

export const updateTypesProducts = (
    params: IUpdateTypesProduct
): Promise<TypeProduct[]> => {
    return apiInstance.put(`${BASE_URL}`, params)
}

export const addTypesProducts = (
    params: IAddTypesProduct
): Promise<TypeProduct[]> => {
    return apiInstance.post(`${BASE_URL}`, params)
}

export const deleteTypesProducts = (
    params: IDeleteTypesProduct
): Promise<TypeProduct[]> => {
    const queryStr = params.deleteTypes.reduce((str, el) => {
        return str+=`${el.id_type_product}_`
    }, '')
    return apiInstance.delete(`${BASE_URL}?delete_ids=${queryStr.slice(0, -1)}`)
}