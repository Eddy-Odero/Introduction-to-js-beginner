function arrToSet(arr) {
  return new Set(arr);
}

function arrToStr(arr) {
  return arr.join("");
}

function setToArr(set) {
  return [...set];
}

function setToStr(set) {
  return [...set].join("");
}

function strToArr(str) {
  return [...str];
}

function strToSet(str) {
  return new Set(str);
}

function mapToObj(map) {
  return Object.fromEntries(map);
}

function objToArr(obj) {
  return Object.values(obj);
}

function objToMap(obj) {
  return new Map(Object.entries(obj));
}

function arrToObj(arr) {
  return { ...arr };
}

function strToObj(str) {
  return { ...str };
}

function superTypeOf(value) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) return "Array";
  if (value instanceof Map) return "Map";
  if (value instanceof Set) return "Set";
  return value.constructor.name;
}