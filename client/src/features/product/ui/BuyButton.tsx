import React, { FC } from 'react';
import { Button } from 'shared/ui/button';

interface BuyButtonProps {
    disabled: boolean
    buyProduct: () => void
}
export const BuyButton: FC<BuyButtonProps> = ({disabled, buyProduct}) => {
    return (
        <Button 
            style={{
                backgroundColor: 'white'
            }}
            disabled={disabled}
            onClick={buyProduct} 
            text='Положить в корзину' 
        />
    );
};

