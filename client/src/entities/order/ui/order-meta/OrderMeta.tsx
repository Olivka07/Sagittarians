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
            {   orderMeta.surname && orderMeta.name &&
                <div>{`Заказчик: `} 
                    <span className='order-meta__span'>{orderMeta.surname + ' ' + orderMeta.name}</span>
                </div>
            }
            <div>{`Стоимость заказа: `}
                <span className='order-meta__span'>{`${Number(orderMeta.price_order)} руб.`}</span>
            </div>
            <div 
            >
                {`Статус: `}
                <span 
                    className={`order-meta__status_${orderMeta.reason? 'cancel' :orderMeta.isgiven?'given':'pending'}`}
                >
                    {orderMeta.reason && `Заказ отменён по причине: "${orderMeta.reason}"`}
                    {!orderMeta.reason ? orderMeta.isgiven?'Получен':'Ожидает':''}
                </span>
            </div>
        </div>
    );
};

