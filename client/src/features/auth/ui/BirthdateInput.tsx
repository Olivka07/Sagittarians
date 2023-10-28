import {Input, Form, DatePicker, ConfigProvider} from 'antd'
import {locale} from 'shared/config/index'
import dayjs from 'dayjs';
import { useStore } from 'effector-react';
import { modalStore } from 'entities/auth-modal/store';
import React from 'react';

const {Item} = Form

type FieldType = {
    birthdate?: string;
};

const dateFormat = 'DD.MM.YYYY'

export const BirthdateInput = () => {

    return (
        <Item<FieldType>
            label="Дата рождения"
            name="birthdate"
            initialValue={dayjs('01/01/2000', dateFormat)}
            rules={[{ 
                required: true, 
                message: `Пожалуйста введите дату рождения сотрудника`, 
                validator: (_,value) => {
                    const dateStr = value['$d'].toLocaleDateString()
                    const dateStrTokens = dateStr.split('.')
                    const myDate = new Date(dateStrTokens[2], dateStrTokens[1]-1, dateStrTokens[0])

                    const upDate = new Date()
                    const downDate = new Date(1940, 0, 1)

                    if (myDate < upDate && myDate > downDate) {
                        return Promise.resolve()
                    } else {
                        return Promise.reject()
                    }
                }
            }]}
        >
            <DatePicker 
                format={dateFormat} 
                locale={locale}
            />
        </Item>
    );
};