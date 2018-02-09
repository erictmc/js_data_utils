import {
  FRIDAY,
  MONDAY,
  NO_TZ_TIME_FMT,
  SATURDAY,
  SUNDAY,
  THURSDAY,
  TUESDAY,
  WEDNESDAY,
  convertTimestampToDOW,
  createTimeIntervals
} from "./index";

describe("convertTimestampToDOW", () => {

  it(" should handle weekdays", () => {
    const daysOfWeek = [
      {date: "2017-01-02T00:00:00", dow: MONDAY},
      {date: "2017-01-03T00:00:00", dow: TUESDAY},
      {date: "2017-01-04T00:00:00", dow: WEDNESDAY},
      {date: "2017-01-05T00:00:00", dow: THURSDAY},
      {date: "2017-01-06T00:00:00", dow: FRIDAY},
      {date: "2016-12-31T00:00:00", dow: SATURDAY},
      {date: "2017-01-01T00:00:00", dow: SUNDAY}
    ];

    daysOfWeek.forEach((testCase) => {
      expect(convertTimestampToDOW(testCase.date)).toEqual(testCase.dow);
    });
  });

  it(" should throw an InvalidTimeError for invalid time", () => {
    const input = "2016-12-31T0:00:00";

    expect(() => {
      convertTimestampToDOW(input)
    }).toThrow(Error);

  });

});

describe("createTimeIntervals", () => {

  it(" correctly creates intervals where start and end are divisible by interval", () => {
    const start = "2017-01-01T00:00:00";
    const end = "2017-01-01T04:00:00";
    const minutes = 60;
    const expectedTimes = [
      "2017-01-01T00:00:00",
      "2017-01-01T01:00:00",
      "2017-01-01T02:00:00",
      "2017-01-01T03:00:00"
    ];

    const actualTimes = createTimeIntervals(start, end, minutes, NO_TZ_TIME_FMT);
    expect(expectedTimes).toHaveLength(actualTimes.length);

    for (let i = 0; i < expectedTimes - 1; i++) {
      expect(expectedTimes[i]).toEqual(actualTimes[i]);
    }
  });

  it(" correctly creates intervals where start and end " +
    "are NOT divisible by interval", () => {

    const start = "2017-01-01T00:00:00";
    const end= "2017-01-01T03:30:00";
    const minutes = 60;
    const expectedTimes = [
      "2017-01-01T00:00:00",
      "2017-01-01T01:00:00",
      "2017-01-01T02:00:00",
      "2017-01-01T03:00:00"
    ];

    const actualTimes = createTimeIntervals(start, end, minutes, NO_TZ_TIME_FMT);

    expect(expectedTimes).toHaveLength(actualTimes.length);
    for (let i = 0; i < expectedTimes.length - 1; i++) {
      expect(expectedTimes[i]).toEqual(actualTimes[i]);
    }
  });

  it(" handles cases when neither start nor end time fall on the timeslot", () => {
    const start = "2017-01-01T00:30:00";
    const end= "2017-01-01T03:30:00";
    const minutes = 60;
    const expectedTimes = [
      "2017-01-01T00:00:00",
      "2017-01-01T01:00:00",
      "2017-01-01T02:00:00",
      "2017-01-01T03:00:00"
    ];
    const actualTimes = createTimeIntervals(start, end, minutes, NO_TZ_TIME_FMT);

    expect(expectedTimes).toHaveLength(actualTimes.length);
    for (let i = 0; i < expectedTimes.length - 1; i++) {
      expect(expectedTimes[i]).toEqual(actualTimes[i]);
    }
  });

});