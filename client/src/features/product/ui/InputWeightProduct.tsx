import React, { FC } from 'react';
import {Input, Form} from 'antd'
import { IProduct } from 'shared/api/products/models';
import { $inputWeight, changeWeight } from '../model/store';
import { useStore } from 'effector-react';

const {Item} = Form
interface InputWeightProductProps {
    product: IProduct,
}
export const InputWeightProduct: FC<InputWeightProductProps> = ({product}) => {
    const inputWeight = useStore($inputWeight)
    const changeElem = (e:React.ChangeEvent<HTMLInputElement>) => {
        changeWeight({count:e.target.value, product: product})
    }
    return (
        <Input
            placeholder={`0 ${product.name_type.toLowerCase()}.`}
            style={{
                width: '100%'
            }}
            onChange={changeElem}
        />
    );
};

