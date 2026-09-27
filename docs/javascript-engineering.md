# JavaScript Engineering

Use executionContext.getFormContext() and modular namespaces.

## Client/server boundary

Client validation improves UX; it must not replace server-side validation for rules that protect data integrity.

## Xrm.WebApi

Prefer:
- $select for required columns
- $filter for server-side criteria
- $top for bounded UI queries
- async/await with explicit error handling

## Maintainability

Separate Form, WebApi and business utility modules rather than placing all logic in one Web Resource.
