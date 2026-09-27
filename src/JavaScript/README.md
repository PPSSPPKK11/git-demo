# Client-side library

The JavaScript folder is organized around reusable Client API patterns rather than one-off form scripts.

## Areas covered

- Form lifecycle and save modes
- Attribute/control state
- Notifications and validation
- Lookups, PreSearch and custom views
- Subgrids and selected rows
- Web API CRUD, filtering, expansion and paging
- Associate/disassociate
- BPF/process APIs
- Command bar enable/display logic
- Navigation and dialogs
- Global user/client context
- Custom API execution
- High-volume client processing with bounded concurrency

Most functions accept executionContext and resolve formContext inside the function. That keeps the examples aligned with the current Client API model instead of relying on the deprecated global form object.