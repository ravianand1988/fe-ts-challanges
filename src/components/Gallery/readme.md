# Gallery Component

**Difficulty**: 🟡 Medium · **Time**: 15–20 min

## What you will learn

- Image grid layout with CSS grid
- Modal/overlay for full-size image preview
- keyboard navigation (arrow keys, escape)
- Image preloading and loading states

## Goal

## Requirements

## Core functionality

1. Display image in a responsive grid layout
2. Click a thumbnail -> open model with full-size image
3. **Navigation**: Prev/Next buttons (or arrow keys) to cycle through images
4. **Close**: Click backdrop, press Escape, or click close button.
5. Wrap around: Next on last image -> first image, Prev on first -> last.

### Keyboard Support

| Key             | Action         |
| --------------- | -------------- |
| `←` Arrow Left  | Previous image |
| `→` Arrow Right | Next image     |
| `Escape`        | Close modal    |

### Image Loading

1. Show a loading indicator while the full-size image loads.
2. Preload adjacent images for smoother navigation (bonus).

## API Design

```ts
type TGalleryProps = {
  items: TGallery[]; // array of image URLs, alts, ids.
};
```

## Walkthrough

### Step 1 — Grid layout

Render images in a CSS Grid container. Each image is clickable and sets the `currentIndex` state.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px;
}
```

### Step 2 — Modal overlay

When `currentIndex !== null`, render a full-screen overlay with the selected image. Use `position: fixed` with `inset: 0` for the backdrop.

### Step 3 — Navigation

Track `currentIndex` in state. Prev/Next buttons update it with wrapping:

```ts
const next = () => setIndex((i) => (i + 1) % images.length);
const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
```

### Step 4 — Keyboard handler

Add a `useEffect` with a `keydown` listener (or `onKeyDown` on the modal):

```ts
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "Escape") close();
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, [currentIndex]);
```

### 💡 Hint — Image preloading

To preload the next/previous images for smoother navigation:

```ts
useEffect(() => {
  const preload = (src: string) => {
    new Image().src = src;
  };
  preload(images[(currentIndex + 1) % images.length]);
  preload(images[(currentIndex - 1 + images.length) % images.length]);
}, [currentIndex]);
```

## Edge Cases

| Scenario                | Expected                             |
| ----------------------- | ------------------------------------ |
| Single image            | Modal opens, no prev/next needed     |
| Empty `images` array    | Render nothing                       |
| Very large images       | Modal scales image to fit viewport   |
| Rapid arrow key presses | Index updates correctly, no skipping |

## Verification

1. Grid displays all thumbnails.
2. Click thumbnail → modal opens with correct image.
3. Arrow keys navigate between images.
4. Navigation wraps around at boundaries.
