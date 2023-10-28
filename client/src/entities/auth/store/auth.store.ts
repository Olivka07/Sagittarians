import {createStore, createEvent, createEffect} from 'effector'
import { IUserDto, ROLES, RegistrationParams } from 'shared/api/users/models'
import {LoginParams} from 'shared/api/users/models'
import {usersApi} from 'shared/api'
    

export const fetchLoginFx = createEffect('Fetch login user', {
    handler: async(params: LoginParams) => {
        try {
            const user: IUserDto = await usersApi.login(params)
            return user
        } catch(e) {
            throw e
        }
    }
})

export const fetchRefreshTokenFx = createEffect('Refresh token', {
    handler: async() => {
        try {
            const user: IUserDto = await usersApi.checkAuth()
            return user
        } catch (e) {
            throw e
        }
    }
})

export const fetchLogoutFx = createEffect('Logout effect', {
    handler: async() => {
        await usersApi.logout()
    }
})

export const fetchRegistrationFx = createEffect('Fetch registration', {
    handler: async(params: RegistrationParams) => {
        try {
            const user = await usersApi.registration(params)
            return user
        } catch(e) {
            throw e
        }
    }
})

export const changeAuth = createEvent<ROLES>()
const func = () => {
    const auth = localStorage.getItem('role') as ROLES
    if (!auth) {
        localStorage.setItem('role', ROLES.NO_AUTHORIZED)
        return ROLES.NO_AUTHORIZED
    }
    return auth
}
export const $auth = createStore<ROLES>(func())
    .on(changeAuth, (_, payload) => {
        return payload
    })
    .on(fetchLoginFx.doneData, (_, payload) => {
        return payload.user_role
    })
    .on(fetchLoginFx.failData, () => {
        return ROLES.NO_AUTHORIZED
    })
    .on(fetchRefreshTokenFx.doneData, (_, payload) => {
        return payload.user_role
    })
    .on(fetchRefreshTokenFx.failData, () => {
        return ROLES.NO_AUTHORIZED
    })
    .on(fetchLogoutFx.doneData, () => {
        return ROLES.NO_AUTHORIZED
    })
    .on(fetchRegistrationFx.doneData, (state, payload) => {
        if (payload.user_role === ROLES.SELLER) {
            return state
        }
        return payload.user_role
    })

export const $user = createStore<IUserDto>({} as IUserDto)
    .on(fetchLoginFx.doneData, (_, payload) => {
        return payload
    })
    .on(fetchLoginFx.failData, (_, payload) => {
        return {} as IUserDto
    })
    .on(fetchRefreshTokenFx.doneData, (_, payload) => {
        return payload
    })
    .on(fetchRefreshTokenFx.failData, (_, payload) => {
        return {} as IUserDto
    })
    .on(fetchLogoutFx.doneData, () => {
        return {} as IUserDto
    })
    .on(fetchRegistrationFx.doneData, (_, payload) => {
        return payload
    })

    // .on(fetchLoginFx.failData, () => {
    //     return {} as IUserDto
    // })