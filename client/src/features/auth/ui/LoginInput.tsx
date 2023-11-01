import {Input, Form} from 'antd'
import './auth-modal.css'


const {Item} = Form

type FieldType = {
    login?: string;
};

export const LoginInput = () => {

    return (
        <Item<FieldType>
            label="Логин"
            name="login"
            rules={[{ 
                required: true, 
                message: `Пожалуйста введите логин от 5 до 20 символов  (a-z, 0-9, ".", "-", "_").`, 
                validator: (_,value) => {
                    if (value && value.length <=20 && /[a-zA-Z0-9.-_]{5,20}/.test(value)) return Promise.resolve()
                    return Promise.reject()
                }
            }]}
            >
            <Input/>
        </Item>
    );
};

