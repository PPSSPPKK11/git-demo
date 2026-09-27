# Plugin Registration Strategy

## ValidateOpportunity

**Table:** opportunity  
**Messages:** Create, Update  
**Stage:** PreValidation or PreOperation depending on business requirement  
**Mode:** Synchronous  
**Update filtering attributes:** estimatedvalue, closeprobability

### Why filtering attributes?

The plugin should not execute for every Opportunity update when the business rule only depends on specific columns.

## OpportunityPostCreate

**Table:** opportunity  
**Message:** Create  
**Stage:** PostOperation  
**Mode:** Async when the operation is non-blocking.

### Enterprise considerations

- Use tracing extensively.
- Avoid retrieving columns you do not need.
- Avoid unnecessary service calls.
- Never rely on UI validation for server-side business rules.
- Use depth checks carefully; do not use them as a substitute for sound architecture.
- Prefer async processing for long-running integrations.
- Keep secrets out of source control.
