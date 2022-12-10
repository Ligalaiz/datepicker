import { getDate } from './getDate.utils.js';

const calcDay = (date, sign = 'inc') => {
  const currentYear = getDate(date).year;
  const currentMonth = getDate(date).month;
  const currentDay = getDate(date).day;

  if (sign === 'dec') return new Date(currentYear, currentMonth, currentDay - 1);
  return new Date(currentYear , currentMonth, currentDay + 1);
};

export { calcDay }
