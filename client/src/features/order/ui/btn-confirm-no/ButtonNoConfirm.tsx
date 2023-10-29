import React, { FC } from 'react';
import { Button } from 'shared/ui/button';
import './btn-confirm-no.css'

interface ButtonNoConfirmProps {
    onClick: () => void
    text?: string
}
export const ButtonNoConfirm:FC<ButtonNoConfirmProps> = ({onClick, text}) => {
    return (
        <Button
            onClick={onClick}
            text={`${text? text : 'Нет'}`}
            className='order-item__confirmno'
        />
    );
};

