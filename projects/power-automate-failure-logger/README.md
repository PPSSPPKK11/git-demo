# Power Automate Failure Logger

## Architecture

1. Child logger flow receives failure context and creates one audit row.
2. Master scheduled flow runs on working days and retrieves failures for the previous business day.
3. Master flow formats the rows into an HTML table and sends a summary email.

## Suggested fields

- Flow Name
- Failure Date/Time
- Failure Reason
- Record URL
- Environment
- Run ID

## Previous-business-day logic

For a Monday-Friday reporting schedule:

- Monday reports Friday failures.
- Tuesday-Friday reports the previous calendar day.
- Saturday and Sunday are skipped.

Store environment-specific site/list values in environment variables and use connection references for deployment portability.

## Production practices

- Keep logging independent from the failing business flow.
- Include the failed action name and run URL where available.
- Use a service account consistently across environments.
- Keep the report query date-driven rather than relying on display formatting.