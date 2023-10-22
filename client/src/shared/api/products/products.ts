// import { createEffect, createStore } from "effector";
// import { IProduct } from "./models";
// import { apiInstance } from "../base";

import { apiInstance } from "../base"
import { IAddProduct, IProduct, TypeOfWeight, TypeProduct, TypesProducts } from "./models"
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const BASE_URL = '/products'

// export const fetchAllProducts = createEffect('Fetch all products', {
//     handler: () => apiInstance.get<IProduct[]>(`${BASE_URL}`)
// })

// export const $products = createStore<IProduct[]>([])
//     .on(fetchAllProducts.doneData, (_, payload) => {
//         return [...payload]
//     })
//     .on(fetchAllProducts.failData, () => {
//         return []
//     })
export interface IGetProductListParams {
    limit?: number
    categoryId?: number | null,
    title?: string
    filters?: CheckboxValueType[]
}

export const getProductList = (
    params: IGetProductListParams
):Promise<IProduct[]> => {
    if (params.filters) {
        return apiInstance.get<IProduct[]>(`${BASE_URL}?title=${params.title}&filters=${params.filters?.join('_')}`)
    } else return new Promise(res => res([]))
}

export const getProductById = (
    id: number
):Promise<IProduct> => {
    return apiInstance.get<IProduct>(`${BASE_URL}/${id}`)
}


export const addNewProduct = (params: IAddProduct):Promise<IProduct> => {
    return apiInstance.post<IProduct>(`${BASE_URL}`, params)
}

export const deleteProductFromCatalog = (
    id_product:number
):Promise<number> => {
    return apiInstance.delete<number>(`${BASE_URL}?id_product=${id_product}`)
}

export const updateProductInCatalog = (
    product: IProduct
):Promise<IProduct> => {
    return apiInstance.put(`${BASE_URL}`, product)
}