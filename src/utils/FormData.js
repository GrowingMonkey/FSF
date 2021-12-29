export const toFormData = (obj, key, nosub) => {
  Object.keys(obj).forEach((key) =>
    obj[key] === undefined ? delete obj[key] : {}
  );
  let str = "";
  for (let i in obj) {
    const val = obj[i];
    if (val instanceof Array) {
      str += toFormData(val, i, true);
    } else {
      str += `${key || i}=${val}&`;
    }
  }
  if (nosub) {
    return str;
  } else {
    return str.substring(0, str.length - 1);
  }
};
