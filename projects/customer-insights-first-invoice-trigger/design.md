# Customer Insights - Journeys: First Invoice Trigger

## Goal

Start a welcome journey only after a customer's first invoice is created, and ensure the journey is not started twice.

## Data pattern

Use a Dataverse boolean named Welcome Journey Triggered on the customer record.

Trigger conditions:

1. First Invoice Date has a value.
2. Welcome Journey Triggered is No.
3. Customer is eligible for the journey.

After successful journey initiation, set the flag to Yes.

## Why the flag matters

Invoice events can be retried or another qualifying update can occur. The flag provides an idempotency guard so the same customer does not repeatedly enter the journey.

## Test matrix

| Scenario | Expected |
|---|---|
| First invoice created | Journey starts |
| First invoice missing | No journey |
| Flag already Yes | No journey |
| Duplicate event | No duplicate journey |
| Non-eligible customer | No journey |

Use fictional/demo records only. No employer or customer configuration is included.