var EnterpriseCRM = EnterpriseCRM || {};
EnterpriseCRM.Form = (function () {
    "use strict";

    function attribute(formContext, name) {
        return formContext && formContext.getAttribute(name);
    }

    function notify(formContext, field, message, id) {
        var control = formContext.getControl(field);
        if (control) control.setNotification(message, id);
    }

    function clear(formContext, field, id) {
        var control = formContext.getControl(field);
        if (control) control.clearNotification(id);
    }

    function requireValue(formContext, field, message) {
        var a = attribute(formContext, field);
        if (!a) return true;
        var valid = a.getValue() !== null && a.getValue() !== "";
        if (!valid) notify(formContext, field, message, "required_" + field);
        else clear(formContext, field, "required_" + field);
        return valid;
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
    }

    function validateEmail(formContext, field) {
        var a = attribute(formContext, field);
        if (!a || !a.getValue()) return true;
        var valid = isValidEmail(a.getValue());
        if (!valid) notify(formContext, field, "Enter a valid email address.", "email");
        else clear(formContext, field, "email");
        return valid;
    }

    function onSave(executionContext) {
        var formContext = executionContext.getFormContext();
        var eventArgs = executionContext.getEventArgs();

        var valid = requireValue(formContext, "name", "Name is required.") &&
                    validateEmail(formContext, "emailaddress1");

        if (!valid) {
            eventArgs.preventDefault();
            formContext.ui.setFormNotification(
                "Please correct the highlighted fields before saving.",
                "ERROR",
                "enterprise_crm_validation");
        } else {
            formContext.ui.clearFormNotification("enterprise_crm_validation");
        }
    }

    return {
        onSave: onSave,
        requireValue: requireValue,
        validateEmail: validateEmail
    };
})();