import { IProduct } from "../products/models"

export interface IBasketProduct {
    id_product: number
    path_image_product: string
    title_product: string
    price: number
    weight: number
    name_type: string
    warning?: boolean
}

export interface ICreateOrderAnswer {
    message: string
    productsId: number[]
}