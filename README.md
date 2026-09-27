# Dynamics 365 CE Engineering Toolkit

Enterprise-focused implementation patterns for Microsoft Dynamics 365 Customer Engagement, Dataverse and Power Platform.

## Architecture
```
src/Plugins       C# server-side extensions
src/JavaScript    Model-driven form and Web API libraries
src/FetchXML      Query and reporting patterns
tests             Automated test examples
docs              Architecture and engineering notes
.github           CI/CD and repository quality
```

## Engineering Areas

- Dynamics 365 CE Sales
- Dataverse
- C# Plugins and pipeline stages
- Entity Images, filtering attributes and recursion control
- Secure/unsecure configuration
- JavaScript Web Resources and Xrm.WebApi
- FetchXML and QueryExpression
- Command bar / Ribbon architecture
- Power Automate enterprise patterns
- Customer Insights - Journeys
- Environment Variables and Connection References
- Solution-aware ALM
- Security, performance and testing

## Engineering Principles

1. Protect data with server-side business rules.
2. Retrieve only required columns.
3. Keep plugin entry points thin and business logic testable.
4. Use filtering attributes on Update steps.
5. Treat recursion protection as a safety mechanism, not architecture.
6. Prefer asynchronous processing for long-running work.
7. Never store secrets in JavaScript or source control.
8. Keep environment-specific configuration outside source code.
9. Design integrations for retries and duplicate events.
10. Trace decisions without leaking sensitive data.

## Portfolio Modules

- Plugin engineering and registration strategy
- JavaScript/Web API patterns
- Power Automate error handling and child flows
- DEV → TEST → PROD ALM
- Security and performance
- Customer Insights - Journeys trigger design
- Dataverse relationship and query patterns

> Fictional/reference implementation for portfolio and learning purposes. No employer or customer source code is included.
