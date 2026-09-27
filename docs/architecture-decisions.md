# Architecture Decisions

## ADR-001 — Server-side authority for close rules

**Decision:** Opportunity close rules are enforced server-side.

Client JavaScript may provide confirmation dialogs and improve UX, but it is not the final security/business boundary.

**Reason:** Imports, integrations, bulk operations and other clients can bypass form JavaScript.

## ADR-002 — Images before extra retrieves

**Decision:** Use targeted pre/post images when the previous/current value is already part of the execution context.

**Reason:** It reduces unnecessary round trips and makes the plugin contract explicit.

## ADR-003 — Filter Update plugins

**Decision:** Register Update plugins with only the attributes that can cause the business rule to run.

**Reason:** Auto-save and unrelated field updates should not repeatedly invoke expensive logic.

## ADR-004 — Keep large product processing bounded

**Decision:** Page product queries and process bounded batches.

**Reason:** The heat-outcome scenario can involve hundreds or thousands of products. Treating it like a small form query does not scale.

## ADR-005 — Keep environment values configurable

**Decision:** Environment-specific URLs, list names, status values and integration settings belong in configuration/environment variables.

**Reason:** Dev/Test/Prod should use the same business logic without source edits.