import moment from "moment-timezone";

moment.suppressDeprecationWarnings = true;

export const MONDAY="monday";
export const TUESDAY="tuesday";
export const WEDNESDAY="wednesday";
export const THURSDAY="thursday";
export const FRIDAY="friday";
export const SATURDAY="saturday";
export const SUNDAY="sunday";
export const WEEKDAY="weekday";
export const WEEKEND="weekend";

export const DAYS_OF_WEEK = [
  MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
  FRIDAY, SATURDAY, SUNDAY
];

export const NO_TZ_TIME_FMT="YYYY-MM-DDTHH:mm:ss";

export class InvalidTimeError extends Error {}

// Converts a timestamp (string) to the corresponding day of week.
export const convertTimestampToDOW = (ts) => {

  if (moment(ts).isValid() === false) {
    throw new InvalidTimeError();
  }

  const m = moment(ts).format("dddd");
  const sanitizedDow = m.toLowerCase();

  for (const dow of DAYS_OF_WEEK) {
    if (dow === sanitizedDow) {
      return sanitizedDow;
    }
  }

  throw new InvalidTimeError()

};

export const getDiffMinutes = (start, end) => {
  const startTime = moment(start);
  const endTime = moment(end);
  const minutesDuration = moment.duration(endTime.diff(startTime));
  return minutesDuration.asMinutes();
};

/*
 * Creates a range of timestamps between a startTime and endTime, with intervals
 * specified minutesPerInterval.
 *
 *  @param { string } startTime:  ISO 8601 timestamp
 *  @param { endTime } endTime : ISO 8601 timestamp
 *  @parma { number } minutesPerInterval :
 */
export const createTimeIntervals = (start, end, minutesPerInterval, format) => {
  const sanitizedStartTime = moment(start).
          set({minutes: 0, seconds: 0, milliseconds: 0}).
            format(format);

  const intervals = [sanitizedStartTime];

  const finalEndTime = moment(end);

  const timeSlotCopy = moment(sanitizedStartTime).clone();
  timeSlotCopy.add({minutes: minutesPerInterval});
// eslint-disable-next-line no-unmodified-loop-condition
  while (timeSlotCopy < finalEndTime) {
    intervals.push(timeSlotCopy.format(format));
    timeSlotCopy.add({minutes: minutesPerInterval})
  }

  return intervals;
};

export const binTimeStamp = (binsPerDay, timestamp) => {
  const ts = moment(timestamp);
  const beginTS = moment(timestamp).set(
    {hours: 0, minutes: 0, seconds: 0, milliseconds: 0}
  );

  const minutesPerBin = (24.0 / binsPerDay) * 60;
  const hoursPerBin = minutesPerBin / 60;
  const binOffset = Math.floor((ts.hours() + (ts.minutes() / 60)) / hoursPerBin);
  beginTS.add({minutes: binOffset * minutesPerBin});

  return beginTS.format(NO_TZ_TIME_FMT);
};