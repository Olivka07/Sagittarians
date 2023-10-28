import React, { FC } from 'react';
import './item-in-order.css'
import { IOrderProduct } from 'shared/api/order';

interface ItemInOrderProps {
    orderProduct: IOrderProduct
}
export const ItemInOrder:FC<ItemInOrderProps> = ({orderProduct}) => {
    return (
        <li className='item-in-order__container'>
            <span className='item-in-order__header'>{`${orderProduct.title_product}`}</span>
            <div className='item-in-order__meta'>
                <span className='item-in-order__item'>{`${orderProduct.weight} ${orderProduct.name_type.toLowerCase()}.`}</span>
                <span className='item-in-order__item'>{`${orderProduct.price} руб.`}</span>
            </div>
        </li>
    );
};

