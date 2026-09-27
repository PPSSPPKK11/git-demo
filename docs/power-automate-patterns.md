# Power Automate Enterprise Patterns

## Error handling

Use three scopes:

1. TRY — primary business logic.
2. CATCH — configure Run After for failed/timed-out/skipped TRY.
3. FINALLY — cleanup/telemetry where required.

## Child flow pattern

A reusable child flow can receive:

- Flow name
- Environment
- Run ID
- Failed action
- Error message
- Record URL

and persist a normalized failure record.

## Working-day scheduling

For a Monday-Friday reporting flow:

- Monday -> query Friday
- Tuesday-Friday -> query previous day
- Saturday/Sunday -> do not execute

Prefer a schedule configured for weekdays instead of relying only on an expression.

## Deployment

Use:

- Environment variables for URLs/list names/table names.
- Connection references.
- Solution-aware flows.
- Separate DEV / TEST / PROD configurations.
- No hard-coded tenant/customer identifiers.
