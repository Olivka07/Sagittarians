import React, {ReactNode, FC, useEffect, PropsWithChildren} from 'react';
import {Card, Image, Space, Row} from 'antd'
import { IProduct } from 'shared/api/products/models';
import './product-item.css'

const {Meta} = Card


interface ProductItemProps extends PropsWithChildren {
    product: IProduct
}
export const ProductItem:FC<ProductItemProps> = ({product, children}) => {
    return (
        <Row 
            justify={'center'} 
            style={{
                margin: '5%',
            }}
        >
            <Space 
                size={50}
                align='start'
            >
                <Image
                    width={350}
                    style={{
                        backgroundColor: 'white',
                        boxShadow: '#00d7ff9e 3px 3px 4px 1px',
                        borderRadius: '10px'
                    }}
                    src={product.path_image_product}
                    placeholder={
                    <Image
                        preview={false}
                        src={`${product.path_image_product}`}
                        width={350}
                    />
                    }
                />
                <div className='product-item__card-container'>
                    <Card 
                        title={product.title_product} 
                        bordered={false}
                    >
                        <div className='product-item__meta'>Категория:</div> <div className='product-item__value'>{product.type_product}</div>
                        <div className='product-item__meta'>Цена:</div> <div className='product-item__value'>{product.price_product} руб. за 1 {product.name_type.toLowerCase()}.</div>
                        <div className='product-item__meta'>{product.count_product > 0 ? `Осталось: ${product.count_product} ${product.name_type.toLowerCase()}.` : 'Нет в наличии'}</div>
                    </Card>
                    {children}
                </div>
            </Space>
        </Row>
    );
};

