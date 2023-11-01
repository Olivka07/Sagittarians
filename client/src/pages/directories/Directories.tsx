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
import { FooterPage } from "widgets/footer/ui/Footer"


export const Directories:FC = () => {
    const {Content} = Layout
    return (
        <LayoutPage>
            <AuthModal/>
            <HeaderPage/>
            <Content>
                <Row className="directoires__row" justify={'space-around'}>
                    <DirectoryTypeProduct/>
                    <DirectoryTypeOfWeight/>
                </Row>
            </Content>
            <FooterPage/>
        </LayoutPage>
    )
}

