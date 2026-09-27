# Dataverse Query Performance

## Retrieve

Select only required columns.

## RetrieveMultiple

Use:
- ColumnSet
- Criteria
- TopCount where only existence is needed
- PagingCookie for large result sets

## Existence check

Prefer a query that returns one minimal row when the requirement is simply "does an active record exist?"

## N+1 anti-pattern

Bad:
1. Retrieve 500 products.
2. For each product, retrieve company.
3. For each product, retrieve size.
4. For each product, retrieve price.

Better:
- retrieve the required columns;
- use joins/expand/query structures;
- cache stable reference data where appropriate;
- batch independent operations.

## Plugin performance

Every synchronous service call adds latency to the user's transaction. Keep synchronous plugins small and deterministic.
