var CRM = CRM || {};
CRM.WebApi = (function () {
    "use strict";

    function getAccount(accountId) {
        var id = accountId.replace(/[{}]/g, "");

        return Xrm.WebApi.retrieveRecord(
            "account",
            id,
            "?$select=name,accountnumber,statecode"
        );
    }

    function findActiveAccounts(name) {
        var escaped = name.replace(/'/g, "''");
        var query =
            "?$select=accountid,name,accountnumber" +
            "&$filter=statecode eq 0 and contains(name,'" +
            encodeURIComponent(escaped) +
            "')";

        return Xrm.WebApi.retrieveMultipleRecords("account", query);
    }

    function updateAccount(accountId, values) {
        var id = accountId.replace(/[{}]/g, "");
        return Xrm.WebApi.updateRecord("account", id, values);
    }

    return {
        getAccount: getAccount,
        findActiveAccounts: findActiveAccounts,
        updateAccount: updateAccount
    };
})();