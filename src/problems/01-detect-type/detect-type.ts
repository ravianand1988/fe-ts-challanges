// bun test src/problems/01-detect-type.test.ts

type MyType =
  | "null"
  | "undefined"
  | "string"
  | "number"
  | "boolean"
  | "symbol"
  | "bigint"
  | "object"
  | "array"
  | "function"
  | "date"
  | "regexp"
  | "map"
  | "set"
  | "weakmap"
  | "weakset"
  | "error"
  | "promise"
  | "arraybuffer"
  | string;

const detectType = (value: any): string => {
  if (value == null) {
    return `${value}`;
  }

  const proto = Object.getPrototypeOf(value);
  const result = proto?.constructor?.name ?? "object";
  return result.toLowerCase();
};

/**
 * Examples
 */
console.log(detectType(null)); // Expected: 'null'
console.log(detectType(undefined)); // Expected: 'undefined'
console.log(detectType(42)); // Expected: 'number'
console.log(detectType(42.33)); // Expected: 'number'
console.log(detectType("Ravi")); // Expected: 'string'
console.log(detectType(true)); // Expected: 'boolean'
console.log(detectType([])); // Expected: 'array'
console.log(detectType({})); // Expected: 'object'
console.log(detectType(new Date())); // Expected: 'date'
console.log(detectType(new Map())); // Expected: 'map'
console.log(detectType(new Set())); // Expected: 'set'
console.log(detectType(/regex/)); // Expected: 'regexp'

export { detectType, MyType };
