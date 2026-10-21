import { getType } from "src/utilities";

export function deepEquals(
  a: any,
  b: any,
  store = new Map<any, Set<any>>(),
): boolean {
  if (a === b) {
    return true;
  }

  if (store.has(a) && store.get(a)!.has(b)) {
    return true;
  }

  const [typeA, typeB] = [getType(a), getType(b)];

  if (typeA !== typeB) {
    return false;
  }

  if (typeA === "object" || typeA === "array") {
    const [keysA, keysB] = [Object.keys(a), Object.keys(b)];

    if (keysA.length !== keysB.length) {
      return false;
    }

    if (!store.has(a)) {
      store.set(a, new Set());
    }

    store.get(a)!.add(b);

    for (const key of keysA) {
      if (
        !Object.prototype.hasOwnProperty.call(b, key) ||
        !deepEquals(a[key], b[key], store)
      ) {
        return false;
      }
    }
    return true;
  }

  return a === b;
}

/**
 * Examples
 */

// Primitives
// console.log(deepEquals(1, 1)); // true
// console.log(deepEquals("hello", "hello")); // true
// console.log(deepEquals(true, true)); // true
// console.log(deepEquals(null, null)); // true
// console.log(deepEquals(null, undefined)); // false

// Arrays
console.log(deepEquals([1, 2, 3], [1, 2, 3])); // true
console.log(deepEquals([1, 2], [1, 2, 3])); // false

// Objects
console.log(deepEquals({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
console.log(deepEquals({ a: 1, b: 2 }, { b: 2, a: 1 })); // true (order doesn't matter)
console.log(deepEquals({ a: 1 }, { a: 2 })); // false

// Nested structures
console.log(
  deepEquals(
    { users: [{ name: "John", age: 22 }] },
    { users: [{ age: 22, name: "John" }] },
  ),
); // true
console.log(deepEquals([1, 2, 3, 4, []], [1, 2, 3, 4, []])); // true
