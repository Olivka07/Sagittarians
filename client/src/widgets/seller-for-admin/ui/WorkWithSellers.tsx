import React, { FC, useEffect, useState } from 'react';
import { Button } from 'shared/ui/button';
import { RegistrySellerModal } from './RegistrySellerModal';
import { modalStore } from 'entities/auth-modal/store';
import { usersStore } from 'entities/users';
import { useGate, useStore } from 'effector-react';
import { IUserDto } from 'shared/api/users/models';
import { SellerItem } from 'entities/users/ui';
import ButtonDeleteSeller from 'features/seller-for-admin/ui/btn-delete-seller/ButtonDeleteSeller';
import { ModalWindow } from 'shared/ui/modal';
import { useModal } from 'shared/lib/hooks/modal.hook';
import Message from 'shared/ui/message/Message';


interface WorkWithSellersProps {
    sellers: IUserDto[]
}
export const WorkWithSellers:FC<WorkWithSellersProps> = ({sellers}) => {
    const {modal, toggle} = useModal()
    
    const {modalChange, $modal} = modalStore
    const [modalConfirm, setModalConfirm] = useState<IUserDto | null>(null)

    const changeRegistryModal = () => {
        modalChange()
    }

    const changeModalConfirm = (seller?: IUserDto | React.MouseEvent) => {
        setModalConfirm(prev => {
            if (prev) return null
            return (seller as IUserDto)
        })
    }

    const deleteSeller = async() => {
        try {
            const id = await usersStore.fetchDeleteSeller(modalConfirm!.id_user)
            changeModalConfirm()
            toggle(`Аккаунт "${modalConfirm!.surname} ${modalConfirm!.name}" успешно удалён`)
        } catch(e) {
            changeModalConfirm()
            toggle((e as Error).message)
        }
    }

    return (
        <div className='seller-for-admin__workcontainer'>
            {modal && <Message>{modal}</Message>}
            <ModalWindow
                buttons={[
                    <Button key={'yes'} onClick={deleteSeller} className='seller-for-admin__deleteyes' text='Да'/>,
                    <Button key={'no'} onClick={changeModalConfirm} className='seller-for-admin__deleteno' text='Нет'/>
                ]}
                onCancel={changeModalConfirm}
                open={!!modalConfirm}
                title='Подтвердите ваше действие'
            >
                {modalConfirm && <div>{`Вы точно хотите удалить аккаунт ${modalConfirm!.surname + ' ' + modalConfirm!.name}?`}</div>}
            </ModalWindow>
            <Button
                onClick={changeRegistryModal}
                text='Добавить'
                className='seller-for-admin__openmodal'
            />
            <RegistrySellerModal/>
            <div>
                {sellers.map((el) => {
                    return (
                        <SellerItem key={el.id_user} seller={el}>
                            <ButtonDeleteSeller seller={el} onClick={changeModalConfirm}/>
                        </SellerItem>
                    )
                })}
            </div>
        </div>
    );
};

