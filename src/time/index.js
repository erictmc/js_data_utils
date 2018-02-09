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