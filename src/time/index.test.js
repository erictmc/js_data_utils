import {
  FRIDAY,
  MONDAY,
  NO_TZ_TIME_FMT,
  SATURDAY,
  SUNDAY,
  THURSDAY,
  TUESDAY,
  WEDNESDAY,
  binTimeStamp,
  convertTimestampToDOW,
  createTimestampIntervals
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

describe("createTimestampIntervals", () => {

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

    const actualTimes = createTimestampIntervals(start, end, minutes, NO_TZ_TIME_FMT);
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

    const actualTimes = createTimestampIntervals(start, end, minutes, NO_TZ_TIME_FMT);

    expect(expectedTimes).toHaveLength(actualTimes.length);
    for (let i = 0; i < expectedTimes.length - 1; i++) {
      expect(expectedTimes[i]).toEqual(actualTimes[i]);
    }
  });

  it(" correctly handles DST fallback", () => {

    const start = "2018-11-03T00:00:00";
    const end= "2018-11-08T00:00:00";
    const minutes = 1440;
    const expectedTimes = [
      "2018-11-03T00:00:00",
      "2018-11-04T00:00:00",
      "2018-11-05T00:00:00",
      "2018-11-06T00:00:00",
      "2018-11-07T00:00:00"
    ];

    const actualTimes = createTimestampIntervals(start, end, minutes, NO_TZ_TIME_FMT);
    expect(actualTimes).toEqual(expectedTimes);

  });

  it(" correctly handles DST fallback with hours", () => {

    const start = "2018-11-04T00:00:00";
    const end= "2018-11-05T02:00:00";
    const minutes = 60;
    const expectedTimes = ["2018-11-04T00:00:00", "2018-11-04T01:00:00", "2018-11-04T02:00:00", "2018-11-04T03:00:00",
      "2018-11-04T04:00:00", "2018-11-04T05:00:00", "2018-11-04T06:00:00", "2018-11-04T07:00:00",
      "2018-11-04T08:00:00", "2018-11-04T09:00:00", "2018-11-04T10:00:00", "2018-11-04T11:00:00",
      "2018-11-04T12:00:00", "2018-11-04T13:00:00", "2018-11-04T14:00:00", "2018-11-04T15:00:00",
      "2018-11-04T16:00:00", "2018-11-04T17:00:00", "2018-11-04T18:00:00", "2018-11-04T19:00:00",
      "2018-11-04T20:00:00", "2018-11-04T21:00:00", "2018-11-04T22:00:00", "2018-11-04T23:00:00",
      "2018-11-05T00:00:00", "2018-11-05T01:00:00"
    ];

    const actualTimes = createTimestampIntervals(start, end, minutes, NO_TZ_TIME_FMT);
    expect(actualTimes).toEqual(expectedTimes);

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
    const actualTimes = createTimestampIntervals(start, end, minutes, NO_TZ_TIME_FMT);

    expect(expectedTimes).toHaveLength(actualTimes.length);
    for (let i = 0; i < expectedTimes.length - 1; i++) {
      expect(expectedTimes[i]).toEqual(actualTimes[i]);
    }
  });

  it(" it should handle non-datetime formats", () => {
    const start = "2017-01-01T00:00:00";
    const end= "2017-01-01T02:00:00";
    const minutes = 30;
    const expectedTimes = ["12:00am", "12:30am", "1:00am", "1:30am"];
    const actualTimes = createTimestampIntervals(start, end, minutes, "h:mma");
    expect(actualTimes).toEqual(expectedTimes);
  });

});

describe("binTimeStamp", () => {
  it(" should correctly bin timestamp with bins evenly divisible into day", () => {
    const cases = [
      {input: "2017-12-01T00:00:00", expected: "2017-12-01T00:00:00", binsPerDay: 24},
      {input: "2017-12-01T12:00:00", expected: "2017-12-01T12:00:00", binsPerDay: 12},
      {input: "2017-12-01T11:00:00", expected: "2017-12-01T10:00:00", binsPerDay: 12},
      {input: "2017-12-01T23:59:00", expected: "2017-12-01T22:00:00", binsPerDay: 12},
      {input: "2017-12-01T12:45:00", expected: "2017-12-01T12:30:00", binsPerDay: 48}
    ];

    cases.forEach((t) => {
      expect(binTimeStamp(t.binsPerDay, t.input)).toEqual(t.expected)
    });
  });

  it(" should correctly bin timestamp with bins non-evenly divisible into day", () => {
    const cases = [
      {input: "2017-12-01T12:00:00", expected: "2017-12-01T09:36:00", binsPerDay: 5}
    ];

    cases.forEach((t) => {
      expect(binTimeStamp(t.binsPerDay, t.input)).toEqual(t.expected)
    });
  });
});