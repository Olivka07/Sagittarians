import React, { FC } from 'react';
import { IOrder } from 'shared/api/order';
import './order-meta.css'

interface OrderMetaProps {
    orderMeta: IOrder
}
export const OrderMeta:FC<OrderMetaProps> = ({orderMeta}) => {
    return (
        <div className='order-meta__container'>
            <div>{`Заказ #${orderMeta.id_order}`}</div>
            <div>{`Дата заказа: `} 
                <span className='order-meta__span'>{orderMeta.date_take_order}</span>
            </div>
            <div>{`Стоимость заказа: `}
                <span className='order-meta__span'>{`${Number(orderMeta.price_order)} руб.`}</span>
            </div>
            <div 
                
            >
                {`Статус: `}
                <span 
                    className={`order-meta__status_${orderMeta.isgiven?'given':'pending'}`}
                >
                    {orderMeta.isgiven? 'Получен':'Ожидает'}
                </span>
            </div>
        </div>
    );
};

