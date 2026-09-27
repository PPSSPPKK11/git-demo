# Dynamics 365 CRM & Power Platform Portfolio

A practical portfolio of Microsoft Dynamics 365 Customer Engagement and Power Platform development patterns.

## Focus Areas

- Dynamics 365 CE Sales
- Dataverse
- JavaScript form scripting and Web Resources
- Plugins and event pipeline concepts
- Power Automate cloud flows
- Power Apps
- Business Process Flows
- Ribbon Workbench concepts
- XrmToolBox utilities and troubleshooting
- Customer Insights - Journeys / Real-time Marketing concepts
- Manual testing and CRM validation

## Portfolio Projects

### 1. Opportunity Automation Plugin
A C# plugin pattern for validating and automating Opportunity updates.

Includes:
- Create/Update message handling
- Filtering attributes
- Pre/Post operation concepts
- Depth protection
- Tracing and exception handling
- Unit-testable business logic

Path: `projects/opportunity-automation-plugin/`

### 2. CRM Form Validation Web Resource
Reusable JavaScript patterns for Dynamics 365 forms.

Includes:
- Required-field validation
- Numeric-only validation
- Email validation
- Phone validation
- OnLoad / OnChange registration
- Submit validation
- Defensive handling of missing controls

Path: `projects/crm-form-validation-js/`

### 3. Power Automate Failure Logger
An enterprise-style pattern for capturing failed cloud-flow executions into a central audit list.

Includes:
- Parent/master flow
- Child logging flow
- Environment variables
- Failure reason capture
- Record URL generation
- Daily reporting
- Working-day scheduling considerations

Path: `projects/power-automate-failure-logger/`

### 4. Customer Insights - Journeys Welcome Trigger
A design pattern for starting a customer journey only when the first invoice exists and the welcome journey has not already been triggered.

Includes:
- Dataverse trigger design
- Idempotency flag
- Invoice/customer relationship handling
- Trigger vs segment approaches
- Test scenarios

Path: `projects/customer-insights-first-invoice-trigger/`

### 5. Dataverse Related vs Unrelated Record Patterns
Examples showing how to reason about related tables, lookups, filtering, FetchXML-style joins, and Power Automate record relationships.

Path: `projects/dataverse-relationships/`

## Skills Demonstrated

**Dynamics 365:** CE Sales, Opportunities, Accounts, Contacts, Activities, BPFs

**Power Platform:** Dataverse, Power Apps, Power Automate, environment variables

**Development:** C#, JavaScript, Web Resources, plugin pipeline, Xrm.WebApi

**Testing:** CRM functional testing, validation, troubleshooting, regression scenarios

## Important Note

The examples use fictional/demo data and are intended for learning and portfolio demonstration. No customer or employer source code is included.

## About

This repository is maintained as a technical portfolio for Dynamics 365 CRM / Power Platform development.
