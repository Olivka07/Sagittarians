import React, {useEffect} from 'react';
import {Layout} from 'antd'
import { useParams } from 'react-router';
import {LayoutPage} from 'shared/ui/layout'
import {AuthModal} from 'widgets/auth-modal/ui'
import {HeaderPage} from 'widgets/header/ui'
import { BuyProduct } from 'widgets/buy-product';
import { useStore } from 'effector-react';
import { $typesProducts } from 'entities/product/model/store';


const {Content} = Layout

export const ProductPage: React.FC = () => {
    const {product_id} = useParams()
    
    return (
        <LayoutPage>
            <AuthModal/>
            <HeaderPage/>
            <Content>
                <BuyProduct product_id={Number(product_id)}/>
            </Content>
        </LayoutPage>
    )
}