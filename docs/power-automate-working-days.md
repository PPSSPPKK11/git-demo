# Power Automate — Business-Day Scheduling Pattern

A recurring requirement in the project work was: run the reporting flow Monday–Friday and never send the Saturday/Sunday report.

## Trigger every day, skip weekends

Use a daily recurrence and put the business-day gate immediately after the trigger.

~~~text
Recurrence
  ↓
Compose — DayOfWeek
  ↓
Condition — dayOfWeek is 1..5
  ├─ Yes → Get rows → Build report → Send email
  └─ No  → Terminate (Succeeded)
~~~

Expression:

~~~text
dayOfWeek(convertTimeZone(utcNow(), 'UTC', 'India Standard Time'))
~~~

Power Automate returns Sunday as 0, Monday as 1, through Saturday as 6.

Condition:

~~~text
and(
  greaterOrEquals(outputs('DayOfWeek'), 1),
  lessOrEquals(outputs('DayOfWeek'), 5)
)
~~~

## Previous business day

For a Monday run, "yesterday" is Friday.

~~~text
if(
  equals(dayOfWeek(variables('ReportDate')), 1),
  addDays(variables('ReportDate'), -3),
  addDays(variables('ReportDate'), -1)
)
~~~

Keep the calculated date in one Compose action instead of repeating it across filters, email subjects, and filenames.