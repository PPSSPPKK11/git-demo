# Ribbon / Command Bar Engineering

## Button lifecycle

A professional command normally has:

1. Command definition
2. Command action
3. Enable rule
4. Display rule
5. JavaScript library
6. Primary control parameter
7. Refresh strategy

## Example: Lock button

**Action**
`CRM.Command.lockRecord(primaryControl)`

**Enable rule**
`CRM.Command.canLock(primaryControl)`

**Display rule**
Show only on an existing Account form.

## Example: Unlock button

**Action**
`CRM.Command.unlockRecord(primaryControl)`

**Enable rule**
`CRM.Command.canUnlock(primaryControl)`

## Display rule concepts

Classic RibbonDiffXml supports rules for:
- Form context
- Form type
- Client type
- Entity context
- Selected rows
- Security role
- Value/state conditions

Multiple display rules are evaluated together; the command is shown only when the required rules evaluate true.

## Async rules

When a rule needs server data, use the supported asynchronous enable-rule pattern rather than doing Web API work synchronously in the UI.

## Refresh

After the command changes data used by a rule:

```javascript
formContext.ui.refreshRibbon(false);
```

Do not call refreshRibbon from every OnLoad or from inside the rule itself.
