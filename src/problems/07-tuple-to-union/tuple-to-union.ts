import type { EqualCustom, ExpectCustom } from "@local/types";

/**
 * Tuple to Union
 *
 * Implement a generic `TupleToUnion<T>` which covers the values of a tuple to its values union.
 *
 * @example
 * type Arr = ['1', '2', '3']
 *
 * type Test = TupleToUnion<Arr> // '1' | '2' | '3'
 */

type TupleToUnion<T extends readonly any[]> = T[number];

type arr = [1, "foo", true];

type cases = [
  ExpectCustom<EqualCustom<TupleToUnion<arr>, 1 | "foo" | true>>,
  ExpectCustom<EqualCustom<TupleToUnion<[123]>, 123>>,
];
