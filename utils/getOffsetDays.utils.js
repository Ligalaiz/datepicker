import { getDate } from './getDate.utils.js';
import { calcDay } from './calcDay.utils.js';

const getPrevOffsetDays = (dayArr) => {
  const FIRST_DAY_IN_WEEK = 1;
  const startDay = dayArr[0];
  const { weekDay } = getDate(startDay);

  if (weekDay === FIRST_DAY_IN_WEEK) return [];

  const DAYS_PER_WEEK = 7;
  const count = weekDay === 0 ? DAYS_PER_WEEK : weekDay;
  const result = [];

  for (let i = 1, tempDay = startDay; i < count; i += 1) {
    tempDay = calcDay(tempDay, 'dec');
    result.push(tempDay);
  }

  return result.reverse();
};

const getPastOffsetDays = (dayArr) => {
  const DAYS_PER_WEEK = 7;
  const endDay = dayArr[dayArr.length - 1];
  const { weekDay } = getDate(endDay);

  if (weekDay === 0) return [];

  const result = [];

  for (let i = 0, tempDay = endDay; i < DAYS_PER_WEEK - weekDay; i += 1) {
    tempDay = calcDay(tempDay);
    result.push(tempDay);
  }
  return result;
};

export { getPrevOffsetDays, getPastOffsetDays };
