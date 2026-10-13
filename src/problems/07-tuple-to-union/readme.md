# Tuple to Union

## Problem

Implement a generic `TupleToUnion<T>` which converts the values of a tuple to its values union.

```typescript
type Arr = ["1", "2", "3"];

type Test = TupleToUnion<Arr>; // '1' | '2' | '3'
```

## Explanation

### Key Concepts

- **Indexed access with `number`** — when you index a tuple (or array) type with `number`, TypeScript returns a union of all possible element types
- This works because a tuple's numeric indices are `0`, `1`, `2`, etc. — `number` covers all of them

### Solution Approach

```typescript
type TupleToUnion<T extends readonly any[]> = T[number];
```

**How it works:**

1. `T[number]` asks: "What type do I get when I index `T` with any `number`?"
2. For a tuple `[123, '456', true]`, the valid indices are `0 | 1 | 2`
3. `T[0] | T[1] | T[2]` = `123 | '456' | true`

### Alternative Solution

You could also use a recursive approach, but the indexed access approach is much simpler:

```typescript
// Recursive (works but unnecessarily complex)
type TupleToUnion<T extends any[]> = T extends [infer F, ...infer R]
  ? F | TupleToUnion<R>
  : never;
```

### Common Pitfalls

- Overcomplicating with recursion when `T[number]` does the job in one expression
- Forgetting `readonly` in the constraint — `as const` tuples are readonly
