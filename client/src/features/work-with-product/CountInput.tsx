import {Input, Form} from 'antd'

const {Item} = Form

type FieldType = {
    count_product?: string;
};

export const CountInput = () => {

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
                        strValue.match(/[0-9]{1,}[\.\,]{0,1}[0-9]{0,}$/) && 
                        strValue.indexOf(strValue.match(/[0-9]{1,}[\.\,]{0,1}[0-9]{0,}$/)![0]) === 0
                    ) return Promise.resolve()
                    return Promise.reject()
                }
            }]}
            >
            <Input />
        </Item>
    );
};

