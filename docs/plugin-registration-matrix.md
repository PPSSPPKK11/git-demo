# Plugin Registration Matrix

| Plugin | Table | Message | Stage | Mode | Filtering |
|---|---|---|---|---|---|
| ValidateOpportunity | opportunity | Create | PreValidation | Sync | — |
| ValidateOpportunity | opportunity | Update | PreOperation | Sync | estimatedvalue, closeprobability |
| OpportunityCloseGuard | opportunity | Update | PreOperation | Sync | statecode,statuscode |
| OpportunityPostCreate | opportunity | Create | PostOperation | Async | — |

## Images

For Update logic that compares old/new values, register a minimal Pre Image.

Example alias:
`PreImage`

Only include columns required by the comparison.

## Execution order

When multiple steps exist on the same event, define explicit execution order rather than relying on an accidental order.