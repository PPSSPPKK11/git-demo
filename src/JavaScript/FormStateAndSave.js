var CRM = CRM || {};
CRM.FormStateAndSave = (function () {
    "use strict";

    function getContext(executionContext) {
        if (!executionContext || typeof executionContext.getFormContext !== "function") {
            throw new Error("Form execution context is required.");
        }
        return executionContext.getFormContext();
    }

    function isDirty(executionContext) {
        return getContext(executionContext).data.entity.getIsDirty();
    }

    function getSaveMode(executionContext) {
        var args = executionContext && executionContext.getEventArgs
            ? executionContext.getEventArgs()
            : null;

        return args ? args.getSaveMode() : null;
    }

    function setSubmitMode(executionContext, fieldName, mode) {
        var formContext = getContext(executionContext);
        var attribute = formContext.getAttribute(fieldName);

        if (attribute) {
            attribute.setSubmitMode(mode); // "always", "never", or "dirty"
        }
    }

    function preventSaveWhenInvalid(executionContext) {
        var formContext = getContext(executionContext);
        var eventArgs = executionContext.getEventArgs();

        var probability = formContext.getAttribute("closeprobability");
        if (probability && probability.getValue() !== null &&
            (probability.getValue() < 0 || probability.getValue() > 100)) {
            eventArgs.preventDefault();
            formContext.ui.setFormNotification(
                "Close probability must be between 0 and 100.",
                "ERROR",
                "close_probability"
            );
        }
    }

    function clearValidationNotification(executionContext) {
        getContext(executionContext).ui.clearFormNotification("close_probability");
    }

    return {
        isDirty: isDirty,
        getSaveMode: getSaveMode,
        setSubmitMode: setSubmitMode,
        preventSaveWhenInvalid: preventSaveWhenInvalid,
        clearValidationNotification: clearValidationNotification
    };
}());