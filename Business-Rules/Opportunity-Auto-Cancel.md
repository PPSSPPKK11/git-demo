# Opportunity Auto-Cancellation

Example business condition:
- Opportunity is still open.
- Last modified date is older than six months.
- Opportunity type is Air Source Heat Pump.
- No active complaints.
- No active payment invoices.
- No scheduled work orders.

When all conditions are satisfied, the Opportunity can be moved to the agreed Lost / Auto Cancelled status.

## Design

Use a server-side process for authoritative enforcement. For large volumes, prefer asynchronous processing or a scheduled process rather than making every Opportunity update perform multiple related-record queries.
