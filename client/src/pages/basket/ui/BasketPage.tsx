import { FC, useEffect } from "react"
import {Layout} from 'antd'
import 'shared/main.css'
import { LayoutPage } from "shared/ui/layout"
import { HeaderPage } from "widgets/header/ui"
import { AuthModal } from "widgets/auth-modal/ui"
import Basket from "widgets/basket/ui/basket/Basket"


export const BasketPage:FC = () => {
    const {Content} = Layout
    return (
        <LayoutPage>
            <AuthModal/>
            <HeaderPage/>
            <Content>
                <Basket/>
            </Content>
        </LayoutPage>
    )
}
