import {Routes, Route, Navigate} from 'react-router-dom'
import {PATH_PAGE} from 'shared/lib/react-router'
import {Loadable} from 'shared/ui/loadable'
import React, {FC, lazy, ReactElement, useEffect, useMemo} from 'react'
import { useStore } from 'effector-react'
import { $auth } from 'entities/auth/store/auth.store'
import { ROLES } from 'shared/api/users/models'

const CatalogPage = Loadable(lazy(() => import('pages/catalog')))
const ProductPage = Loadable(lazy(() => import('pages/product')))
const Page404 = Loadable(lazy(() => import('pages/page-404')))
const DirectoriesPage = Loadable(lazy(() => import('pages/directories')))
const BasketPage = Loadable(lazy(() => import('pages/basket')))

export const RoutesApp = () => {
    const auth = useStore($auth)

    const mapRoutes = useMemo(() => {
        const commonRoutes = (
            <>
                <Route path='/catalog/:product_id' element={<ProductPage/>}/>
                <Route path={PATH_PAGE.root} element={<CatalogPage/>}/>
                <Route path={PATH_PAGE.page404} element={<Page404/>}/>
                {/* <Route path='*' element={<Navigate to={PATH_PAGE.page404}/>}/> */}
            </>
        )
        return new Map<ROLES, any>([
            [ROLES.ADMIN, ( 
                <Routes>
                    <Route path='/directories' element={<DirectoriesPage/>}/>
                    {commonRoutes}
                </Routes>
            )],
            [ROLES.CLIENT, ( 
                <Routes>
                    <Route path='/basket' element={<BasketPage/>}/>
                    {commonRoutes}
                </Routes>
            )],
            [ROLES.NO_AUTHORIZED, ( 
                <Routes>
                    {commonRoutes}
                </Routes>
            )],
            [ROLES.SELLER, ( 
                <Routes>
                    {commonRoutes}
                </Routes>
            )]
        ])
    }, [])
    return mapRoutes.get(auth)
}