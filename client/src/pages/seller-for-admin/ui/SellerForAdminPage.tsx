import React, {useEffect} from 'react';
import {Layout} from 'antd'
import {LayoutPage} from 'shared/ui/layout'
import {AuthModal} from 'widgets/auth-modal/ui'
import {HeaderPage} from 'widgets/header/ui'
import { SellerForAdmin } from 'widgets/seller-for-admin/ui/SellerForAdmin';
import { FooterPage } from 'widgets/footer/ui/Footer';


const {Content} = Layout

export const SellerForAdminPage: React.FC = () => {

    return (
        <LayoutPage>
            <AuthModal/>
            <HeaderPage/>
            <Content>
                <SellerForAdmin/>
            </Content>
            <FooterPage/>
        </LayoutPage>
    )
}

