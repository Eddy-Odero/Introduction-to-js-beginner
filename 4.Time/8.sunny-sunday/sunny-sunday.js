function sunnySunday(date) {
  const customWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const epoch = new Date("0001-01-01T00:00:00Z");

  const diffTime = Math.abs(date.getTime() - epoch.getTime());
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dayIndex = totalDays % 6;

  return customWeek[dayIndex];
}

