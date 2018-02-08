import {isEmptyValue, isStrNonNegInt, trimLeadingZeros} from "./index";

import moment from "moment-timezone";

export class InvalidTimeError extends Error {}

/*
 * Determines if two ISO 8601 timestamps occur on the same date
 * @param { string } timestamp : a string timestamp
 * @param { string } timestamp : a string timestmap
 */
export const occurOnSameDate = (timestamp1, timestamp2) => {
  const ts1 = moment(timestamp1);
  const tsMonth1 = ts1.month() + 1;
  const tsDay1 = ts1.date();
  const tsYear1 = ts1.year();

  const ts2 = moment(timestamp2);
  const tsMonth2 = ts2.month() + 1;
  const tsDay2 = ts2.date();
  const tsYear2 = ts2.year();

  return tsMonth1 === tsMonth2 && tsDay1 === tsDay2 && tsYear1 === tsYear2;
};


/*
 * Takes string clock time and returns parsed hour and minute
 * values
 *
 * @param { string } clockTime : a string of the format 'HH:mm' or
 * "HH:mm:ss", wherehours can range from 0 - 23 and minutes can
 * range from 1 - 59.
 */
export const parseClockTime = (clockTime) => {

  if (isEmptyValue(clockTime)) {
    throw new InvalidTimeError();
  }

  const timeComponents = clockTime.split(":");

  if (timeComponents.length < 2 || timeComponents.length > 3) {
    throw new InvalidTimeError();
  }

  if (!isStrNonNegInt(timeComponents[0]) ||
    !isStrNonNegInt(timeComponents[1])) {
    throw new InvalidTimeError();
  }

  if (timeComponents.length === 3 && !isStrNonNegInt(timeComponents[2])) {
    throw new InvalidTimeError();
  }

  const hours = Number(trimLeadingZeros(timeComponents[0]));
  const minutes = Number(trimLeadingZeros(timeComponents[1]));

  const tmpSec = timeComponents.length === 3
    ? Number(timeComponents[2]) : undefined;

  if (isNaN(hours) || isNaN(minutes)) {
    throw new InvalidTimeError();
  }

  if (tmpSec !== undefined) {
    if (isNaN(tmpSec)) {
      throw new InvalidTimeError();
    }

    if (!(tmpSec >= 0 && tmpSec <= 59)) {
      throw new InvalidTimeError();
    }
  }

  if (!(hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59)) {
    throw new InvalidTimeError();
  }

  const seconds = tmpSec === undefined ? 0 : tmpSec;

  return {hours, minutes, seconds}

};