function format(date, pattern) {
  const rawYear = date.getFullYear();
  const year = Math.abs(rawYear); 
  const month = date.getMonth();
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weekdays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const eraShort = rawYear < 0 ? 'BC' : 'AD';
  const eraLong = rawYear < 0 ? 'Before Christ' : 'Anno Domini';

  const tokens = {
    yyyy: year.toString().padStart(4, '0'),
    yy: year.toString().slice(-2).padStart(2, '0'),
    y: year.toString(),
    MMMM: months[month],
    MMM: months[month].slice(0, 3),
    MM: (month + 1).toString().padStart(2, '0'),
    M: (month + 1).toString(),
    dd: day.toString().padStart(2, '0'),
    d: day.toString(),
    EEEE: weekdays[dayOfWeek],
    E: weekdays[dayOfWeek].slice(0, 3),
    HH: hours.toString().padStart(2, '0'),
    H: hours.toString(),
    hh: ((hours % 12) || 12).toString().padStart(2, '0'),
    h: ((hours % 12) || 12).toString(),
    mm: minutes.toString().padStart(2, '0'),
    m: minutes.toString(),
    ss: seconds.toString().padStart(2, '0'),
    s: seconds.toString(),
    a: hours < 12 ? 'AM' : 'PM',
    GGGG: eraLong,
    G: eraShort
  };

  return pattern.replace(
    /yyyy|yy|y|MMMM|MMM|MM|M|dd|d|EEEE|E|HH|H|hh|h|mm|m|ss|s|a|GGGG|G/g,
    (match) => tokens[match]
  );
}