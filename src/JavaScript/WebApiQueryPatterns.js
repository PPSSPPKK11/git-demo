var CRM = CRM || {};
CRM.WebApiQueryPatterns = (function () {
    "use strict";

    function encode(value) {
        return encodeURIComponent(value);
    }

    async function getAccountsByName(name) {
        var query =
            "?$select=accountid,name,statecode,revenue" +
            "&$filter=statecode eq 0 and contains(name,'" +
            name.replace(/'/g, "''") +
            "')" +
            "&$orderby=name asc";

        var result = await Xrm.WebApi.retrieveMultipleRecords("account", query);
        return result.entities;
    }

    async function getOpportunityWithCustomer(opportunityId) {
        var id = opportunityId.replace(/[{}]/g, "");
        var query =
            "?$select=opportunityid,name,statecode,estimatedvalue" +
            "&$expand=customerid_account($select=accountid,name)," +
            "customerid_contact($select=contactid,fullname)";

        return Xrm.WebApi.retrieveRecord("opportunity", id, query);
    }

    async function getAllPages(entityName, query, pageSize) {
        var records = [];
        var nextQuery = query || "?$select=" + encode(entityName + "id");
        var size = pageSize || 5000;

        while (nextQuery) {
            var result = await Xrm.WebApi.retrieveMultipleRecords(
                entityName,
                nextQuery,
                size
            );

            records = records.concat(result.entities);
            nextQuery = result.nextLink
                ? result.nextLink.substring(result.nextLink.indexOf("?"))
                : null;
        }

        return records;
    }

    async function updateStateAwareRecord(entityName, id, changes) {
        if (!id) {
            throw new Error("Record id is required.");
        }

        return Xrm.WebApi.updateRecord(
            entityName,
            id.replace(/[{}]/g, ""),
            changes
        );
    }

    return {
        getAccountsByName: getAccountsByName,
        getOpportunityWithCustomer: getOpportunityWithCustomer,
        getAllPages: getAllPages,
        updateStateAwareRecord: updateStateAwareRecord
    };
}());