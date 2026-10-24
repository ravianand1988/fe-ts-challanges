# Accordion component

## Problem

Build an accordion component that displays a list of collapsible/expandable items. Each item consist of a title (summary) and content details. The component should allow user to toggle the visibility of content each time independently.

## Requirements

- Core functionality
  - Render a list of accordion items based on the provided configuration.
  - Each item should display a title that can be clicked to toggle the visibility of its content
  - Allow independent control of each section (multiple sections can be opened at once).
- Accessibility (A11y)
  - Ensure native accessibility and keyboard support
  - Ensure content is hidden/shown appropriately for the screen readers

## API Design

The component should accept following props:

```bash
items: TAccordionItem[] - An array of items to render
  - id: string - unique identifier
  - title: string - the header text
  - content: string - the text content
```
