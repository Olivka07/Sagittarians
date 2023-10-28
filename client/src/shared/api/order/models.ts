export interface IOrder {
    id_order: number
    isgiven: boolean
    date_take_order: string
    price_order: number
}

export interface IOrderProduct {
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