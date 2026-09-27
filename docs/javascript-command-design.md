# Command Bar Design Patterns

## Pattern: Show

Display rules decide whether the button is present in a context.

Example:
- Main form
- Existing record
- Web client
- Account table

## Pattern: Enable

Enable rules decide whether the user can execute the command.

Example:
- Lock button enabled when new_locked = false.
- Unlock button enabled when new_locked = true.
- Close button enabled only when the record is open.

## Pattern: Execute

The action receives PrimaryControl and calls a namespaced function.

Example:

CRM.Command.lockRecord(primaryControl)

## Pattern: Refresh

After the action changes the field used by the enable rule:

CRM.Command → updateRecord → refreshRibbon(false)

This forces command evaluation again.

## Async rule pattern

If enablement depends on Dataverse data that is not present on the form, use the supported asynchronous enable-rule pattern. Do not make synchronous network calls from a command rule.

## UX principle

The command bar should guide the user, not become the only security boundary. Server-side validation remains authoritative.
