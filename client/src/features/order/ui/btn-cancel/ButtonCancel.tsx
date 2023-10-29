import React, { FC } from 'react';
import './button-cancel.css'
import { Button } from 'shared/ui/button';

interface ButtonCancelProps {
    onClick: (e: React.MouseEvent) =>  void
    style?: React.CSSProperties
}
export const ButtonCancel:FC<ButtonCancelProps> = ({onClick, style}) => {

    return (
        <Button 
            style={style? style:{}}
            onClick={onClick}
            className='order-item__btn-cancel'
            text='Отменить'
        />
    );
};

