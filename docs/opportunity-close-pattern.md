# Opportunity Close: Related Commercial Records

This is an enterprise pattern for a sensitive Opportunity close operation.

## Business rule

When an Opportunity is being closed as Won/Lost:

### Active Quote
Warn the user.

### Active Order
Warn the user.

### Active Invoice
Warn the user.

### Active Payment
Block the operation. The payment must be declined/resolved before the Opportunity can be closed.

## Architecture

```
Command Bar
   ↓
Client inspection / confirmation
   ↓
Close request
   ↓
PreOperation plugin
   ↓
Query active Quote / Order / Invoice / Payment
   ↓
Payment? ── yes ──> THROW → transaction cancelled
   │
   no
   ↓
Commercial records?
   ↓
Business-specific confirmed operation
   ↓
Cancel/resolve related records
   ↓
Close Opportunity
```

The plugin is the authoritative enforcement point because client-side JavaScript can be bypassed through API/import/integration paths.

## Important transaction consideration

If related records are changed inside the same synchronous Dataverse transaction and a later exception is thrown, transactional work can be rolled back. The exact cancellation mechanism and status values must match the solution's table metadata.

## Known status examples

Typical platform values differ by table and solution configuration. Never hard-code status values from another environment without verifying metadata.

## Registration

Suggested close guard:
- Table: opportunity
- Message: Update
- Stage: PreOperation
- Mode: Synchronous
- Filtering attributes: statecode, statuscode

Filtering attributes reduce unnecessary executions on unrelated updates.