import { Form, Input } from 'antd';
import React from 'react';

const {Item} = Form

type FieldType = {
    time_out?: string;
};

export const InputTimeOut = () => {
    return (
        <Item<FieldType>
            label="Окончание рабочего дня: "
            name="time_out"
            rules={[{ 
                required: true, 
                message: 'Пожалуйста введите время окончания рабочего дня',
            }]}
            >
            <Input />
        </Item>
    );
};

