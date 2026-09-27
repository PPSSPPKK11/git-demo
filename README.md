# Dynamics 365 CE Engineering Toolkit

A long-form engineering portfolio for Microsoft Dynamics 365 Customer Engagement, Dataverse and Power Platform development.

This repository is deliberately maintained like a real CRM engineering codebase: reusable client libraries, server-side plugins, query patterns, command-bar engineering, high-volume processing, tests, ALM, incident notes and architecture decisions.

> Fictional/reference implementation. No employer or customer source code is included.

## What is inside

### Client-side JavaScript
- Form lifecycle, save modes and dirty state
- Field/control manipulation and notifications
- Lookup filtering, PreSearch and custom views
- Subgrids, selected rows and refresh
- BPF/process operations
- Xrm.WebApi CRUD, OData filtering, expansion and paging
- Associate/disassociate and Custom API execution
- Global/user/security context
- Ribbon and command-bar enable/display/execute patterns
- Async command rules and ribbon refresh
- High-volume client processing with bounded batches

### Server-side C#
- Plugin execution context and pipeline behavior
- Filtering attributes, images and recursion/depth guards
- Secure/unsecure configuration
- Tracing, correlation and error handling
- QueryExpression and paging
- Business-rule validation
- Opportunity close assessment/guard
- Quote/Order/Invoice/Payment dependency handling
- Six-month stale Opportunity eligibility
- Product heat-outcome processing
- Idempotency and reusable shared services

### Power Platform
- Power Automate TRY/CATCH/FINALLY
- Child-flow failure logging
- Previous-business-day reporting
- Environment variables and connection references
- DEV → TEST → PROD ALM
- Customer Insights - Journeys trigger/segment patterns

## Scenarios from actual engineering-style work

### Opportunity close guard

The server-side scenario checks an Opportunity close transition and evaluates active Quotes, Orders, Invoices and Payments. The portfolio separates the assessment from orchestration so the business rule can be tested.

A particularly important transaction lesson is documented: updating a related Payment and then throwing a synchronous exception does not automatically make the Payment change durable, because the operation is still inside the transaction. A design that requires an independent Payment transition needs a separate transaction boundary.

See:
- src/Plugins/Opportunity/OpportunityCloseGuard.cs
- src/Plugins/Opportunity/OpportunityCloseAssessment.cs
- src/Plugins/Opportunity/OpportunityCloseCoordinator.cs
- src/JavaScript/OpportunityCloseCommand.js
- docs/opportunity-close-deep-dive.md
- docs/status-code-strategy.md

### Product / heat-outcome processing

The product scenario represents the kind of issue that can look like a simple filter but becomes a data-quality/performance problem at scale.

The intended rule is:

~~~text
(size matches OR size is empty)
AND company matches
AND heat outcome matches
AND product is active
~~~

The repository includes both FetchXML and QueryExpression implementations, paging, bounded processing and a debugging note explaining how a misplaced OR branch can return products from the wrong company.

See:
- src/Plugins/Product/HeatOutcomeProductProcessor.cs
- src/Plugins/Product/HeatOutcomeBatchPlanner.cs
- src/JavaScript/ProductHeatOutcome.js
- src/JavaScript/HighVolumeProductProcessor.js
- src/FetchXML/ProductHeatOutcome.xml
- docs/product-filtering-debugging.md

### Customer Insights - Journeys

The first-invoice pattern uses a Welcome Journey Triggered flag as an idempotency guard. It also documents the account/contact invoice-customer lookup issue and the decision to keep trigger-based and segmentation-based implementations separate.

### Real-time marketing forms

The form validation notes capture a less-obvious issue: duplicate validation handlers can appear when multiple embedded forms exist in the DOM, including hidden/popup forms. The repository documents visible-form detection and one-time initialization rather than pretending the problem is only a regex problem.

### Power Automate operations

The failure logger and weekday reporting notes cover child/master flow design, SharePoint telemetry, service-account email, environment variables and the Monday-versus-Friday reporting-date edge case.

### BPF environment debugging

The BPF notes capture the case where a process existed in backend data but was unavailable in the process switcher in Test. The troubleshooting sequence starts with activation, solution deployment, app/table scope and security before changing client script.

## Engineering principles

1. Client JavaScript improves UX; server-side logic protects data.
2. Retrieve only the columns required by the business rule.
3. Filter Update plugins narrowly.
4. Prefer targeted entity images over extra Retrieve calls.
5. Keep synchronous plugins short and deterministic.
6. Use asynchronous processing for work that does not need to block the user.
7. Make AND/OR grouping explicit.
8. Avoid N+1 service calls.
9. Make retries and duplicate events safe.
10. Keep environment-specific configuration outside source code.
11. Never store credentials or secrets in source.
12. Trace useful execution information without leaking sensitive data.
13. Keep plugin entry points thin and business services testable.
14. Test negative paths, transaction boundaries and high-volume behavior.
15. Treat deployment and registration configuration as part of the solution, not as an afterthought.

## Documentation

- docs/portfolio-map.md
- docs/javascript-cookbook.md
- docs/javascript-advanced-map.md
- docs/javascript-command-design.md
- docs/ribbon-and-command-bar.md
- docs/plugin-engineering.md
- docs/plugin-registration-matrix.md
- docs/plugin-images-and-context.md
- docs/opportunity-close-pattern.md
- docs/opportunity-close-deep-dive.md
- docs/status-code-strategy.md
- docs/high-volume-product-processing.md
- docs/product-filtering-debugging.md
- docs/query-performance.md
- docs/error-handling-and-telemetry.md
- docs/testing-strategy.md
- docs/architecture-decisions.md
- docs/alm.md
- docs/security-and-performance.md
- docs/customer-insights-journeys.md
- docs/customer-insights-first-invoice.md
- docs/marketing-forms-validation.md
- docs/power-automate-working-days.md
- docs/incident-failure-logger.md
- docs/bpf-debugging.md
- docs/human-engineering-notes.md

## Technologies

C# | Microsoft.Xrm.Sdk | Dataverse | Dynamics 365 CE | JavaScript | Xrm.WebApi | FetchXML | Power Automate | Power Apps | Customer Insights - Journeys | GitHub Actions

## Scope

The examples use fictional table/column names where a real customer schema would be required. Solution-specific state/status values, relationship names and option-set values must be verified against the target Dataverse environment.

The repository is meant to demonstrate engineering judgement and reusable patterns, not to expose customer implementation details.
