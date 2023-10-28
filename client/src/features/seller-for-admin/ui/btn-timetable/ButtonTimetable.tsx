import React, { FC } from 'react';
import './button-timetable.css'
import { Button } from 'shared/ui/button';

interface ButtonTimetableProps {
    onClick: () => void
    state: 'work' | 'timetable'
}
export const ButtonTimetable:FC<ButtonTimetableProps> = ({onClick, state}) => {
    return (
        <Button
            onClick={onClick}
            disabled={state==='timetable' ? true : false}
            text='График'
            className='seller-for-admin__btn'
        />
    );
};

