import React, {FC, useState, useEffect} from 'react';
import {useStore} from 'effector-react'
import { Button } from 'shared/ui/button';
import {authStore} from 'entities/auth/store'
import {modalStore} from 'entities/auth-modal/store'
import {LoginParams, RegistrationParams} from 'shared/api/users/models'
import {Form} from 'antd'
import type {FormInstance} from 'antd'
import { AxiosError } from 'axios';

interface AuthButtonProps {
    form: FormInstance
    toggle: (value: string | null) => void
}
export const AuthButton: FC<AuthButtonProps> = ({form, toggle}) => {
    const {modalChange} = modalStore
    const {fetchLoginFx} = authStore
    const values = Form.useWatch<RegistrationParams>([], form)
    const [disabled, setDisabled] = useState(true)


    useEffect(() => {
        if (values)
        form.validateFields({validateOnly: true}).then(
            () => {
              setDisabled(false)
            },
            () => {
              setDisabled(true)
            },
          );
    }, [values])
    return (
        <Button 
            disabled={disabled}
            key={'Авторизация'}
            onClick={async() => {
                if (values) {
                    try {
                        const user = await fetchLoginFx({login: values.login , password:values.password})
                        modalChange()
                        form.resetFields()
                        toggle(`Доброго времени суток, ${user.name}`)
                    }
                    catch (e) {
                        let err = e as AxiosError
                        if (err.response?.status === 400) {
                            toggle('Неверный логин или пароль')
                        }
                    }
                }
            }}
            text='Войти'
            style={{
                backgroundColor: 'black',
                color: 'white',
                gridColumn: '1/3',
                justifySelf: 'start',
                padding: '0px 20px'
            }}
            htmlType='submit'
        />
    );
};

