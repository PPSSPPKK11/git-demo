# Product Heat Outcome Filtering

This pattern represents the high-volume product scenario used in the portfolio.

## Filter

A product qualifies when:
- It is active.
- Heat Outcome matches.
- Company Code matches.
- Size matches OR the product has no size.

The grouping matters:

(Size = requested OR Size is empty) AND Company = requested AND Heat Outcome = requested

Putting the company condition outside the OR group prevents unrelated-company products from slipping through.

## Scale

For hundreds or thousands of products:
- Select only required columns.
- Page results.
- Process in bounded batches.
- Avoid loading everything into the browser.
- Make processing idempotent.
- Capture failures separately.
