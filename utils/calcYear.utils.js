import { getDate } from './getDate.utils.js';

const calcYear = (date, sign = 'inc') => {
  const currentYear = getDate(date).year;
  const currentMonth = getDate(date).month;

  if (sign === 'dec') return new Date(currentYear - 1, currentMonth);
  return new Date(currentYear + 1, currentMonth);
};

export { calcYear };
