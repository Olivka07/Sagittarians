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