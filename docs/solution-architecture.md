# Solution Architecture

## Layers

**Presentation:** model-driven forms, command bar and JavaScript.

**Application:** Power Automate orchestration and Customer Insights journeys.

**Domain:** plugin validation and business rules.

**Data:** Dataverse tables, relationships, keys and queries.

**Integration:** Web API, asynchronous processing and external service boundaries.

Keep business rules close to the data, orchestration outside transactional plugin code, and environment configuration outside source code.
