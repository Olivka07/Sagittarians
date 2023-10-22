import { useStore } from 'effector-react';
import { basketStore } from 'entities/basket';
import React, { useEffect } from 'react';
import { ItemBasket } from '../item-basket/ItemBasket';
import './basket.css'
import { CreateOrder } from 'features/basket/ui/create-order/CreateOrder';
import { IBasketProduct } from 'shared/api/basket/models';
import { addProductInBasket } from 'entities/basket/model/store';
import { ClearBasket } from 'features/basket/ui/clear-basket/ClearBasket';

const Basket = () => {
    const basket = useStore(basketStore.$basket)

    useEffect(() => {
        if (!basket) {
            const basketStr = localStorage.getItem('basket')
            if (basketStr) {
                const basketFromLocalStorage: Array<IBasketProduct> = JSON.parse(basketStr)
                basketFromLocalStorage.forEach((el) => {
                    addProductInBasket(el)
                })
            }
        }
    }, [basket])
    
    console.log(basket)
    return (
        <div className='basket'>
            <h1>Корзина</h1>
            { basket ? 
                <>
                    <div className='basket__meta'>
                        <div className='basket__cost'>
                            {`Общая стоимость заказа: 
                                ${basket.reduce((sum,el) => {
                                    return sum+=el.price
                                }, 0)} руб.
                            `}
                        </div>
                        <div>
                            <CreateOrder className='basket__createorder'/>
                            <ClearBasket className='basket__clearbasket'/>
                        </div>
                    </div>
                    <ul className='basket__list'>
                        { basket.map((product) => {
                            return (
                                <ItemBasket itemBasket={product} key={product.id_product}/>
                            )
                        })}
                    </ul>
                </>
                :
                <h1>Корзина пуста</h1>
            }
        </div>
    );
};

export default Basket;