# Failure Logger

A reusable pattern for capturing Power Automate failures.

## Structure

Business flow
→ Try scope
→ Catch scope
→ Child flow
→ SharePoint failure list
→ Scheduled master flow
→ Consolidated email

## Failure record

Typical fields:
- Flow name
- Date and time of failure
- Failure reason
- URL of the failed record

## ALM

Use environment variables for the SharePoint site and list. Use connection references for solution-aware deployments.

## Previous business day

For a Monday-Friday report:
- Monday sends Friday's failures.
- Tuesday through Friday send the previous day's failures.
- Weekend runs are skipped.

The reporting flow should query the intended reporting date rather than simply using "last 24 hours".
