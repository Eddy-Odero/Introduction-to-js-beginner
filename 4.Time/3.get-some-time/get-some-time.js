function firstDayWeek(week, yearStr) {
  const year = parseInt(yearStr, 10);
  const janFirst = new Date(Date.UTC(2000, 0, 1)); 
  janFirst.setUTCFullYear(year); 
  const janFirstDay = janFirst.getUTCDay();
  const daysToMondayOffset = janFirstDay === 0 ? -6 : 1 - janFirstDay;
  const targetDate = new Date(janFirst.getTime() + (daysToMondayOffset + (week - 1) * 7) * 86400000);
  if (targetDate.getUTCFullYear() < year) {
    targetDate.setTime(janFirst.getTime());
  }
  const day = String(targetDate.getUTCDate()).padStart(2, '0');
  const month = String(targetDate.getUTCMonth() + 1).padStart(2, '0');
  const formattedYear = String(targetDate.getUTCFullYear()).padStart(4, '0');
  
  return `${day}-${month}-${formattedYear}`;
}
