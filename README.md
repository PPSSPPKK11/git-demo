# Dynamics 365 CE Engineering Toolkit

A long-form engineering portfolio for Microsoft Dynamics 365 Customer Engagement, Dataverse and Power Platform development.

This repository is intentionally structured like an enterprise CRM codebase: reusable client libraries, server-side plugins, query patterns, command-bar engineering, high-volume processing, tests, ALM and architecture documentation.

> Fictional/reference implementation. No employer or customer source code is included.

## Repository Map

### Client-side JavaScript

- Form OnLoad / OnChange / OnSave
- Field and control manipulation
- Lock / unlock controls
- Hide / show controls
- Required / optional columns
- Notifications
- Lookup filtering
- Lookup custom views
- Lookup read/set/clear
- Subgrid and grid selection
- BPF operations
- Tabs and sections
- Xrm.WebApi CRUD
- OData filtering and paging
- Associate / disassociate
- Custom API execution
- Global/user/security context
- Ribbon / command-bar actions
- Enable rules and display-rule patterns
- Async command rules
- Ribbon refresh

### Server-side C#

- Plugin execution context
- Pipeline stages
- Pre/Post entity images
- Filtering attributes
- Depth and recursion control
- Secure/unsecure configuration patterns
- Tracing and correlation
- QueryExpression
- Paging cookies
- Minimal existence queries
- Business-rule validation
- Opportunity close orchestration
- Related Quote/Order/Invoice/Payment handling
- High-volume Product processing
- Idempotent processing patterns

### Power Platform

- Power Automate TRY/CATCH/FINALLY
- Child flows
- Failure telemetry
- Previous-business-day reporting
- Environment Variables
- Connection References
- Solution-aware ALM
- DEV → TEST → PROD

### Customer Insights - Journeys

- Trigger architecture
- First-invoice journey pattern
- Idempotency
- Duplicate-event protection
- Segment/trigger design
- Form and event integration patterns

## Featured Enterprise Scenarios

### Opportunity Close Guard

When an Opportunity is being closed as Won/Lost:

1. Detect the state transition.
2. Check active Quotes.
3. Check active Orders.
4. Check active Invoices.
5. Check active Payments.
6. Warn for active commercial records.
7. Treat active Payment as a hard-stop condition.
8. Keep the authoritative rule in a synchronous server-side plugin.

See:
- src/Plugins/Opportunity/OpportunityCloseGuard.cs
- src/Plugins/Opportunity/OpportunityCloseCoordinator.cs
- src/JavaScript/OpportunityCloseCommand.js
- docs/opportunity-close-deep-dive.md

### High-volume Product / Heat Outcome Processing

Demonstrates how to work with hundreds/thousands of Products without blindly loading everything into the browser.

The pattern includes:
- server-side filtering
- paging
- company-code filtering
- product-size grouping
- heat-outcome selection
- bounded client-side batches
- idempotent processing
- telemetry

See:
- src/Plugins/Product/HeatOutcomeProductProcessor.cs
- src/JavaScript/ProductHeatOutcome.js
- src/JavaScript/HighVolumeProductProcessor.js
- src/FetchXML/ProductHeatOutcome.xml

## Engineering Principles

1. Client JavaScript improves UX; server-side logic protects data.
2. Retrieve only required columns.
3. Use filtering attributes on Update plugin steps.
4. Use entity images instead of unnecessary Retrieve calls when the required snapshot is already available.
5. Keep synchronous plugins short and deterministic.
6. Use asynchronous processing for long-running/non-transactional work.
7. Use explicit query filters and correct AND/OR grouping.
8. Avoid N+1 service calls.
9. Make retries and duplicate events safe through idempotent design.
10. Keep environment-specific configuration outside source code.
11. Never store credentials or secrets in JavaScript.
12. Trace useful execution information without leaking sensitive data.
13. Keep business services separate from thin plugin entry points.
14. Test negative paths, integrations and high-volume behavior—not only the happy path.

## Documentation

- docs/javascript-cookbook.md
- docs/javascript-advanced-map.md
- docs/javascript-command-design.md
- docs/ribbon-and-command-bar.md
- docs/plugin-engineering.md
- docs/plugin-registration-matrix.md
- docs/plugin-images-and-context.md
- docs/opportunity-close-pattern.md
- docs/opportunity-close-deep-dive.md
- docs/high-volume-product-processing.md
- docs/query-performance.md
- docs/error-handling-and-telemetry.md
- docs/testing-strategy.md
- docs/alm.md
- docs/security-and-performance.md
- docs/customer-insights-journeys.md

## Technologies

C# | Microsoft.Xrm.Sdk | Dataverse | Dynamics 365 CE | JavaScript | Xrm.WebApi | FetchXML | Power Automate | Power Apps | Customer Insights - Journeys | GitHub Actions

## Portfolio Scope

The examples use fictional table/column names where a real customer schema would be required. Solution-specific state/status values, relationship names and logical names must always be verified against the target Dataverse environment.
