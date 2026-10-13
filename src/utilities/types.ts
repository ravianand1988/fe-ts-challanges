/**
 * Type utilities for TypeScript type challenges
 * Based on @type-challenges/utils
 */

/**
 * Check if two types are exactly equal
 */
export type EqualCustom<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

/**
 * Expect a type to be true
 */
export type ExpectCustom<T extends true> = T;
