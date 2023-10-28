import React, { FC, PropsWithChildren, useEffect } from 'react';
import './orders-by-client.css'
import { useGate, useStore } from 'effector-react';
import { $orders, GateOrders, $pending } from 'entities/order/model/store';
import { OrderItem } from '../order-item/OrderItem';
import { useModal } from 'shared/lib/hooks/modal.hook';
import Message from 'shared/ui/message/Message';
import { Spinner } from 'shared/ui/spinner';

export const OrdersByClients:FC<PropsWithChildren> = ({children}) => {
    const {modal, toggle} = useModal()
    const orders = useStore($orders)
    const pending = useStore($pending)
    useGate(GateOrders)
    return (
        <>
            {modal && <Message>{modal}</Message>}
            <div className='orders-client__wrapper'>
                <h1 className='orders-client__header'>Заказы</h1>
                {pending && <Spinner/>}
                {orders ? 
                    <ul className='orders-client__container'>
                        {orders.map((order) => {
                            return (
                                <OrderItem toggle={toggle} orderItem={order} key={order.id_order}/>
                            )
                        })}
                    </ul> :
                    <div className='orders-client__header'>Заказов нет</div>
                }
            </div>
        </>
        
    );
};

