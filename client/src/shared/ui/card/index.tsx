import React, {MouseEventHandler, FC, PropsWithChildren} from 'react';
import { Link } from 'react-router-dom';
import {Card as CardAntd} from 'antd'
import './card.css'
import { productsApi } from 'shared/api';
import { IProduct } from 'shared/api/products/models';

interface CardProps extends PropsWithChildren{
    product: IProduct
    onClick?: MouseEventHandler
}

const {Meta} = CardAntd

export const Card:FC<CardProps> = ({product, children}) => {
    return (
        <li style={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
            {children}
            <Link 
                to={`/catalog/${product.id_product}`} 
                style={{display: 'inline-block'}}
            >
                <CardAntd
                    hoverable
                    style={{ width: '300px', textAlign: 'center', justifyContent: 'center'}}
                    cover={
                        <img 
                            style={{
                                maxHeight: '80%',
                                maxWidth: '100%',
                                width: 'auto'
                            }}
                            src={product.path_image_product}
                            alt={product.title_product}
                        />
                    }
                >
                    <Meta 
                        className='card__description'
                        title={product.title_product} 
                        description={
                                <>
                                    {`${product.price_product} руб. за 1 ${product.name_type.toLowerCase()}.`}<br/>
                                    <span 
                                        style={{
                                            display: 'inline-block',
                                            marginTop: '5px',
                                            color: 'rgba(0, 0, 0, 0.326)'
                                        }}
                                    >
                                        {product.count_product > 0 ? `Осталось ${product.count_product} ${product.name_type.toLowerCase()}.`: 'Нет в наличии'}
                                    </span>
                                </>
                        }
                    />
                </CardAntd>
            </Link>
        </li>
    );
};
