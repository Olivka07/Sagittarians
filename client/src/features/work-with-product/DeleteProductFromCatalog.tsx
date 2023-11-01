import { useStore } from 'effector-react';
import { $auth } from 'entities/auth/store/auth.store';
import { fetchDeleteProductFromCataloFx } from 'entities/product/model/store';
import React, { FC, useEffect, useState } from 'react';
import { ROLES } from 'shared/api/users/models';
import { useModal } from 'shared/lib/hooks/modal.hook';
import { Button } from 'shared/ui/button';
import Message from 'shared/ui/message/Message';
import { ModalWindow } from 'shared/ui/modal';
import './work_with_product.css'

interface DeleteProductFromCatalogPrpos {
    id_product: number
    title_product: string
    toggle: (str: string) => void
}
export const DeleteProductFromCatalog:FC<DeleteProductFromCatalogPrpos> = ({id_product, title_product, toggle}) => {
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
                {/* {modal && 
                    <Message>
                        {modal}
                    </Message>
                } */}
                <Button
                    className='deleteproductfromcatalog'
                    text='&#10060;'
                    onClick={changeConfirm}
                    // style={{
                    //     zIndex: 1,
                    //     position: 'absolute',
                    //     right: '0',
                    //     top: '0',
                    //     transform: 'translate(-50%, 10px)',
                    //     backgroundColor: 'rgba(160, 22, 22, 0.377)'
                    // }}
                />
                <ModalWindow 
                    buttons={[
                        <Button className='yes-delete-confirm-modal-product' key={'yes'} text='ДА' onClick={agree}
                        />,
                        <Button className='no-delete-noconfirm-modal-product' key={'no'} text='НЕТ' onClick={desAgree}
                        />,
                    ]}
                    onCancel={desAgree}
                    open={confirm}
                    title='Подтвердите действие'
                >
                    <div className='delete-from-catalog-text-in-modal'>Вы действительно хотите удалить "{title_product}"</div>
                </ModalWindow>
            </>

        );
    else return <></>
};

