import React, { FC } from 'react';
import './button-cancel.css'
import { Button } from 'shared/ui/button';

interface ButtonCancelProps {
    onClick: (e: React.MouseEvent) =>  void
}
export const ButtonCancel:FC<ButtonCancelProps> = ({onClick}) => {

    return (
        <Button 
            onClick={onClick}
            className='order-item__btn-cancel'
            text='Отменить'
        />
    );
};

