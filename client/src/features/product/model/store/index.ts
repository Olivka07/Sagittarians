import { createEvent, createStore } from "effector";
import { IProduct } from "shared/api/products/models";


export interface IChangeProduct {
    product: IProduct,
    count: string
}

export const changeWeight = createEvent<IChangeProduct>()
export const $inputWeight = createStore<number | string>(0)
    .on(changeWeight, (state, payload) => {
        const strValue = String(payload.count).replace(',', '.')
        try {
            if (payload.product.name_type.toLowerCase()==='шт' && strValue.indexOf('.')>=0) {
                throw new Error('Это не число')
            }
            const num = Number(strValue)
            if (!num || num<0) {
                throw new Error('Это не число')
            }
            return num
        } catch(e) {
            return (e as Error).message
        }
    })
