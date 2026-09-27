# Power Automate Enterprise Patterns

## TRY / CATCH / FINALLY

TRY contains business logic. CATCH runs after failed/timed-out/skipped TRY actions and captures flow name, run ID, failed action and error. FINALLY handles cleanup or telemetry where needed.

## Child Flow

Use a reusable logging child flow so business flows remain focused on business logic.

## Previous Business Day

For a Monday-Friday report:
- Monday queries Friday.
- Tuesday-Friday queries the previous calendar day.
- Saturday/Sunday are skipped.

Use solution-aware flows, connection references and environment variables for ALM.
