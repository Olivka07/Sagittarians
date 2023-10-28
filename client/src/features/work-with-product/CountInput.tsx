import {Input, Form, FormInstance} from 'antd'
import { FC } from 'react';

const {Item} = Form

type FieldType = {
    count_product?: string;
};

interface CountInputProps {
    form: FormInstance
}
export const CountInput:FC<CountInputProps> = ({form}) => {

    return (
        <Item<FieldType>
            label="Количество товара"
            name="count_product"
            rules={[{ 
                required: true, 
                message: 'Пожалуйста введите количество товара',
                validator: (_,value) => {
                    const strValue:string = String(value)
                    if (strValue && 
                        (
                            !form.getFieldValue('name_type') || 
                            (form.getFieldValue('name_type') && form.getFieldValue('name_type').toLowerCase() !== 'шт')
                        ) &&
                        strValue.match(/[0-9]{1,}[\.\,]{0,1}[0-9]{0,}$/) && 
                        strValue.indexOf(strValue.match(/[0-9]{1,}[\.\,]{0,1}[0-9]{0,}$/)![0]) === 0
                    ) return Promise.resolve()
                    if (strValue && 
                        (
                            (form.getFieldValue('name_type') && form.getFieldValue('name_type').toLowerCase() === 'шт')
                        ) &&
                        strValue.match(/[0-9]{1,}$/) && 
                        strValue.indexOf(strValue.match(/[0-9]{1,}$/)![0]) === 0
                    ) return Promise.resolve()
                    return Promise.reject()
                }
            }]}
            >
            <Input />
        </Item>
    );
};

