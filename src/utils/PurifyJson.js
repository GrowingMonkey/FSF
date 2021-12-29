export const toPurifiedJson = (obj) => {
  if (!obj) {
    return null;
  }
  Object.keys(obj).forEach((key) =>
    // obj[key] === undefined ? delete obj[key] : {}
    {
      if (obj[key] === undefined || obj[key] === null) {
        delete obj[key];
      }
    }
  );
  return obj;
};
