import {Input, Form} from 'antd'
import { useStore } from 'effector-react';
import { modalStore } from 'entities/auth-modal/store';
import React from 'react';

const {Item} = Form

type FieldType = {
    password?: string;
};

export const PasswordInput = () => {

    return (
        <Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{ 
                required: true, 
                message: `Пожалуйста введите пароль от 5 до 20 символов  (a-z, 0-9, ".", "-", "_").`, 
                validator: (_,value) => {
                    if (value && value.length <=20 && /[a-zA-Z0-9.-_]{5,20}/.test(value)) return Promise.resolve()
                    return Promise.reject()
                }
            }]}
        >
            <Input type='password'/>
        </Item>
    );
};