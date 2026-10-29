# CountrySelect Component

## Goal

Build a CountrySelect autocomplete component. That should allow to search and select a country from the existing list.

## Requirements

### Core Functionality

1. **Cursor in input field:**: Should display the countries list.
2. **Typing in input field**: Should filter out the countries for the given query.
3. **Select**: Clicking on a list item should set the selected country
4. **Single/Multiselect**: Default should be `single` but would be great if `multiselect` API is added.

### API Design

- `onSelect()` should emit single selected country.
- `onSelect()` should emit multiple selected countries.

## Edge Cases

- Scrolling the page with larger content can move the popped country list on the screen.

## Accessibility

- Should support keyboard interaction
