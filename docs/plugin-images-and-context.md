# Plugin Context, Images and Shared Variables

## Target

Use InputParameters["Target"] when the operation supplies an Entity target.

## Pre Image

Use a Pre Image for the previous state of an Update.

Example use cases:
- Detect state transitions.
- Compare old/new owner.
- Determine whether a critical field actually changed.
- Avoid an extra Retrieve call.

## Post Image

Use a Post Image when the committed representation is required by a PostOperation step.

## SharedVariables

SharedVariables can pass information between related synchronous pipeline extensions. Keep the keys documented and avoid treating them as a global data store.

## ParentContext

ParentContext can help understand nested pipeline execution, but logic should not depend on fragile recursion assumptions.

## Image configuration

Do not register all columns. Register only the columns required by the plugin.
