import React, { FC } from 'react';
import { Button } from 'shared/ui/button';
import './btn-save-timetable.css'

interface ButtonSaveTimetableProps {
    onClick: () => void
}
export const ButtonSaveTimetable:FC<ButtonSaveTimetableProps> = ({onClick}) => {
    return (
        <Button
            onClick={onClick}
            text='Сохранить'
            className='timetable__savetimetable'
        />
    );
};

