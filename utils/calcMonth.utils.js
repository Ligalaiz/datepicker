import { getDate } from './getDate.utils.js';

const calcMonth = (date, sign = 'inc') => {
  const currentYear = getDate(date).year;
  const currentMonth = getDate(date).month;

  if (sign === 'dec') return new Date(currentYear, currentMonth - 1);
  return new Date(currentYear, currentMonth + 1);
};

export { calcMonth };
