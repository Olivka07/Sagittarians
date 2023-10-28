import { createEffect, createEvent, createStore, forward } from "effector";
import { createGate } from "effector-react";
import { usersApi } from "shared/api";
import { IUserDto } from "shared/api/users/models";

export const fetchSellers = createEffect('Fetch Sellers from server', {
    handler: async() => {
        const candidate = await usersApi.getSellers()
        return candidate
    }
})

export const fetchDeleteSeller = createEffect('Fetch delete Seller from server', {
    handler: async(id_user:number) => {
        const candidate = await usersApi.deleteSeller(id_user)
        return candidate
    }
})

export const addSeller = createEvent<IUserDto>('add new seller')

export const GateSellers = createGate()
forward({
    from: GateSellers.open,
    to: fetchSellers
})


export const $loading = createStore(false)
    .on(fetchSellers, () => true)
    .on(fetchSellers.doneData, () => false)
    .on(fetchSellers.failData, () => false)
    .on(fetchDeleteSeller, () => true)
    .on(fetchDeleteSeller.doneData, () => false)
    .on(fetchDeleteSeller.failData, () => false)

export const $sellers = createStore<IUserDto[] | null>(null)
    .on(fetchSellers.doneData, (_, payload) => {
        return payload
    })
    .on(addSeller, (state, payload) => {
        if (state)
            return [payload, ...state]
        return [payload]
    })
    .on(fetchDeleteSeller.doneData, (state, payload) => {
        const candidate = state!.filter((el) => el.id_user!==payload)
        if (candidate.length>0) return candidate
        return null
    })