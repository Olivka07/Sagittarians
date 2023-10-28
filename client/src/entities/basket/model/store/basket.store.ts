import { createEffect, createEvent, createStore } from "effector";
import { basketApi } from "shared/api/basket";
import { IBasketProduct } from "shared/api/basket/models";

export const fetchCreateOrderFx = createEffect('Fetch create new order', {
    handler: async(basket:IBasketProduct[]) => {
        const candidate = await basketApi.createOrder(basket)
        return candidate
    }
})
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
    .on(fetchCreateOrderFx.doneData, (state, payload) => {
        if (payload.productsId.length > 0) {
            return state!.map((el) => {
                const candidate = payload.productsId.find((cand) => cand===el.id_product)
                if (candidate) {
                    return {
                        ...el,
                        warning: true
                    }
                }
                return el
            })
        }
        localStorage.removeItem('basket')
        return null
    })
    