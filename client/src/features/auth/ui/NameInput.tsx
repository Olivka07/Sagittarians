import {Input, Form} from 'antd'
import { useStore } from 'effector-react';
import { modalStore } from 'entities/auth-modal/store';
import React from 'react';

const {Item} = Form

type FieldType = {
    name?: string;
};

export const NameInput = () => {

    return (
        <Item<FieldType>
            label="Имя"
            name="name"
            rules={[{ 
                required: true, 
                message: 'Пожалуйста введите имя: от 2 до 20 символов',
                min: 2,
                max: 20
            }]}
            >
            <Input/>
        </Item>
    );
};

