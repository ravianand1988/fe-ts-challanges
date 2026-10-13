# First of Array

## Problem

Implement a generic `First<T>` that takes an Array `T` and returns its first
element's type

```typescript
type arr1 = ["a", "b", "c"];
type arr2 = [2, 3, 5];

type head1 = First<arr1>; // 'a'
type head2 = First<arr2>; // 2

type arr3 = [];
type head3 = First<arr3>; // never
```

## Explanation

### Key Concepts

- **Conditional types** (`T extends U ? X : Y`) let you branch logic at the type level
- **`infer`** keyword declares a type variable inside a conditional type that TypeScript will try to fill in
- **Variadic tuple types** (`...any[]`) let you match "the rest" of a tuple

### Solution Approach

Use `infer` combined with tuple destructuring to pattern-match the first element:

```typescript
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
```

**How it works step-by-step:**

1. `T extends [infer F, ...any[]]` — asks: "Does `T` match a tuple with at least one element?"
2. If yes, `F` captures the type of the first element → return `F`
3. If no (empty tuple `[]`), the pattern doesn't match → return `never`

### Alternative Solutions

```typescript
// Using indexed access with a conditional check
type First<T extends any[]> = T extends [] ? never : T[0];

// Using T['length'] to check emptiness
type First<T extends any[]> = T["length"] extends 0 ? never : T[0];
```

### Common Pitfalls

- Returning `T[0]` without checking for empty arrays — `[][0]` is `undefined`, not `never`
- Forgetting the `...` rest element in the pattern — `[infer F, any[]]` matches a 2-element tuple where the second element is an array
