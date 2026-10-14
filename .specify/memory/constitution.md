# Spec Kit Week 2 Constitution

## Core Principles

### I. Clarity and Correctness
Code must make its intent easy to understand and implement the required behavior correctly. Prefer descriptive names, small cohesive units, explicit interfaces, and straightforward control flow. Handle invalid inputs and failure cases deliberately. Avoid cleverness, duplication, and abstractions that do not solve a demonstrated problem.

### II. Tests Prove Behavior
Every change that affects behavior must include or update tests at the narrowest useful level. Tests must verify externally observable outcomes and important edge cases, not mirror implementation details. Bug fixes must include a regression test when practical. Keep tests deterministic, isolated, and understandable.

### III. Risk-Based Verification
Run the relevant focused tests and quality checks for each change, and run the full available suite when scope or shared behavior warrants it. Add integration tests where component boundaries, persistence, or public contracts create risks that unit tests cannot cover. Do not claim verification that was not performed; document unavailable checks and known failures.

### IV. Maintainable Change
Keep changes focused and consistent with existing conventions. Preserve public behavior unless a change is intentional, documented, and tested. Prefer the simplest design that meets current requirements; introduce dependencies and abstractions only when they provide clear value. Refactor touched code when needed to keep it understandable without expanding the task unnecessarily.

### V. Reviewable and Documented Interfaces
Changes to public APIs, configuration, data formats, or user-facing workflows must include appropriate documentation and compatibility notes. Keep implementation and tests readable enough for another contributor to review the intent, behavior, and tradeoffs without relying on undocumented assumptions.

## Quality Standards
Use the project's established formatter, linter, type checker, and test tools when available. Fix issues introduced by the change; do not silently broaden work to unrelated cleanup. Treat warnings, flaky tests, and skipped checks as visible quality risks rather than evidence of success.

## Development Workflow
Before implementation, identify the behavior and its acceptance criteria. Make the smallest coherent change, add or update tests, and run focused checks. Before considering work complete, review the diff for unintended changes, stale comments or documentation, and unmet compatibility requirements.

## Governance
This constitution guides project specifications, plans, implementation, and review. When a proposed change conflicts with a principle, document the reason and the accepted tradeoff in the relevant plan or review. Amendments must update this document and its version; changes to existing requirements must also identify affected tests and documentation.

**Version**: 1.0.0 | **Ratified**: 2026-10-14 | **Last Amended**: 2026-10-14
