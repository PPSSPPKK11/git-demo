# Product Filtering — The Bug Was in the Grouping

One product-selection scenario required:

- Product size matches the requested size, OR the product has no size.
- The product company must still match the quote/company.
- Heat outcome must match.
- Only active products should be considered.

The intended boolean logic is:

~~~text
(size = requestedSize OR size is empty)
AND company = requestedCompany
AND heatOutcome = requestedHeatOutcome
AND state = active
~~~

A common mistake was:

~~~text
(size = requestedSize AND company = X)
OR size is empty
~~~

That second branch bypasses the company restriction and inflates the result count.

## Debugging method

1. Run each condition separately in a view.
2. Run the complete filter in the model-driven app.
3. Compare the actual returned records, not only the count.
4. Inspect products with blank size separately.
5. Verify the company lookup/text representation is the same field being compared.
6. Reproduce the exact filter in QueryExpression or FetchXML.
7. Add explicit parentheses through nested AND/OR filter groups.

This pattern is included because it represents the kind of production debugging that is more useful in a portfolio than a generic "retrieve products" example.