import { useStore } from 'effector-react';
import { basketStore } from 'entities/basket';
import React, { useEffect, useState } from 'react';
import { ItemBasket } from '../item-basket/ItemBasket';
import './basket.css'
import { CreateOrder } from 'features/basket/ui/create-order/CreateOrder';
import { IBasketProduct } from 'shared/api/basket/models';
import { addProductInBasket } from 'entities/basket/model/store';
import { ClearBasket } from 'features/basket/ui/clear-basket/ClearBasket';
import { useModal } from 'shared/lib/hooks/modal.hook';
import Message from 'shared/ui/message/Message';
import { Spinner } from 'shared/ui/spinner';

const Basket = () => {
    const [loading, setLoading] = useState(false)
    const basket = useStore(basketStore.$basket)
    const {modal, toggle} = useModal()

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
    
    const createOrder = async() => {
        try {
            setLoading(true)
            const answer = await basketStore.fetchCreateOrderFx(basket!)
            setLoading(false)
            if (answer.productsId.length===0) {
                localStorage.removeItem('basket')
            }
            toggle(answer.message)
        } catch (e) {
            setLoading(false)
            toggle('Ошибка на сервере')
        }
    }
    return (
        <div className='basket'>
            {loading && <Spinner/>}
            {modal && <Message>{modal}</Message>}
            <h1>Корзина</h1>
            { basket ? 
                <>
                    <div className='basket__meta'>
                        <div className='basket__cost'>
                            {`Общая стоимость заказа: 
                                ${basket.reduce((sum,el) => {
                                    return sum+=el.price
                                }, 0).toFixed(2)} руб.
                            `}
                        </div>
                        <div>
                            <CreateOrder className='basket__createorder' onClick={createOrder}/>
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