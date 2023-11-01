import { FC, useEffect } from "react"
import { Catalog } from "widgets/catalog/ui"
import {Layout, Row} from 'antd'
import 'shared/main.css'
import { LayoutPage } from "shared/ui/layout"
import { HeaderPage } from "widgets/header/ui"
import { SearchString } from "features/product/ui"
import { AuthModal } from "widgets/auth-modal/ui"
import { useGate } from "effector-react"
import { DirectoryTypeProduct } from "widgets/directories"
import { DirectoryTypeOfWeight } from "widgets/directories/ui/DirectoryTypeOfWeight"
import { OrdersByClients } from "widgets/orders/ui/orders-clients/OrdersByClients"
import { useParams } from "react-router"
import { OrderList } from "widgets/order/ui/order-list/OrderList"
import { OrderListForSeller } from "widgets/order/ui/order-list-for-seller/OrderListForSeller"
import { FooterPage } from "widgets/footer/ui/Footer"


const OrderPage:FC = () => {
    const {Content} = Layout
    const {id_order} = useParams()
    return (
        <LayoutPage>
            <AuthModal/>
            <HeaderPage/>
            <Content>
                <OrderListForSeller id_order={Number(id_order)}/>
            </Content>
            <FooterPage/>
        </LayoutPage>
    )
}

export default OrderPage