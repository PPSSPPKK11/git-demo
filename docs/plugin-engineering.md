# Plugin Engineering

## Registration Strategy

### ValidateOpportunity
- Table: opportunity
- Messages: Create, Update
- Stage: PreValidation / PreOperation depending on the requirement
- Mode: Synchronous
- Update filtering: estimatedvalue, closeprobability

### OpportunityPostCreate
- Table: opportunity
- Message: Create
- Stage: PostOperation
- Mode: Async where immediate completion is not required

## Entity Images

Use Pre Images when comparing previous values and Post Images when downstream logic needs the committed representation. Avoid re-querying data already available in the pipeline.

## Configuration

Use secure/unsecure configuration for deployment settings. Never commit credentials, tokens or connection strings.

## Performance

- Avoid unnecessary Retrieve calls.
- Request only required columns.
- Avoid N+1 service calls.
- Use bulk APIs appropriately.
- Move expensive non-transactional work to asynchronous processing.
