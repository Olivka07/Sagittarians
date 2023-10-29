import {Input, Form} from 'antd'
import React from 'react';

const {Item} = Form

type FieldType = {
    reason?: string;
};

export const ReasonInput = () => {

    return (
        <Item<FieldType>
            label="Укажите причину:"
            name="reason"
            rules={[{ 
                required: true,
                message: 'Пожалуйста укажите причину',
            }]}
            >
            <Input/>
        </Item>
    );
};

