import { useStore } from 'effector-react';
import { $auth } from 'entities/auth/store/auth.store';
import { fetchDeleteProductFromCataloFx } from 'entities/product/model/store';
import React, { FC, useState } from 'react';
import { ROLES } from 'shared/api/users/models';
import { useModal } from 'shared/lib/hooks/modal.hook';
import { Button } from 'shared/ui/button';
import Message from 'shared/ui/message/Message';
import { ModalWindow } from 'shared/ui/modal';

interface DeleteProductFromCatalogPrpos {
    id_product: number
    title_product: string
}
export const DeleteProductFromCatalog:FC<DeleteProductFromCatalogPrpos> = ({id_product, title_product}) => {
    const {modal, toggle} = useModal()
    const [confirm, setConfirm] = useState(false)

    const changeConfirm = () => {
        setConfirm(prev => !prev)
    }
    const agree = async() => {
        try {
            await fetchDeleteProductFromCataloFx(id_product)
            setConfirm(prev => !prev)
            toggle(`Продукт "${title_product}" был удалён из каталога`)
        } catch (e) {
            toggle(`При удалении продукта "${title_product}" произошла ошибка`)
        }
    }

    const desAgree = () => {
        setConfirm(prev => !prev)
        toggle(`Отмена удаления продукта "${title_product}"`)
    }
    const auth = useStore($auth)
    if (auth === ROLES.ADMIN) 
        return (
            <>
                {modal && 
                    <Message>
                        {modal}
                    </Message>
                }
                <Button
                    text='&#10060;'
                    onClick={changeConfirm}
                    style={{
                        zIndex: 1,
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        transform: 'translate(-50%, 10px)',
                        backgroundColor: 'rgba(160, 22, 22, 0.377)'
                    }}
                />
                <ModalWindow 
                    buttons={[
                        <Button style={{
                                gridColumn: '2/3',
                                justifySelf: 'center',
                                backgroundColor: 'rgba(199, 61, 61, 0.433)',
                                fontWeight: '700',
                                color: 'rgb(98, 16, 16)'
                            }} key={'yes'} text='ДА' onClick={agree}
                        />,
                        <Button style={{
                                gridColumn: '3/4',
                                justifySelf: 'center',
                            }} 
                            key={'no'} text='НЕТ' onClick={desAgree}
                        />,
                    ]}
                    onCancel={desAgree}
                    open={confirm}
                    title='Подтвердите действие'
                >
                    <div style={{fontSize: '17px', margin: '30px 0px', fontWeight: 'bolder'}}>Вы действительно хотите удалить "{title_product}"</div>
                </ModalWindow>
            </>

        );
    else return <></>
};

