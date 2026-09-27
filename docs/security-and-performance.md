# Security & Performance

## Security
- Least-privilege security roles.
- Server-side validation for data integrity.
- Never expose secrets in client JavaScript.
- Keep credentials out of source control.
- Use the correct user/service context deliberately.

## Performance
- Select only required columns.
- Filter at the server.
- Avoid N+1 service calls.
- Use bulk operations for appropriate workloads.
- Avoid long synchronous plugins.
- Use Update filtering attributes.
- Design for recursion and retry behavior.
