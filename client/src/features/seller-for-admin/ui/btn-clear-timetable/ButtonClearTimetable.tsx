import React, { FC } from 'react';
import './btn-clear-timetable.css'
import { Button } from 'shared/ui/button';
import { useStore } from 'effector-react';

interface ButtonClearTimetableProps {
    onClick: () => void
}
export const ButtonClearTimetable:FC<ButtonClearTimetableProps> = ({onClick}) => {
    return (
        <Button
            onClick={onClick}
            text='Очистить всё'
            className='timetable__cleartimetable'
        />
    );
};

