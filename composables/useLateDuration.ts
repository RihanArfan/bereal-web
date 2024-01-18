// calculates how late a date was using the seconds, converted to a human readable format.
export function useLateDuration(date: Date, secondsLateBy: number) {
  // if the date is in the future, return null
  if (date.getTime() > Date.now()) return null;

  // calculate on-time date - secondsLateBy
  const onTimeDate = new Date(date.getTime() - secondsLateBy * 1000);

  // calculate the difference between the on-time date and post date
  const difference = date.getTime() - onTimeDate.getTime();

  const ONE_MINUTE = 60000;
  const ONE_HOUR = 3600000;
  const TWO_HOURS = 7200000;
  const ONE_DAY = 86400000;
  const TWO_DAYS = 604800000;

  // if late by less than a minute
  if (difference < ONE_MINUTE) return { number: 1, unit: "minute" };

  // if late by less than an hour
  if (difference < ONE_HOUR)
    return { number: Math.floor(difference / ONE_MINUTE), unit: "minutes" };

  // if late by 1 hour
  if (difference < TWO_HOURS) return { number: 1, unit: "hour" };

  // if late by less than a day
  if (difference < ONE_DAY)
    return { number: Math.floor(difference / ONE_HOUR), unit: "hours" };

  // if late by less than 2 days
  if (difference < TWO_DAYS)
    return { number: Math.floor(difference / ONE_DAY), unit: "day" };

  // return the number of days late by
  return { number: Math.floor(difference / ONE_DAY), unit: "days" };
}
