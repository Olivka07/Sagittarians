import React, {useEffect} from 'react';
import {Layout} from 'antd'
import { useParams } from 'react-router';
import {LayoutPage} from 'shared/ui/layout'
import {AuthModal} from 'widgets/auth-modal/ui'
import {HeaderPage} from 'widgets/header/ui'
import { BuyProduct } from 'widgets/buy-product';
import { useStore } from 'effector-react';
import { $typesProducts } from 'entities/product/model/store';
import { SellerForAdmin } from 'widgets/seller-for-admin/ui/SellerForAdmin';


const {Content} = Layout

export const SellerForAdminPage: React.FC = () => {

    return (
        <LayoutPage>
            <AuthModal/>
            <HeaderPage/>
            <Content>
                <SellerForAdmin/>
            </Content>
        </LayoutPage>
    )
}

