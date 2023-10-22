import {Input, Form} from 'antd'

const {Item} = Form

type FieldType = {
    price_product?: string;
};

export const PriceInput = () => {

    return (
        <Item<FieldType>
            label="Цена (в руб.)"
            name="price_product"
            rules={[{ 
                required: true, 
                message: 'Пожалуйста введите цену за продукт',
                validator: (_,value) => {
                    const strValue = String(value)
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