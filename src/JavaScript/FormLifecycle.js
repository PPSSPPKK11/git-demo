var CRM = CRM || {};
CRM.Form = (function () {
    "use strict";

    function onLoad(executionContext) {
        var formContext = executionContext.getFormContext();

        applyFormRules(formContext);

        var status = formContext.getAttribute("statecode");
        if (status) {
            status.addOnChange(function () {
                applyFormRules(formContext);
            });
        }
    }

    function applyFormRules(formContext) {
        var formType = formContext.ui.getFormType();
        var isCreate = formType === 1;
        var isReadOnly = formType === 3 || formType === 4;

        CRM.Field.setVisible(formContext, "description", !isCreate);
        CRM.Field.setDisabled(formContext, "name", isReadOnly);

        if (isCreate) {
            CRM.Field.setRequired(formContext, "name", true);
        }
    }

    function onSave(executionContext) {
        var formContext = executionContext.getFormContext();
        var args = executionContext.getEventArgs();

        if (!validate(formContext)) {
            args.preventDefault();
        }
    }

    function validate(formContext) {
        var name = formContext.getAttribute("name");
        if (!name || !name.getValue()) {
            formContext.ui.setFormNotification(
                "Name is required.",
                "ERROR",
                "crm_validation");
            return false;
        }

        formContext.ui.clearFormNotification("crm_validation");
        return true;
    }

    return {
        onLoad: onLoad,
        onSave: onSave,
        applyFormRules: applyFormRules
    };
})();