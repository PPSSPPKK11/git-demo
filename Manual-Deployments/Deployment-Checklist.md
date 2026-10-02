# Manual Deployment Checklist

## Before deployment
- Confirm solution version.
- Confirm dependencies.
- Confirm environment variables.
- Confirm connection references.
- Confirm plugin assembly and step changes.
- Confirm JavaScript web resources.
- Confirm flows are included and turned on only when ready.

## Deployment
1. Export the intended solution from source environment.
2. Import into target environment.
3. Resolve missing dependencies.
4. Configure environment-specific values.
5. Verify connection references.
6. Publish changes.
7. Run smoke tests.

## Post-deployment
- Test one representative record.
- Test plugin success and failure paths.
- Test Power Automate trigger and connections.
- Test JavaScript on create/update forms.
- Confirm security behavior.
- Record rollback steps.
