import type { PickerLocale } from "antd/es/date-picker/generatePicker"
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';

export const API_URL = 'https://server-sagittarius.vercel.app/api'
// export const API_URL = 'http://localhost:5000/api'


export const locale: PickerLocale = {
    lang: {
        placeholder: 'Выберите дату',
        yearPlaceholder: 'Выберите год',
        quarterPlaceholder: 'Выберите квартал',
        monthPlaceholder: 'Выберите месяц',
        weekPlaceholder: 'Выберите неделю',
        rangePlaceholder: ['Начальная дата', 'Конечная дата'],
        rangeYearPlaceholder: ['Начальный год', 'Год окончания'],
        rangeMonthPlaceholder: ['Начальный месяц', 'Конечный месяц'],
        rangeWeekPlaceholder: ['Начальная неделя', 'Конечная неделя'],
        shortWeekDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        shortMonths: [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июнь",
            "Июль",
            "Авг",
            "Сен",
            "Окт",
            "Нояб",
            "Дек"
        ],
        ...CalendarLocale,
      },
      timePickerLocale: {
        
      },
};
