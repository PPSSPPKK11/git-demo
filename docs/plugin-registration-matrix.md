# Plugin Registration Matrix

The registration matrix makes the runtime contract visible before deployment.

| Plugin | Table | Message | Stage | Mode | Filtering attributes | Image |
|---|---|---|---|---|---|---|
| ValidateOpportunity | opportunity | Update | PreValidation | Sync | estimatedvalue, closeprobability | Pre |
| OpportunityCloseGuard | opportunity | Update | PreOperation | Sync | statecode,statuscode | Pre |
| OpportunityPostCreate | opportunity | Create | PostOperation | Async | — | Post |
| ValidateOpportunityOwner | opportunity | Update | PreValidation | Sync | ownerid | — |
| AutoCancelStaleOpportunity | opportunity | Update | PostOperation/reference | Async/reference | modifiedon,new_opportunitytype | Pre |
| HeatOutcomeProductProcessor | product | Update | PostOperation | Async | new_heatoutcome,new_companycode,new_productsize | Pre |

## Registration rules

- Keep Update filtering attributes narrow.
- Do not include the primary key as an Update filtering attribute.
- Use images for values that existed before/after the operation instead of unnecessary Retrieve calls.
- Keep synchronous validation short.
- Use asynchronous execution for work that does not need to block the user.
- Keep environment-specific configuration outside source code.

The matrix is source-controlled because registration mistakes are runtime bugs, not deployment paperwork.