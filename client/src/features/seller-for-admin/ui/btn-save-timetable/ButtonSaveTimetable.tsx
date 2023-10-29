import React, { FC } from 'react';
import { Button } from 'shared/ui/button';
import './btn-save-timetable.css'

interface ButtonSaveTimetableProps {
    onClick: () => void
    disabled: boolean
}
export const ButtonSaveTimetable:FC<ButtonSaveTimetableProps> = ({onClick, disabled}) => {
    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            text='Сохранить'
            className='timetable__savetimetable'
        />
    );
};

