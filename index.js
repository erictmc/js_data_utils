
export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const renameObjectFieldCopy = (obj, oldName, newName) => {
  const newObj = deepCopy(obj);
  if (oldName in newObj) {
    newObj[newName] = newObj[oldName];
    delete newObj[oldName];
  }
  return newObj;
};

export const renameObjectFieldMutate = (obj, oldName, newName) => {
  if (oldName in obj) {
    obj[newName] = obj[oldName];
    delete obj[oldName];
  }
};

export const isEmptyObject = (obj) => {
  return obj.constructor === Object && Object.keys(obj).length === 0;
};


export const isEmptyValue = (x) => {
  return x === undefined || x === "" || x === null || isEmptyObject(x);
};

export const compareSortedArrays = (a1, a2) => {
  return a1.length===a2.length && a1.every((v,i)=> v === a2[i])
};