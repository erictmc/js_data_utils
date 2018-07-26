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


export const createMomentIntervals = (start, end, minutesPerInterval) => {
  const sanitizedStartTime = moment(start).set({minutes: 0, seconds: 0, milliseconds: 0});

  const momentObjs = [sanitizedStartTime];
  const finalEndTime = moment(end);
  const timeSlotCopy = moment(sanitizedStartTime).clone();

  timeSlotCopy.add({minutes: minutesPerInterval});
  while (timeSlotCopy.isBefore(finalEndTime)) {
    momentObjs.push(timeSlotCopy.clone());
    timeSlotCopy.add({minutes: minutesPerInterval})
  }

  return momentObjs;
};


/*
 * Creates a range of timestamps between a startTime and endTime, with intervals
 * specified minutesPerInterval.
 *
 *  @param { string } startTime:  ISO 8601 timestamp
 *  @param { endTime } endTime : ISO 8601 timestamp
 *  @parma { number } minutesPerInterval :
 */
export const createTimestampIntervals = (start, end, minutesPerInterval, outputFormat) => {
  const momentObjs = createMomentIntervals(start, end, minutesPerInterval);
  return momentObjs.map((t) => t.format(outputFormat));
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