# Opportunity Close Deep Dive

## Required behavior

When the user attempts to close an Opportunity:

1. Detect whether the operation is Won or Lost.
2. Find active Quote records.
3. Find active Order records.
4. Find active Invoice records.
5. Find active Payment records.

### Payment path

Payment is the hard-stop condition.

The server-side implementation can decline the payment and deliberately stop the close. If both operations occur inside the same synchronous Dataverse transaction, a later exception causes the transaction to roll back, so a requirement such as "decline payment and keep it declined while cancelling the Opportunity close" requires an explicit two-step architecture rather than pretending one transaction can do both.

### Commercial-record path

If the business wants the close to proceed after user confirmation:

- show the user which Quote/Order/Invoice records are active;
- obtain explicit confirmation;
- perform cancellation using the correct table-specific state/status;
- allow the Opportunity close.

## Why two layers?

JavaScript provides the warning and confirmation experience.

The plugin enforces the rule for every caller, including API, integration, import and automation paths.

## Registration

Opportunity Update, PreOperation, synchronous, filtering attributes statecode/statuscode.

## Performance

Use existence queries with TopCount=1 where only presence is required. Do not retrieve every column or every related record merely to decide whether a blocker exists.
