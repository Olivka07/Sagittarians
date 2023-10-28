import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useStore } from 'effector-react';
import { modalStore } from 'entities/auth-modal/store';
import { EmailInput, LoginInput, NameInput, PasswordInput, RegistryButton, RepeatPasswordInput, SurnameInput } from 'features/auth/ui';
import { BirthdateInput } from 'features/auth/ui/BirthdateInput';
import React, { FC } from 'react';
import { ROLES } from 'shared/api/users/models';
import { useModal } from 'shared/lib/hooks/modal.hook';
import { Button } from 'shared/ui/button';
import Message from 'shared/ui/message/Message';
import { ModalWindow } from 'shared/ui/modal';

interface RegistrySellerModalProps {
    
}
export const RegistrySellerModal:FC<RegistrySellerModalProps> = () => {
    const {modal, toggle} = useModal()
    const modalAuth = useStore(modalStore.$modal)
    const changeModalRegistry = () => {
        modalStore.modalChange()
        form.resetFields()
    }
    const [form] = useForm()
    return (
        <>
            {modal && <Message>{modal}</Message>}
            <ModalWindow
                buttons={[
                    <RegistryButton key={'reg-button'} form={form} role={ROLES.SELLER} toggle={toggle}/>,
                    <Button
                        key={'Закрыть'}
                        onClick={changeModalRegistry}
                        text='Закрыть'
                        htmlType='reset'
                    />
                ]}
                onCancel={changeModalRegistry}
                open={modalAuth}
                title='Регистрация продавца'
            >
                <Form
                    form={form}
                >
                    <SurnameInput/>
                    <NameInput/> 
                    <BirthdateInput/>
                    <LoginInput/>
                    <PasswordInput/>
                    <RepeatPasswordInput form={form}/> 
                    <EmailInput/> 
                </Form>
            </ModalWindow>
        </>
    );
};

