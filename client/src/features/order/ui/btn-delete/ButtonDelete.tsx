import React, { FC } from 'react';
import './button-delete.css'
import { Button } from 'shared/ui/button';

interface ButtonDeleteProps {
    onClick: (e: React.MouseEvent) => void
}
export const ButtonDelete:FC<ButtonDeleteProps> = ({onClick}) => {
    return (
        <Button
            onClick={onClick}
            text='Удалить'
            className='order-item__btn-delete'
        />
    );
};

