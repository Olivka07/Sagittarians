import { Form, Input } from 'antd';
import React from 'react';

const {Item} = Form

type FieldType = {
    time_in?: string;
};

export const InputTimeIn = () => {
    return (
        <Item<FieldType>
            label="Начало рабочего дня:"
            name="time_in"
            rules={[{ 
                message: 'Пожалуйста введите начало рабочего дня',
                required: true
            }]}
            >
            <Input />
        </Item>
    );
};

