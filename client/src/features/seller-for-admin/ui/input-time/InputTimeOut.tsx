import { Form, Input } from 'antd';
import React, { FC } from 'react';

const {Item} = Form

type FieldType = {
    time_out?: string;
};

interface InputTimeOutProps {
    time_out: string
}
export const InputTimeOut:FC<InputTimeOutProps> = ({time_out}) => {
    return (
        <Item<FieldType>
            initialValue={time_out}
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

