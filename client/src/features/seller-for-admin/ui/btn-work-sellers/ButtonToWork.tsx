import React, { FC } from 'react';
import './button-to-work.css'
import { Button } from 'shared/ui/button';

interface ButtonToWorkProps {
    onClick: () => void
    state: 'work' | 'timetable'
}
export const ButtonToWork:FC<ButtonToWorkProps> = ({onClick, state}) => {
    return (
        <Button
            onClick={onClick}
            disabled={state === 'work' ? true : false}
            text='Продавцы'
            className='seller-for-admin__btn'
        />
    );
};

