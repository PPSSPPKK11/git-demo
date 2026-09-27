var CRM = CRM || {};
CRM.ProductHeat = (function () {
    "use strict";

    var PAGE_SIZE = 250;

    function escapeOData(value) {
        return String(value).replace(/'/g, "''");
    }

    async function loadProductsByHeatOutcome(heatOutcome, companyCode) {
        var filter = "statecode eq 0 and new_heatoutcome eq '" +
            escapeOData(heatOutcome) + "'";

        if (companyCode) {
            filter += " and new_companycode eq '" +
                escapeOData(companyCode) + "'";
        }

        var query = "?$select=productid,name,productnumber,new_heatoutcome,new_companycode" +
            "&$filter=" + filter +
            "&$orderby=name asc";

        var all = [];
        var next = query;

        while (next) {
            var page = await Xrm.WebApi.retrieveMultipleRecords("product", next, PAGE_SIZE);
            all = all.concat(page.entities);
            next = page.nextLink ? page.nextLink.split("/api/data/v9.2/product")[1] : null;
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
})();