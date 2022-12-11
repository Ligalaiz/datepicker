const getDateFromStr = (date) => ({
  year: parseInt(date.split('-')[0]),
  month: parseInt(date.split('-')[1]),
  day: parseInt(date.split('-')[2]),
});

export { getDateFromStr };
