# Dynamics 365 ALM

## Environment flow
DEV → TEST → PROD

Use solution-aware development.

## Configuration
- Environment Variables
- Connection References
- Deployment settings

Never hard-code tenant, URL or environment-specific values.

## Git strategy
- main = stable
- feature/* = isolated work
- Pull requests = review
- Small commits = easier rollback

## Deployment checklist
- Solution version
- Dependencies
- Environment variables
- Connection references
- Plugin assemblies and steps
- Flow activation
- Security roles
- Smoke tests
