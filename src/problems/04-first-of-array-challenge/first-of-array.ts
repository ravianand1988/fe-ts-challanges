import type { EqualCustom, ExpectCustom } from "@local/types";

/**
 * First of Array
 *
 * Implement a generic `First<T>` that takes an Array `T` and returns its first element's type.
 *
 * @example
 * type arr1 = ['a', 'b', 'c']
 * type arr2 = [3, 2, 1]
 *
 * type head1 = First<arr1> // 'a'
 * type head2 = First<arr2> // 3
 *
 * type arr3 = []
 * type head3 = First<arr3> // never
 */

type First<T extends readonly any[]> = T extends [infer first, ...any]
  ? first
  : never;

type FirstA<T extends any[]> = T["length"] extends 0 ? never : T[0];
type FirstB<T extends any[]> = T extends [] ? never : T[0];

const x = [1, 2];
type cases = [
  ExpectCustom<EqualCustom<First<[3, 2, 1]>, 3>>,
  ExpectCustom<EqualCustom<FirstA<[3, 2, 1]>, 3>>,
  ExpectCustom<EqualCustom<First<["a", "b"]>, "a">>,
  ExpectCustom<EqualCustom<FirstB<["a", { name: "Ravi" }]>, "a">>,
  ExpectCustom<EqualCustom<First<[]>, never>>,
  ExpectCustom<EqualCustom<First<[undefined]>, undefined>>,
];

type errors = [
  // @ts-expect-error strings are not arrays
  First<"notArray">,
  // @ts-expect-error objects are not arrays
  First<{ 0: "arrayLike" }>,
];
