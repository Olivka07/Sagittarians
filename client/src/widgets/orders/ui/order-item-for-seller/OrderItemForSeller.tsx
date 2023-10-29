import React, {PropsWithChildren, FC, useState, useEffect} from 'react';
import { IOrder } from 'shared/api/order';
import './order-item-for-seller.css'
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { ModalWindow } from 'shared/ui/modal';
import { ButtonYesConfirm } from 'features/order/ui/btn-confirm-yes/ButtonYesConfirm';
import { ButtonNoConfirm } from 'features/order/ui/btn-confirm-no/ButtonNoConfirm';
import { ButtonCancel } from 'features/order/ui/btn-cancel/ButtonCancel';
import { ButtonDelete } from 'features/order/ui/btn-delete/ButtonDelete';
import { fetchDeleteOrderFx, fetchUpdateIsGiven } from 'entities/order/model/store';
import { ROLES } from 'shared/api/users/models';
import { Button } from 'shared/ui/button';
import Form, { useForm, useWatch } from 'antd/es/form/Form';
import { ReasonInput } from 'features/order/ui/input-reason/InputReason';
import { ButtonIsGivenOrder } from 'features/order/ui/btn-given-order/ButtonIsGivenOrder';


interface OrderItemForSellerProps extends PropsWithChildren {
    orderItem: IOrder
    toggle: (str: string) => void
    role?: ROLES
}
export const OrderItemForSeller:FC<OrderItemForSellerProps> = ({orderItem, toggle, role}) => {
    

    const updateIsGivenOrder = async(e: React.MouseEvent) => {
        e.preventDefault()
        await fetchUpdateIsGiven(orderItem.id_order)
        toggle(`Статус заказа ${orderItem.id_order} успешно изменён!`)
    }

    
    return (
        <li className='order-item__li'>
            
            <Link className='order-item__link' to={`/ordersbyclients/${orderItem.id_order}`}>
                <Row className='order-item__metacontainer' justify={'space-between'}>
                    <Col className='order-item__meta'>
                        <div className={!orderItem.reason?orderItem.isgiven? 'order-item__meta_given': '': 'order-item__meta_canceled'}>
                            {`Заказ #${orderItem.id_order} ${!orderItem.reason?orderItem.isgiven?'(получен)':'(ожидает)': '(отменён)'}`}
                        </div>
                        {orderItem.reason && <div>{`Причина отказа: "${orderItem.reason}"`}</div>}
                        <div>{`Дата оформления заказа: ${orderItem.date_take_order}`}</div>
                        <div>{`Заказчик: ${orderItem.surname} ${orderItem.name}`}</div>
                        <div>{`Стоимость заказа: ${orderItem.price_order} руб.`}</div>
                    </Col>
                    <Col className='order-item__btns'>
                        {!orderItem.isgiven && !orderItem.reason &&
                            <ButtonIsGivenOrder updateIsGivenOrder={(e:React.MouseEvent) => updateIsGivenOrder(e)}/>
                        }
                    </Col>
                </Row>
            </Link>
        </li>
    );
};
