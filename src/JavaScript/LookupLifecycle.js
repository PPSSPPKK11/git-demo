var CRM = CRM || {};
CRM.LookupLifecycle = (function () {
    "use strict";

    var handlers = {};

    function addPreSearch(executionContext, controlName, callback) {
        var formContext = executionContext.getFormContext();
        var control = formContext.getControl(controlName);

        if (!control || typeof control.addPreSearch !== "function") {
            return;
        }

        var key = controlName + ":" + callback.name;
        handlers[key] = callback;
        control.addPreSearch(callback);
    }

    function removePreSearch(executionContext, controlName, callback) {
        var formContext = executionContext.getFormContext();
        var control = formContext.getControl(controlName);

        if (control && typeof control.removePreSearch === "function") {
            control.removePreSearch(callback);
        }
    }

    function addOwnerTeamFilter(executionContext) {
        var formContext = executionContext.getFormContext();
        var control = formContext.getControl("ownerid");

        if (!control) {
            return;
        }

        var filter =
            "<filter type='and'>" +
                "<condition attribute='isdisabled' operator='eq' value='0' />" +
            "</filter>";

        var handler = function () {
            control.addCustomFilter(filter, "systemuser");
            control.addCustomFilter(filter, "team");
        };

        control.addPreSearch(handler);
        handlers.ownerTeamFilter = handler;
    }

    function cleanupOwnerTeamFilter(executionContext) {
        var formContext = executionContext.getFormContext();
        var control = formContext.getControl("ownerid");

        if (control && handlers.ownerTeamFilter) {
            control.removePreSearch(handlers.ownerTeamFilter);
            delete handlers.ownerTeamFilter;
        }
    }

    return {
        addPreSearch: addPreSearch,
        removePreSearch: removePreSearch,
        addOwnerTeamFilter: addOwnerTeamFilter,
        cleanupOwnerTeamFilter: cleanupOwnerTeamFilter
    };
}());