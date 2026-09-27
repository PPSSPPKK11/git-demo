var CRM = CRM || {};
CRM.CustomApi = (function () {
    "use strict";

    async function execute(request) {
        try {
            return await Xrm.WebApi.online.execute(request);
        } catch (error) {
            console.error("Custom API execution failed.", error);
            throw error;
        }
    }

    function buildRequest(boundParameter, operationName, operationType, parameters) {
        return {
            getMetadata: function () {
                return {
                    boundParameter: boundParameter,
                    parameterTypes: parameters || {},
                    operationType: operationType,
                    operationName: operationName
                };
            }
        };
    }

    return {
        execute: execute,
        buildRequest: buildRequest
    };
})();