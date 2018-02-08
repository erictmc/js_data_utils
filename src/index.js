
export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const renameObjectFieldCopy = (obj, oldName, newName) => {
  const newObj = deepCopy(obj);

  if (oldName === newName) {
    return newObj
  }

  if (oldName in newObj) {
    newObj[newName] = newObj[oldName];
    delete newObj[oldName];
  }
  return newObj;
};

export const renameObjectFieldMutate = (obj, oldName, newName) => {
  if (oldName === newName) {
    return obj
  }

  if (oldName in obj) {
    obj[newName] = obj[oldName];
    delete obj[oldName];
  }
};

export const isEmptyObject = (obj) => {
  return obj.constructor === Object && Object.keys(obj).length === 0;
};

export const isEmptyArray = (arr) => {
  return arr.constructor === Array && arr.length === 0;
};


export const isEmptyValue = (x) => {
  return x === undefined ||
    x === "" ||
    x === null ||
    isEmptyObject(x) ||
    isEmptyArray(x);
};

export const compareSortedArrays = (a1, a2) => {
  return a1.length === a2.length && a1.every((v,i)=> v === a2[i])
};

export const trimLeadingZeros = (str) => {
  return str.replace(/^0+(?!\.|$)/, "");
};

export const isStrNonNegInt = (str) => {
  if (isEmptyValue(str) || isNaN(Number(str))) {
    return false
  }

  // Attempt to strip leading zeros
  const newStr = trimLeadingZeros(str);
  const n = Math.floor(Number(newStr));

  return n !== Infinity && String(n) === newStr && n >= 0;
};

export const rmObjectEmptiesMutate = (o) => {
// eslint-disable-next-line prefer-const
  for (let k in o) {
    if (!isEmptyValue(o[k]) && typeof o[k] !== "object") {
      continue;
    }

    rmObjectEmptiesMutate(o[k]);
    // The property is an object
    if (isEmptyValue(o[k])) {
      delete o[k];
    }
  }
};