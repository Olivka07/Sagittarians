import { useGate, useStore } from 'effector-react';
import { $productList } from 'entities/product/model/store';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { IBasketProduct } from 'shared/api/basket/models';
import './item-basket.css'
import { IProduct } from 'shared/api/products/models';
import DeleteItem from 'features/basket/ui/delete-button/DeleteItem';
import { basketStore } from 'entities/basket';
import {Col, Image, Row} from 'antd'
import { Spinner } from 'shared/ui/spinner';
interface ItemBasketProps {
    itemBasket: IBasketProduct
}
export const ItemBasket:FC<ItemBasketProps> = ({itemBasket}) => {
    const [load, setLoad] = useState<boolean>(true)
    const [product, setProduct] = useState<IBasketProduct|null>(null)
    useEffect(() => {
        if (itemBasket) {
            setProduct(itemBasket)
        }
        setLoad(false)
    }, [itemBasket])

    const deleteBtn = () => {
        basketStore.deleteProductFromBasket(product!.id_product)
        const basketStr = localStorage.getItem('basket')
        const basketStorage: Array<IBasketProduct> = JSON.parse(basketStr!)
        if (basketStorage.length < 2) localStorage.removeItem('basket')
        else localStorage.setItem('basket', JSON.stringify(basketStorage.filter((el) => el.id_product !== product!.id_product)))
    }

    return (
        <>
            {load && <Spinner/>}
            {!load && <li className={`item-basket__container`}>
                {product ?
                    <Row 
                        className={`item-basket__grid ${product?.warning ? 'item-basket__warning':''}`}
                    >
                        <Col
                            span={7}
                        >
                            <Image
                                // width={200}
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
                                    // width={350}
                                />
                                }
                            />
                        </Col>
                        <Col
                            span={8}
                            className='item-basket__meta'
                        >
                            <div>
                                <span>{product.title_product}</span>
                                <span>{product?.warning ? ' (Такое количество товара уже недоступно)':''}</span>
                            </div>
                            <div>{`Количество: ${itemBasket.weight} ${product.name_type.toLowerCase()}.`}</div>
                            <div>{`Цена: ${itemBasket.price} руб.`}</div>
                        </Col>
                        <Col
                            span={8}
                            className='item-basket__button'
                        >
                            <DeleteItem className='item-basket__deletebtn' deleteBtn={deleteBtn}/>
                        </Col>
                    </Row>
                    :
                    <div style={{color: 'red'}}>Возможно продукт был удалён</div>
                }
            </li>}
        </>
    );
};

