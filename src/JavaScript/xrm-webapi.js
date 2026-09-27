var EnterpriseCRM = EnterpriseCRM || {};
EnterpriseCRM.WebApi = (function () {
    "use strict";

    async function getById(entitySetName, id, columns) {
        var cleanId = id.replace(/[{}]/g, "");
        var query = columns && columns.length
            ? "?$select=" + columns.join(",")
            : "";

        return Xrm.WebApi.retrieveRecord(entitySetName, cleanId, query);
    }

    async function getActiveByField(entitySetName, field, value, columns) {
        var escaped = String(value).replace(/'/g, "''");
        var query = "?$select=" + columns.join(",") +
            "&$filter=statecode eq 0 and " + field + " eq '" + escaped + "'" +
            "&$top=50";

        var result = await Xrm.WebApi.retrieveMultipleRecords(entitySetName, query);
        return result.entities;
    }

    async function update(entityName, id, data) {
        var cleanId = id.replace(/[{}]/g, "");
        return Xrm.WebApi.updateRecord(entityName, cleanId, data);
    }

    return {
        getById: getById,
        getActiveByField: getActiveByField,
        update: update
    };
})();