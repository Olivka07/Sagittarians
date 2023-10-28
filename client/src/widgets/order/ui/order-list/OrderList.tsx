import { OrderMeta } from 'entities/order/ui/order-meta/OrderMeta';
import React, { FC, useEffect, useState } from 'react';
import { IOrder, IOrderProduct, ordersApi } from 'shared/api/order';
import { Spinner } from 'shared/ui/spinner';
import './order-list.css'
import { ItemInOrder } from 'entities/order/ui/order-item/ItemInOrder';

interface OrderListProps {
    id_order:number
}
export const OrderList:FC<OrderListProps> = ({id_order}) => {
    const [orderMeta, setOrderMeta] = useState<IOrder | null>(null)
    const [order, setOrder] = useState<IOrderProduct[] | null>(null)

    const getOrderById = async() => {
        try {
            const res = await ordersApi.getOrderByIdApi(id_order)
            setOrderMeta(res.orderMeta)
            setOrder(res.order)
        } catch(e) {
            throw e
        }
    }

    useEffect(() => {
        getOrderById()
    }, [])

    return (
        <>
            {
                orderMeta && order ?
                <div className='order-list__container'>
                    <OrderMeta orderMeta={orderMeta}/>
                    <ul className='order-list__ul'>
                        {order.map((item) => {
                            return (
                                <ItemInOrder key={item.title_product+item.price} orderProduct={item}/>
                            )
                        })}
                    </ul>
                </div> :
                <Spinner/>
            }
        </>
    );
};

