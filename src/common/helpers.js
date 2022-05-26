// this file was created with the purpose of handle our own helper functions and drop off lodash with the time
// please add here ONLY helper function (Small and without large logic)

export const isEmptyObject = (item) => Object.keys(item).length === 0;

export const isEmpty = (item) => item?.length === 0 || item === "";

export const isNull = (item) => item === null;

export const isUndefined = (item) => item === undefined || item === "undefined";

export const isNullOrUndefined = (item) => item == null;

export const isNotValid = (item) => isEmpty(item) || isNull(item) || isUndefined(item);

export const isEqual = (item, other) => item === other;

export const isNumber = (item) => typeof item === "number" && isEqual(item, item);

export const isObject = (item) => typeof item === "object" && !isNull(item);

export const isBoolean = (item) => item === true || item === false;

export const isEven = (item) => isEqual(item % 2, 0);

export const isBlank = (str) => !str || /^\s*$/.test(str);

export const orderByAsc = (data, key, subKey = null) => {
  return data?.sort((a, b) => (subKey ? a[key][subKey] - b[key][subKey] : a[key] - b[key]));
};

export const orderByDesc = (data, key, subKey = null) => {
  return data?.sort((a, b) => (subKey ? b[key][subKey] - a[key][subKey] : b[key] - a[key]));
};
