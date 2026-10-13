# Pick

## Problem

Implement the built-in `Pick<T, K>` generic without using it.
Constructs a type by picking the set of properties `K` from `T`.

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;
// { title: string, completed: boolean }
```

## Explanation

### Key Concepts

- **Mapped types** — `{ [P in K]: ... }` iterates over each member of a union `K` and creates a property for it
- **`keyof`** — produces a union of all property names of a type
- **Generic constraints** — `K extends keyof T` ensures only valid keys are passed

### Solution Approach

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

**How it works step-by-step:**

1. `K extends keyof T` — constrains `K` to only valid property names of `T`
2. `[P in K]` — iterates over each key in the union `K`
3. `T[P]` — looks up the value type for that key in `T`

**Example trace:** `MyPick<Todo, 'title' | 'completed'>`

- `P = 'title'` → `T['title']` = `string`
- `P = 'completed'` → `T['completed']` = `boolean`
- Result: `{ title: string; completed: boolean }`

### Common Pitfalls

- Forgetting `K extends keyof T` — without the constraint, invalid keys could be passed
- Using `keyof T` instead of `K` in the mapped type — that would pick all keys, not just the selected ones
