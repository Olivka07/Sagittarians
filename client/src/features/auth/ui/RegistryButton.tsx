import React, {FC, useEffect, useState} from 'react';
import { Button } from 'shared/ui/button';
import {authStore} from 'entities/auth/store'
import { useStore } from 'effector-react';
import { modalStore } from 'entities/auth-modal/store'
import type {FormInstance} from 'antd'
import {Form} from 'antd'
import { ROLES } from 'shared/api/users/models';
import { fetchSellers } from 'entities/users/model/store';
import { usersStore } from 'entities/users';

interface RegistryButtonProps {
    form: FormInstance
    toggle: (value: string | null) => void
    role?: ROLES
}
export const RegistryButton:FC<RegistryButtonProps> = ({form, toggle, role}) => {
    const values = Form.useWatch([], form)
    const {fetchRegistrationFx} = authStore
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

    const registration = async() => {
        try {
            const user = await fetchRegistrationFx({
                ...values, 
                user_role: role? role:ROLES.CLIENT, 
                birthdate: values.birthdate? values.birthdate['$d'].toLocaleDateString('tr-TR') : null
            })
            modalChange()
            form.resetFields()
            // console.log({...values, user_role: ROLES.SELLER, birthdate: values.birthdate['$d'].toLocaleDateString('tr-TR')})
            toggle(role? `Новый продавец ${user.surname} ${user.name} зарегистрирован!` : `Поздравляем, ${user.name}! Новый аккаунт создан! `)
            if (role === ROLES.SELLER) {
                usersStore.addSeller(user)
            }
        } catch (e) {
            toggle('Такой пользователь уже был зарегистрирован')
        }
    }

    return (
        <Button 
            key={'btn-reg'}
            disabled={disabled}
            onClick={registration}
            text={`${role? 'Зарегистрировать': 'Зарегистрироваться'}`}
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

