import dayjs from 'dayjs';

export const calculateDueDate = (days: number) => {
    // Obtener la fecha actual

    const currentDate = dayjs().add(days, 'day');

    const format = currentDate.format('YYYY/MM/DD')
    
    return dayjs(format);
}