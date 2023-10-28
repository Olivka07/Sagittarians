import { Col, DatePicker, Form, FormInstance } from 'antd';
import React, { FC, useEffect, useMemo } from 'react';
import {locale} from 'shared/config/index'
import dayjs from 'dayjs';
import { useWatch } from 'antd/es/form/Form';
import { changeDateTimetable } from 'widgets/seller-for-admin/model/timetable/store';

const dateFormat = 'MM.YYYY'
const {Item} = Form

type FieldType = {
    date_timetable?: string;
};

interface DatePickerTimetableProps {
    form: FormInstance
}
const DatePickerTimetable:FC<DatePickerTimetableProps> = ({form}) => {
    const values = useWatch([], form)

    const date = useMemo(() => {
        const dateMeta = new Date()
        return dateMeta
    }, [])

    useEffect(() => {
        if (values && values.date_timetable) {
            changeDateTimetable(values.date_timetable['$d'])
        }
    }, [values])
    return (
        <Item<FieldType>
            label="Выберите дату"
            name="date_timetable"
            initialValue={dayjs(date.toLocaleDateString('en-US'), dateFormat)}
        >
            <DatePicker
                picker="month" 
                format={dateFormat} 
                locale={locale}
            />
        </Item>
    );
};

export default DatePickerTimetable;