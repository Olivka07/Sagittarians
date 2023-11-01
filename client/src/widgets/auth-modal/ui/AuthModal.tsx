import {Form} from 'antd'
import { useMemo, useState } from 'react'
import {useStore} from 'effector-react'
import {ModalWindow} from 'shared/ui/modal'
import {Button} from 'shared/ui/button'
import { modalStore } from 'entities/auth-modal/store'
import { AuthButton, EmailInput, LoginInput, NameInput, PasswordInput, RegistryButton, RepeatPasswordInput, SurnameInput } from 'features/auth/ui'
import { useForm } from 'antd/es/form/Form'
import { useModal } from 'shared/lib/hooks/modal.hook'
import Message from 'shared/ui/message/Message'

export const AuthModal = () => {
    const {modal, toggle} = useModal()
    const [form] = useForm()
    const {modalChange, $modal} = modalStore
    const authModal = useStore($modal)
    const [registry, setRegistry] = useState<boolean>(false)

    const buttons = useMemo(() => {
        if (registry) {
            return [
                <RegistryButton toggle={toggle} form={form} key={'регр'}/>
            ]
        }
        return [
            <AuthButton toggle={toggle} form={form} key={'автор'}/>
        ]
    }, [registry])
    return (
        <>
            {
                modal && 
                <Message>
                    {modal}
                </Message>
            }
        
            <ModalWindow
                onCancel={() => {
                    modalChange()
                    form.resetFields()
                }}
                title={!registry?'Авторизация':'Регистрация'}
                open={authModal}
                buttons={[
                    ...buttons,
                    <Button 
                        className='button-auth-modal__btnmeta'
                        key={'Вход/Регистрация'}
                        onClick={() => {
                            setRegistry(prev => !prev)
                            form.resetFields()
                        }}
                        text={registry ? 'Вход': 'Регистрация'}
                    />,
                    <Button
                        className='button-auth-modal__btnmeta'
                        key={'Закрыть'}
                        onClick={() => {
                            modalChange()
                            form.resetFields()
                        }}
                        text='Закрыть'
                        htmlType='reset'
                    />
                ]}
            >
                <Form 
                    form={form}
                    name='validateOnly'
                    className='form-auth-modal'
                >
                    {
                        registry &&
                            <>
                                <SurnameInput/>
                                <NameInput/> 
                            </>
                    }
                    <LoginInput/>
                    <PasswordInput/>
                    {registry && 
                        <>
                            <RepeatPasswordInput form={form}/> 
                            <EmailInput/> 
                        </>
                    }
                </Form>
            </ModalWindow>
        </>
    )
}