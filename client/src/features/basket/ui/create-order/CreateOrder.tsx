import React, { FC } from 'react';
import { Button } from 'shared/ui/button';


interface CreateOrderProps {
    className: string
    onClick: () => void
}
export const CreateOrder:FC<CreateOrderProps> = ({className, onClick}) => {
    return (
        <Button 
            text='Сделать заказ'
            className={className}
            onClick={onClick}
        />
    );
};

