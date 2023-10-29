

export const weekDays = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
]

export const daysInMonth = function(date: Date) {
    return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
};

