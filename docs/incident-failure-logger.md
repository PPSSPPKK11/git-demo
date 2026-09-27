# Power Automate Failure Logger

This pattern turns scattered flow failures into an operational report.

## Child flow

Inputs:
- Flow name
- Failure timestamp
- Failure reason
- Record URL

Actions:
1. Resolve SharePoint site from an environment variable.
2. Resolve list name from an environment variable.
3. Format the failure timestamp.
4. Create the SharePoint row.
5. Return a small result to the parent.

Timestamp example:

~~~text
formatDateTime(utcNow(), 'dd-MMM-yyyy hh:mm tt')
~~~

## Master daily report

~~~text
Recurrence
  ↓
Calculate previous reporting date
  ↓
Get items from failure-log list
  ↓
Filter to previous business day
  ↓
Create HTML table
  ↓
Send email using service-account connection
~~~

For a Monday report, the reporting date is Friday.

## SharePoint schema

| Column | Purpose |
| --- | --- |
| Flow name | Which automation failed |
| Date/time | When it failed |
| Failure reason | Action/error detail |
| URL of record | Link back to the business row |

Environment variables keep site/list values portable across Dev, Test and Prod.