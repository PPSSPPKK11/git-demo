# Dataverse State and Status Code Strategy

Hard-coding state/status values is tempting because the numbers often look stable during development.

That is a maintenance trap.

## Example business rule

For the Opportunity close scenario:

- Active Payment → block close and handle the payment transition according to the approved business rule.
- Active Quote/Order/Invoice → warn and require explicit handling.
- No active dependencies → allow close.

The implementation should not scatter numeric status values through several classes.

## Better pattern

Keep solution-owned configuration in one place:

~~~text
QuoteCancellation
  State = configured value
  Status = configured value

OrderCancellation
  State = configured value
  Status = configured value

InvoiceCancellation
  State = configured value
  Status = configured value

PaymentDecline
  State = configured value
  Status = configured value
~~~

Resolve actual values from the target environment's metadata/configuration.

## Transaction warning

A synchronous plugin that updates a related payment and then throws an exception is still inside the transaction. The related update can roll back with the failed operation.

Therefore, "decline payment and block opportunity close" is not automatically solved by doing both operations in one synchronous plugin.

A two-step design, Custom API, or separate transaction boundary may be required when the payment transition must persist independently.