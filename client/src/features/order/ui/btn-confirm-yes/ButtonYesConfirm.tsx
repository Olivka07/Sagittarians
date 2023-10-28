import React, { FC } from 'react';
import { Button } from 'shared/ui/button';
import './btn-confirm-yes.css'


interface ButtonYesConfirmProps {
    onClick: () => void
}
export const ButtonYesConfirm:FC<ButtonYesConfirmProps> = ({onClick}) => {
    return (
        <Button
            text='Да'
            onClick={onClick}
            className='order-item__confirmyes'
        />
    );
};

