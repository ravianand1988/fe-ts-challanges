# Toast Component

**Difficulty**: 🔴 Hard · **Time**: 25–30 min

## What you will learn

- React Context + Provider pattern for global API
- `useImperativeHandle` to expose methods from a child component
- React animations (fade-in / fade-out) with `onAnimationEnd`
- Timer-based auto dismiss

## Goal

Build a toast notification system. A `ToastProvider` wraps the app and exposes a `useToast()` hook. Calling `toast({ id, text })` renders a notification that auto-dismisses after a timer, with enter/exit animations.

```
App Layout:                          Toast Container (portal):
┌──────────────────────┐             ┌──────────────────┐
│                      │             │  ┌──────────────┐│
│   useToast().toast() ─────────────►│  │ Toast 1  ↑   ││ ← fade in
│                      │             │  └──────────────┘│
│   [Show Toast]       │             │  ┌──────────────┐│
│                      │             │  │ Toast 2  ↓   ││ ← fade out
│                      │             │  └──────────────┘│
└──────────────────────┘             └──────────────────┘
                                       (portal target)
```

## Requirements

### Core Functionality

1. **`ToastProvider`**: Wraps the app, accept a `target` CSS selector for the portal container.
2. **`useToast()`**: Returns `{ toast(item) }` - The API to show notifications.
3. **Auto-dismiss**: Each toast disappears after a timer (e.g., 3 seconds).
4. **Animations**: Fade-in on appear, fade-out on dismiss.
5. **Stacking**: Multiple toasts stack vertically.
