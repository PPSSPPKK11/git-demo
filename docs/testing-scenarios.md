# Testing Scenarios

The test suite is intentionally supplemented by scenario-based test cases.

## Opportunity close

| Case | Expected |
| --- | --- |
| No active related records | Close continues |
| Active Quote only | Warning/handling path |
| Active Order only | Warning/handling path |
| Active Invoice only | Warning/handling path |
| Active Payment | Blocking path |
| Multiple related records | All relevant dependencies are reported |

## Product filtering

Test these combinations separately:

1. Matching size + matching company.
2. Blank size + matching company.
3. Matching size + wrong company.
4. Blank size + wrong company.
5. Matching size + matching company + wrong heat outcome.
6. Inactive product + otherwise matching values.

The fourth case is especially important: a blank-size product must not escape the company filter.

## Customer Insights

1. First invoice date missing → do not trigger.
2. First invoice date present + flag No → trigger and set flag.
3. First invoice date present + flag Yes → do not trigger again.
4. Invoice belongs to Account.
5. Invoice belongs to Contact.

## Marketing forms

Test with:
- one visible form,
- multiple forms,
- hidden popup form before the visible form,
- duplicate script tags,
- invalid field values,
- corrected values before submit.

## Power Automate

Test Monday reporting separately from Tuesday-Friday because the previous business day calculation changes over the weekend.