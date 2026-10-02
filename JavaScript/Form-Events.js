var CRM = CRM || {};
CRM.Form = (function () {
    "use strict";

    function onLoad(executionContext) {
        var formContext = executionContext.getFormContext();
        applyRules(formContext);
    }

    function onSave(executionContext) {
        var formContext = executionContext.getFormContext();
        var args = executionContext.getEventArgs();

        var name = formContext.getAttribute("name");
        if (!name || !name.getValue()) {
            formContext.ui.setFormNotification(
                "Name is required.",
                "ERROR",
                "crm_validation"
            );
            args.preventDefault();
            return;
        }

        formContext.ui.clearFormNotification("crm_validation");
    }

    function applyRules(formContext) {
        var formType = formContext.ui.getFormType();
        var isCreate = formType === 1;
        var isReadOnly = formType === 3 || formType === 4;

        CRM.Field.setVisible(formContext, "description", !isCreate);
        CRM.Field.setDisabled(formContext, "name", isReadOnly);

        if (isCreate) {
            CRM.Field.setRequired(formContext, "name", true);
        }
    }

    return {
        onLoad: onLoad,
        onSave: onSave,
        applyRules: applyRules
    };
})();