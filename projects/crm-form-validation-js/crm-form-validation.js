var CrmFormValidation = (function () {
    "use strict";

    function notify(attribute, message, id) {
        if (attribute) attribute.setNotification(message, id);
    }

    function clear(attribute, id) {
        if (attribute) attribute.clearNotification(id);
    }

    function validateNotNumericOnly(formContext, fieldName) {
        var attribute = formContext.getAttribute(fieldName);
        if (!attribute) return true;
        var value = attribute.getValue();
        if (!value) return true;

        var valid = !/^\d+$/.test(String(value).trim());
        if (!valid) notify(attribute, "Value cannot contain only numbers.", "numeric_only");
        else clear(attribute, "numeric_only");
        return valid;
    }

    function validateEmail(formContext, fieldName) {
        var attribute = formContext.getAttribute(fieldName);
        if (!attribute) return true;
        var value = attribute.getValue();
        if (!value) return true;

        var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
        if (!valid) notify(attribute, "Enter a valid email address.", "email_format");
        else clear(attribute, "email_format");
        return valid;
    }

    function validatePhone(formContext, fieldName) {
        var attribute = formContext.getAttribute(fieldName);
        if (!attribute) return true;
        var value = attribute.getValue();
        if (!value) return true;

        var valid = /^[+()\d\s.-]{7,20}$/.test(String(value).trim());
        if (!valid) notify(attribute, "Enter a valid phone number.", "phone_format");
        else clear(attribute, "phone_format");
        return valid;
    }

    function validate(formContext) {
        return validateNotNumericOnly(formContext, "firstname") &&
            validateNotNumericOnly(formContext, "lastname") &&
            validateNotNumericOnly(formContext, "companyname") &&
            validateEmail(formContext, "emailaddress1") &&
            validatePhone(formContext, "telephone1");
    }

    function onLoad(executionContext) {
        var formContext = executionContext.getFormContext();
        formContext.data.entity.addOnSave(function (saveContext) {
            if (!validate(formContext)) saveContext.getEventArgs().preventDefault();
        });
    }

    return { onLoad: onLoad, validate: validate };
})();