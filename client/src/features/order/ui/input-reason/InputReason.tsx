import {Input, Form, Select} from 'antd'
import React, { FC, useEffect, useMemo } from 'react';
import { IOrderProduct } from 'shared/api/order';

const {Item} = Form

type FieldType = {
    reason?: string;
};

interface ReasonInputProps {
    products: IOrderProduct[] | null
}
export const ReasonInput:FC<ReasonInputProps> = ({products}) => {

    const options = useMemo(() => {
        return products?.map((el) => {
            return {
                label: `Закончился "${el.title_product}"`,
                value: el.id_product ? el.id_product : el.title_product
            }
        })
    }, [])

    return (
        <Item<FieldType>
            label="Укажите причину:"
            name="reason"
            rules={[{ 
                required: true,
                message: 'Пожалуйста укажите причину',
            }]}
            >
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Пожалуйста выберите все причины"
                    options={options}
                />
            {/* <Input/> */}
        </Item>
    );
};

