import {Input, Form, Select} from 'antd'
import { useGate, useStore } from 'effector-react';
import { $typesOfWeight, GateTypesOfWeight } from 'entities/product/model/store';

const {Item} = Form

type FieldType = {
    name_type?: string;
};

export const MeasuringSelect = () => {
    useGate(GateTypesOfWeight)
    const typesOfWeight = useStore($typesOfWeight)
    return (
        <Item<FieldType>
            label="за 1"
            name="name_type"
            rules={[{ 
                required: true, 
                message: 'Укажите в чём продукт считается'
            }]}
            >
            <Select>
                {typesOfWeight && typesOfWeight.map((typeOfWeight) => {
                    return (
                        <Select.Option key={Date.now()+typeOfWeight.id_type} value={typeOfWeight.name_type}>{typeOfWeight.name_type.toLowerCase()}</Select.Option>
                    )
                })}
            </Select>
        </Item>
    );
};