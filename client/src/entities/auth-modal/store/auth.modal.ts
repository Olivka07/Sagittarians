import {createStore, createEvent} from 'effector'


export const modalChange = createEvent()
export const $modal = createStore<boolean>(false)
    .on(modalChange, (state) => !state)

