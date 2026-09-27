# Dynamics 365 JavaScript Cookbook

This repository intentionally contains small, reusable patterns instead of pretending every requirement is one giant script.

## 1. Fetch a record

```javascript
const row = await Xrm.WebApi.retrieveRecord(
    "account",
    accountId,
    "?$select=name,telephone1"
);
```

## 2. Fetch multiple records

```javascript
const result = await Xrm.WebApi.retrieveMultipleRecords(
    "contact",
    "?$select=fullname,emailaddress1&$filter=statecode eq 0&$top=50"
);
```

## 3. Create

```javascript
const result = await Xrm.WebApi.createRecord("task", {
    subject: "Follow up"
});
```

## 4. Update

```javascript
await Xrm.WebApi.updateRecord("account", id, {
    description: "Updated by command"
});
```

## 5. Delete

```javascript
await Xrm.WebApi.deleteRecord("new_demo", id);
```

## 6. Lock / unlock a control

```javascript
formContext.getControl("name").setDisabled(true);
formContext.getControl("name").setDisabled(false);
```

## 7. Hide / show a control

```javascript
formContext.getControl("name").setVisible(false);
formContext.getControl("name").setVisible(true);
```

## 8. Lock all controls for an attribute

```formContext.getAttribute("name").controls.forEach(function(control) {
    control.setDisabled(true);
});
```

## 9. Required / optional

```formContext.getAttribute("name").setRequiredLevel("required");
formContext.getAttribute("name").setRequiredLevel("none");
```

## 10. Set / clear values

```formContext.getAttribute("name").setValue("Contoso");
formContext.getAttribute("name").setValue(null);
```

## 11. Lookup value

```const lookup = formContext.getAttribute("parentcustomerid").getValue();
const id = lookup?.[0]?.id;
const entity = lookup?.[0]?.entityType;
```

## 12. Filter lookup

Use `addPreSearch` + `addCustomFilter` and remove the handler when the form lifecycle requires cleanup.

## 13. Open form

Use `Xrm.Navigation.openForm` for existing or new records.

## 14. Confirmation

Use `Xrm.Navigation.openConfirmDialog` before destructive operations.

## 15. Notifications

```control.setNotification("Invalid value", "validation");
control.clearNotification("validation");
formContext.ui.setFormNotification("Fix the errors.", "ERROR", "form");
```

## 16. Refresh subgrid

```formContext.getControl("Contacts").refresh();
```

## 17. Refresh command bar

```formContext.ui.refreshRibbon(false);
```

Use it after changing data that a command rule depends on, not continuously from OnLoad.

## 18. Global context

Use `Xrm.Utility.getGlobalContext()` for organization/user/client information.

## 19. Form type

1 = Create, 2 = Update, 3 = Read Only, 4 = Disabled, 6 = Bulk Edit.

## 20. Save prevention

```executionContext.getEventArgs().preventDefault();
```

Use only when the validation genuinely requires blocking the save.
