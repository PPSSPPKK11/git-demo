# Dynamics 365 Testing Strategy

## Unit tests

Test business services without requiring a live environment.

Examples:
- Opportunity close assessment.
- Payment blocker.
- Product matching.
- Heat-outcome selection.
- State transition validation.

## Integration tests

Validate:
- Plugin registration.
- Entity images.
- Security context.
- Dataverse relationships.
- State/status transitions.

## Client tests

Validate:
- Form OnLoad.
- OnChange.
- OnSave.
- Lookup filters.
- Command enablement.
- Command execution.
- Ribbon refresh.

## Regression matrix

Every change should include:
- happy path
- invalid data
- missing lookup
- null value
- duplicate event
- retry
- unauthorized user
- API/integration path
- large record volume

A CRM developer should test more than the form that happens to be open in front of them.
