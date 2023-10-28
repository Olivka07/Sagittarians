import { ProductItem } from 'entities/product/ui';
import {store} from 'entities/product/model'
import React, {FC, useEffect} from 'react';
import {useStore, useGate} from 'effector-react'
import { FullPageWrapper } from 'shared/ui/full-page-wrapper';
import { Spinner } from 'shared/ui/spinner';
import { BuyButton } from 'features/product/ui';
import { InputWeightProduct } from 'features/product/ui/InputWeightProduct';
import { $inputWeight, changeWeight } from 'features/product/model/store';
import './buy-product.css'
import { $auth } from 'entities/auth/store/auth.store';
import { ROLES } from 'shared/api/users/models';
import { changeProductToNull } from 'entities/product/model/store';
import { basketStore } from 'entities/basket';
import { useModal } from 'shared/lib/hooks/modal.hook';
import Message from 'shared/ui/message/Message';
import { Form } from 'antd';
import { IBasketProduct } from 'shared/api/basket/models';


interface BuyProductProps {
    product_id: number
}
export const BuyProduct:FC<BuyProductProps> = ({product_id}) => {
    const [form] = Form.useForm()
    const {modal, toggle} = useModal()
    const loadPending = useStore(store.$loadPending)
    const product = useStore(store.$product)
    const inputWeight = useStore($inputWeight)
    const auth = useStore($auth)

    useGate(store.Gate, product_id)  

    useEffect(() => {
        return (() => {
            changeProductToNull()
            if (product)
                changeWeight({count: '0', product: product})
        })()
    }, [])

    const buyProduct = () => {
        if (typeof inputWeight === 'number') {
            const item = {
                id_product: product!.id_product,
                price: Number((inputWeight*product!.price_product).toFixed(2)),
                weight: inputWeight,
                title_product: product!.title_product,
                path_image_product: product!.path_image_product,
                name_type: product!.name_type
            }
            basketStore.addProductInBasket(item)
            const basketStr = localStorage.getItem('basket')
            const basket:IBasketProduct[] = basketStr ? JSON.parse(basketStr) : []
            if (basket.length>0) {
                localStorage.setItem('basket', JSON.stringify([...basket.filter((el) => el.id_product !== item.id_product), item]))
            } else {
                localStorage.setItem('basket', JSON.stringify([item]))
            }
            toggle(`Продукт "${product!.title_product}" за ${item.price} руб. успешно добавлен в корзину!`)
            changeWeight({count: '0', product: product!})
            form.resetFields()
        }
        
    }
    
    return (
        <>
            { modal && 
                <Message>
                    {modal}
                </Message>
            }
            {loadPending &&
                <Spinner/>
            }
            {!loadPending && product &&
                (
                    <div>
                        <ProductItem product={product}>
                            {auth===ROLES.CLIENT &&
                                <div className='buy-product__cointainer-active'>
                                    <Form form={form}>
                                        <Form.Item
                                            name='input'
                                        >
                                            <InputWeightProduct product={product}/>
                                        </Form.Item>
                                    </Form>
                                    <div
                                        className='buy-product__price'
                                    >
                                        {typeof inputWeight === 'number'? Number((inputWeight*product.price_product).toFixed(2)) + ' руб.': inputWeight}
                                    </div>
                                    <BuyButton 
                                        disabled={product.count_product>0 && typeof inputWeight==='number' && inputWeight<=product.count_product? false : true}
                                        buyProduct={buyProduct}
                                    />
                                </div>
                            }
                        </ProductItem>
                    </div>
                )
            }
        </>
    )
}

