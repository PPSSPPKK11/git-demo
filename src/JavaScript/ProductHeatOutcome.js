var CRM = CRM || {};
CRM.ProductHeat = (function () {
    "use strict";

    var PAGE_SIZE = 250;

    function escapeOData(value) {
        return String(value).replace(/'/g, "''");
    }

    async function loadProductsByHeatOutcome(heatOutcome, companyCode, requestedSize) {
        var filters = [
            "statecode eq 0",
            "new_heatoutcome eq '" + escapeOData(heatOutcome) + "'"
        ];

        // Important: (size matches OR size is empty) AND company matches.
        if (requestedSize) {
            filters.push(
                "(new_productsize eq '" + escapeOData(requestedSize) +
                "' or new_productsize eq null)"
            );
        }

        if (companyCode) {
            filters.push(
                "new_companycode eq '" + escapeOData(companyCode) + "'"
            );
        }

        var query =
            "?$select=productid,name,productnumber,new_heatoutcome,new_companycode,new_productsize" +
            "&$filter=" + filters.join(" and ") +
            "&$orderby=name asc";

        var all = [];
        var next = query;

        while (next) {
            var page = await Xrm.WebApi.retrieveMultipleRecords(
                "product",
                next,
                PAGE_SIZE
            );

            all = all.concat(page.entities);
            next = page.nextLink
                ? page.nextLink.substring(page.nextLink.indexOf("?"))
                : null;
        }

        return all;
    }

    function groupByOutcome(products) {
        return products.reduce(function (groups, product) {
            var key = product.new_heatoutcome || "Unclassified";
            groups[key] = groups[key] || [];
            groups[key].push(product);
            return groups;
        }, {});
    }

    return {
        loadProductsByHeatOutcome: loadProductsByHeatOutcome,
        groupByOutcome: groupByOutcome
    };
}());