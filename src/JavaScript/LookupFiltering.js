var CRM = CRM || {};
CRM.Lookup = (function () {
    "use strict";

    function filterContactsByAccount(executionContext) {
        var formContext = executionContext.getFormContext();
        var lookup = formContext.getControl("primarycontactid");

        if (!lookup) return;

        lookup.addPreSearch(function () {
            addContactFilter(lookup, formContext);
        });
    }

    function addContactFilter(lookup, formContext) {
        var account = formContext.getAttribute("parentcustomerid");
        if (!account || !account.getValue()) return;

        var accountId = account.getValue()[0].id.replace(/[{}]/g, "");

        var filter =
            "<filter type='and'>" +
            "<condition attribute='parentcustomerid' operator='eq' value='" +
            accountId +
            "' />" +
            "<condition attribute='statecode' operator='eq' value='0' />" +
            "</filter>";

        lookup.addCustomFilter(filter, "contact");
    }

    return {
        filterContactsByAccount: filterContactsByAccount
    };
})();