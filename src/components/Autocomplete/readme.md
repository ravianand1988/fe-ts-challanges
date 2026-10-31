# Autocomplete component

## Goal

Build an autocomplete component that searches via a promise for the given query. When matches are found it lists them out, and the user can select an item.

## Requirements

### Core functionality

1. The component should accept a function that returns a promise for the given query.
2. The component should display a list of matching items when the user types in the input field.
3. The component should allow the user to select an item from the list.

### Constraints

- The component is **generic** (`Autocomplete<T>`): an option's `value` can be a plain string or any object (e.g. a `User`).
- The component is **presentational / controlled**. It does not fetch data itself; the parent listens to `onQueryChange`, runs the promise and passes `options`, `loading` and `error` back down. This keeps debouncing, caching and cancellation in the caller's hands.
- Every option needs a stable, unique `key` (used as the React list key).

### API design

```ts
type TAutocompleteItem<T> = {
  key: string;
  value: T;
};

interface IAutocomplete<T> {
  label?: string;
  placeholder?: string;
  options: TAutocompleteItem<T>[];
  onSelect: (item: TAutocompleteItem<T>) => void;
  onQueryChange: (query: string) => void;
  getOptionLabel: (item: T) => string;
  loading: boolean;
  error: string | null;
}
```

| Prop             | Type                                  | Required | Default               | Description                                                       |
| ---------------- | ------------------------------------- | -------- | --------------------- | ----------------------------------------------------------------- |
| `label`          | `string`                              | No       | `"Autocomplete"`      | Text of the `<label>` linked to the input.                        |
| `placeholder`    | `string`                              | No       | `"Type to search..."` | Input placeholder.                                                |
| `options`        | `TAutocompleteItem<T>[]`              | Yes      | –                     | Suggestions to render.                                            |
| `onSelect`       | `(item: TAutocompleteItem<T>) => void` | Yes      | –                     | Called when an option is picked by click or <kbd>Enter</kbd>.     |
| `onQueryChange`  | `(query: string) => void`             | Yes      | –                     | Called on every keystroke with the raw input value.               |
| `getOptionLabel` | `(item: T) => string`                 | Yes      | –                     | Maps an option value to the text shown in the list and the input. |
| `loading`        | `boolean`                             | Yes      | –                     | Shows a `Loading...` row instead of options.                      |
| `error`          | `string \| null`                      | Yes      | –                     | Shows the error message instead of options.                       |

#### Usage

```tsx
const [query, setQuery] = useState("");
const [options, setOptions] = useState<TAutocompleteItem<User>[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  if (!query.trim()) {
    setOptions([]);
    return;
  }
  const controller = new AbortController();
  const timer = setTimeout(async () => {
    try {
      setLoading(true);
      setError(null);
      setOptions(await getUsersOptions(query, controller.signal));
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err instanceof Error ? err.message : "Request failed");
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, 400);

  return () => {
    clearTimeout(timer);
    controller.abort();
  };
}, [query]);

<Autocomplete<User>
  label="Search User"
  options={options}
  onQueryChange={setQuery}
  onSelect={(item) => console.log(item.value)}
  getOptionLabel={(user) => user.name}
  loading={loading}
  error={error}
/>;
```

See [Autocomplete.example.tsx](./Autocomplete.example.tsx) for two full examples (string options and `User` options).

### Behaviour

- **Dropdown visibility**: the list is shown via CSS while the wrapper has focus (`:focus-within`) and hidden when focus leaves.
- **Render priority** inside the list: `error` → `loading` → "No matching result!" (non-empty query, zero options) → options.
- **Selecting** an option sets the input text to `getOptionLabel(option.value)`, resets the highlight, calls `onSelect` and blurs to close the list.
- **Typing** resets the highlight and calls `onQueryChange` with the new value.

### Keyboard interaction

| Key                         | Action                                                   |
| --------------------------- | -------------------------------------------------------- |
| <kbd>ArrowDown</kbd>        | Highlight the next option (wraps to the first).          |
| <kbd>ArrowUp</kbd>          | Highlight the previous option (wraps to the last).       |
| <kbd>Enter</kbd>            | Select the highlighted option and close the list.        |
| <kbd>Escape</kbd>           | Clear the highlight and close the list (blurs input).    |
| Mouse hover                 | Highlights the hovered option.                           |

The highlighted option is kept in view with `scrollIntoView({ block: "nearest" })`.

## Edge cases

- **Empty / whitespace query**: the caller should clear options and skip the request; the component shows nothing for an empty query.
- **Race conditions**: an older, slower response must not overwrite a newer one. The examples show two ways to handle this:
  - a request-id ref (`requestId.current`) that ignores stale results;
  - an `AbortController` aborted in the effect cleanup.
- **Debouncing**: the examples debounce requests by 400ms with `setTimeout` to avoid a request per keystroke.
- **Errors**: the mock APIs reject when the query is `"error"`; the message is displayed inside the dropdown.
- **No results**: shows "No matching result!".
- **Keyboard with no options**: arrow/Enter/Escape keys are ignored when `options` is empty.

## Additional support

- Accessibility:
  - `<label htmlFor>` is linked to the input via ids generated by `useId`, so multiple instances on one page don't clash.
  - The input has `role="combobox"`, `aria-controls` pointing at the list and `aria-activedescendant` pointing at the highlighted option.
  - The list has `role="listbox"`; each option has `role="option"` and `aria-selected`.

## Files

| File                                                     | Purpose                                     |
| -------------------------------------------------------- | ------------------------------------------- |
| [Autocomplete.tsx](./Autocomplete.tsx)                   | Component implementation.                   |
| [Autocomplete.types.ts](./Autocomplete.types.ts)         | `IAutocomplete<T>` props interface.         |
| [Autocomplete.module.css](./Autocomplete.module.css)     | Input, dropdown and highlight styles.       |
| [Autocomplete.example.tsx](./Autocomplete.example.tsx)   | Usage examples with mock APIs.              |
| [src/api/autocomplete.api.ts](../../api/autocomplete.api.ts) | `TAutocompleteItem<T>` and mock `getOptions` / `getUsersOptions`. |

## Testing

### Unit tests

- Renders label/placeholder defaults and custom values.
- Calls `onQueryChange` on typing.
- Renders `Loading...`, the error message and "No matching result!" in the right priority.
- ArrowUp/ArrowDown wrap around; Enter selects the highlighted option and calls `onSelect`.
- Selected option label is written to the input.

### Integration tests

- With a mocked promise: debounced request, stale responses ignored, aborted requests don't set an error.

### End-to-end tests

- Type a query, navigate with the keyboard, select an option and verify the input value and dropdown closing.
