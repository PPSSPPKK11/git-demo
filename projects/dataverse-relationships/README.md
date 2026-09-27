# Dataverse Relationship Patterns

## Related records

A lookup creates a relationship between rows. In Power Automate, the related row is normally accessed through the lookup value or by retrieving the referenced table.

Typical pattern:

1. Trigger on the primary row.
2. Read the lookup/reference.
3. Retrieve the related row when additional attributes are required.
4. Apply business filters.
5. Create or update the dependent record.

## Unrelated records

If two rows have no relationship, do not assume a lookup exists. Use an explicit matching key such as company code, external ID, or another controlled business identifier.

## Filtering principle

When multiple conditions describe one business rule, combine them as AND conditions unless the requirement explicitly says alternatives are acceptable.

Example:

- Product size matches requested size
- OR product has no size
- AND company code matches

The grouping matters: company filtering must apply to both product-size branches.

## CRM troubleshooting checklist

- Confirm logical names rather than display names.
- Check lookup target table.
- Verify relationship direction.
- Test each filter independently.
- Test the combined filter against known records.
- Confirm null/empty handling.
- Confirm whether the flow/plugin is triggered on Create, Update, or both.
