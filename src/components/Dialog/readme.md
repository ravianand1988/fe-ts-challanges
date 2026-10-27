# Dialog Component

## What you will learn

- Native `<dialog>` element and `showModal()` API
- `::backdrop` pseudo-element styling
- Focus trapping and Escape key handling (built-in)
- Syncing native dialog state with React state via the `close` event

## Goal

Build a modal dialog using the native HTML `<dialog>` element. The dialog should appear centered with a backdrop overlay, support Confirm/Cancel actions, and close on Escape.

```
┌─────────────────────────────────────────┐
│░░░░░░░░░░░░░░ backdrop ░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░┌─────────────────────────┐░░░░░░░░░│
│░░░░░│                         │░░░░░░░░░│
│░░░░░│   Are you sure?         │░░░░░░░░░│
│░░░░░│                         │░░░░░░░░░│
│░░░░░│   [ Cancel ] [ Confirm ]│░░░░░░░░░│
│░░░░░└─────────────────────────┘░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└─────────────────────────────────────────┘
```

## Requirements

### Core functionality

1. **Modal behavior**: Use `showModal()` to display the dialog (centered, with backdrop, inert background).
2. **Open/Close**: Control via props (React) or methods (Vanilla).
3. **Actions**: Provide Confirm and Cancel buttons that trigger callbacks.
4. **Native close handling**: Listen to the `close` event (fired on Escape) to sync state.
