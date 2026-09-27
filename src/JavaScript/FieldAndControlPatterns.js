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

    function lock(formContext, controlName) {
        setDisabled(formContext, controlName, true);
    }

    function unlock(formContext, controlName) {
        setDisabled(formContext, controlName, false);
    }

    function hide(formContext, controlName) {
        setVisible(formContext, controlName, false);
    }

    function show(formContext, controlName) {
        setVisible(formContext, controlName, true);
    }

    return {
        setVisible: setVisible,
        setDisabled: setDisabled,
        setRequired: setRequired,
        setValue: setValue,
        clearValue: clearValue,
        lock: lock,
        unlock: unlock,
        hide: hide,
        show: show
    };
})();