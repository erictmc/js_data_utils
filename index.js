
export const deepCopyObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const renameObjectFieldCopy = (obj, oldName, newName) => {
  const newObj = deepCopyObject(obj);
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

