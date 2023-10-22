import React, {FC, useEffect, useState} from 'react';
import { Button } from 'shared/ui/button';
import {authStore} from 'entities/auth/store'
import { useStore } from 'effector-react';
import { modalStore } from 'entities/auth-modal/store'
import type {FormInstance} from 'antd'
import {Form} from 'antd'
import { ROLES } from 'shared/api/users/models';

interface RegistryButtonProps {
    form: FormInstance
    toggle: (value: string | null) => void
}
export const RegistryButton:FC<RegistryButtonProps> = ({form, toggle}) => {
    const values = Form.useWatch([], form)
    const {fetchRegistrationFx, $auth} = authStore
    const auth = useStore($auth)
    const {modalChange} = modalStore

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
            onClick={async() => {
                try {
                    const user = await fetchRegistrationFx({...values, user_role: ROLES.CLIENT})
                    modalChange()
                    form.resetFields()
                    toggle(`Поздравляем, ${user.name}! Новый аккаунт создан! `)
                } catch (e) {
                    toggle('Такой пользователь уже был зарегистрирован')
                }

            }}
            text='Зарегистрироваться'
            style={{
                backgroundColor: 'black',
                color: 'white',
                gridColumn: '1/3',
                justifySelf: 'start',
                padding: '0px 20px'
            }}
        />
    );
};

