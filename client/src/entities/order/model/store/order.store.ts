import { createEffect, createEvent, createStore, forward, sample } from "effector";
import { createGate } from "effector-react";
import { basketApi } from "shared/api/basket";
import { IBasketProduct } from "shared/api/basket/models";
import { IOrder, ParamsForDeleteOrder, ordersApi } from "shared/api/order";


export const fetchGetOrdersFx = createEffect('Fetch orders by Client', {
    handler: async () => {
        try {
            const candidate = await ordersApi.getOrdersApi()
            return candidate
        } catch(e) {
            throw e
        }
    }
})

export const fetchUpdateIsGiven = createEffect('Fetch update is given', {
    handler: async(id_order: number) => {
        try {  
            const candidate = await ordersApi.giveOrderApi(id_order)
            return candidate
        } catch(e) {
            throw e
        }
    }
})

// export const fetchCancelOrder = createEffect('Fetch update reason', {
//     handler: async(id_order: number, reason: string) => {
//         try {  
//             const candidate = await ordersApi.cancelOrderApi(id_order, reason)
//             return candidate
//         } catch(e) {
//             throw e
//         }
//     }
// })

// export const fetchGetOrdersForSellersFx = createEffect('Fetch orders for Seller', {
//     handler: async () => {
//         try {
//             const candidate = await ordersApi.getOrdersApi()
//             return candidate
//         } catch(e) {
//             throw e
//         }
//     }
// })

export const fetchDeleteOrderFx = createEffect('Fetch delete order by id', {
    handler: async ({id_order, active}: ParamsForDeleteOrder) => {
        try {
            const candidate = await ordersApi.deleteOrdersApi({id_order, active})
            return candidate
        } catch(e) {
            throw e
        }
    }
})

export const GateOrders = createGate()
forward({
    from: GateOrders.open,
    to: fetchGetOrdersFx
})

export const $pending = createStore<boolean>(false)

sample({
    clock: fetchGetOrdersFx,
    fn: () => true,
    target: [$pending]
})

sample({
    clock: [fetchGetOrdersFx.doneData, fetchGetOrdersFx.failData],
    fn: () => false,
    target: [$pending]
})

export const $orders = createStore<IOrder[] | null>(null)
    .on(fetchGetOrdersFx.doneData, (_, payload) => {
        if (payload.length > 0) {
            return payload
        }
        return null
    })
    .on(fetchDeleteOrderFx.doneData, (state, payload) => {
        const candidate = state!.filter((el) => el.id_order!==payload)
        if (candidate.length>0) return candidate
        return null
    })
    .on(fetchUpdateIsGiven.doneData, (state, payload) => {
        return state!.map((el) => {
            if (el.id_order === payload.id_order) return payload
            return el
        })
    })