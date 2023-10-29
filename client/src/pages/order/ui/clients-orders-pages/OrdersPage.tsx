import { FC } from "react"
import {Layout} from 'antd'
import 'shared/main.css'
import { LayoutPage } from "shared/ui/layout"
import { HeaderPage } from "widgets/header/ui"
import { AuthModal } from "widgets/auth-modal/ui"
import { OrdersByClients } from "widgets/orders/ui/orders-clients/OrdersByClients"


export const OrdersPage:FC = () => {
    const {Content} = Layout
    return (
        <LayoutPage>
            <AuthModal/>
            <HeaderPage/>
            <Content>
                <OrdersByClients/>
            </Content>
        </LayoutPage>
    )
}