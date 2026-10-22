import { getType } from "src/utilities";

type TCollection = Map<any, any> | Set<any> | Record<any, any> | Array<any>;

function getTarget(type: string): TCollection {
  switch (type) {
    case "map":
      return new Map();
    case "set":
      return new Set();
    case "array":
      return [];
    case "object":
      return {};
    default:
      throw new Error(`unsupported type: ${type}`);
  }
}

function entries(target: TCollection): Iterable<[key: any, value: any]> {
  if (
    target instanceof Map ||
    target instanceof Set ||
    target instanceof Array
  ) {
    return target.entries();
  } else {
    return Object.entries(target);
  }
}

function set(target: TCollection, key: any, value: any) {
  if (target instanceof Map) {
    target.set(key, value);
  } else if (target instanceof Set) {
    target.add(value);
  } else if (target instanceof Array) {
    target[key as number] = value;
  } else {
    target[key] = value;
  }
}

export function deepClone<T>(obj: T, cache = new Map()): T {
  const type = getType(obj);

  if (!type || typeof obj !== "object") {
    return obj;
  }

  switch (type) {
    case "date":
      return new Date(obj as Date) as T;
    case "map":
    case "set":
    case "object":
    case "array":
      // if (cache.has(obj)) {
      //   return cache.get(obj);
      // }
      const target = getTarget(type);
      // cache.set(obj, target);
      for (const [key, value] of entries(obj as TCollection)) {
        set(target, key, deepClone(value));
      }
      return target as T;
    default:
      throw "Unsupported type " + obj;
  }
}

// --- Examples ---
// Uncomment to test your implementation:

const obj = { a: { b: 1 }, c: [2, 3] };
const cloned = deepClone(obj);
cloned.a.b = 99;
console.log(obj.a.b); // Expected: 1 (unaffected)
console.log(cloned.a.b); // Expected: 99
//
const map = new Map([["key", { value: 1 }]]);
const clonedMap = deepClone(map);
console.log(clonedMap.get("key")); // Expected: { value: 1 }
console.log(clonedMap.get("key") !== map.get("key")); // Expected: true
//
const circular: any = { a: 1 };
circular.self = circular;
const clonedCircular = deepClone(circular);
console.log(clonedCircular.self === clonedCircular); // Expected: true
