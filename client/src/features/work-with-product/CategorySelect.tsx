import {Input, Form, Select} from 'antd'
import { useGate, useStore } from 'effector-react';
import { $typesProducts } from 'entities/product/model/store';

const {Item} = Form

type FieldType = {
    type_product?: string;
};

export const CategorySelect = () => {
    const typesProducts = useStore($typesProducts)

    return (
        <Item<FieldType>
            label="Категория: "
            name="type_product"
            rules={[{ 
                required: true, 
                message: 'Укажите категорию продукта'
            }]}
            >
            <Select>
                {typesProducts.map((typeProducts) => {
                    return (
                        <Select.Option key={typeProducts.type_product+Date.now()} value={typeProducts.type_product}>{typeProducts.type_product}</Select.Option>
                    )
                })}
            </Select>
        </Item>
    );
};

