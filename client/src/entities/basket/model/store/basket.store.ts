import { createEvent, createStore } from "effector";
import { IBasketProduct } from "shared/api/basket/models";


export const addProductInBasket = createEvent<IBasketProduct>()
export const deleteProductFromBasket = createEvent<number>()
export const clearBasket = createEvent()
export const $basket = createStore<IBasketProduct[] | null>(null)
    .on(addProductInBasket, (state, payload) => {
        if (state) {
            const candidate = state.filter((el) => el.id_product !== payload.id_product) 
            return [payload, ...candidate]
        } 
        return [payload]
    })
    .on(deleteProductFromBasket, (state, payload) => {
        const candidate = state?.filter((el) => el.id_product !== payload)
        if (candidate!.length>0) return candidate
        return null
    })
    .on(clearBasket, () => {
        return null
    })
    