import React, {PropsWithChildren, FC, useState, useEffect} from 'react';
import { IOrder } from 'shared/api/order';
import './order-item.css'
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { ModalWindow } from 'shared/ui/modal';
import { ButtonYesConfirm } from 'features/order/ui/btn-confirm-yes/ButtonYesConfirm';
import { ButtonNoConfirm } from 'features/order/ui/btn-confirm-no/ButtonNoConfirm';
import { ButtonCancel } from 'features/order/ui/btn-cancel/ButtonCancel';
import { ButtonDelete } from 'features/order/ui/btn-delete/ButtonDelete';
import { fetchDeleteOrderFx } from 'entities/order/model/store';
import { ROLES } from 'shared/api/users/models';


interface OrderItemProps extends PropsWithChildren {
    orderItem: IOrder
    toggle: (str: string) => void
    role?: ROLES
}
export const OrderItem:FC<OrderItemProps> = ({orderItem, toggle, role}) => {
    const [confirm, setConfirm] = useState(false)
    const [active, setActive] = useState<'cancel' | 'delete'>('cancel')
    
    const changeConfirm = () => {
        setConfirm(!confirm)
    }

    const clickCancel = (e: React.MouseEvent) => {
        e.preventDefault()
        changeConfirm()
        setActive('cancel')
    }

    const clickDelete = (e: React.MouseEvent) => {
        e.preventDefault()
        changeConfirm()
        setActive('delete')
    }

    const clickYesConfirm = async() => {
        try {
            const id = await fetchDeleteOrderFx({active: active, id_order: orderItem.id_order})
            changeConfirm()
            const str = active === 'cancel' ? `Заказ #${id} отменён!` : `Заказ #${id} удалён!`
            toggle(str)
        } catch(e) {
            toggle((e as Error).message)
        }
    }

    useEffect(() => {
        console.log(orderItem)
    }, [])
    return (
        <li className='order-item__li'>
            <ModalWindow
                buttons={[
                    <ButtonYesConfirm key={'yesconfrim'} onClick={clickYesConfirm}/>,
                    <ButtonNoConfirm key={'noconfrim'} onClick={changeConfirm}/>
                ]}
                onCancel={changeConfirm}
                open={confirm}
                title='Подтвердите действие'
            >
                <div className='orders-client__confirmtext'>
                    {active === 'cancel' ?
                        'Вы уверены, что хотите отменить свой заказ?' :
                        'Вы уверены, что хотите удалить заказ?'
                    }
                </div>
            </ModalWindow>
            <Link className='order-item__link' to={`/orders/${orderItem.id_order}`}>
                <Row className='order-item__metacontainer' justify={'space-between'}>
                    <Col className='order-item__meta'>
                        <div className={!orderItem.reason?orderItem.isgiven? 'order-item__meta_given': '':'order-item__meta_canceled'}>
                            {`Заказ #${orderItem.id_order} ${!orderItem.reason?orderItem.isgiven?'(получен)':'(ожидает)': '(отменён)'}`}
                        </div>
                        {orderItem.reason && <div>{`Причина отказа: ${orderItem.reason}`}</div>}
                        <div>{`Дата оформления заказа: ${orderItem.date_take_order}`}</div>
                        <div>{`Стоимость заказа: ${orderItem.price_order} руб.`}</div>
                    </Col>
                    <Col className='order-item__btns'>
                        {!orderItem.isgiven && !orderItem.reason ? <ButtonCancel onClick={clickCancel}/> : <ButtonDelete onClick={clickDelete}/>}
                    </Col>
                </Row>
            </Link>
        </li>
    );
};
