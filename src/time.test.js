import {occurOnSameDate, parseClockTime} from "./time";


/*
 * Note that test regarding thrown errors do not InvalidTimeError. Rather
 * they use a generic Error. See this thread:
 * https://github.com/facebook/jest/issues/2123
 */

describe("occurOnSameDate", () => {

  it(" determine if a timestamp is on a date", () => {
    const timestamp = "2016-12-31T12:00:00";
    const date = "2016-12-31T00:00:00";

    expect(occurOnSameDate(date, timestamp)).toEqual(true);

  });

  it(" determine if a timestamp is NOT on a date", () => {
    const timestamp = "2016-12-31T12:00:00";
    const date = "2016-12-30T00:00:00";

    expect(occurOnSameDate(date, timestamp)).toEqual(false);
  });
});

describe("parseClockTime", () => {

  it(" it should throw an error for invalid input", () => {
    const genericInvalidCases = [
      "",
      "23:01:00:00",
      "23:01:1.0"
    ];

    genericInvalidCases.forEach((x) => {
      expect(() => {
        parseClockTime(x)
      }).toThrowError(Error);
    });


  });

  it(" both hour and minute values should be numerical", () => {
    const nonNumericalCases = [
      "23:aa",
      "aa:15",
      "24a:15",
      "24:15b"
    ];

    nonNumericalCases.forEach((x) => {
      expect(() => {
        parseClockTime(x)
      }).toThrowError(Error);
    })

  });

  it(" both hour and minute values should be feasible numerical values", () => {
    const infeasibleNumericalCases = [
      "23:-1",
      "-1:00",
      "24:00",
      "23:60"
    ];

    infeasibleNumericalCases.forEach((x) => {
      expect(() => {
        parseClockTime(x)
      }).toThrowError(Error);
    });

  });

  it(" it should handle correctly formatted times w/ seconds", () => {
    const {hours, minutes, seconds} = parseClockTime("23:00");

    expect(hours).toEqual(23);
    expect(minutes).toEqual(0);
    expect(seconds).toEqual(0);

  });

  it(" it should handle correctly formatted times w/o seconds", () => {
    const {hours, minutes, seconds} = parseClockTime("23:00:10");

    expect(hours).toEqual(23);
    expect(minutes).toEqual(0);
    expect(seconds).toEqual(10);

  });

});