# Data Model: Quote of the Day Page

## Quote

A built-in entry displayed to the visitor.

| Field | Meaning | Rules |
|---|---|---|
| `id` | Stable identity for selection and favorite matching | Required and unique within the built-in collection |
| `text` | Quote content | Required and non-empty |
| `author` | Attribution | Optional; when present, must be accurate |

The built-in collection contains multiple distinct, appropriately cleared quotes. Render quote text and attribution as text, not interpreted markup.

## Favorite

A visitor-saved quote retained across page reloads.

| Field | Meaning | Rules |
|---|---|---|
| `id` | Identity of the source quote | Required; duplicates are not allowed |
| `text` | Snapshot of the quote content when saved | Required and non-empty |
| `author` | Snapshot of known attribution | Optional |

Favorites are stored as a versioned collection in browser `localStorage`. A snapshot allows an older favorite to remain readable and removable if its source quote is later removed from the built-in list. Invalid persisted records are rejected safely; quote display must remain usable if storage is unavailable.

## Selection State

The current quote and the set of quote identifiers already shown in the current selection cycle are transient page state. When every quote has been shown, the next request begins a new cycle. With one quote in the collection, the current quote remains selected.