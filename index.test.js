import {compareSortedArrays, renameObjectFieldCopy, renameObjectFieldMutate} from "./index";
import {compareObjects} from "./compare_objects";

describe('renameObjectFieldCopy', () => {

  it(" should rename a field in an object", () => {
    const originalObject = {a: 1, b: "2"};
    const newObj = renameObjectFieldCopy(originalObject, "a", "c");
    const newKeys = Object.keys(newObj);
    newKeys.sort();
    expect(compareSortedArrays(newKeys, ["b", "c"])).toEqual(true);
  });

  it(" should rename a field in an object without mutation", () => {
    const origObject = {a: "1", b: "2"};
    const newObj = renameObjectFieldCopy(origObject, "a", "c");
    const origKeys = Object.keys(origObject);
    origKeys.sort();
    expect(compareSortedArrays(origKeys, ["a", "b"])).toEqual(true);
  });

  it(" should not alter objects where the old and new field names are the same ", () => {
    const origObject = {a: "1", b: "2"};
    const newObj = renameObjectFieldCopy(origObject, "a", "a");
    expect(compareObjects(origObject, newObj)).toEqual(true);
  });
});


describe('renameObjectFieldMutate', () => {

  it(" should not alter objects where the old and new field names are the same ", () => {
    const origObject = {a: "1", b: "2"};
    const expectedObject = {a: "1", b: "2"};
    const newObj = renameObjectFieldMutate(origObject, "a", "a");
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

describe("compareObjects", () => {

  it(" should assign equality for objects, irrespective of field order", () => {
    const obj1 = {a: 1, b: 2, c: 3};
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
