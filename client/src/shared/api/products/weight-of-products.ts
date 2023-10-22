import {apiInstance} from '../base'
import { TypeOfWeight, IDeleteTypesOfWeighProduct, IUpdateTypesOfWeighProduct, IAddTypesOfWeightProduct } from './models'

const BASE_URL = '/types-of-weight'

export const getTypesOfWeight = ():Promise<TypeOfWeight[]> => {
    return apiInstance.get<TypeOfWeight[]>(`${BASE_URL}`)
}

export const updateTypesOfWeightProducts = (
    params: IUpdateTypesOfWeighProduct
): Promise<TypeOfWeight[]> => {
    return apiInstance.put(`${BASE_URL}`, params)
}

export const addTypesOfWeightProducts = (
    params: IAddTypesOfWeightProduct
): Promise<TypeOfWeight[]> => {
    return apiInstance.post(`${BASE_URL}`, params)
}

export const deleteTypesOfWeightProducts = (
    params: IDeleteTypesOfWeighProduct
): Promise<TypeOfWeight[]> => {
    const queryStr = params.deleteTypes.reduce((str, el) => {
        return str+=`${el.id_type}_`
    }, '')
    return apiInstance.delete(`${BASE_URL}?delete_ids=${queryStr.slice(0, -1)}`)
}