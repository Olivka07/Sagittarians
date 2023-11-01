import {Input, Form} from 'antd'
import { useStore } from 'effector-react';
import { modalStore } from 'entities/auth-modal/store';
import React from 'react';
import './auth-modal.css'


const {Item} = Form

type FieldType = {
    surname?: string;
};

export const SurnameInput = () => {
    
    return (
        <Item<FieldType>
            label="Фамилия"
            name="surname"
            rules={[{ 
                required: true, 
                message: 'Пожалуйста введите фамилию: от 2 до 20 символов',
                min: 2,
                max: 20
            }]}
            >
            <Input/>
        </Item>
    );
};

