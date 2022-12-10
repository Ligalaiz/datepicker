import { getDate } from './getDate.utils.js';
import { calcDay } from './calcDay.utils.js';

const getCurrentMonthArr = (currentDate) => {
  const monthDays = [];
  let tempDate = new Date(
    getDate(currentDate).year,
    getDate(currentDate).month
  );

  while (getDate(currentDate).month === getDate(tempDate).month) {
    monthDays.push(tempDate);
    tempDate = calcDay(tempDate);
  }
  return monthDays;
};

export { getCurrentMonthArr };
