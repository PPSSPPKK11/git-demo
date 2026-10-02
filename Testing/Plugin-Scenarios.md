# Plugin Test Scenarios

## Opportunity close
- No active related records → close proceeds.
- Active Payment → close is blocked.
- Active Quote → close is blocked/warning path is invoked.
- Active Order → close is blocked/warning path is invoked.
- Active Invoice → close is blocked/warning path is invoked.

## Product processing
- Matching heat outcome and company → product is processed.
- Wrong company → product is ignored.
- Matching size → product is processed.
- Empty product size → product remains eligible.
- Wrong size → product is ignored.
- Multiple pages → all pages are processed.
- Repeated execution → no duplicate side effects.

## Regression
Every production issue converted into a test case becomes part of the portfolio's regression set.
