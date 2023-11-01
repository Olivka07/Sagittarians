import { FC, useEffect } from "react"
import { Catalog } from "widgets/catalog/ui"
import {Layout} from 'antd'
import 'shared/main.css'
import { LayoutPage } from "shared/ui/layout"
import { HeaderPage } from "widgets/header/ui"
import { SearchString } from "features/product/ui"
import { AuthModal } from "widgets/auth-modal/ui"
import { useGate } from "effector-react"
import { fetchProductListFx, productsGate } from "entities/product/model/store"
import { FooterPage } from "widgets/footer/ui/Footer"


export const CatalogPage:FC = () => {
    useGate(productsGate)
    const {Content} = Layout
    return (
        <LayoutPage>
            <AuthModal/>
            <HeaderPage/>
            <Content>
                <SearchString/>
                <Catalog/>
            </Content>
            <FooterPage/>
        </LayoutPage>
    )
}

