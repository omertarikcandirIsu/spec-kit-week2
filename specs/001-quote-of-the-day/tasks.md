# Tasks: Quote of the Day Page

**Input**: Design documents from `/specs/001-quote-of-the-day/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/user-interface.md, quickstart.md

**Tests**: Include automated tests because the project constitution requires behavior-focused testing and the plan selects Node.js's built-in test runner.

**Organization**: Tasks are grouped by user story. Complete the P1 quote experience before the P2 favorites experience.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with another task marked `[P]` when their listed dependencies are complete.
- **[Story]**: Maps a task to a user story from `spec.md`.
- Every task includes the exact implementation or validation file path.

## Phase 1: Setup

**Purpose**: Establish the dependency-free JavaScript test command and module mode.

- [X] T001 Create `package.json` with native ES module mode and an `npm test` script using Node.js's built-in test runner; add no application dependencies.

---

## Phase 2: Foundational

**Purpose**: Blocking prerequisites shared by the user stories.

No additional foundational tasks are required beyond T001; the feature is a static page with no backend or shared service layer.

---

## Phase 3: User Story 1 - Discover a Quote (Priority: P1) - MVP

**Goal**: Show one built-in quote on page load and let visitors request distinct quotes without leaving the page.

**Independent Test**: Run `node --test tests/quotes.test.js`, then follow the quote display and New quote checks in `specs/001-quote-of-the-day/quickstart.md`.

### Tests for User Story 1

- [X] T002 [US1] Write `tests/quotes.test.js` for built-in quote validity, random selection, no repeats while unshown quotes remain, cycle reset, and the single-quote case; verify the tests fail before implementing `src/quotes.js`.

### Implementation for User Story 1

- [X] T003 [P] [US1] Create `src/quotes.js` with multiple distinct, public-domain or cleared quotes; require a unique stable `id`, non-empty `text`, and optional accurate `author`; implement random selection without repeats until the collection is exhausted.
- [X] T004 [P] [US1] Create `index.html` with a semantic quote region, attribution, a clearly named New quote button, and links to `styles.css` and `src/app.js` as a browser module.
- [X] T005 [US1] Create `styles.css` for the quote page with responsive layout, readable text, and visible keyboard focus states.
- [X] T006 [P] [US1] Implement `src/app.js` to display one quote on load and update it from `src/quotes.js` on New quote; render quote content as text and keep the current quote when only one is available.
- [X] T007 [US1] Run `node --test tests/quotes.test.js` and verify the P1 quote scenarios in `specs/001-quote-of-the-day/quickstart.md`.

**Checkpoint**: The quote page is usable and independently testable without favorites.

---

## Phase 4: User Story 2 - Save and Revisit Favorites (Priority: P2)

**Goal**: Let visitors save, view, and remove quotes, retaining favorites across reloads on the same browser and device.

**Independent Test**: Run `node --test tests/favorites.test.js`, then add a favorite, reload, remove it, reload again, and verify persistence and the empty state using `specs/001-quote-of-the-day/quickstart.md`.

### Tests for User Story 2

- [X] T008 [US2] Write `tests/favorites.test.js` for add, remove, duplicate prevention, quote snapshots, malformed saved data, and unavailable or failing storage; verify the tests fail before implementing `src/favorites.js`.

### Implementation for User Story 2

- [X] T009 [P] [US2] Implement `src/favorites.js` with a versioned `localStorage` record; require a unique `id` and non-empty `text`, preserve optional `author` snapshots, prevent duplicate favorites, and report read/write failures without blocking quote display.
- [X] T010 [P] [US2] Extend `index.html` with an accessible favorite toggle, a saved-quotes section, per-quote removal controls, an empty state, and an accessible status message for save failures.
- [X] T011 [US2] Extend `styles.css` for saved/unsaved states, the favorites list, its empty state, visible focus, and narrow viewports.
- [X] T012 [P] [US2] Update `src/app.js` to connect `src/favorites.js` with the current quote, render saved quotes, remove favorites, expose saved state, and announce persistence failures.
- [X] T013 [US2] Run `node --test tests/favorites.test.js` and verify favorite add, reload, remove, empty-state, keyboard, and storage-failure behavior in `specs/001-quote-of-the-day/quickstart.md`.

**Checkpoint**: Visitors can manage a persistent favorites collection while quote discovery remains usable.

---

## Phase 5: Polish and Cross-Cutting Concerns

**Purpose**: Verify complete behavior and keep the delivery aligned with the plan.

- [X] T014 Run `npm test` and all browser scenarios in `specs/001-quote-of-the-day/quickstart.md`; confirm quote attribution and usage rights, keyboard accessibility, and that the page has no backend or third-party runtime dependencies.
- [X] T015 Set a dark default color scheme in `styles.css` with readable contrast; preserve serif type for `.quote-figure blockquote` and `.favorite-text`.
- [X] T016 Run `npm test` and verify dark default colors and serif current/saved quote text at desktop and mobile sizes in the browser using `specs/001-quote-of-the-day/quickstart.md`.

---

## Dependencies and Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; T001 must complete first.
- **Foundational (Phase 2)**: No additional tasks; T001 is the only shared prerequisite.
- **User Story 1 (Phase 3)**: Starts after T001. T002 precedes the quote module; T003 and T004 can then run in parallel. T005 depends on T004. T006 depends on T003 and T004. T007 depends on the complete P1 implementation.
- **User Story 2 (Phase 4)**: Starts after User Story 1 because favorites act on the displayed quote. T008 precedes favorites persistence implementation. T009 and T010 can run in parallel after T008 and P1 completion. T011 depends on T010. T012 depends on T009 and T010. T013 depends on the complete P2 implementation.
- **Polish (Phase 5)**: T014 depends on both user stories.

### User Story Dependencies

- **User Story 1 (P1)**: Depends only on setup; independently delivers the quote experience and is the MVP.
- **User Story 2 (P2)**: Depends on User Story 1's displayed quote and page shell; adds persistence and favorite management.

### Parallel Opportunities

- After T002, T003 and T004 touch separate files and can run in parallel.
- After T003 and T004, T005 and T006 touch separate files and can run in parallel.
- After T008 and completion of User Story 1, T009 and T010 touch separate files and can run in parallel.
- After T009 and T010, T011 and T012 can proceed in parallel because they update separate files.

## Parallel Example: User Story 1

```text
After T002:
Task T003: Implement the quote data and selection cycle in src/quotes.js
Task T004: Create the semantic page shell in index.html

After T003 and T004:
Task T005: Style the quote page in styles.css
Task T006: Wire quote display and selection in src/app.js
```

## Implementation Strategy

### MVP First

1. Complete T001.
2. Complete the P1 quote story (T002-T007).
3. Stop and verify quote loading, non-repeating selection, and keyboard operation independently.
4. Deliver the quote page as the MVP before adding favorites.

### Incremental Delivery

1. Complete setup and the P1 quote experience.
2. Add the P2 favorites collection and same-device reload persistence.
3. Run the full automated test command and browser quickstart scenarios.

## Phase 6: Convergence

- [X] T017 Make failed favorite-add reads explicitly report that the current quote was not saved in `src/favorites.js` and `src/app.js`; add a regression assertion in `tests/favorites.test.js` per FR-008 (partial).