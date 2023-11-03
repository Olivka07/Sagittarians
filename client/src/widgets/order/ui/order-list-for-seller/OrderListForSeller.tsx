import { OrderMeta } from 'entities/order/ui/order-meta/OrderMeta';
import React, { FC, useEffect, useState } from 'react';
import { IOrder, IOrderProduct, ordersApi } from 'shared/api/order';
import { Spinner } from 'shared/ui/spinner';
import './order-list.css'
import { ItemInOrder } from 'entities/order/ui/order-item/ItemInOrder';
import { ButtonCancel } from 'features/order/ui/btn-cancel/ButtonCancel';
import { ModalWindow } from 'shared/ui/modal';
import { Form } from 'antd';
import { ReasonInput } from 'features/order/ui/input-reason/InputReason';
import { ButtonYesConfirm } from 'features/order/ui/btn-confirm-yes/ButtonYesConfirm';
import { ButtonNoConfirm } from 'features/order/ui/btn-confirm-no/ButtonNoConfirm';
import { useForm, useWatch } from 'antd/es/form/Form';
import { useModal } from 'shared/lib/hooks/modal.hook';

interface OrderListForSellerProps {
    id_order:number
}
export const OrderListForSeller:FC<OrderListForSellerProps> = ({id_order}) => {
    const [orderMeta, setOrderMeta] = useState<IOrder | null>(null)
    const [order, setOrder] = useState<IOrderProduct[] | null>(null)
    const {modal, toggle} = useModal()

    const [confirm, setConfirm] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [form] = useForm()
    const values = useWatch([], form)

    useEffect(() => {
        if (values && Object.values(values).length>0)
        form.validateFields({validateOnly: true}).then(
            () => {
                setDisabled(false)
            },
            () => {
              setDisabled(true)
            },
        );
    }, [values])

    const changeConfirm = () => {
        setConfirm(!confirm)
        form.resetFields()
    }

    const getOrderById = async() => {
        try {
            const res = await ordersApi.getOrderByIdApi(id_order)
            setOrderMeta(res.orderMeta)
            setOrder(res.order)
        } catch(e) {
            throw e
        }
    }

    const clickCancel = () => {
        changeConfirm()
    }

    const clickYesConfirm = async() => {
        try {
            const res = await ordersApi.cancelOrderApi(id_order, form.getFieldValue('reason').map((el:number | string) => {
                if (typeof el === 'number') {
                    return {
                        id_product: el,
                        title_product: order!.find(o => o.id_product === el)!.title_product
                    }
                }
            }))
            setOrderMeta(res.orderMeta)
            setOrder(res.order)
            changeConfirm()
            const str = `Заказ #${res.orderMeta.id_order} отменён!`
            toggle(str)
        } catch(e) {
            toggle((e as Error).message)
        }
    }

    useEffect(() => {
        getOrderById()
    }, [])

    return (
        <div className='orders-client__wrap'>
            <ModalWindow
                buttons={[
                    <ButtonYesConfirm disabled={disabled} text='Отменить' key={'yesconfrim'} onClick={clickYesConfirm}/>,
                    <ButtonNoConfirm text='Назад' key={'noconfrim'} onClick={changeConfirm}/>
                ]}
                onCancel={changeConfirm}
                open={confirm}
                title='Подтвердите действие'
            >
                <div>
                    <Form form={form} className='orders-client__confirmtext'>
                        <ReasonInput products={order}/>
                    </Form>
                </div>
            </ModalWindow>
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
                    {!orderMeta.reason && !orderMeta.isgiven && <ButtonCancel onClick={clickCancel}/>}
                </div> :
                <Spinner/>
            }
        </div>
    );
};

