# Tuple Length

## Problem

For a given tuple, you need to create a generic `Length` that picks the length
of the tuple (as a specific number literal, not just `number`).

```typescript
type tesla = ["tesla", "model-3", "model-X", "model-Y"];
type spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT",
];

type teslaLength = Length<tesla>; // 4
type teslaLength = Length<spaceX>; // 5
```

## Explanation

### Key Concepts

- **Tuple types** are fixed-length arrays where each position has a known type
- **Indexed access types** let you look up a specific property of a type using bracket notation (`T['prop']`)
- The `'length'` property on a **tuple** resolves to a **number literal** (e.g. `4`), not the general `number` type

### Solution Approach

1. Constrain the generic parameter `T` to `readonly any[]` — this accepts both mutable and readonly tuples
2. Use the indexed access `T['length']` to extract the length

```typescript
type Length<T extends readonly any[]> = T["length"];
```

### Why `readonly any[]`?

If you constrain with just `any[]`, passing a `readonly` tuple (created with `as const`) would fail because `readonly` arrays are not assignable to mutable arrays. Using `readonly any[]` accepts both.

### Common Pitfalls

- Using `any[]` instead of `readonly any[]` — this rejects `as const` tuples
- Forgetting that `T['length']` on a **regular array** (not a tuple) just returns `number`, not a literal
