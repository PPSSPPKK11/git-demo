# Customer Insights - Journeys

## Idempotent first-invoice trigger

Use First Invoice Date plus a Welcome Journey Triggered flag.

Flow:
Invoice event → resolve customer → validate first invoice → check flag → start journey → set flag.

The flag protects against duplicate events and retries.

## Test cases

- First invoice created
- Missing invoice date
- Already-triggered customer
- Duplicate event
- Missing customer
- Ineligible customer
