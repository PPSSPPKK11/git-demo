# Error Handling & Telemetry

## JavaScript

Use try/catch around Web API operations and provide user-friendly messages. Keep technical diagnostics separate.

## Plugins

Trace correlation information and important decisions. Throw InvalidPluginExecutionException when the business operation must fail.

## Power Automate

Capture flow name, run ID, action name, error code, error message, record URL and environment.

## Principle

Never swallow an exception just to make a transaction appear successful. Decide explicitly whether the operation should fail, retry or continue.
