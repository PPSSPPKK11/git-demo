# Plugin Context

Before writing business logic, inspect the execution context.

## Common checks

- Message
- Primary entity
- Stage
- Mode
- Depth
- UserId
- InitiatingUserId
- CorrelationId
- Target
- Pre Image
- Post Image
- SharedVariables

## Practical rules

Use filtering attributes for Update steps. Register only the images and columns required by the logic. Guard against recursive execution. Keep synchronous plugins short when they run inside a transaction.

For a rule that only validates data before the main operation, PreValidation or PreOperation may be appropriate depending on the transaction boundary and business requirement.
