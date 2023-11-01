import { FC } from "react"
import {Layout} from 'antd'
import 'shared/main.css'
import { LayoutPage } from "shared/ui/layout"
import { HeaderPage } from "widgets/header/ui"
import { AuthModal } from "widgets/auth-modal/ui"
import { OrdersForSellers } from "widgets/orders/ui/orders-for-sellers/OrdersForSellers"
import { FooterPage } from "widgets/footer/ui/Footer"


const OrdersPage:FC = () => {
    const {Content} = Layout
    return (
        <LayoutPage>
            <AuthModal/>
            <HeaderPage/>
            <Content>
                <OrdersForSellers/>
            </Content>
            <FooterPage/>
        </LayoutPage>
    )
}

export default OrdersPage