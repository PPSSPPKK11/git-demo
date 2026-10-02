# Opportunity Close Rules

## Requirement

When an Opportunity is being closed:
- Active Payment: prevent close.
- Active Quote / Order / Invoice: warn and require the agreed business action.
- No blocking records: allow close.

## Server-side design

The plugin is the final authority because users can close records through different clients and integrations.

A synchronous plugin can block the Opportunity operation by throwing an exception. However, if the same synchronous transaction changes a Payment and then throws, that Payment change is rolled back with the transaction.

For a requirement that needs a persistent Payment decline while separately preventing the close, use a two-step design such as a Custom API or separate transaction rather than pretending both actions can be committed in one failed transaction.

## Important

Do not hard-code status reason values blindly. Keep environment-specific state/status mappings configurable or verify them against the target environment.
