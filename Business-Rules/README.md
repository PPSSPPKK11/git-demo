# Business Rules

Practical Dataverse and model-driven app business-rule patterns.

## Topics
- Field validation and required/optional behavior
- Business-rule vs JavaScript vs plugin decision
- Opportunity close validation
- Opportunity auto-cancellation
- Quote, Order, Invoice and Payment checks
- Status/reason handling
- Server-side enforcement

## Examples
- Block an Opportunity close when an active Payment exists.
- Warn when active commercial records exist.
- Automatically cancel stale Opportunities when business conditions are satisfied.

Keep business rules simple where possible. Use server-side logic when the rule must apply regardless of the client used.
