var CRM = CRM || {};
CRM.ProductProcessor = (function () {
    "use strict";

    var BATCH_SIZE = 100;

    async function updateProducts(products, updateFactory) {
        var results = [];

        for (var start = 0; start < products.length; start += BATCH_SIZE) {
            var batch = products.slice(start, start + BATCH_SIZE);
            var operations = batch.map(function (product) {
                return updateFactory(product);
            });

            var batchResults = await Promise.allSettled(operations);
            results = results.concat(batchResults);
        }

        return results;
    }

    function summarize(results) {
        return results.reduce(function (summary, result) {
            if (result.status === "fulfilled") summary.success++;
            else summary.failed++;
            return summary;
        }, { success: 0, failed: 0 });
    }

    return {
        updateProducts: updateProducts,
        summarize: summarize
    };
})();