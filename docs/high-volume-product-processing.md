# High-Volume Product Processing

A CRM solution should not process 20 products and 20,000 products using the same client pattern.

## Scenario

Products are selected by heat outcome, company code, product size and active state.

## Architecture

Business criteria -> server-side filtering -> paging -> bounded batches -> idempotent processing -> telemetry.

## UI guidance

Do not load hundreds of records unnecessarily into the browser.

- Filter on the server.
- Page results.
- Render only what the user needs.
- Avoid unbounded Promise.all.
- Use bounded batches for mutations.

## Server guidance

- Select only required columns.
- Use QueryExpression paging cookies.
- Keep processing idempotent.
- Move large workloads to asynchronous processing when appropriate.

## Correct filter grouping

Business rule:

(size matches OR product has no size) AND company matches

The company condition must apply to both size branches. This is a common Dataverse filtering bug when AND/OR grouping is implemented incorrectly.
