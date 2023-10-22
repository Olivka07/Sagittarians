import {Input, Form} from 'antd'

const {Item} = Form

type FieldType = {
    title_product?: string;
};

export const TitleInput = () => {

    return (
        <Item<FieldType>
            label="Название"
            name="title_product"
            rules={[{ 
                required: true, 
                message: 'Пожалуйста введите Название продукта: от 1 до 100 символов',
                min: 1,
                max: 100
            }]}
            >
            <Input/>
        </Item>
    );
};