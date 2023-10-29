import { Form, Input } from 'antd';
import React, { FC } from 'react';

const {Item} = Form

type FieldType = {
    time_in?: string;
};


interface InputTimeInProps {
    time_in: string
}
export const InputTimeIn:FC<InputTimeInProps> = ({time_in}) => {
    return (
        <Item<FieldType>
            initialValue={time_in}
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

