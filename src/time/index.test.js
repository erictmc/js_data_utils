import {
  FRIDAY,
  MONDAY,
  SATURDAY,
  SUNDAY,
  THURSDAY,
  TUESDAY,
  WEDNESDAY,
  convertTimestampToDOW
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