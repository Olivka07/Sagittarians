import React, { FC } from 'react';
import { Button } from 'shared/ui/button';
import './btn-confirm-yes.css'


interface ButtonYesConfirmProps {
    onClick: () => void
    text?: string
    disabled?: boolean
}
export const ButtonYesConfirm:FC<ButtonYesConfirmProps> = ({onClick, text, disabled}) => {
    return (
        <Button
            disabled={disabled? disabled : false}
            text={`${text? text: 'Да'}`}
            onClick={onClick}
            className='order-item__confirmyes'
        />
    );
};

