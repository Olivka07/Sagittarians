import { useEffect } from 'react'
import {RoutesApp, withProviders} from './prvodiers'
import {authStore} from 'entities/auth/store'
import { useGate } from 'effector-react'
import { productsGate } from 'entities/product/model/store'


const App = () => {
    const {fetchRefreshTokenFx} = authStore
    useEffect(() => {
        if (localStorage.getItem('token'))
            fetchRefreshTokenFx()
    }, [])
    return (
        <RoutesApp/>
    )
}

export default withProviders(App)