import React, { FC } from 'react';
import { Button } from 'shared/ui/button';
import './btn-confirm-no.css'

interface ButtonNoConfirmProps {
    onClick: () => void
}
export const ButtonNoConfirm:FC<ButtonNoConfirmProps> = ({onClick}) => {
    return (
        <Button
            onClick={onClick}
            text='Нет'
            className='order-item__confirmno'
        />
    );
};

