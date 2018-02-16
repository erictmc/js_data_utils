import {
  compareSortedArrays,
  compareUnsortedArrays,
  deepCopy, isEmptyValue,
  isStrNonNegInt,
  renameObjectFieldCopy,
  renameObjectFieldMutate,
  rmObjectEmptiesMutate
} from "./index";

import {compareObjects} from "./compare_objects";

describe("renameObjectFieldCopy", () => {

  it(" should rename a field in an object", () => {
    const originalObject = {a: 1, b: "2"};
    const newObj = renameObjectFieldCopy(originalObject, "a", "c");
    const newKeys = Object.keys(newObj);

    newKeys.sort();
    expect(compareSortedArrays(newKeys, ["b","c"])).toEqual(true);
  });

  it(" should rename a field in an object without mutation", () => {
    const origObject = {a: "1", b: "2"};

    renameObjectFieldCopy(origObject, "a", "c");
    const origKeys = Object.keys(origObject);

    origKeys.sort();
    expect(compareSortedArrays(origKeys, ["a", "b"])).toEqual(true);
  });

  it(" does not alter objects when old and new names are the same ", () => {
    const origObject = {a: "1", b: "2"};
    const newObj = renameObjectFieldCopy(origObject, "a", "a");

    expect(compareObjects(origObject, newObj)).toEqual(true);
  });
});


describe("renameObjectFieldMutate", () => {

  it(" should not alter objects with same old and new field names ", () => {
    const origObject = {a: "1", b: "2"};
    const expectedObject = {a: "1", b: "2"};

    renameObjectFieldMutate(origObject, "a", "a");

    expect(compareObjects(origObject, expectedObject)).toEqual(true);
  });
});

describe("compareSortedArrays", () => {

  it(" should assign equality for sorted arrays", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];

    expect(compareSortedArrays(arr1, arr2)).toEqual(true);
  });

  it(" should fail for unsorted sorted arrays", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 2, 1];

    expect(compareSortedArrays(arr1, arr2)).toEqual(false);
  });

  it(" should handle empty arrays", () => {
    expect(compareSortedArrays([], [])).toEqual(true);
  });
});

describe("compareUnsortedArrays", () => {

  it(" should assign equality for sorted arrays", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 2, 1];

    expect(compareUnsortedArrays(arr1, arr2)).toEqual(true);
  });

  it(" should handle empty arrays", () => {
    expect(compareSortedArrays([], [])).toEqual(true);
  });
});


describe("compareObjects", () => {

  it(" should assign equality for objects, irrespective of field order", () => {
    const obj1 = {a: 1, b: 2, c: 3};
// eslint-disable-next-line sort-keys
    const obj2 = {c: 3, b: 2, a: 1};

    expect(compareObjects(obj1, obj2)).toEqual(true);
  });

  it(" should detect inequality in objects", () => {
    const obj1 = {a: 1, b: 2, c: 3};
    const obj2 = {a: 1, b: 2, d: 4};

    expect(compareObjects(obj1, obj2)).toEqual(false);
  });

  it(" should detect inequality in objects and not do type-conversion", () => {
    const obj1 = {a: 1, b: 2, c: 3};
    const obj2 = {a: 1, b: 2, c: "3"};

    expect(compareObjects(obj1, obj2)).toEqual(false);
  });


  it(" should assign equality for undefined", () => {
    const obj1 = undefined;
    const obj2 = undefined;

    expect(compareObjects(obj1, obj2)).toEqual(true);
  });
});

describe("isEmptyValue", () => {
  it(" should correctly classify: '', null, undefined, {}, [], etc.", () => {
    const empties = ["", null, undefined, {}, []];

    empties.forEach((x) => expect(isEmptyValue(x)).toEqual(true));
  });

  it(" should fail for a blank string (not meant to be falsey)", () => {
    expect(isEmptyValue(" ")).toEqual(false)
  });

  it(" should fail for zero (not meant to be falsey)", () => {
    expect(isEmptyValue(0)).toEqual(false)
  });

  it(" should fail for false (not meant to be falsey)", () => {
    expect(isEmptyValue(false)).toEqual(false)
  });
});

describe("isStrNonNegInt", () => {
  it(" should correctly identify non-matching cases", () => {
    const nonMatches = [
      undefined,
      NaN,
      null,
      "foobar",
      "",
      "-1",
      "0.0",
      "1.0",
      "-0"
    ];

    nonMatches.forEach((n) => {
      expect(isStrNonNegInt(n)).toEqual(false);
    });
  });

  it(" should correctly identify matching cases", () => {
    const matches = [
      "10",
      "0",
      "1",
      "00"
    ];

    matches.forEach((n) => {
      expect(isStrNonNegInt(n)).toEqual(true);
    });
  });
});

describe("rmObjectEmptiesMutate", () => {
  it(" should not affect objects with not-empty values", () => {
    const obj = {a: 1, b: 2, c: {d: 3}};
    const objCpy = deepCopy(obj);

    rmObjectEmptiesMutate(obj);
    expect(compareObjects(obj, objCpy)).toEqual(true);
  });

  it(" should prune nested empty objects", () => {
    const obj = {
      a: 1,
      b: 2,
      c: {d: {e: undefined, f: "", g: null}},
      h: undefined
    };

    const expected = {a: 1, b: 2};

    rmObjectEmptiesMutate(obj);
    expect(compareObjects(obj, expected)).toEqual(true);
  });

  it(" should handle empty objects", () => {
    const obj = {};
    const expected = {};

    rmObjectEmptiesMutate(obj);
    expect(compareObjects(obj, expected)).toEqual(true);
  });
});