# Dynamics 365 CE Engineering Notes

A practical Microsoft Dynamics 365 CE / Dataverse engineering portfolio.

The repository is organized by topic so it is easy to find the kind of work you need instead of digging through one large docs folder.

> Fictional/reference examples only. No employer or customer source code is included.

## Topics

### Business-Rules
Business rules and real-world CRM scenarios.
- Opportunity close guard
- Active Payment / Quote / Order / Invoice checks
- Opportunity auto-cancellation
- Status and business-condition handling

### Power-Automate
Power Automate work and troubleshooting.
- Failure logger
- Child flows
- TRY / CATCH / FINALLY
- SharePoint error reporting
- Environment variables
- Connection references
- Previous business day
- Monday-Friday schedules
- Bound and unbound actions

### JavaScript
Model-driven app JavaScript.
- Form events
- Fields and controls
- Lookup filtering
- Web API
- Ribbon / Command Bar
- BPF
- Grids and subgrids
- Navigation and dialogs
- Relationships
- Custom API
- User/security context
- High-volume product filtering

### Plugins
C# plugins and server-side Dataverse logic.
- Pipeline and execution context
- Filtering attributes
- Images
- Recursion/depth
- Tracing
- Configuration
- Opportunity validation and close
- Product / heat-outcome processing
- Idempotency
- Transaction boundaries

### Security
Dataverse security model and troubleshooting.
- Business units
- Security roles
- Privileges
- Teams and ownership
- Sharing
- Field security
- User context
- Access troubleshooting

### Manual-Deployments
Practical environment movement notes.
- Dev → Test → UAT → Prod
- Solutions
- Environment variables
- Connection references
- Plugin registration
- Web resources
- Flows
- Security
- Smoke testing
- Rollback checklist

### Customer-Insights-Journeys
Real-time marketing work.
- First-invoice journey
- Trigger vs segment
- Welcome Journey Triggered flag
- Marketing forms
- Form validation
- Duplicate handler troubleshooting

### FetchXML-QueryExpression
Query patterns.
- FetchXML
- QueryExpression
- Nested AND/OR filters
- Lookup filtering
- Paging
- Performance
- Product heat-outcome filtering

### Testing
Regression and plugin testing.
- Business scenarios
- Negative paths
- Plugin tests
- High-volume cases
- Deployment smoke tests

## A few real engineering patterns captured here

**Opportunity close:** active Payment is a hard stop; related commercial records require the agreed warning/cancellation path. The portfolio also documents the transaction-boundary issue instead of hiding it.

**Product filtering:** the important grouping is `(size matches OR size is empty) AND company matches AND heat outcome matches`. This avoids the common OR-condition bug where products from another company are returned.

**Marketing forms:** validation covers numeric-only names/company, email and phone formats, while accounting for duplicate handlers caused by multiple embedded forms.

**Power Automate:** failure handling is separated into reusable logging and reporting so business flows do not become cluttered.

## Engineering style

- Keep client code focused on user experience.
- Keep business-critical validation server-side.
- Select only required columns.
- Filter Update plugins narrowly.
- Avoid N+1 queries.
- Keep synchronous work short.
- Make retry and duplicate execution safe.
- Keep environment-specific values out of code.
- Treat deployment and registration as part of the implementation.
- Turn production issues into regression scenarios.

## Technology

Dynamics 365 CE | Dataverse | C# Plugins | JavaScript | Xrm.WebApi | FetchXML | QueryExpression | Power Automate | Power Apps | Customer Insights - Journeys
