import {Input, Form} from 'antd'
import { modalStore } from 'entities/auth-modal/store';
import React, {FC,useEffect, useCallback} from 'react';
import {useStore} from 'effector-react'
import type {FormInstance} from 'antd'


const {Item} = Form

type FieldType = {
    repeatPassword?: string;
};

interface RepeatPasswordInputProps {
    form: FormInstance
}

export const RepeatPasswordInput:FC<RepeatPasswordInputProps> = ({form}) => {
   
    const values = Form.useWatch([], form)
    return (
        <Item<FieldType>
            label="Повторите пароль"
            name="repeatPassword"
            dependencies={['password']}
            rules={[
                {
                    required: true,
                    validator: (_, value) => {
                        if (values) {
                            if (values.password === value) return Promise.resolve()
                            return Promise.reject('Пароли не совпадают')
                        }
                    }
                }
            ]}
            >
            <Input type='password'/>
        </Item>
    );
};