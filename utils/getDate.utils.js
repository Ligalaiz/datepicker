const getDate = (date) => ({
  day: date.getDate(),
  weekDay: date.getDay(),
  month: date.getMonth(),
  year: date.getFullYear(),
});

export { getDate }
