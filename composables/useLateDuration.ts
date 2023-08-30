// calculates how late a date was using the seconds, converted to a human readable format.
export function useLateDuration(date: Date, secondsLateBy: number) {
  // if the date is in the future, return null
  if (date.getTime() > Date.now()) return null;

  // calculate on-time date - secondsLateBy
  const onTimeDate = new Date(date.getTime() - secondsLateBy * 1000);

  // calculate the difference between the on-time date and now
  const difference = Date.now() - onTimeDate.getTime();

  // if late by less than a minute, return 1m
  if (difference < 60000) return { number: 1, unit: "minute" };

  // if late by less than an hour, return the number of minutes
  if (difference < 3600000)
    return {
      number: Math.floor(difference / 60000),
      unit: "minutes",
    };

  // if late by less than a day, return the number of hours
  if (difference < 86400000)
    return {
      number: Math.floor(difference / 3600000),
      unit: "hours",
    };

  // if late by less than 2 days, return 1 day
  if (difference < 604800000)
    return {
      number: Math.floor(difference / 86400000),
      unit: "day",
    };

  // return the number of days late by
  return { number: Math.floor(difference / 86400000), unit: "days" };
}
