# Server-side Dataverse logic

The plugin examples are organized around business boundaries.

## Scenarios

### Opportunity
- Validation
- Owner validation
- Close guard
- Close assessment
- Post-create processing
- Stale opportunity eligibility

### Product
- Heat-outcome filtering
- Company/size filter grouping
- Paging
- Bounded processing

### Shared infrastructure
- Tracing
- Execution-context helpers
- Entity images
- Configuration parsing
- Idempotency keys
- Change detection

## Registration mindset

A class is only half of a plugin implementation. The message, stage, mode, filtering attributes, execution order, user context and images are part of the runtime contract.