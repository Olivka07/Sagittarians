import React from 'react';
import './btn-clear-timetable.css'
import { Button } from 'shared/ui/button';

export const ButtonClearTimetable = () => {
    return (
        <Button
            text='Очистить всё'
            className='timetable__cleartimetable'
        />
    );
};

