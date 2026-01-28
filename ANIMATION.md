# Animation Guide

Animations are implemented using **GSAP** and are designed to be subtle and non-intrusive.

## Components

### Header
*   **Entrance:** `gsap.from` with `y: -100` and fade in.
*   **Trigger:** On load.

### Hero
*   **Entrance:** Staggered fade-in + slide-up for text elements (`.hero-content > *`).
*   **List:** Staggered slide-in for check list items.
*   **Image:** Scale up (`0.95` -> `1`) and fade in.

### Accordion (FAQ)
*   **Transition:** CSS-based `max-height` transition (0.3s ease-out) toggled via `active` class.

## Best Practices
*   Use `useGSAP` hook for React integration.
*   Always scope selectors using `ref` to avoid conflicts.
*   Prioritize `opacity` and `transform` properties for performance.
