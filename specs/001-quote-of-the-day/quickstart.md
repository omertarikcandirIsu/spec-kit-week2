# Quickstart: Quote of the Day Page

## Prerequisites

- A current desktop or mobile browser.
- Node.js 20 or newer to run the dependency-free automated tests. Node.js is not required to use the page.
- Python 3 or another static file server for local browser testing. The static server only serves files; the application has no backend.

## Run the Tests

From the repository root:

```sh
npm test
```

Expected result: all quote selection and favorites behavior tests pass.

## Run the Page

From the repository root, start a static file server:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser.

## Browser Validation

1. On initial load, confirm the page uses a dark color theme and the current quote is displayed in a serif typeface.
2. Confirm the page displays exactly one built-in quote with its known attribution.
3. Select **New quote** repeatedly; verify it does not repeat a quote while unshown alternatives remain.
4. Add the displayed quote to favorites; verify it appears in the favorites view, uses a serif typeface, and is marked as saved.
5. Reload the page; verify the favorite remains and is not duplicated.
6. Remove the favorite, reload, and verify it remains absent. Confirm the empty state when there are no favorites.
7. Use only the keyboard to operate the quote and favorite controls and verify focus is visible.