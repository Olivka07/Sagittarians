export interface IOrder {
    id_order: number
    isgiven: boolean
    date_take_order: string
    price_order: number
    reason: string
    name?: string
    surname?: string
}

export interface IOrderProduct {
    id_product: number
    title_product: string 
    price: number 
    weight:number 
    name_type: string
}

export interface IOneOrder {
    order: IOrderProduct[]
    orderMeta: IOrder
}

export interface ParamsForDeleteOrder {
    id_order: number
    active: 'cancel' | 'delete'
}