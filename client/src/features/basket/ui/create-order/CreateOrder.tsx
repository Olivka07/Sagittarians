import React, { FC } from 'react';
import { Button } from 'shared/ui/button';


interface CreateOrderProps {
    className: string
}
export const CreateOrder:FC<CreateOrderProps> = ({className}) => {
    return (
        <Button 
            text='Сделать заказ'
            className={className}
        />
    );
};

