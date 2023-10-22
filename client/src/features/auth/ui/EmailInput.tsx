import {Input, Form} from 'antd'
import { useStore } from 'effector-react';
import { modalStore } from 'entities/auth-modal/store';
import React from 'react';

const {Item} = Form

type FieldType = {
    email?: string;
};

export const EmailInput = () => {

    return (
        <Item<FieldType>
            label="Email (необязательно)"
            name="email"
            rules={[{ 
                message: 'Пожалуйста введите корректный email',
                pattern:/[a-zA-Z]{1}([a-zA-Z0-9.-_]{0,}[a-zA-Z0-9])?@[a-z]{1,}\.{1}[a-z]{2,}/g
            }]}
            >
            <Input/>
        </Item>
    );
};

