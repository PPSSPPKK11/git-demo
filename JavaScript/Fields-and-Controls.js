var CRM = CRM || {};
CRM.Field = (function () {
    "use strict";

    function setVisible(formContext, controlName, visible) {
        var control = formContext.getControl(controlName);
        if (control) control.setVisible(visible);
    }

    function setDisabled(formContext, controlName, disabled) {
        var control = formContext.getControl(controlName);
        if (control) control.setDisabled(disabled);
    }

    function setRequired(formContext, attributeName, required) {
        var attribute = formContext.getAttribute(attributeName);
        if (attribute) attribute.setRequiredLevel(required ? "required" : "none");
    }

    function setValue(formContext, attributeName, value) {
        var attribute = formContext.getAttribute(attributeName);
        if (attribute) {
            attribute.setValue(value);
            attribute.setSubmitMode("always");
        }
    }

    function clearValue(formContext, attributeName) {
        setValue(formContext, attributeName, null);
    }

    return {
        setVisible: setVisible,
        setDisabled: setDisabled,
        setRequired: setRequired,
        setValue: setValue,
        clearValue: clearValue
    };
})();