# Dynamics 365 JavaScript Cookbook

A practical reference for model-driven app development.

## Web API CRUD

### Retrieve one
```javascript
const row = await Xrm.WebApi.retrieveRecord(
    "account",
    accountId,
    "?$select=name,telephone1"
);
```

### Retrieve many
```javascript
const result = await Xrm.WebApi.retrieveMultipleRecords(
    "contact",
    "?$select=fullname,emailaddress1&$filter=statecode eq 0&$top=50"
);
```

### Create
```javascript
const result = await Xrm.WebApi.createRecord("task", {
    subject: "Follow up"
});
```

### Update
```javascript
await Xrm.WebApi.updateRecord("account", id, {
    description: "Updated by command"
});
```

### Delete
```javascript
await Xrm.WebApi.deleteRecord("new_demo", id);
```

## Form and controls

### Hide / show
```javascript
formContext.getControl("name").setVisible(false);
formContext.getControl("name").setVisible(true);
```

### Lock / unlock
```javascript
formContext.getControl("name").setDisabled(true);
formContext.getControl("name").setDisabled(false);
```

### Lock every control for a column
```javascript
formContext.getAttribute("name").controls.forEach(function(control) {
    control.setDisabled(true);
});
```

### Required / optional
```javascript
formContext.getAttribute("name").setRequiredLevel("required");
formContext.getAttribute("name").setRequiredLevel("none");
```

### Set / clear
```javascript
formContext.getAttribute("name").setValue("Contoso");
formContext.getAttribute("name").setValue(null);
```

### Notifications
```javascript
control.setNotification("Invalid value", "validation");
control.clearNotification("validation");

formContext.ui.setFormNotification(
    "Fix the errors.",
    "ERROR",
    "form_validation"
);
```

## Lookup development

### Read lookup
```javascript
const lookup = formContext
    .getAttribute("parentcustomerid")
    .getValue();

const id = lookup && lookup.length
    ? lookup[0].id
    : null;
```

### Dynamic filtering
Use addPreSearch and addCustomFilter to constrain lookup results based on the current form context.

### Custom view
Use addCustomView when the user needs a purpose-built result set and layout.

## Form events

### OnLoad
Initialize handlers and initial UI state.

### OnChange
React to a column change.

### OnSave
Validate and use eventArgs.preventDefault() only when the save genuinely must be blocked.

## Navigation

Use Xrm.Navigation.openForm for record forms and Xrm.Navigation.openConfirmDialog for destructive operations.

## Grids and subgrids

Use gridContext for selected rows. Refresh a subgrid only after underlying data has changed.

## BPF

Use formContext.data.process to inspect the active process, stage and process status. Keep BPF-specific UI logic separate from business rules.

## Command bar

A command normally has:
- JavaScript action
- Enable rule
- Display rule
- PrimaryControl parameter
- Optional selected-row parameter
- Refresh strategy

### Show a button only on existing forms

Classic command definition can use FormStateRule with State=Existing and FormTypeRule with Type=Main.

### Enable a button from JavaScript

```javascript
function canLock(primaryControl) {
    const formContext = primaryControl;
    const locked = formContext.getAttribute("new_locked");
    return !!locked && locked.getValue() !== true;
}
```

### Hide/show a control after a command

```javascript
CRM.Field.hide(formContext, "name");
CRM.Field.show(formContext, "name");
```

### Refresh command state

```javascript
formContext.ui.refreshRibbon(false);
```

Do this after changing data used by a command rule, not continuously from OnLoad or from inside the rule.

## Global context

```javascript
const globalContext = Xrm.Utility.getGlobalContext();
const userId = globalContext.userSettings.userId;
const client = globalContext.client.getClient();
```

## Error handling

```javascript
try {
    await Xrm.WebApi.updateRecord("account", id, data);
} catch (error) {
    console.error(error);
    await Xrm.Navigation.openAlertDialog({
        title: "Update failed",
        text: "The record could not be updated."
    });
}
```

## Important boundary

Client-side JavaScript is for user experience and client behavior. Critical data integrity rules must also be enforced server-side because Dataverse can be changed through APIs, imports, integrations and other clients.
