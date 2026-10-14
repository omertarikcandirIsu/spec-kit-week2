# User Interface Contract: Quote of the Day Page

## Default Presentation

- Use a dark color theme on initial load; do not require a prior visitor preference.
- Display the current quote and saved quote text in a serif typeface.
- Maintain readable contrast for quote text, attribution, controls, and status messages.

## Quote

- On page load, show exactly one quote from the built-in collection and its attribution when known.
- Provide a clearly named **New quote** control. It selects an unshown alternative when one remains and begins a new selection cycle after the collection has been exhausted.
- When only one quote is available, keep it displayed and do not suggest that a different quote was selected.

## Favorites

- Provide a clearly labeled control for adding or removing the displayed quote from favorites.
- Expose the control's saved state to assistive technology and keep it operable by keyboard.
- Provide a view of saved quotes with attribution when known, a removal action for each item, and a clear empty state.
- Reflect successful favorite changes immediately and retain them after reload on the same browser and device.
- If storage fails, keep quote discovery available and clearly report that the favorite change was not saved.

## Content and Accessibility

- Display quote text and attribution as text content.
- Use semantic controls with accessible names and visible keyboard focus.
- Announce favorite save failures through an accessible status message.