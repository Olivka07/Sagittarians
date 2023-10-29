import React from 'react';
import {Layout} from 'antd'
import {LayoutPage} from 'shared/ui/layout'
import {AuthModal} from 'widgets/auth-modal/ui'
import {HeaderPage} from 'widgets/header/ui'
import { useGate, useStore } from 'effector-react';
import { WorkWithTimetable } from 'widgets/seller-for-admin/ui/WorkWithTimetable';
import { $loading, $sellers, GateSellers } from 'entities/users/model/store';
import { Spinner } from 'shared/ui/spinner';


const {Content} = Layout

export const SellerTimetablePage: React.FC = () => {
    const loading = useStore($loading)
    const sellers = useStore($sellers)
    useGate(GateSellers)
    return (
        <LayoutPage>
            <AuthModal/>
            <HeaderPage/>
            <Content>
                {loading && <Spinner/>}
                {sellers && <WorkWithTimetable sellers={sellers}/>}
            </Content>
        </LayoutPage>
    )
}

