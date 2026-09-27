# State and Status Code Strategy

Do not treat numeric state/status values as universal.

For portfolio examples, status values are placeholders. In a real implementation:

1. Read table metadata.
2. Confirm the state/status pair supported by the table.
3. Verify the environment's solution configuration.
4. Prefer named constants in one place.
5. Avoid scattering magic numbers throughout plugins.

This is especially important for Quote, Order, Invoice and custom Payment cancellation logic.