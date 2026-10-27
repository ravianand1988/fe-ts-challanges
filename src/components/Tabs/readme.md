# Tabs Component

## What you will learn

- Compound component pattern (`Tabs` + `Tab`)
- Controlled state with `useState`
- React portals for rendering content outside the component tree
- Event delegation with `data-*` attributes

## Goal

Build a tabs component where clicking a tab header switches the visible content panel. Optionally support rendering the content into a **portal target** (a DOM element outside the component tree).

```
┌──────┬──────┬──────┐
│ Tab1 │ Tab2 │ Tab3 │    ← tab headers (nav)
└──────┴──┬───┴──────┘
          │ active
  ┌───────▼──────────────┐
  │                      │
  │  Content for Tab2    │  ← content panel
  │                      │
  └──────────────────────┘
```

## Requirements

### Core Functionality

1. Render tab headers from child `<Tab>` elements.
2. clicking a tab header switches the active tab and displaying its content
3. Accept a `defaultTab` prop to set the initially active tab.
4. If no `defaultTab`, a default to the first tab.
