import React from 'react';
import {Input} from 'antd'
import {productModel} from 'entities/product'
import './product.css'

export const SearchString = () => {
    const {searchChanges} = productModel.store

    const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchChanges(e.target.value)
    }

    return (
        <Input
            className='content__search'
            placeholder='Введите название продукта'
            onChange={changeSearch}
        />
    );
};
