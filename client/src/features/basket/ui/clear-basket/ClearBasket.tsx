import React, { FC } from 'react';
import { Button } from 'shared/ui/button';
import { clearBasket } from 'entities/basket/model/store';


interface ClearBasketProps {
    className: string
}
export const ClearBasket:FC<ClearBasketProps> = ({className}) => {

    const clear = () => {
        localStorage.removeItem('basket')
        clearBasket()
    }

    return (
        <Button
            className={className}
            text='Очистить корзину'
            onClick={clear}
        />
    );
};

