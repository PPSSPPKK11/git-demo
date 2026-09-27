# Dataverse Security & Performance Checklist

## Security

- Use least-privilege security roles.
- Prefer the calling user's context unless elevated access is explicitly required.
- Never store client secrets in JavaScript.
- Use environment variables and Key Vault-backed integration patterns for secrets.
- Validate server-side even when the model-driven form already validates.

## Performance

- Retrieve only required columns.
- Use QueryExpression/FetchXML filters at the server.
- Avoid N+1 service calls.
- Use ExecuteMultiple/ExecuteTransaction appropriately for bulk workloads.
- Avoid synchronous plugins for long-running integrations.
- Apply Update filtering attributes.
- Be deliberate about recursion and cascading updates.

## Maintainability

- Keep plugin entry points thin.
- Move business rules into testable services.
- Centralize shared validation.
- Trace important execution decisions.
- Version solution components and deployment configuration.
